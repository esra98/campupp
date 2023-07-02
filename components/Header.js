import { Fragment, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import {useRouter} from "next/router";
import Link from "next/link";
import { Dialog, Disclosure, Popover, Transition , Menu} from '@headlessui/react'
import {
  StarIcon,  
  Bars3Icon,
  PencilSquareIcon,
  UsersIcon,
  SquaresPlusIcon,
  XMarkIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PlayCircleIcon } from '@heroicons/react/20/solid'

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
          <Link href="/" className="-m-1.5 p-1.5 outline-none">
            <span className="sr-only">CampUpp</span>
            <img className="h-16 w-auto" src="https://campupp.s3.eu-north-1.amazonaws.com/LOGO.png" alt="CampUpp Logo"/>
          </Link>
        </div>
        <div className="flex lg:flex-1">
          <Link href="/blog" className="hidden md:block text-sm font-semibold leading-6 text-gray-900">
            Blog
          </Link>
          <Link href="/guide" className="hidden md:block text-sm font-semibold leading-6 text-gray-900 ml-5">
            SSS
          </Link>
          <Link href="/contact" className="hidden md:block text-sm font-semibold leading-6 text-gray-900 ml-5">
            İletişim
          </Link>
        </div>
        
        <div className="flex lg:hidden mr-3">
          <Menu as="div" className="relative inline-block text-left mr-3">
            <div>
              <Menu.Button className="flex ml-5">
              <svg className='h-8 w-8' xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 512"><g fillRule="nonzero"><path fill="#4D4D4D" d="M256 0c70.683 0 134.689 28.664 181.012 74.987C483.336 121.311 512 185.316 512 256c0 70.684-28.664 134.689-74.988 181.013C390.689 483.337 326.683 512 256 512c-70.676 0-134.689-28.663-181.013-74.987C28.664 390.689 0 326.676 0 256c0-70.684 28.664-134.689 74.987-181.013C121.311 28.664 185.316 0 256 0z"/><path fill="#fff" d="M256.001 19.596c65.278 0 124.383 26.467 167.162 69.243 42.777 42.78 69.242 101.884 69.242 167.162s-26.465 124.383-69.245 167.16c-42.776 42.779-101.881 69.245-167.159 69.245-65.278 0-124.383-26.466-167.162-69.242-42.777-42.78-69.243-101.885-69.243-167.163S46.062 131.619 88.839 88.839c42.779-42.776 101.884-69.243 167.162-69.243z"/><path fill="#E30A17" d="M256.001 39.594c119.517 0 216.407 96.887 216.407 216.407 0 119.518-96.89 216.407-216.407 216.407-119.52 0-216.407-96.889-216.407-216.407 0-119.52 96.887-216.407 216.407-216.407z"/><path fill="#fff" d="M280.099 201.21c-18.178-28.707-50.215-47.771-86.708-47.771-56.642 0-102.56 45.918-102.56 102.562 0 56.643 45.918 102.561 102.56 102.561 36.492 0 68.53-19.062 86.708-47.769-15.02 16.73-36.813 27.257-61.067 27.257-45.315 0-82.049-36.735-82.049-82.049 0-45.314 36.734-82.05 82.049-82.05 24.254 0 46.047 10.529 61.067 27.259zm-5.513 54.791l92.768 30.142-57.334-78.913v97.541l57.334-78.913-92.768 30.143z"/></g></svg>   

                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400 mt-2" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item className="flex">
                    {({ active }) => (
                      <Link
                        href="/en"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'px-4 py-2 text-sm flex'
                        )}
                      >
                        <Link href="/en" className='mt-1'>ENG</Link>
                        <svg className='ml-3 h-8 w-8' xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 512"><g fillRule="nonzero"><path fill="#999" d="M256 0c70.68 0 134.69 28.66 181.01 74.99C483.34 121.31 512 185.32 512 256c0 70.68-28.66 134.69-74.99 181.01C390.69 483.34 326.68 512 256 512c-70.68 0-134.69-28.66-181.01-74.99C28.66 390.69 0 326.68 0 256c0-70.68 28.66-134.69 74.99-181.01C121.31 28.66 185.32 0 256 0z"/><path fill="#fff" d="M256 19.48c65.3 0 124.46 26.48 167.25 69.27l1.09 1.18c42.14 42.71 68.18 101.37 68.18 166.06 0 65.31-26.5 124.46-69.29 167.25l-1.18 1.09c-42.73 42.16-101.4 68.19-166.05 68.19-65.23 0-124.37-26.51-167.18-69.33-42.84-42.74-69.33-101.89-69.33-167.2 0-65.31 26.48-124.45 69.27-167.24C131.55 45.96 190.7 19.48 256 19.48z"/><path fill="#FEFEFE" d="M256 39.59c119.52 0 216.41 96.89 216.41 216.4 0 119.52-96.89 216.42-216.41 216.42-119.51 0-216.4-96.9-216.4-216.42 0-119.51 96.89-216.4 216.4-216.4z"/><path fill="#012169" d="M183.49 179.55V52.05c-41.32 14.7-76.85 41.61-102.27 76.35l102.27 51.15zm0 152.9v127.5c-41.3-14.7-76.82-41.59-102.26-76.35l102.26-51.15zm144.55 0v127.67c41.45-14.63 77.09-41.54 102.61-76.34l-102.61-51.33zm0-152.9V51.88c41.45 14.63 77.11 41.54 102.62 76.35l-102.62 51.32z"/><path fill="#C8102E" d="M448.3 328.16h-48.11l49.35 24.72c3.21-6.41 6.11-13 8.69-19.75l-9.93-4.97zm-9.34-187.76-86.42 43.33h48.11l48.95-24.5c-3.23-6.46-6.79-12.75-10.64-18.83zM212.41 299.26v168.75c14.08 2.87 28.66 4.4 43.59 4.4 14.76 0 29.19-1.49 43.13-4.3V299.26h168.94c2.83-13.98 4.34-28.44 4.34-43.27 0-14.88-1.51-29.42-4.37-43.47H299.13V43.9A217.404 217.404 0 0 0 256 39.59c-14.93 0-29.51 1.54-43.59 4.4v168.53H43.97a217.777 217.777 0 0 0-4.37 43.47c0 14.83 1.51 29.29 4.34 43.27h168.47zM63.12 183.84h48.11l-48.89-24.48c-3.2 6.41-6.11 13.02-8.68 19.76l9.46 4.72zm95.87 144.43h-48.11l-48.57 24.31A216.76 216.76 0 0 0 73 371.52l86.43-43.25h-.44z"/></g></svg> 
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
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
        <div className='hidden lg:block'>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="flex ml-5">
              <svg className='h-8 w-8' xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 512"><g fillRule="nonzero"><path fill="#4D4D4D" d="M256 0c70.683 0 134.689 28.664 181.012 74.987C483.336 121.311 512 185.316 512 256c0 70.684-28.664 134.689-74.988 181.013C390.689 483.337 326.683 512 256 512c-70.676 0-134.689-28.663-181.013-74.987C28.664 390.689 0 326.676 0 256c0-70.684 28.664-134.689 74.987-181.013C121.311 28.664 185.316 0 256 0z"/><path fill="#fff" d="M256.001 19.596c65.278 0 124.383 26.467 167.162 69.243 42.777 42.78 69.242 101.884 69.242 167.162s-26.465 124.383-69.245 167.16c-42.776 42.779-101.881 69.245-167.159 69.245-65.278 0-124.383-26.466-167.162-69.242-42.777-42.78-69.243-101.885-69.243-167.163S46.062 131.619 88.839 88.839c42.779-42.776 101.884-69.243 167.162-69.243z"/><path fill="#E30A17" d="M256.001 39.594c119.517 0 216.407 96.887 216.407 216.407 0 119.518-96.89 216.407-216.407 216.407-119.52 0-216.407-96.889-216.407-216.407 0-119.52 96.887-216.407 216.407-216.407z"/><path fill="#fff" d="M280.099 201.21c-18.178-28.707-50.215-47.771-86.708-47.771-56.642 0-102.56 45.918-102.56 102.562 0 56.643 45.918 102.561 102.56 102.561 36.492 0 68.53-19.062 86.708-47.769-15.02 16.73-36.813 27.257-61.067 27.257-45.315 0-82.049-36.735-82.049-82.049 0-45.314 36.734-82.05 82.049-82.05 24.254 0 46.047 10.529 61.067 27.259zm-5.513 54.791l92.768 30.142-57.334-78.913v97.541l57.334-78.913-92.768 30.143z"/></g></svg>   

                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400 mt-2" aria-hidden="true" />
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item className="flex">
                    {({ active }) => (
                      <Link
                        href="/en"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'px-4 py-2 text-sm flex'
                        )}
                      >
                        <Link href="/en" className='mt-1'>ENG</Link>
                        <svg className='ml-3 h-8 w-8' xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 512"><g fillRule="nonzero"><path fill="#999" d="M256 0c70.68 0 134.69 28.66 181.01 74.99C483.34 121.31 512 185.32 512 256c0 70.68-28.66 134.69-74.99 181.01C390.69 483.34 326.68 512 256 512c-70.68 0-134.69-28.66-181.01-74.99C28.66 390.69 0 326.68 0 256c0-70.68 28.66-134.69 74.99-181.01C121.31 28.66 185.32 0 256 0z"/><path fill="#fff" d="M256 19.48c65.3 0 124.46 26.48 167.25 69.27l1.09 1.18c42.14 42.71 68.18 101.37 68.18 166.06 0 65.31-26.5 124.46-69.29 167.25l-1.18 1.09c-42.73 42.16-101.4 68.19-166.05 68.19-65.23 0-124.37-26.51-167.18-69.33-42.84-42.74-69.33-101.89-69.33-167.2 0-65.31 26.48-124.45 69.27-167.24C131.55 45.96 190.7 19.48 256 19.48z"/><path fill="#FEFEFE" d="M256 39.59c119.52 0 216.41 96.89 216.41 216.4 0 119.52-96.89 216.42-216.41 216.42-119.51 0-216.4-96.9-216.4-216.42 0-119.51 96.89-216.4 216.4-216.4z"/><path fill="#012169" d="M183.49 179.55V52.05c-41.32 14.7-76.85 41.61-102.27 76.35l102.27 51.15zm0 152.9v127.5c-41.3-14.7-76.82-41.59-102.26-76.35l102.26-51.15zm144.55 0v127.67c41.45-14.63 77.09-41.54 102.61-76.34l-102.61-51.33zm0-152.9V51.88c41.45 14.63 77.11 41.54 102.62 76.35l-102.62 51.32z"/><path fill="#C8102E" d="M448.3 328.16h-48.11l49.35 24.72c3.21-6.41 6.11-13 8.69-19.75l-9.93-4.97zm-9.34-187.76-86.42 43.33h48.11l48.95-24.5c-3.23-6.46-6.79-12.75-10.64-18.83zM212.41 299.26v168.75c14.08 2.87 28.66 4.4 43.59 4.4 14.76 0 29.19-1.49 43.13-4.3V299.26h168.94c2.83-13.98 4.34-28.44 4.34-43.27 0-14.88-1.51-29.42-4.37-43.47H299.13V43.9A217.404 217.404 0 0 0 256 39.59c-14.93 0-29.51 1.54-43.59 4.4v168.53H43.97a217.777 217.777 0 0 0-4.37 43.47c0 14.83 1.51 29.29 4.34 43.27h168.47zM63.12 183.84h48.11l-48.89-24.48c-3.2 6.41-6.11 13.02-8.68 19.76l9.46 4.72zm95.87 144.43h-48.11l-48.57 24.31A216.76 216.76 0 0 0 73 371.52l86.43-43.25h-.44z"/></g></svg> 
                      </Link>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </nav>
      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5 outline-none">
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
                      className="block md:hidden font-semibold leading-6 text-gray-900 pt-5"
                    >
                      Giriş Yapın
                    </a>
                )}
                <Link href="/blog" className="block md:hidden font-semibold leading-6 text-gray-900 pt-5">
                  Blog
                </Link>
                <Link href="/guide" className="block md:hidden font-semibold leading-6 text-gray-900 pt-5">
                  SSS
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
