// import { useSearchParams } from '@remix-run/react'
import { Outlet, useNavigate } from '@remix-run/react'
import { useState } from 'react'
import Button from '~/components/Button'

export default function Index() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()

  function increment() {
    setCount(count + 1)
  }

  function navigateWithSearchParams() {
    navigate({
      pathname: '/search-params/result',
      search: `?count=${count}`
    })
  }

  return (
    <div className='flex h-screen flex-col items-center bg-blue-400 p-5'>
      <h1 className='text-4xl font-bold'>this is search-params.tsx</h1>
      <p className='text-xl '>{count}</p>
      <Button onClick={increment}>+</Button>
      <Button onClick={navigateWithSearchParams}>
        navigate to next page with search params
      </Button>
      <div className='mt-5 w-3/5'>
        <Outlet />
      </div>
    </div>
  )
}
