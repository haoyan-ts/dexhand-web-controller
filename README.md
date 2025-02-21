This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Building

To build the project, follow these steps:

1.  Install `buf` (if you don't have it already):
    ```bash
    # Example using Homebrew on macOS
    brew install bufbuild/buf/buf
    # Example using Ubuntu
    sudo apt-get update && sudo apt-get install buf
    ```
    Refer to the official [Buf documentation](https://buf.build/docs/installation) for installation instructions for other operating systems.
2.  Run `buf generate` to generate the necessary code from the protobuf definitions:
    ```bash
    buf generate
    ```
    This command uses the `buf.gen.yaml` file to determine how to generate the code.
3.  Copy the generated files from `api/gen/web` to the `proto` directory:
    ```bash
    cp -r api/gen/web/* proto/
    ```
    This step makes the generated code available for use in the project.  Make sure the `proto` directory exists.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
