import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <header className='flex min-h-[60px] w-full items-center justify-between bg-gray-500/10 p-4'>
            <Header />
          </header>

          <main className='flex flex-col gap-4 p-4'>{children}</main>

          <footer className='flex w-full flex-col flex-wrap items-center justify-center gap-2 bg-gray-500/10 p-4 text-sm'>
            <Footer />
          </footer>
        </body>
      </html>
    </ClerkProvider>
  )
}
