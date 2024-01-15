import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getSession } from '~/sessions'

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('cookie'))

  const text = session.get('text')

  return { text: text }
}

export default function Index() {
  const { text } = useLoaderData<typeof loader>()

  return (
    <div className='flex h-screen flex-col items-center bg-blue-600 p-5'>
      <h1 className='text-4xl font-bold'>this is session-set.result.tsx</h1>
      <p>前のページで入力された値: {text}</p>
    </div>
  )
}
