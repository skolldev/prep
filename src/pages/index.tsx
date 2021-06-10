import { A } from '@/components'
import { signIn, signOut, useSession } from 'next-auth/client'
import { NextSeo } from 'next-seo'

export default function Home(): JSX.Element {
  const [session, loading] = useSession()

  return (
    <>
      <NextSeo title="Home" />
      <p className="mt-4 text-2xl text-center">
        {session ? (
          <>
            Signed in as{' '}
            <code
              className="bg-[#fafafa] rounded-[5px] p-3 text-[1.1rem]"
              style={{
                fontFamily:
                  'Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,Bitstream Vera Sans Mono, Courier New, monospace',
              }}
            >
              {session.user && (session.user.email as string)}
            </code>
          </>
        ) : (
          'Not Signed in!'
        )}
        {session ? (
          <button
            type="button"
            onClick={() => signOut()}
            className="inline-flex items-center justify-center px-4 py-2 ml-8 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm cursor-pointer whitespace-nowrap hover:bg-indigo-700"
          >
            Sign Out
          </button>
        ) : (
          <button
            type="button"
            onClick={() => signIn('email', { email: 'alexander.may@hey.com' })}
            className="inline-flex items-center justify-center px-4 py-2 ml-8 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm cursor-pointer whitespace-nowrap hover:bg-indigo-700"
          >
            Sign In
          </button>
        )}
      </p>
    </>
  )
}
