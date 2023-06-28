import { Inter } from 'next/font/google'
import Footer from './FooterEng'
import Header from './HeaderEng'
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
