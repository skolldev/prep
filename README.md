# Prep
An in-development nextjs app that seeks to cover all nutrition related needs - meal planning, grocery list, weight tracking etc.

## Technologies
Uses Next.js, Typescript & TailwindCSS. Backend is a PostgreSQL server with Prisma as ORM. Authentication is passwordless with next-auth.

## Development
For local development, you'll need to add two files locally, a .env and a .env.local file.

### .env
Contains the database url for prisma. Prisma currently does not support .env.local files, so we'll need to do this seperately.
The database url follows the offical PostgreSQL scheme, but this is the general format:

    DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
 
### .env.local
This contains the rest of the environment variables that are needed:

    NEXTAUTH_URL=http://localhost:3000 // This is the callback url that next auth uses for the authentication
    NEXT_PUBLIC_URL=http://localhost:3000 // Used for the environment routes. For env variables to be available in browser, next required NEXT_PUBLIC_ to be prefixed, which is why we duplicate this var
    URL=localhost:3000 // Used for next-seo canonical url generation
    EMAIL_SERVER=smtp://USER:PASSWORD@HOST:PORT // Used for sending the passwordless auth emails
    EMAIL_FROM=alexander.may@hey.com 
    SECRET=random string 
    
