import { useSession} from "next-auth/react"
import Layout from '@/components/LayoutEng'
import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Disclosure } from '@headlessui/react'
import { MinusIcon, PlusIcon } from '@heroicons/react/20/solid'
import Modal from 'react-modal';
import { IoMdClose } from "react-icons/io";
import CommentArea from '@/components/CommentAreaEng';
import QuestionArea from '@/components/QuestionAreaEng';
import EventsArea from '@/components/EventAreaEng';
import ReservationModal from "@/components/ReservationModalEng";
import ImageGallery from 'react-image-gallery';
import { BiPhoneCall } from "react-icons/bi";
import { GrInstagram,GrCircleAlert } from "react-icons/gr";
import { FaFacebook, FaMapMarkerAlt,FaWhatsapp } from "react-icons/fa";
import { BsCreditCard } from "react-icons/bs";
import Head from 'next/head'
import Script from 'next/script'

import Link from "next/link";
let images = [
];

export default function CampsiteDetail({title, description}) {
  const {data:session} = useSession();
  const [place, setPlace] = useState([])
  const [placeImages, setPlaceImages] = useState(false)
  const [isReservationModalOpen,setIsReservationModalOpen]= useState(false)
  const router = useRouter();
  const {id} = router.query;
  console.log(id)
  useEffect(()=>{
    if(!id){
        return;
    }else{
        axios.get('/api/campsite?id='+id).then(response => {
            setPlace(response.data);
          });
    }
  }, [id])
  useEffect(()=>{
    if(place?.images){
          
        for (let i = 0; i < place?.images.length; i++) {
            const str = place?.images?.[i];
            const image = {
              original: str,
              thumbnail: str
            };
            images.push(image);
        }
        setPlaceImages(images);
    }
  }, [place])
  if(!place) return; 
  async function addToMyFavorites() {
    const user= session?.user?.email
    if(user==null){
      toast.error('To use this feature, you need to first sign up on our website.')
    }
    else{
        axios.post('/api/favorites', {
            user,  
            campsite:place._id
        }).then((res)=>{
        if(res.data=="success"){
            toast.success('Added to Favorites! 🤩 You can access the list of your favorite campsites from your profile.')
        }
        if(res.data=="error"){
            toast.error('This campground is already added to your favorites. You can access the list of your favorite campsites from your profile.')
        }
    })
        }

    }
      const openReservationModal = () => {
        if(!session?.user?.email){
            toast.error('Bu özelliği kullanabilmek için öncelikle sitemize üye olmalısın. ')
            return
          }
        document.getElementsByClassName('image-gallery')[0].style.display = "none";
        document.getElementsByClassName('st-sticky-share-buttons')[0].style.display = "none";

        setIsReservationModalOpen(true);
    };
    
    const closeReservationModal = () => {
        document.getElementsByClassName('image-gallery')[0].style.display = "block";
        document.getElementsByClassName('st-sticky-share-buttons')[0].style.display = "block";

        setIsReservationModalOpen(false);
    };
  return(
    <Layout>
        <Script src="https://platform-api.sharethis.com/js/sharethis.js#property=649a64799fbe9100124b55e5&product=sticky-share-buttons&source=platform" async="async" strategy="lazyOnload"/>
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} />
        </Head>
        <ReservationModal placeId={place?._id} owner={place?.user} placeName={place?.title} bungalowRentAvailable={place?.isReservationModuleBungalowRentingPossible} isOpen={isReservationModalOpen} onRequestClose={closeReservationModal}/>
        <ToastContainer />
        <div className="grid grid-cols-1 lg:grid-cols-2 px-0 md:px-16">
            <div className="p-6 ">
                {/* Image gallery */}
                {placeImages?.length>0 && (
                <ImageGallery items={placeImages} />
                )}
                
            </div>
            <div className="p-6">
                <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="lg:col-span-2 ">
                        {place?.titleEnglish !==""  && (
                            <h1 className="text-2xl text-gray-900 sm:text-3xl mt-5">{place?.titleEnglish}</h1>
                        )}
                        {place?.titleEnglish === "" && (
                            <h1 className="text-2xl text-gray-900 sm:text-3xl mt-5">{title}</h1>
                        )}
                        <p className="text-gray-800 mt-1 mb-5">{place?.city} / {place?.district}</p>
                        <div className="flex mt-2 gap-1">
                            <Link className="text-gray-600 flex gap-1 hover:underline" target="_blank" href={'https://maps.google.com/?q='+place?.address}>
                                <FaMapMarkerAlt className="mr-1.5 h-5 w-5 flex-shrink-0 text-cc-primary" aria-hidden="true" />{
                                place?.address}
                            </Link>
                        </div>
                        {place.contactTel && (
                        <div>
                            <Link href={'tel:'+place.contactTel}  className="flex text-gray-600 h-8 mt-2 gap-1 hover:underline">
                                <BiPhoneCall className="mr-1.5 h-6 w-6 flex-shrink-0 text-cc-primary" aria-hidden="true" />
                                {place.contactTel} 
                            </Link>
                        </div>
                        )}
                        {place.contactTelAlt && (
                        <div>
                            <div href={'tel:'+place.contactTelAlt}  className="flex text-gray-600 h-8 mt-2 gap-1 hover:underline">
                                <BiPhoneCall className="mr-1.5 h-6 w-6 flex-shrink-0 text-cc-primary" aria-hidden="true" />
                                {place.contactTelAlt} 
                            </div>
                        </div>
                        )}
                        <div>
                            {place?.contactInstagram && (
                            <Link href={place?.contactInstagram}  className="flex text-gray-600 h-8 gap-1 hover:underline" target="_blank">
                                <GrInstagram className="mr-1.5 h-5 w-5 flex-shrink-0 mt-1 text-cc-primary" aria-hidden="true" />
                                {place?.contactInstagram} 
                            </Link>
                            )}
                        </div>
                        <div>
                            {place?.contactFacebook && (
                            <Link href={place?.contactFacebook}  className="flex text-gray-600 h-8 gap-1 hover:underline" target="_blank">
                                <FaFacebook className="mr-1.5 h-5 w-5 flex-shrink-0 mt-1 text-cc-primary" aria-hidden="true" />
                                {place?.contactFacebook} 
                            </Link>
                            )}
                        </div>
                        {place?.descriptionEnglish !== "" && (
                        <p className="my-4 text-gray-500">
                            {place?.descriptionEnglish}
                        </p>
                        )}
                        {place?.description == "" && (
                        <>
                        <p><strong>Host has not added English description yet.</strong></p>
                        <p className="my-4 text-gray-500">
                            {description}
                        </p>
                        </>
                        )}
                        <div className="block md:flex gap-5">
                            {place.price && (
                                <div className="px-5 py-1 shadow rounded-md w-40 mt-3 hover:shadow-lg">
                                {place?.priceDefaultType=="Gecelik Çadır Başı Konaklama"&& (
                                    <dt className="text-xs leading-5 text-gray-800 ">per tent per night</dt>
                                )}
                                {place?.priceDefaultType=="Gecelik Kişi Başı Konaklama"&& (
                                    <dt className="text-xs leading-5 text-gray-800 ">per person per night</dt>
                                )}
                                <dd className="font-semibold text-3xl leading-9">{place?.price} ₺</dd>
                            </div>
                            )}
                            {place?.isPresentBungalow && !place?.priceBungalow==0 && (
                            <div className="px-5 py-1 shadow rounded-md w-40 mt-3 hover:shadow-lg">
                                <dt className="text-xs leading-5 text-gray-800 ">per bungalow per night</dt>
                                <dd className="font-semibold text-3xl leading-9">{place?.priceBungalow} ₺</dd>
                            </div>
                            )}
                            {place?.isFriendlyVan && !place?.priceVan==0 && (
                            <div className="px-5 py-1 shadow rounded-md w-40 mt-3 hover:shadow-lg">
                                <dt className="text-xs leading-5 text-gray-800 ">per van per night</dt>
                                <dd className="font-semibold text-3xl leading-9">{place?.priceVan} ₺</dd>
                            </div>
                            )}
                             
                            
                        </div>
                        {place?.isPaymentCreditCard && (
                                <div className="flex">
                                    <BsCreditCard className="w-10 h-10   text-cc-primary p-2 " aria-hidden="true" />
                                    <p className="leading-6 text-gray-500 mt-2">In this establishment, you can make your payment with a credit card.</p>
                                </div>
                             )}
                        <div className="block md:flex gap-2">
                            {place?.isReservationModuleAvailable && (
                            <button
                                onClick={() => openReservationModal()}
                                className="bg-cc-primary p-2 px-4 border shadow text-white rounded-xl mt-5 hover:shadow-xl">
                                Create a Reservation Request
                            </button>
                            )}
                            <button
                                onClick={addToMyFavorites} 
                                className="p-2 gap-2 px-4 border flex rounded-xl mt-5 hover:bg-transparent shadow hover:shadow-md"
                            >
                                <svg aria-hidden="true" className="w-5 h-5 text-yellow-400 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <p className="font-semibold">Add the Campsite to Favorites</p>
                            </button>
                            {place?.contactTel && (
                            <a
                                className="p-2 w-32 px-4 border flex rounded-xl mt-5 hover:bg-transparent shadow hover:shadow-md"
                                href={"https://api.whatsapp.com/send?phone="+place.contactTel+"&amp;text=Merhaba, bilgi almak istiyorum."} target="_blank" rel="nofollow" title="WhatsApp ile Şimdi Yaz"
                            >
                                <FaWhatsapp className="mr-1.5 h-5 w-5 flex-shrink-0 mt-1 text-cc-primary" aria-hidden="true" />
                                <p className="font-semibold">WhatsApp</p>
                            </a>        
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>                                
        <div className="px-5 lg:px-20 pb-20">
            <div className="">
                <Disclosure as="div" key="1" className="border-t border-gray-200 px-0 py-6">
                                {({ open }) => (
                                <>
                                    <h3 className="-mx-2 -my-3 flow-root">
                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                        <span className="font-medium text-gray-900">Facility Features</span>
                                        <span className="ml-6 flex items-center">
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
                                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm mt-2">
                                    {place.isPresentBreakfastIncluded && (
                                        <li className="text-gray-900">
                                            <span className="text-base">Breakfast Included in the Price</span>
                                        </li>
                                    )}
                                    {place.isFriendlyAlcohol && (
                                        <li className="text-gray-900">
                                            <span className="text-base">Not Alcohol Friendly</span>
                                        </li>
                                    )}
                                    {place.isFriendlyVan && (
                                        <li  className="text-gray-900">
                                            <span className="text-base">Van Friendly</span>
                                            <br />
                                            <span className="text-sm text-gray-600">{place.descriptionVan}</span>
                                        </li>
                                    )}
                                    {place.isFriendlyKid && (
                                        <li  className="text-gray-900">
                                            <span className="text-base">Kid Friendly</span>
                                            <br />
                                            <span className="text-sm text-gray-600">{place.descriptionKid}</span>
                                        </li>
                                    )}
                                    {place.isFriendlyRemoteWork && (
                                        <li  className="text-gray-900">
                                            <span className="text-base">Suitable for Remote Work</span>
                                            <br />
                                            <span className="text-sm text-gray-600">{place.descriptionRemoteWork}</span>
                                        </li>
                                    )}
                                    {place.isFriendlyPet && (
                                        <li  className="text-gray-900">
                                            <span className="text-base">Pet friendly</span>
                                            <br />
                                            <span className="text-sm text-gray-600">{place.descriptionPet}</span>
                                        </li>
                                    )}
                                    {place.isPresentBungalow && (
                                        <li className="text-gray-900">
                                            <span className="text-base">Bungalows Available for Rent</span>
                                        </li>
                                    )}
                                    {place.isPresentPrivateBeach && (
                                        <li className="text-gray-900">
                                            <span className="text-base">Özel plaj</span>
                                        </li>
                                    )}
                                    {place.isPresentSunbedIncluded && (
                                        <li className="text-gray-900">
                                            <span className="text-base">Beach Loungers/Umbrellas Included in the Price</span>
                                        </li>
                                    )}
                                    {place.isPresentSunbedRenting && (
                                        <li className="text-gray-900">
                                            <span className="text-base">Beach Loungers/Umbrellas Available for Rent</span>
                                        </li>
                                    )}
                                </ul>
                                    </div>
                                    </Disclosure.Panel>
                                </>
                                )}
                </Disclosure>   
                <Disclosure as="div" key="1" className="border-t border-gray-200 px-0 py-6">
                                {({ open }) => (
                                <>
                                    <h3 className="-mx-2 -my-3 flow-root">
                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                        <span className="font-medium text-gray-900">Common Areas</span>
                                        <span className="ml-6 flex items-center">
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
                                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                            {place.isPresentWC && (
                                                <li className="text-gray-900">
                                                    <span className="text-base">WC</span>
                                                </li>
                                            )}
                                            {place.isPresentParkLot && (
                                                <li className="text-gray-900">
                                                    <span className="text-base">Parking Lot</span>
                                                </li>
                                            )}
                                            {place.isPresentShower && (
                                                <li className="text-gray-900">
                                                    <span className="text-base">Showers</span>
                                                </li>
                                            )}
                                            {place.isPresentWC && (
                                                <li className="text-gray-900">
                                                    <span className="text-base">Showers with Hot Water</span>
                                                </li>
                                            )}
                                            {place.isPresentWifi && (
                                                <li className="text-gray-900">
                                                    <span className="text-base">Wi-Fi</span>
                                                </li>
                                            )}
                                            {place.isPresentKitchen && (
                                                <li className="text-gray-900">
                                                    <span className="text-base">Kitchen</span>
                                                </li>
                                            )}
                                            {place.isPresentFridge && (
                                                <li className="text-gray-900">
                                                    <span className="text-base">Fridge</span>
                                                </li>
                                            )}
                                            {place.isPresentLaundry && (
                                                <li className="text-gray-900">
                                                    <span className="text-base">Washing Machine / Laundry Room</span>
                                                </li>
                                            )}
                                            {place.isPresentFirePit && (
                                                <li className="text-gray-900">
                                                    <span className="text-base">Barbecue / Campfire Area</span>
                                                </li>
                                            )}
                                            {place.isPresentElectricity && (
                                                <li className="text-gray-900">
                                                    <span className="text-base">Electrical Outlet</span>
                                                </li>
                                            )}
                                            
                                            {place.isPresentDishwasher && (
                                                <li className="text-gray-900">
                                                    <span className="text-base">Dishwasher</span>
                                                </li>
                                            )}
                                            {place.isPresentMicrowave && (
                                                <li className="text-gray-900">
                                                    <span className="text-base">Mikrodalga</span>
                                                </li>
                                            )}
                                            {place.isPresentStowe && (
                                                <li className="text-gray-900">
                                                    <span className="text-base">Stove</span>
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                    </Disclosure.Panel>
                                </>
                                )}
                </Disclosure>   
                <Disclosure as="div" key="1" className="border-t border-gray-200 px-0 py-6">
                                {({ open }) => (
                                <>
                                    <h3 className="-mx-2 -my-3 flow-root">
                                    <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                        <span className="font-medium text-gray-900">Places Around</span>
                                        <span className="ml-6 flex items-center">
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
                                        <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                            {place.isNearSea && (
                                                <li className="text-gray-900">
                                                    <span className="text-base">Sea</span>
                                                    {place.distanceSea==1 && (
                                                    <>
                                                    <br />
                                                    <span className="text-sm text-gray-600">Waterfront</span>
                                                    </>
                                                    )}
                                                    {place.distanceSea==2 && (
                                                    <>
                                                    <br />
                                                    <span className="text-sm text-gray-600">Walking Distance</span>
                                                    </>
                                                    )}
                                                    {place.distanceSea==3 && (
                                                    <>
                                                    <br />
                                                    <span className="text-sm text-gray-600">Short Vehicle Distance</span>
                                                    </>
                                                    )}
                                                    {place.distanceSea==4 && (
                                                    <>
                                                    <br />
                                                    <span className="text-sm text-gray-600">Long Vehicle Distance</span>
                                                    </>
                                                    )}
                                                </li>
                                            )}
                                            {place.isNearLake && (
                                                <li className="text-gray-900">
                                                    <span className="text-base">Lake</span>
                                                    {place.distanceLake==1 && (
                                                    <>
                                                    <br />
                                                    <span className="text-sm text-gray-600">Waterfront</span>
                                                    </>
                                                    )}
                                                    {place.distanceLake==2 && (
                                                    <>
                                                    <br />
                                                    <span className="text-sm text-gray-600">Walking Distance</span>
                                                    </>
                                                    )}
                                                    {place.distanceLake==3 && (
                                                    <>
                                                    <br />
                                                    <span className="text-sm text-gray-600">Short Vehicle Distance</span>
                                                    </>
                                                    )}
                                                    {place.distanceLake==4 && (
                                                    <>
                                                    <br />
                                                    <span className="text-sm text-gray-600">Long Vehicle Distance</span>
                                                    </>
                                                    )}
                                                </li>
                                            )}
                                            {place.isNearForest && (
                                                <li className="text-gray-900">
                                                    <span className="text-base">Forest</span>
                                                    {place.distanceForest==1 && (
                                                    <>
                                                    <br />
                                                    <span className="text-sm text-gray-600">Within Forest</span>
                                                    </>
                                                    )}
                                                    {place.distanceForest==2 && (
                                                    <>
                                                    <br />
                                                    <span className="text-sm text-gray-600">Walking Distance</span>
                                                    </>
                                                    )}
                                                    {place.distanceForest==3 && (
                                                    <>
                                                    <br />
                                                    <span className="text-sm text-gray-600">Short Vehicle Distance</span>
                                                    </>
                                                    )}
                                                    {place.distanceForest==4 && (
                                                    <>
                                                    <br />
                                                    <span className="text-sm text-gray-600">Long Vehicle Distance</span>
                                                    </>
                                                    )}
                                                </li>
                                            )}
                                            {place.isNearRestaurant && (
                                                <li className="text-gray-900">
                                                    <span className="text-base">Restaurant</span>
                                                    {place.distanceRestaurant==1 && (
                                                    <>
                                                    <br />
                                                    <span className="text-sm text-gray-600">Within Campsite</span>
                                                    </>
                                                    )}
                                                    {place.distanceRestaurant==2 && (
                                                    <>
                                                    <br />
                                                    <span className="text-sm text-gray-600">Walking Distance</span>
                                                    </>
                                                    )}
                                                    {place.distanceRestaurant==3 && (
                                                    <>
                                                    <br />
                                                    <span className="text-sm text-gray-600">Short Vehicle Distance</span>
                                                    </>
                                                    )}
                                                    {place.distanceRestaurant==4 && (
                                                    <>
                                                    <br />
                                                    <span className="text-sm text-gray-600">Long Vehicle Distance</span>
                                                    </>
                                                    )}
                                                </li>
                                            )}
                                            {place.isNearStore && (
                                                <li className="text-gray-900">
                                                    <span className="text-base">Store</span>
                                                    {place.distanceStore==1 && (
                                                    <>
                                                    <br />
                                                    <span className="text-sm text-gray-600">Walking Distance</span>
                                                    </>
                                                    )}
                                                    {place.distanceStore==2 && (
                                                    <>
                                                    <br />
                                                    <span className="text-sm text-gray-600">Walking Distance</span>
                                                    </>
                                                    )}
                                                    {place.distanceStore==3 && (
                                                    <>
                                                    <br />
                                                    <span className="text-sm text-gray-600">Short Vehicle Distance</span>
                                                    </>
                                                    )}
                                                    {place.distanceStore==4 && (
                                                    <>
                                                    <br />
                                                    <span className="text-sm text-gray-600">Long Vehicle Distance</span>
                                                    </>
                                                    )}
                                                </li>
                                            )}
                                            {place.isNearBar && (
                                                <li className="text-gray-900">
                                                    <span className="text-base">Bars/Entertainment Venues</span>
                                                    {place.distanceBar==1 && (
                                                    <>
                                                    <br />
                                                    <span className="text-sm text-gray-600">Walking Distance</span>
                                                    </>
                                                    )}
                                                    {place.distanceBar==2 && (
                                                    <>
                                                    <br />
                                                    <span className="text-sm text-gray-600">Walking Distance</span>
                                                    </>
                                                    )}
                                                    {place.distanceBar==3 && (
                                                    <>
                                                    <br />
                                                    <span className="text-sm text-gray-600">Short Vehicle Distance</span>
                                                    </>
                                                    )}
                                                    {place.distanceBar==4 && (
                                                    <>
                                                    <br />
                                                    <span className="text-sm text-gray-600">Long Vehicle Distance</span>
                                                    </>
                                                    )}
                                                </li>
                                            )}
                                        </ul>
                                    </div>
                                    </Disclosure.Panel>
                                </>
                                )}
                            </Disclosure> 
                <Disclosure as="div" key="1" className="border-t border-gray-200 px-0 py-6">
                {({ open }) => (
                <>
                    <h3 className="-mx-2 -my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">Comments</span>
                            <span className="ml-6 flex items-center">
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
                        <CommentArea placeId={place?._id} owner={place?.user}/> 
                        </div>
                    </Disclosure.Panel>
                </>
                )}
                </Disclosure>   
                <Disclosure as="div" key="2" className="border-t border-gray-200 px-0 py-6">
                {({ open }) => (
                <>
                    <h3 className="-mx-2 -my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">Questions</span>
                            <span className="ml-6 flex items-center">
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
                        <QuestionArea placeId={place?._id} owner={place?.user}/>
                        </div>
                    </Disclosure.Panel>
                </>
                )}
                </Disclosure>    
                <Disclosure as="div" key="3" className="border-t border-gray-200 px-0 py-6">
                {({ open }) => (
                <>
                    <h3 className="-mx-2 -my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">Campsite Events</span>
                            <span className="ml-6 flex items-center">
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
                            <EventsArea  placeId={place?._id} owner={place?.user}/>
                        </div>
                    </Disclosure.Panel>
                </>
                )}
                </Disclosure>                   
            </div>                                            
        </div>
    </Layout>
)
}

export async function getServerSideProps(context) {
    const { id } = context.query;
    const response = await axios.get('https://www.campupp.com/api/campsite?id=' + id);
    return { props: { title:response.data.title, description:response.data.description} };
}