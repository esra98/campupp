import Layout from '@/components/Layout'
import Banner from '@/components/Banner'
import Link from "next/link";
import Script from 'next/script'
import {HiOutlineMail, HiOutlineDocumentSearch} from "react-icons/hi";
import Explore from '@/components/ExploreBanner';

export default function Contact() {
  return(
    <Layout>
        <Script src="https://platform-api.sharethis.com/js/sharethis.js#property=649a64799fbe9100124b55e5&product=sticky-share-buttons&source=platform" async="async" strategy="lazyOnload"/>
        <div className="sharethis-sticky-share-buttons"></div>
        <main className="pb-24 bg-opacity-100 bg-white">
          <header className="bg-blend-darken bg-no-repeat bg-center bg-cover bg-[url(https://campupp.s3.eu-north-1.amazonaws.com/contact-bg.jpg)] w-full relative h-96">
            <div className="bg-opacity-50 bg-black w-full h-full left-0 top-0 absolute"></div>
            <div className="pl-4 pr-4 -translate-x-1/2 transform translate-y-[-50%] rotate-0 skew-x-0 skew-y-0 scale-x-1 scale-y-1 max-w-screen-xl w-full mx-auto left-1/2 top-20 absolute">
              <span></span>
            </div>
          </header>
          <div className="bg-opacity-100 bg-[rgb(31 41 55/var(--tw-bg-opacity))] p-9 md:px-20 mx-auto my-[-8rem] rounded-[0.25rem] justify-between flex z-20 relative">
            <article className="lg:flex w-full p-10 shadow text-base rounded-md leading-tight max-w-none bg-white">
              <div className="w-full">
                <h1 className="text-2xl leading-9 font-semibold text-green-800 text-center">Bize Ulaşın</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 py-8">
                    <div className="text-center">
                      <HiOutlineMail className="h-10 w-10 m-auto text-cc-primary" aria-hidden="true" />
                      <p className="font-bold my-3">Email</p>
                      <a href="mailto:info@campupp.com" className="leading-7 text-lg text-gray-900 mt-5 text-center font-semibold hover:underline">info@campupp.com</a>
                    </div>
                    <div className="text-center">
                      <HiOutlineDocumentSearch className="h-10 w-10 m-auto text-cc-primary" aria-hidden="true" />
                      <p className="font-bold my-3">SSS</p>
                      <Link href="/guide" className="leading-7 text-lg text-gray-900 mt-5 text-center hover:underline">Sorularınız için kullanım kılavuzunu inceleyin.</Link>
                    </div>
                </div>
              </div>
            </article>
            <aside>

            </aside>
          </div>
        </main> 
        <Banner />
        <Explore/>
    </Layout>
)
}
