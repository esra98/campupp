import Layout from '@/components/LayoutEng'
import Banner from '@/components/BannerEng'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import Script from 'next/script'
import Explore from '@/components/ExploreBannerEng'

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
                                    <span>What is CampUpp?</span>
                                    <ChevronUpIcon
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                CampUpp is an organization where anyone who loves camping or wants to camp can find the most suitable caravan or tent camping spots. With CampUpp, you can contact the operators of camping locations from all over Turkey. However, CampUpp doesn&apos;t stop there. It aims to create a space that allows people to find friends to camp with, stay informed about outdoor activities, and learn more about camping.
                                </Disclosure.Panel>
                                </>
                            )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2">
                            {({ open }) => (
                                <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>How can I contact the campgrounds?</span>
                                    <ChevronUpIcon
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                To contact the most beautiful campgrounds in Turkey, you can select the one that suits you and use the phone, social media, or email addresses provided on the business page to contact the authorized personnel. Additionally, the WhatsApp button located at the bottom right corner is specially designed for easy communication with the campground.
                                </Disclosure.Panel>
                                </>
                            )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2">
                            {({ open }) => (
                                <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>I couldn&apos;t find a specific piece of information on the campground&apos;s page. What should I do?</span>
                                    <ChevronUpIcon
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                If you need more information about a campground you may want to choose or if you want to ask a specific question to the authorities, you can use the contact information of the camping areas. Additionally, there is a separate section at the bottom of the selected campground&apos;s page titled &quot;Ask a Question to the Campground&quot; where you can browse through previously asked questions and ask the campground about the topic you desire.
                                </Disclosure.Panel>
                                </>
                            )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2">
                            {({ open }) => (
                                <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>I&apos;m looking for campgrounds by the forest or the sea. How can I find out if the campground has such features?</span>
                                    <ChevronUpIcon
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                There is a wide variety of campgrounds in Turkey, and it is possible to find businesses that cater to every need. If you want to find a campground suitable for you within CampUpp, you can click the &quot;Filter&quot; button located at the top right corner on the homepage. When you click it, you can select the features you need and easily see the suitable results. Additionally, detailed information about the facilities can be found below the photos of the facilities on the campground&apos;s page.
                                </Disclosure.Panel>
                                </>
                            )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2">
                            {({ open }) => (
                                <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>How can I make a reservation for the selected campground?</span>
                                    <ChevronUpIcon
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                You can see the price information and the button to create a reservation request on the campground&apos;s page. When you click on this button, you need to enter your information accurately on the page that appears. After entering the correct information, you should click the save button located below.
                                </Disclosure.Panel>
                                </>
                            )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2">
                            {({ open }) => (
                                <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>Do I need to pay a fee when creating a reservation request?</span>
                                    <ChevronUpIcon
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                No, you don&apos;t need to pay any fees when creating a reservation request for the campground you selected from CampUpp. CampUpp informs the campground operators about your reservation request without charging any fees. If your reservation is accepted, you can ask the authorities how to make the payment. Many campground operators will collect the campground fee upon entry or exit.
                                </Disclosure.Panel>
                                </>
                            )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2">
                            {({ open }) => (
                                <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>I created a reservation request. Can I go to the campground?</span>
                                    <ChevronUpIcon
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                Creating a reservation request does not mean that you have made a reservation. To go to the campground, you need to make sure that your reservation request has been approved by the campground. You can view the status of your reservation request by clicking on your profile in the top right corner and then clicking on the &quot;My Reservation Requests&quot; button.
                                </Disclosure.Panel>
                                </>
                            )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2">
                            {({ open }) => (
                                <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>I want to make changes to my reservation. What should I do?</span>
                                    <ChevronUpIcon
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                You can delete your requests and make changes to the date, number of people, or other information you want by going to the &quot;My Reservation Requests&quot; page. However, if your previous reservation has been approved by the campground, you will need to wait for the new reservation request to be approved by the campground operators again. Additionally, instead of canceling the reservation request, you can directly contact the campground operators to inquire if it is possible to make changes in your desired matter.
                                </Disclosure.Panel>
                                </>
                            )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2">
                            {({ open }) => (
                                <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>Can I cancel a reservation I made at any time?</span>
                                    <ChevronUpIcon
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                If your reservation request has not yet been approved by the campground, you can cancel it at any time. If your reservation request has been approved by the campground, you have the right to cancel up to 5 reservations. Unfortunately, your membership will end if you cancel 5 approved reservations. We recommend not canceling approved reservations unless necessary, as the campgrounds may have not taken other reservations and may have lost potential customers.
                                </Disclosure.Panel>
                                </>
                            )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2">
                            {({ open }) => (
                                <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>My reservation request has been approved by the campground, but I can&apos;t reach them. Should I still go to the campground on the designated dates?</span>
                                    <ChevronUpIcon
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                We recommend contacting the operators at least once after your reservation is approved and before the reservation date to ensure that no issues arise. If your reservation request has been approved but you are unable to reach the campground through messages or calls, we suggest contacting us. Otherwise, please note that CampUpp does not accept any responsibility and you will need to resolve the issue with the campground operators.
                                </Disclosure.Panel>
                                </>
                            )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2">
                            {({ open }) => (
                                <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>I booked my reservation through CampUpp, and it has been approved by the campground. However, when I arrived at the campground, they said the place is full. What should I do?</span>
                                    <ChevronUpIcon
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                To avoid such issues, we advise you to periodically contact the campgrounds until the reservation date. However, if you experience such a problem, we would like you to contact us. CampUpp is an organization that values providing accurate information to its users, and we will evaluate all your complaints and, if necessary, remove the business from our platform.
                                </Disclosure.Panel>
                                </>
                            )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2">
                            {({ open }) => (
                                <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>What should I pay attention to when creating a reservation request for caravan camping?</span>
                                    <ChevronUpIcon
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                If you are looking for accommodation areas for caravans on CampUpp, you should first select the &quot;Suitable for Caravan&quot; option while searching for campgrounds. Some of the camping facilities in Turkey are only suitable for tents, while others can accommodate both tents and caravans. Some facilities may only have caravan camping areas. Therefore, if you plan to camp with a caravan, you should make sure that the chosen campground accepts caravans before creating a reservation request and remind them of your intention to bring a caravan when contacting the facility.
                                </Disclosure.Panel>
                                </>
                            )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2">
                            {({ open }) => (
                                <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>Should I pay with cash or credit card?</span>
                                    <ChevronUpIcon
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                Please note that CampUpp does not charge any fees. The payment will be made directly between the campground operators and you. If you see the message &quot;You can make your payment by credit card at this establishment&quot;
                                 on the campground&apos;s page, it means that the campground accepts credit card payments. Otherwise, the campground may only accept cash or other payment methods such as bank transfer. For more detailed information about payments, you should contact the campground operators where you plan to stay.
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
        <Explore/>
    </Layout>
)
}
