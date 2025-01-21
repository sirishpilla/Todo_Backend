# Please use the following Version

Prisma only supports Node.js >= 18.18.
Please upgrade your Node.js version.

# Commands

`console npm install`

# Prisma Setup

We are using Prisma ORM from scratch using a local SQLite database file.
`console npm install typescript tsx @types/node --save-dev`
`console npx tsc --init`
`console npm install prisma --save-dev`
`console npx prisma init --datasource-provider sqlite`
Since the model already exists in schema.prisma we can now tun

`console npx prisma migrate dev --name init`

This command did three things:

It created a new SQL migration file for this migration in the prisma/migrations directory.
It executed the SQL migration file against the database.
It ran prisma generate under the hood (which installed the @prisma/client package and generated a tailored Prisma Client API based on your models).

# Now Run

`console npm start`
