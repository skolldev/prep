import Fauna from '@/adapters'
import { env } from '@/constants/env'
import { getFaunaClient } from '@/utils'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

export default NextAuth({
  providers: [
    Providers.Email({
      server: env.EMAIL_SERVER,
      from: env.EMAIL_FROM,
    }),
  ],
  secret: env.SECRET,
  adapter: Fauna.Adapter({ faunaClient: getFaunaClient() }),
  callbacks: {
    session: async (session, user) => {
      return Promise.resolve({
        ...session,
        user: {
          ...user,
        },
      })
    },
  },
})
