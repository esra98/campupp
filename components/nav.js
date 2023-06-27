import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react"
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import {
  ChatBubbleLeftRightIcon,
  StarIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  LifebuoyIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import {useRouter} from "next/router";

export default function Nav(){
    const {data:session} = useSession();
    const router = useRouter();
    async function logout() {
        await router.push('/');
        await signOut();
      }
    return (
        <header className='flex justify-between py-4 px-8 border-b border-gray-200'>
        <Link href={'/'} className='flex items-center gap-1'>
          <img
            src="https://campupp.s3.eu-north-1.amazonaws.com/LOGO.png"
            alt="logo"
            className="h-16"
          />
        </Link>
        <Link href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Features
        </Link>
        {session &&(
          <Popover className="relative m-5">
          <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
            <span> {session?.user?.name}</span>
            <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
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
            <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max translate-popover px-4" >
              <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                    <div key="messages" className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                      <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <ChatBubbleLeftRightIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                      <div>
                        <Link href="/events" className="font-semibold text-gray-900">
                           Etkinliklerim
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-600">Etkinlik ekleyin</p>
                      </div>
                    </div>
                    <div key="reservations" className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                      <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <ChatBubbleLeftRightIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                      <div>
                        <Link href="/reservations" className="font-semibold text-gray-900">
                           Rezervasyonlarım
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-600">Rezervasyon taleplerinizi yönetin</p>
                      </div>
                    </div>
                    <div key="favorites" className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                      <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <StarIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                      <div>
                        <Link href={'/favorites/'} className="font-semibold text-gray-900">
                           Favoriler
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-600">Favorilerinize eklediğiniz kamp yerlerini görün</p>
                      </div>
                    </div>
                    <div key="business" className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                      <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <PlusCircleIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                      <div>
                        <Link href="/campsite/new" className="font-semibold text-gray-900">
                          Kamp Yerinizi Ekleyin
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-600">Kamp Yeri Sahibi Misiniz?</p>
                      </div>
                    </div>
                    <div key="manage" className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                      <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <PencilSquareIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                      <div>
                        <Link href="/campsite/edit" className="font-semibold text-gray-900">
                          Kamp Yerinizi Düzenleyin
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-600">Kamp Yerinizi zaten eklediniz mi?</p>
                      </div>
                    </div>
                    <div key="help" className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                      <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <LifebuoyIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                      <div>
                        <Link href="/help" className="font-semibold text-gray-900">
                           Yardım
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-600">Sorunuz Mu var?</p>
                      </div>
                    </div>
                </div>
                <div className="bg-gray-50">
                <a
                      key="logout"
                      onClick={logout} 
                      className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                    >
                      <ArrowLeftOnRectangleIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                      Çıkış Yapın
                    </a>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
        )}
        {!session &&(
          <Popover className="relative m-5">
          <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
            <span>Giriş Yapın</span>
            <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
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
            <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max translate-popover px-4" >
              <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                <div key="register" className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                      <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <UserPlusIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                      <div>
                        <Link href="/register" className="font-semibold text-gray-900">
                          Kayıt Olun
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-600">Tüm Özelliklerden Faydalanmak İçin</p>
                      </div>
                    </div>
                    <div key="business" className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                      <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <PlusCircleIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                      <div>
                        <Link href="/account/places/new" className="font-semibold text-gray-900">
                          Kamp Yerinizi Ekleyin
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-600">Kamp Yeri Sahibi Misiniz?</p>
                      </div>
                    </div>
                    <div key="help" className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                      <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <LifebuoyIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                      </div>
                      <div>
                        <Link href="/help" className="font-semibold text-gray-900">
                           Yardım
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-600">Sorunuz Mu var?</p>
                      </div>
                    </div>
                </div>
                <div className="divide-gray-900/5 bg-gray-50">
                    <a
                      onClick={() => signIn('google')}
                      className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                      Giriş Yapın
                    </a>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover>
        )}
      </header>
    )
}