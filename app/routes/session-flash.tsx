import { ActionFunctionArgs, redirect } from '@remix-run/node'
import { Form, Outlet } from '@remix-run/react'
import Button from '~/components/Button'
import { commitSession, getSession } from '~/sessions'

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'))

  const form = await request.formData()
  const count = form.get('count')

  session.flash('count', count)
  return redirect('/session-flash/result', {
    headers: { 'Set-Cookie': await commitSession(session) }
  })
}

export default function Index(): ReturnType<React.FC> {
  return (
    <div className='flex h-screen flex-col items-center bg-blue-400 p-5'>
      <h1 className='text-4xl font-bold'>this is session-flash.tsx</h1>
      <br />
      <Form method='post'>
        <input type='number' name='count' className='mr-4' />
        <Button>navigate to next page with session flash</Button>
      </Form>
      <div className='mt-5 w-3/5'>
        <Outlet />
      </div>
    </div>
  )
}
