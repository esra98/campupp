import { Fragment, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import {useRouter} from "next/router";
import Link from "next/link";
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  StarIcon,  
  Bars3Icon,
  PlusCircleIcon,
  PencilSquareIcon,
  UsersIcon,
  SquaresPlusIcon,
  XMarkIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'

const profile = [
  { name: 'Favorilerim', description: 'Favori kamp alanlarınızın listesi', href: '/favorites', icon: StarIcon },
  { name: 'Rezervasyon Taleplerim', description: 'Rezervasyon taleplerinizin listesi', href: '/reservations', icon: SquaresPlusIcon },
  { name: 'Etkinliklerim', description: 'Favorilediğiniz ve kayıt olduğunuz etkinlikler', href: '/events', icon: UsersIcon },
  { name: 'Yönetici Sayfası', description: 'Kamp alanınızı yönetin', href: '/campsite/admin', icon:PencilSquareIcon },
]
const callsToAction = [
  { name: 'Çıkış Yapın', id:'logout', icon: PlayCircleIcon },
]
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const {data:session} = useSession();
  const router = useRouter();
  async function logout() {
    await router.push('/');
    await signOut();
  }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img className="h-16 w-auto" src="https://campupp.s3.eu-north-1.amazonaws.com/LOGO.png" alt="" />
          </Link>
        </div>
        <div className="flex lg:flex-1">
          <Link href="/blog" className="hidden md:block text-sm font-semibold leading-6 text-gray-900">
            Blog
          </Link>
          <Link href="/" className="hidden md:block text-sm font-semibold leading-6 text-gray-900 ml-5">
            Nasıl Kullanılır?
          </Link>
          <Link href="/contact" className="hidden md:block text-sm font-semibold leading-6 text-gray-900 ml-5">
            İletişim
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          {session &&(  
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              {session.user.email}
              <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-full top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {profile.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                      <div className="flex-auto">
                        <Link href={item.href} className="block font-semibold text-gray-900">
                          {item.name}
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50">
                    <a
                      onClick={logout}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100 cursor-pointer"
                    >
                      <ArrowLeftOnRectangleIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                      Çıkış yapın
                    </a>
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
          )}
          {!session && (
            <button onClick={() => signIn('google')} className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer">
            Giriş Yapın
          </button>
          )}
        </Popover.Group>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://campupp.s3.eu-north-1.amazonaws.com/LOGO.png"
                alt=""
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {session &&(
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Profil
                        <ChevronDownIcon
                          className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...profile].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                          <Disclosure.Button
                            onClick={logout}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            Çıkış Yapın
                          </Disclosure.Button>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                )}
                {!session && (
                  <a
                      onClick={() => signIn('google')}
                      className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Giriş Yapın
                    </a>
                )}
                <Link href="/blog" className="block md:hidden font-semibold leading-6 text-gray-900 pt-5">
                  Blog
                </Link>
                <Link href="/" className="block md:hidden font-semibold leading-6 text-gray-900 pt-5">
                  Nasıl Kullanılır?
                </Link>
                <Link href="/contact" className="block md:hidden font-semibold leading-6 text-gray-900 pt-5">
                  İletişim
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
