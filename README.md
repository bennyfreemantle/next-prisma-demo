# Prisma + Next Learning

A simple app for learning how to integrate Prisma and Next.js.
The app contains a form section with a title and content field and submit button.
After a note has been submitted it will execute a POST request to your postgresql DB.

Notes are displayed underneath the form with a delete and update button.

- Delete - a note by clicking the button on the note you wish to delete will trigger a DELETE request.
- Update - a note changing the form title and content and pressing update will trigger a PATCH request.

## Getting Started

Set up .env file with your DB URL string

```bash
echo DATABASE_URL="DB_URL_STRING" > .env
```

Provision Prisma

```bash
npx prisma init

# sync your db with the notes schema
# CAUTION! only use this when developing look to use migrations when deploying for production
npx prisma db push
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```
