import { ActionFunctionArgs, redirect } from '@remix-run/node'
import { Form, Outlet } from '@remix-run/react'
import Button from '~/components/Button'
import { commitSession, getSession } from '~/sessions'

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get('cookie'))

  const form = await request.formData()
  const text = form.get('text')

  session.set('text', text)

  return redirect('/session-set/result', {
    headers: { 'Set-Cookie': await commitSession(session) }
  })
}

export default function Index() {
  return (
    <div className='flex h-screen flex-col items-center bg-blue-400 p-5'>
      <h1 className='text-4xl font-bold'>this is session-flash.tsx</h1>
      <br />
      <Form method='post'>
        <input type='text' name='text' className='mr-4' />
        <Button>navigate to next page and set Cookie</Button>
      </Form>
      <div className='mt-5 w-3/5'>
        <Outlet />
      </div>
    </div>
  )
}
