import Layout from "@/components/Layout";
import { useSession } from "next-auth/react"
import 'react-toastify/dist/ReactToastify.css';
import {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";
import { Disclosure } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import { AiOutlineDelete,AiOutlineDoubleRight } from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';
import { IoMdClose } from "react-icons/io";

import 'react-toastify/dist/ReactToastify.css'

export default function Reservations(){
        const {data:session} = useSession();  
        useEffect(() => {
            if (session) {
            axios.get('/api/reservation?user='+session.user.email).then(response => {
                setReservationRequests(response.data);
            });
            }
            
        }, [session]);

        const [reservationRequests, setReservationRequests] = useState([]);
        const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
        const [deletedReservationId, setDeletedReservationId] = useState(false);
        
        async function deleteRequest(){
            const res = await axios.delete('/api/reservation?id='+deletedReservationId);
            if(res.data == "ok"){
                window.location.reload()
            }else{
                toast.error('Başarısız, lütfen daha sonra tekrar deneyin')
            }
        }
        function openDeleteEventModal(){
            setIsDeleteModalOpen(true);
        }
        function closeDeleteEventModal() {
            setIsDeleteModalOpen(false);
        }
        return (
        <Layout>
            <ToastContainer />
            <Modal
                isOpen={isDeleteModalOpen}
                onRequestClose={closeDeleteEventModal}
                contentLabel="Example Modal"
                >
                <>
                    <div
                    className="
                        justify-center 
                        items-center 
                        flex 
                        overflow-x-hidden 
                        overflow-y-auto 
                        fixed 
                        inset-0 
                        z-50 
                        outline-none 
                        focus:outline-none
                        bg-neutral-800/70
                    "
                    >
                    <div className="
                        relative 
                        w-full
                        md:w-4/6
                        lg:w-3/6
                        xl:w-2/5
                        my-6
                        mx-auto 
                        lg:h-auto
                        md:h-auto
                        lg:mt-24
                        "
                    >
                        {/*content*/}
                        <div className={`
                        translate
                        duration-300
                        h-full
                        `}>
                        <div className="
                            translate
                            h-full
                            lg:h-auto
                            md:h-auto
                            border-0 
                            rounded-lg 
                            shadow-lg 
                            relative 
                            flex 
                            flex-col 
                            w-full 
                            bg-white 
                            outline-none 
                            focus:outline-none
                        "
                        >
                            {/*header*/}
                            <div className="
                            flex 
                            items-center 
                            p-6
                            rounded-t
                            justify-center
                            relative
                            border-b-[1px]
                            "
                            >
                            <button
                                className="
                                p-1
                                border-0 
                                hover:opacity-70
                                transition
                                absolute
                                left-9
                                "
                                onClick={closeDeleteEventModal}
                            >
                                <IoMdClose size={18} />
                            </button>
                            <div className="text-lg font-semibold">
                                Rezervasyon Talebinizi Silin
                            </div>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                              <p>Rezervasyon talebinizi silmek istediğinize emin misiniz?</p>
                            </div>
                            {/*header*/}
                            <div className="
                            flex 
                            items-center 
                            p-6
                            py-3
                            my-3
                            rounded-t
                            justify-center
                            relative
                            border-t-[1px]
                            "
                            >
                            <div className="text-lg font-semibold">

                            <button
                              onClick={deleteRequest}
                              className="bg-rose-900 w-full p-2 border  text-white rounded-2xl hover:bg-transparent hover:text-rose-900 hover:border hover:border-rose-900">
                              Rezervasyon Talebinizi Silin
                            </button>

                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </>
            </Modal>
            <div className="py-8 bg-opacity-100 bg-gray-100">
                <div className="px-6 mx-auto max-w-screen-xl">
                    {reservationRequests.length !== 0 && (
                        <div className="min-w-0 flex-1">
                            <h2 className="text-xl font-bold leading-7 mb-3 text-gray-900 sm:tracking-tight">
                            Yaptığım Rezervasyon Taleplerim
                            </h2>
                        </div>
                    )}
                    
                    {reservationRequests.length == 0 && (
                        <div class=" h-screen flex items-center">
                            <div class="text-center w-full">
                                <img
                                    src="https://campupp.s3.eu-north-1.amazonaws.com/Artboard+1.png"
                                    alt="kamp rezervasyon"
                                    className="h-72 object-center mx-auto -mt-32"
                                />
                                <p className="mb-3 font-semibold">Oluşturduğunuz rezervasyon talebi bulunamadı</p>
                                <Link type="button" href="/"class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700">Kamp Yerlerini İnceleyin ve Rezervasyon Talebi Oluşturmaya Başlayın</Link>
                            </div>
                        </div>
                    )}
                    <ul className="grid">
                        {reservationRequests.length !== 0 && reservationRequests.map((reservationRequest) => (
                        <li className="shadow rounded-md bg-opacity-100 bg-white col-span-1 mt-5" key={reservationRequest._id}>
                            <div className="p-6 justify-between items-center w-full flex">
                            <div>
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-base font-semibold leading-7 text-gray-900">{reservationRequest?.campsiteName}</h3>
                                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Bu kamp yerine yapmış olduğunuz rezervasyon talebi ile ilgili bilgiler aşağıdadır.</p>
                                </div>
                                <div className="mt-6 border-t border-gray-100">
                                    <dl className="divide-y divide-gray-100">
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">İsim / Telefon</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{reservationRequest?.reservationName === ''  ? '-' : reservationRequest?.reservationName} / {reservationRequest?.reservationTelephone === ''  ? '-' : reservationRequest?.reservationTelephone}</dd>
                                        </div>
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Rezervasyon Tarihleri</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{reservationRequest?.startDate.substring(0, 10)} / {reservationRequest?.endDate.substring(0, 10)}</dd>
                                        </div>
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Rezervasyon Kişi Sayısı</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{reservationRequest?.personCount}</dd>
                                        </div>
                                        {reservationRequest?.isVanPresent && (
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Karavanla Konaklama</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Evet</dd>
                                        </div>
                                        )}
                                        {reservationRequest?.bungalowRent && (
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Bungalow Kiralama</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Evet</dd>
                                        </div>
                                        )}
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Rezervasyon Notunuz</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                <p className="overflow-auto">{reservationRequest?.userMessage}</p>
                                            </dd>
                                        </div>
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Kamp Yerinin İlettiği Rezervasyon Notu</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                <p className="overflow-auto font-semibold text-green-700">{reservationRequest?.ownerMessage}</p>
                                            </dd>
                                        </div>
                                        {!reservationRequest?.approved && (
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Statü</dt>
                                            <dd className="mt-1 text-sm font-semibold text-red-700 leading-6  sm:col-span-2 sm:mt-0">Kamp yerinden onay bekliyor</dd>
                                        </div>
                                        )}
                                        {reservationRequest?.approved && (
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Statü</dt>
                                            <dd className="mt-1 text-sm font-semibold text-green-700 leading-6  sm:col-span-2 sm:mt-0">Kamp yeri tarafından onaylandı</dd>
                                        </div>
                                        )}
                                    </dl>
                                </div>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50 rounded-md">
                                <button onClick={()=>{setDeletedReservationId(reservationRequest?._id);openDeleteEventModal()}} class="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100 cursor-pointer">
                                    <AiOutlineDelete className="mr-1.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                    Sil
                                </button>
                                <Link href={'/campsite/view/' + reservationRequest?.campsite} class="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100">
                                    <AiOutlineDoubleRight className="mr-1.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                    Kamp Yeri Detay
                                </Link>
                            </div>
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout>
        )
    }