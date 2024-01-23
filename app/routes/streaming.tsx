import { Await, defer, useAsyncError, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'

type Post = {
  userId: number
  id: number
  title: string
  body: string
}

interface User {
  id: number
  name: string
  username: string
  email: string
}

async function fetchPosts() {
  await new Promise(resolve => setTimeout(resolve, 3000))
  // throw new Error('error が発生しました')
  return await fetch('https://jsonplaceholder.typicode.com/posts').then(
    res => res.json() as Promise<Post[]>
  )
}

async function fetchUsers() {
  return await fetch('https://jsonplaceholder.typicode.com/users').then(
    res => res.json() as Promise<User[]>
  )
}

export async function loader() {
  const posts = fetchPosts()
  const users = await fetchUsers() // 必ず待ちたい
  return defer({ posts: posts, users: users })
}

function ErrorElement() {
  const error = useAsyncError() as Error
  return <p>Uh Oh, something went wrong! {error.message}</p>
}

export default function Index() {
  const { posts, users } = useLoaderData<typeof loader>()

  return (
    <div className='flex h-screen flex-col items-center bg-blue-600 p-5'>
      <h1 className='text-4xl font-bold'>this is streaming.tsx</h1>
      <div className='w-5/3 flex '>
        <Suspense fallback={<p>loading ...</p>}>
          <Await resolve={posts} errorElement={<ErrorElement />}>
            {posts => <PostList posts={posts} />}
          </Await>
        </Suspense>
        <UserList users={users} />
      </div>
    </div>
  )
}

function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className='m-3 max-h-full bg-gray-200 ring-1'>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}

function UserList({ users }: { users: User[] }) {
  return (
    <ul className='m-3 bg-gray-200 ring-1'>
      {users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
}
