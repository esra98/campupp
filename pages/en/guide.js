import Layout from '@/components/LayoutEng'
import Banner from '@/components/BannerEng'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import Script from 'next/script'

export default function Guides() {
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
            <article className="lg:flex w-full py-10 md:p-10 shadow text-base rounded-md leading-tight max-w-none bg-white">
              <div className="w-full">
                <h1 className="text-2xl leading-9 font-semibold text-green-800 text-center">Frequently Asked Questions</h1>
                <div className="py-8">
                    <div className="w-full px-0 md:px-4 pt-16">
                        <div className="mx-0 w-full rounded-2xl bg-white p-2">
                            <Disclosure>
                            {({ open }) => (
                                <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>CampUpp nedir?</span>
                                    <ChevronUpIcon
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                    If youre unhappy with your purchase for any reason, email us
                                    within 90 days and well refund you in full, no questions asked.
                                </Disclosure.Panel>
                                </>
                            )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2">
                            {({ open }) => (
                                <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>CampUpp nasıl kullanılır?</span>
                                    <ChevronUpIcon
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                    No.
                                </Disclosure.Panel>
                                </>
                            )}
                            </Disclosure>
                        </div>
                    </div>
                </div>
              </div>
            </article>
            <aside>

            </aside>
          </div>
        </main> 
        <Banner />
    </Layout>
)
}
