import { Link, Outlet, useLoaderData } from '@remix-run/react'

export interface Item {
  id: number
  name: string
  price: number
}

export function loader() {
  return {
    items: [
      { id: 1, name: 'item1', price: 100 },
      { id: 2, name: 'item2', price: 200 }
    ]
  }
}

export default function Index() {
  const { items } = useLoaderData<typeof loader>()

  return (
    <div className='flex h-screen flex-col items-center bg-blue-400 p-5'>
      <h1 className='text-4xl font-bold'>this is nested-routes.tsx</h1>
      <p>保持している状態</p>
      <p>商品情報</p>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name}: {item.price}
          </li>
        ))}
      </ul>
      <br />
      <Link to='/nested-routes/page'>page</Link>
      <div className='mt-5 w-3/5'>
        <Outlet />
      </div>
    </div>
  )
}
