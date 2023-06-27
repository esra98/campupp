import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useSession, signIn, signOut } from "next-auth/react"
import Nav from '@/components/nav'
import Footer from './Footer'
import Header from './Header'
const inter = Inter({ subsets: ['latin'] })

export default function Layout({children}) {
  const { data: session } = useSession()
  return (
    <div>
      <Header />
      <div>
        {children}
      </div>
      <Footer />
    </div>
   
  )
}
