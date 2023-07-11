import { Inter } from 'next/font/google'
import Footer from './Footer'
import Header from './Header'
import GDPR from "./ConsentReminder";

const inter = Inter({ subsets: ['latin'] })

export default function Layout({children}) {
  return (
    <div>
      <Header />
      <div>
        {children}
      </div>
      <Footer />
      <GDPR />
    </div>
   
  )
}
