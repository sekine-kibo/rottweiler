import { LoaderFunctionArgs, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { commitSession, getSession } from '~/sessions'

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'))
  const count = session.get('count') || 0
  return json(
    { count },
    { headers: { 'Set-Cookie': await commitSession(session) } }
  )
}

export default function Index() {
  const { count } = useLoaderData<typeof loader>()
  return (
    <div className='flex h-screen flex-col items-center bg-blue-600 p-5'>
      <h1 className='text-4xl font-bold'>this is session-flash.result.tsx</h1>
      <p>前のページで入力された値: {count}</p>
    </div>
  )
}
