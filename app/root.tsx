// import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from '@remix-run/node'
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from '@remix-run/react'
import stylesheet from '~/tailwind.css'

// export const links: LinksFunction = () => [
//   ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
// ];

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet }
]

export interface Config {
  boxCode: string
  balance: number
  links: {
    name: string
    href: string
  }[]
}

export function loader() {
  const config = {
    boxCode: 'c2f12268-e74a-4a24-ab67-9ca8e87e9baa',
    balance: 1000,
    links: [
      { name: 'Home', href: '/' },
      { name: 'Nested Routes', href: '/nested-routes' },
      { name: 'Session Set', href: '/session-set' },
      { name: 'Session Flash', href: '/session-flash' },
      { name: 'Search Params', href: '/search-params' },
      { name: 'Streaming', href: '/streaming' }
    ]
  }
  return { config }
}

export default function App() {
  const { config } = useLoaderData<typeof loader>()

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body className='flex flex-col items-center bg-blue-200'>
        <h1 className='text-4xl font-bold'>this is root.tsx</h1>
        <p>保持している状態</p>
        <p>Box Code: {config.boxCode}</p>
        <p>残高: {config.balance}</p>
        <br />
        <ul>
          {config.links.map(link => (
            <li key={link.href}>
              <Link to={link.href}>{link.name}</Link>
            </li>
          ))}
        </ul>

        <div className='mt-5 w-4/5'>
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
