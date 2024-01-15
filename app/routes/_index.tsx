import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' }
  ]
}

export default function Index() {
  return (
    <div className='flex h-screen flex-col items-center bg-blue-400 p-5'>
      <h1 className='text-4xl font-bold'>this is _index.tsx</h1>
    </div>
  )
}
