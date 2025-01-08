import { Dancing_Script, Playfair_Display } from 'next/font/google'

export const dancing_script = Dancing_Script({
  subsets: ['latin'],
  display: 'swap',
})

export const playfair_display = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
})

// TIP: To import these fonts, use the following code:
// import { dancing_script } from '@/app/fonts'
// <div className={`${dancing_script.className}`}
