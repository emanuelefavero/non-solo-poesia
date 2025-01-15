import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ProgressBar from '@/components/ProgressBar'
import { authors } from '@/data/authors'
import { TITLE } from '@/data/title'
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
  title: TITLE,
  description: `Un blog di poesie e racconti scritti da ${authors[0].name}`,

  // This will use png as the icon instead of favicon.ico:
  icons: {
    icon: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          userButtonOuterIdentifier:
            'max-w-[150px] truncate hidden text-zinc-800 dark:text-zinc-200 hover:text-zinc-600 dark:hover:text-zinc-100 3xs:inline-block',
          userButtonAvatarBox: 'w-5 h-5',
          userButtonBox:
            'h-5 transition-transform duration-200 active:scale-95',
        },
      }}
    >
      <html lang='en'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ProgressBar />
          <Header />

          {/* NOTE: Since the Header is fixed, we have to account for its height by adding padding at the top of the next element */}
          <main className='flex flex-col items-center justify-center gap-4 px-4 pb-32 pt-[115px] 3xs:pt-[128px] 2xs:pt-[144px] xs:pt-[160px] sm:pt-[174px]'>
            <div className='flex w-full max-w-[1157px] flex-col gap-4'>
              {children}
            </div>
          </main>

          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
