import { Inter } from 'next/font/google'
import Footer from './Footer'
import Header from './Header'
const inter = Inter({ subsets: ['latin'] })

export default function Layout({children}) {
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
