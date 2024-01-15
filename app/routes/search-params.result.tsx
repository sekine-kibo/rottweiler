import { LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
// import { useSearchParams } from '@remix-run/react'

// loader を利用して Server Side で searchParams を取得することも
// useSearchParams を利用して Client Side で searchParams を取得することもできました。
// 基本的には session を利用する方針に倒した方が保守しやすいように思いました。
export function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url)
  const count = url.searchParams.get('count') || 0
  return { count: count }
}

export default function Index() {
  const { count } = useLoaderData<typeof loader>()

  // const [searchParams, setSearchParams] = useSearchParams()
  // const count = searchParams.get('count') || 0

  return (
    <div className='flex h-screen flex-col items-center bg-blue-600 p-5'>
      <h1 className='text-4xl font-bold'>this is search-params.result.tsx</h1>
      <p>前のページで入力された値: {count}</p>
    </div>
  )
}
