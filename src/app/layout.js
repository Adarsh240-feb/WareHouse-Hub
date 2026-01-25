import { Outfit, Space_Grotesk } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata = {
  title: 'WarehouseHub | Smart Warehouse Management',
  description: 'Streamline your logistics with real-time inventory, smart tracking, and seamless operations. The complete warehouse management platform.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
