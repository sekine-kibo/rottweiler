import { useLoaderData, useRouteLoaderData } from '@remix-run/react'
import { Config } from '~/root'
import { Item } from './nested-routes'
import { getSession } from '~/sessions'
import { LoaderFunctionArgs } from '@remix-run/node'

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request.headers.get('cookie'))

  const text = session.get('text')

  return { text: text }
}

export default function Index() {
  const { config } = useRouteLoaderData('root') as { config: Config }
  const { items } = useRouteLoaderData('routes/nested-routes') as {
    items: Item[]
  }
  const { text } = useLoaderData<typeof loader>()

  return (
    <div className='flex h-screen flex-col items-center bg-blue-600 p-5'>
      <h1 className='text-4xl font-bold'>this is nested-routes.page.tsx</h1>
      <p>root.tsx の状態を参照する</p>
      <p>Box Code: {config.boxCode}</p>
      <p>残高: {config.balance}</p>
      <br />
      <p>nested-routes.tsx の状態を参照する</p>
      <p>商品情報</p>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}: {item.price}
          </li>
        ))}
      </ul>
      <br />
      <p>session 情報: {text}</p>
    </div>
  )
}
