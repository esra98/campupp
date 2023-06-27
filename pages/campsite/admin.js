import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Layout from "@/components/Layout";
import CampsiteForm from "@/components/CampsiteForm";
import {useEffect, useState} from "react";
import axios from "axios";
import { useSession } from "next-auth/react"
import Link from "next/link";
import { Disclosure } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'


const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
]

export default function Admin() {
  const [productInfo, setProductInfo] = useState(null);
  const [reservationRequestsIncoming, setReservationRequestsIncoming] = useState([]);   
  const [ownerNote, setOwnerNote] = useState("");
  const {data:session} = useSession();   

  useEffect(() => {
    axios.get('/api/campsite?user='+session?.user?.email).then(response => {
      setProductInfo(response.data);
    });
  }, [session]);
  useEffect(() => {
    if(productInfo && session){
        axios.get('/api/reservation?campsite='+session.user.email).then(response => {
            setReservationRequestsIncoming(response.data);
        });
    }
    
  }, [productInfo,session]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  async function sendNote(requestId){
    const res = await axios.put('/api/reservation', {ownerNote,_id:requestId, isApproval:false});
    if(res.data == "ok"){
        window.location.reload()
    }else{
        toast.error('Başarısız, lütfen daha sonra tekrar deneyin')
    }
}
async function sendApproval(requestId){
    const res = await axios.put('/api/reservation', {ownerNote,_id:requestId,isApproval:true});
    if(res.data == "ok"){
        window.location.reload()
    }else{
        toast.error('Başarısız, lütfen daha sonra tekrar deneyin')
    }
}

  return (
    <Layout>
        
        {productInfo && (
        <>
            <div className="bg-gray-100">
                    <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
                        <div className="relative isolate overflow-hidden bg-cc-primary px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                        <svg
                            viewBox="0 0 1024 1024"
                            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                            aria-hidden="true"
                        >
                            <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                            <defs>
                            <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                                <stop stopColor="#9cbcbc" />
                                <stop offset={1} stopColor="#9cbcbc" />
                            </radialGradient>
                            </defs>
                        </svg>
                        <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Eklediğiniz kamp alanını düzenleyin.
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-gray-300">
                            Kamp yerinizle ilgili eklediğiniz bilgileri düzenleyin.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                            <a
                                href="/campsite/edit"
                                className="rounded-md bg-gray-100 px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                Kamp Yerinizi Düzenleyin
                            </a>
                            <a href={'/campsite/delete/'+productInfo._id} className="text-sm font-semibold leading-6 text-white">
                                Kamp Yerinizi Silin<span aria-hidden="true">→</span>
                            </a>
                            </div>
                        </div>
                        <div className="relative mt-16 h-80 lg:mt-8">
                            <img
                            className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                            src={productInfo?.images[0]=="productInfo?.images[0]"?"":"https://campupp.s3.eu-north-1.amazonaws.com/Artboard+1.png"}
                            alt="App screenshot"
                            width={1824}
                            height={1080}
                            />
                        </div>
                        </div>
                    </div>
            </div>
            {reservationRequestsIncoming.length !== 0 && (
                        <>
                        <div className="min-w-0 flex-1 p-10 bg-gray-100">
                            <h2 className="text-xl font-bold leading-7 mb-3 text-gray-900 sm:tracking-tight">
                            Kamp Yerime Gelen Rezervasyon Talepleri
                            </h2>
                            <div className="overflow-scroll">
                                <table class="tn abx acc">
                                    
                                </table>    
                                        {reservationRequestsIncoming.length !== 0 && reservationRequestsIncoming.map((request) => (
                                        <>
                                        <table className='border border-t-2'>
                                            <thead>
                                                <tr>
                                                    <th scope="col" class="arv ati atx avf avv awb axq cfy">İsim</th>
                                                    <th scope="col" class="ara arv avf avv awb axq">Telefon</th>
                                                    <th scope="col" class="ara arv avf avv awb axq">Email</th>
                                                    <th scope="col" class="ara arv avf avv awb axq">Rezervasyon Tarihleri</th>
                                                    <th scope="col" class="ara arv avf avv awb axq">Kişi Sayısı</th>
                                                    <th scope="col" class="ara arv avf avv awb axq">Bungalow Kiralama</th>
                                                    <th scope="col" class="ara arv avf avv awb axq">Karavanla Kalma</th>
                                                    <th scope="col" class="ara arv avf avv awb axq">Rezervasyon Talebini Oluşturduğu Tarih</th>
                                                </tr>
                                            </thead>
                                            <tbody class="abx acb border-t  border-gray-200">
                                                <tr>
                                                    <td class="adh arx ati atx avv avz axq cfy">{request?.reservationName}</td>
                                                    <td class="adh ara arx avv axm">{request?.reservationTelephone}</td>
                                                    <td class="adh ara arx avv axm">{request?.user}</td>
                                                    <td class="adh ara arx avv axm">{request?.startDate.substring(0, 10)} / {request?.endDate.substring(0, 10)}</td>
                                                    <td class="adh ara arx avv axm">{request?.personCount}</td>
                                                    <td class="adh ara arx avv axm">{request?.bungalowRent ? 'Evet' : 'Hayır'}</td>
                                                    <td class="adh ara arx avv axm">{request?.isVanPresent ? 'Evet' : 'Hayır'}</td>
                                                    <td class="adh ara arx avv axm">{request?.createdAt.substring(0, 10)}</td>
                                                </tr>  
                                            </tbody>
                                        </table>
                                        {request?.userMessage && (
                                        <p className="border-t-transparent p-4 avv overflow-auto"> 
                                            <span className="avz">Kullanıcının Rezervasyon Notu:</span> {request?.userMessage}
                                        </p>
                                        )}
                                        {request?.ownerMessage && (
                                        <p className="border-t-transparent p-4 avv">
                                            <span className="avz">Kullanıcıya Rezervasyon Notunuz:</span> {request?.ownerMessage}
                                        </p>
                                        )}
                                        <p className="border-t-transparent mt-1">
                                            <Disclosure as="div" key="1" className=" px-0 py-6">
                                                {({ open }) => (
                                                <>
                                                    <h3 className="">
                                                    <Disclosure.Button className="flex w-ful gap-6">
                                                        <span className="font-medium text-gray-900 text-left pl-4">Kullanıcıya Rezervasyonu ile ilgili mesaj iletmek ya da mesajınızı düzenlemek ister misiniz?</span>
                                                        <span className="flex items-center">
                                                        {open ? (
                                                            <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                                        ) : (
                                                            <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                                        )}
                                                        </span>
                                                    </Disclosure.Button>
                                                    </h3>
                                                    <Disclosure.Panel className="pt-6">
                                                    <div className="space-y-6">
                                                        <div className="mt-2 px-4">
                                                            <input
                                                            placeholder=" mesajınız"
                                                            value={ownerNote}
                                                            onChange={ev => setOwnerNote(ev.target.value)}
                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                            />
                                                        </div>
                                                        <div onClick={()=>{sendNote(request?._id)}} className="bg-rose-900 w-16 p-2 border text-white rounded-md mt-5 hover:bg-transparent hover:text-rose-900 hover:border hover:border-rose-900 cursor-pointer">
                                                            Gönder
                                                        </div>
                                                    </div>
                                                    </Disclosure.Panel>
                                                </>
                                                )}
                                            </Disclosure>    
                                        </p>
                                        <p className="border-t-transparent p-4 avv">
                                            <span className="avz">Statü:</span> {request?.approved ? <span className="text-green-900 font-semibold">Onaylandı</span> : <span className="text-red-900 font-semibold">Henüz Onaylanmadı<div onClick={()=>{sendApproval(request?._id)}} className="bg-green-900 w-32 p-2 border text-white rounded-md mt-5 hover:bg-transparent hover:text-green-900 hover:border hover:border-green-900 cursor-pointer">
                                                Rezervasyon Talebini Onayla
                                            </div></span>}
                                            </p>
                                        </>
                                            
                                        ))}
                                    
                                
                            </div>
                        </div>
                        </>
                    )}
        </>
        )}
        {!productInfo && (
            <div className="bg-gray-100">
                <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
                        <div className="relative isolate overflow-hidden bg-cc-primary px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                        <svg
                            viewBox="0 0 1024 1024"
                            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
                            aria-hidden="true"
                        >
                            <circle cx={512} cy={512} r={512} fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
                            <defs>
                            <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                                <stop stopColor="#9cbcbc" />
                                <stop offset={1} stopColor="#9cbcbc" />
                            </radialGradient>
                            </defs>
                        </svg>
                        <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Kamp Alanınızı Ekleyin
                            </h2>
                            <p className="mt-6 text-lg leading-8 text-gray-300">
                            Kamp yerinizle ilgili bilgileri ekleyin. Etkinlik oluşturma, rezervasyon talebi alma gibi pek çok özellikten yararlanmaya başlayın.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                            <a
                                href="/campsite/new"
                                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                Kamp Yerinizi Ekleyin
                            </a>
                            <a href="#" className="text-sm font-semibold leading-6 text-white">
                                Nasıl kullanılır? <span aria-hidden="true">→</span>
                            </a>
                            </div>
                        </div>
                        <div className="relative mt-16 h-80 lg:mt-8">
                            <img
                            className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                            src="https://campupp.s3.eu-north-1.amazonaws.com/Artboard+1.png"
                            alt="App screenshot"
                            width={1824}
                            height={1080}
                            />
                        </div>
                        </div>
                </div>
            </div>  
        )}
        {"nazifeesra98@gmail.com"==session?.user?.email && (
        <div className='p-10 bg-gray-100'>
            <a href="/blog/new" className="p-2 gap-2 px-4 border flex w-48 rounded-xl mt-5 hover:bg-transparent shadow hover:shadow-md">
                <svg aria-hidden="true" className="w-5 h-5 text-yellow-400 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                <p className="font-semibold">Blog yazısı ekle</p>
            </a>
        </div>      
        )}
    </Layout>
  )
}
