import { env } from "@/constants/env";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    Providers.Email({
      server: env.EMAIL_SERVER,
      from: env.EMAIL_FROM,
    }),
  ],
  secret: env.SECRET,
  adapter: PrismaAdapter(prisma),
});
