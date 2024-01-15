// import { createCookie,  createFileSessionStorage } from '@remix-run/node' // or cloudflare/deno
import { createCookieSessionStorage } from '@remix-run/node'

// In this example the Cookie is created separately.
// const sessionCookie = createCookie('__session', {
//   secrets: ['r3m1xr0ck5'],
//   sameSite: true
// })

// const { getSession, commitSession, destroySession } = createFileSessionStorage({
//   // The root directory where you want to store the files.
//   // Make sure it's writable!
//   dir: './app/sessions',
//   cookie: sessionCookie
// })

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({
    // a Cookie from `createCookie` or the same CookieOptions to create one
    cookie: {
      name: '__session',
      secrets: ['r3m1xr0ck5'],
      sameSite: 'lax'
    }
  })

export { getSession, commitSession, destroySession }
