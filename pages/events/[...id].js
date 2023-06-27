import { useSession} from "next-auth/react"
import Layout from '@/components/Layout'
import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from 'react-image-gallery';
import { BiPhoneCall } from "react-icons/bi";
import { GrInstagram,GrMail } from "react-icons/gr";
import Modal from 'react-modal';
import { IoMdClose } from "react-icons/io";
import { FaFacebook, FaMapMarkerAlt,FaWhatsapp } from "react-icons/fa";
import { AiOutlineDelete,AiOutlineSend} from "react-icons/ai";
import {FaEdit} from "react-icons/fa";
import Script from 'next/script'

export default function CampsiteDetail() {
  const {data:session} = useSession();
  const [event, setEvent] = useState([])
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [reservations, setReservations] = useState([])
  const [eventImages, setEventImages] = useState([])
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [enrollName, setEnrollName] = useState("")
  const [enrollPhone, setEnrollPhone] = useState("")
  const [enrollEmail, setEnrollEmail] = useState("")
  const [enrollPersonCount, setEnrollPersonCount] = useState(1)
  const [consent, setConsent] = useState(false)
  const router = useRouter();
  const {id} = router.query;

  let images = [
  ];
  useEffect(()=>{
    if(!id){
        return;
    }else{
        axios.get('/api/events?id='+id).then(response => {
            setEvent(response.data);
          });
    }
  }, [id])
  useEffect(()=>{
    if(event?.images){  
        for (let i = 0; i < event?.images.length; i++) {
            const str = event?.images?.[i];
            const image = {
              original: str,
              thumbnail: str
            };
            images.push(image);
        }
        setEventImages(images);
    } 
  }, [event])
  useEffect(()=>{
    if(event && session){  
        if(event.user==session?.user?.email){
          axios.get('/api/reservation-event?eventId=' + event._id).then(response => {
            setReservations(response.data);
        });
        }
    } 
  }, [event, session])
  async function FavoriteEvent() {
    const user= session?.user?.email
    if(user==null){
      toast.error('Bu özelliği kullanabilmek için öncelikle sitemize üye olmalısın. ')
    }
    if(user && id){
      const res = await axios.put('/api/events', {user: user,favoritedEvent:id,favoriteEvent:true})
      if(res.data == "ok"){
        toast.success('Etkinlik favorilendi, etkinliklerim sayfasından favorilerinizi inceleyebilirsiniz.')
      }
    }
  }
  async function enrollEvent(){
    const user= session?.user?.email
    if(user==null){
      toast.error('Bu özelliği kullanabilmek için öncelikle sitemize üye olmalısın. ')
      return;
    }
    if(enrollName==""){
      toast.error('İsim kısmını boş bırakamazsınız.')
      return;
    }
    if(enrollPhone==""){
      toast.error('Telefon numarası kısmını boş bırakamazsınız.')
      return;
    }
    if(enrollPhone){
      const checkPhone = /^(((\+|00)?(90)|0)[-| ]?)?((5\d{2})[-| ]?(\d{3})[-| ]?(\d{2})[-| ]?(\d{2}))$/.test(enrollPhone)
      if(!checkPhone){
        toast.error('Geçerli bir telefon numarası giriniz.')
        return;
      }
    }
    if(enrollEmail){
      const checkMail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(enrollEmail)
      if(!checkMail){
        toast.error('Geçerli bir mail adresi giriniz.')
        return;
      }
    }
    if(consent==false){
      toast.error('Devam etmek için iletişim onayı kutucuğunu onaylamanız gerekmektedir.')
      return;
    }
    const res = await axios.post('/api/reservation-event', {user: user,event:id[0],eventOwner:event?.user,peopleCount:enrollPersonCount,eventTitle:event?.title,reservationName:enrollName,reservationTelephone:enrollPhone, reservationMail:enrollEmail,eventCampsite:event?.title})
    if(res.data == "ok"){
        toast.success('Etkinlik rezervasyon talebi oluşturuldu, etkinliklerim sayfasından inceleyebilirsiniz.')
    }
  }
  function closeEnrollModal() {
    setIsEnrollModalOpen(false);
  }
  function openDeleteEventModal(){
    if(document.getElementsByClassName('image-gallery')[0]){
      document.getElementsByClassName('image-gallery')[0].style.display = "none";
    }
    setIsDeleteModalOpen(true);
  }
  function closeDeleteEventModal() {
    if(document.getElementsByClassName('image-gallery')[0]){
      document.getElementsByClassName('image-gallery')[0].style.display = "block";
    }
    setIsDeleteModalOpen(false);
  }
  async function deleteEvent(){
    await axios.delete('/api/events?id='+event._id);
    toast.success('Etkinlik silindi')
    images?.map(filename=>{
        axios.post('/api/delete', {filename})
      })
    router.push('/');
  }
  return(
    <>
    <Script src="https://platform-api.sharethis.com/js/sharethis.js#property=649a64799fbe9100124b55e5&product=sticky-share-buttons&source=platform" async="async" strategy="lazyOnload"/>
    <Layout>
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
                                Etkinliğinizi Silin
                            </div>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                              <p>Etkinliğinizi silmek istediğinize emin misiniz? Etkinliğin favorileri ve yapılan rezervasyonlar talepleri kalıcı olarak silinecektir.</p>
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
                              onClick={()=>{deleteEvent()}}
                              className="bg-rose-900 w-full p-2 border  text-white rounded-2xl hover:bg-transparent hover:text-rose-900 hover:border hover:border-rose-900">
                              Yorumunuzu Silin
                            </button>

                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </>
        </Modal>
        <Modal
                isOpen={isEnrollModalOpen}
                onRequestClose={closeEnrollModal}
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
                                onClick={closeEnrollModal}
                            >
                                <IoMdClose size={18} />
                            </button>
                            <div className="text-lg font-semibold">
                              Etkinliğe Kayıt Olun
                            </div>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                              <div >
                                <div className="mt-3">
                                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    İsim Soyisim *
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      value={enrollName}
                                      onChange={ev => setEnrollName(ev.target.value)}
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    </div>
                                </div>
                                <div className="mt-3">
                                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Telefon Numarası *
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      value={enrollPhone}
                                      onChange={ev => setEnrollPhone(ev.target.value)}
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    </div>
                                </div>
                                <div className="mt-3">
                                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email Adresi
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      value={enrollEmail}
                                      onChange={ev => setEnrollEmail(ev.target.value)}
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    </div>
                                </div>
                                <div>
                                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 mt-3">
                                    Kaç kişilik kayıt yapmak istiyorsunuz?
                                  </label>
                                  <div className="mt-2">
                                    <input
                                        type="number" min="1" max="3"
                                        value={enrollPersonCount}
                                        onChange={ev => setEnrollPersonCount(ev.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                  </div>
                                </div> 
                                <div className="mt-2">
                                  <fieldset>
                                    <div className="space-y-6">
                                      <div className="relative flex gap-x-3">
                                        <div className="flex h-6 items-center">
                                          <input
                                            onChange={(e) => setConsent(prevCheck => !prevCheck)} checked={consent}
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                          />
                                        </div>
                                        <div className="text-sm leading-6">
                                          <label htmlFor="comments" className="font-medium text-gray-900">
                                            Verdiğim iletişim bilgileri ile etkinlik sahibi tarafından benimle iletişim kurulmasına izin veriyorum. *
                                          </label>
                                        </div> 
                                      </div>
                                    </div>
                                  </fieldset>
                                </div>
                              </div>
                            </div>
                            {/*footer*/}
                            <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-200 rounded-md ">
                                <button onClick={closeEnrollModal} className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-300">
                                    <AiOutlineDelete className="mr-1.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                    Kapat
                                </button>
                                <button onClick={enrollEvent} className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-300">
                                    <AiOutlineSend className="mr-1.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                    Kayıt Olun
                                </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </>
        </Modal>
        <ToastContainer />
        <div  className="grid grid-cols-1 lg:grid-cols-2 md:px-16 p-6">
          {event?.images?.length<1 && (
                  <div>
                    {event.category==="Movement" && event.images.length==0 && (
                        <img className="object-cover inset-0 z-[-10] h-full w-full absolute" src="https://campupp.s3.eu-north-1.amazonaws.com/events-movement.jpg" />
                      )}
                      {event.category==="Hiking"  && event.images.length==0 &&(
                        <img className="object-cover inset-0 z-[-10] h-full w-full absolute" src="https://campupp.s3.eu-north-1.amazonaws.com/events-hiking.jpg" />
                      )}
                      {event.category==="Spor Festivali"  && event.images.length==0 &&(
                        <img className="object-cover inset-0 z-[-10] h-full w-full absolute" src="https://campupp.s3.eu-north-1.amazonaws.com/events-sport-fest.jpg" />
                      )}
                      {event.category==="Müzik Festivali"  && event.images.length==0 &&(
                        <img className="object-cover inset-0 z-[-10] h-full w-full absolute" src="https://campupp.s3.eu-north-1.amazonaws.com/events-music-fest.jpg" />
                      )}
                      {event.category==="Outdoor" && event.images.length==0 &&(
                        <img className="object-cover inset-0 w-full" src="https://campupp.s3.eu-north-1.amazonaws.com/events-outdoor.jpg" />
                      )}
                      {event.category==="Yoga" && event.images.length==0 &&(
                        <img className="object-cover inset-0 z-[-10] h-full w-full absolute" src="https://campupp.s3.eu-north-1.amazonaws.com/events-yoga.jpg" />
                      )}
                      {event.category==="Masaj & Wellness" && event.images.length==0 &&(
                        <img className="object-cover inset-0 z-[-10] h-full w-full absolute" src="https://campupp.s3.eu-north-1.amazonaws.com/events-message.jpg" />
                      )}
                      {event.category==="Çocuklara Özel" && event.images.length==0  &&(
                        <img className="object-cover inset-0 z-[-10] h-full w-full absolute" src="https://campupp.s3.eu-north-1.amazonaws.com/events-kid.jpg" />
                      )}
                      {event.category==="Meditation & İnziva" && event.images.length==0  &&(
                        <img className="object-cover inset-0 z-[-10] h-full w-full absolute" src="https://campupp.s3.eu-north-1.amazonaws.com/events-meditation.jpg" />
                      )}
                      {event.category==="Fitness" && event.images.length==0  &&(
                        <img className="object-cover inset-0 z-[-10] h-full w-full absolute" src="https://campupp.s3.eu-north-1.amazonaws.com/events-fitness.jpg"/>
                      )}
                  </div>
          )}
          {event?.images?.length>0 && (
            <div className="p-6">
              <ImageGallery items={eventImages} />
            </div>
          )} 
          <div className="p-0 md:p-10">
              <div>
                  <div>
                    <div className="lg:flex lg:items-center lg:justify-between">
                        <div className="lg:col-span-2 ">
                            <nav className="flex my-8 md:mt-0" aria-label="Breadcrumb">
                              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                <li className="inline-flex items-center">
                                  <a href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-black">
                                    <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                    Anasayfa
                                  </a>
                                </li>
                                <li>
                                  <div className="flex items-center">
                                    <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                    <a href={"/campsite/view/"+event?.campsite} className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-black">Kamp Alanı</a>
                                  </div>
                                </li>
                                <li>
                                  <div className="flex items-center">
                                    <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                    <a href="/blog" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-black">Etkinlikler</a>
                                  </div>
                                </li>
                              </ol>
                            </nav>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl mt-5">{event?.title}</h1>
                            <div>
                                {event.contactPhone && (
                                <a href={'tel:'+event.contactPhone}  className="flex text-gray-600 h-8 mt-2 gap-1 hover:underline">
                                    <BiPhoneCall className="mr-1.5 h-6 w-6 flex-shrink-0 text-green-700" aria-hidden="true" />
                                    {event.contactPhone} 
                                </a>
                                )}
                            </div>
                            <div>
                                {event.contactEmail && (
                                <a href={'tel:'+event.contactEmail}  className="flex text-gray-600 h-8 mt-2 gap-1 hover:underline">
                                    <GrMail className="mr-1.5 h-6 w-6 flex-shrink-0 text-green-700" aria-hidden="true" />
                                    {event.contactEmail} 
                                </a>
                                )}
                            </div>
                            <div>
                                {event?.contactInstagram && (
                                <a href={event?.contactInstagram}  className="flex text-gray-600 h-8 gap-1 hover:underline" target="_blank">
                                    <GrInstagram className="mr-1.5 h-5 w-5 flex-shrink-0 mt-1 text-green-700" aria-hidden="true" />
                                    {event?.contactInstagram} 
                                </a>
                                )}
                            </div>
                            <div>
                                {event?.contactFacebook && (
                                <a href={event?.contactFacebook}  className="flex text-gray-600 h-8 gap-1 hover:underline" target="_blank">
                                    <FaFacebook className="mr-1.5 h-5 w-5 flex-shrink-0 mt-1 text-green-700" aria-hidden="true" />
                                    {event?.contactFacebook} 
                                </a>
                                )}
                            </div>
                            <p className="my-4 text-gray-500">
                                {event?.description}
                            </p>
                            {event?.price!==0 && (
                            <div className="flex gap-5">
                              <div className="px-5 py-1 shadow rounded-md w-40 mt-3 hover:shadow-lg">
                                  <dd className="font-semibold text-3xl leading-9">{event?.price} ₺</dd>
                              </div>
                            </div>
                            )}
                            {event?.price==0 && (
                            <div className="flex gap-5">
                              <div className="px-5 py-1 shadow rounded-md w-40 mt-3 hover:shadow-lg">
                                  <dd className="font-semibold leading-9">Ücretsiz Etkinlik</dd>
                              </div>
                            </div>
                            )}
                            <div className="block md:flex gap-2">
                                <button
                                    onClick={()=>{setIsEnrollModalOpen(true)}}
                                    className="bg-green-900 p-2 px-4 border shadow text-white rounded-xl mt-5 hover:shadow-xl">
                                    Etkinliğe Kayıt Olun
                                </button>
                                <button
                                    onClick={()=>{FavoriteEvent()}}
                                    className="p-2 gap-2 px-4 border flex rounded-xl mt-5 hover:bg-transparent shadow hover:shadow-md">
                                    <svg aria-hidden="true" className="w-5 h-5 text-yellow-400 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <p className="font-semibold">Etkinliği Favorileyin</p>
                                </button>
                                {event?.contactPhone && (
                                <a
                                    className="p-2 w-32 px-4 border flex rounded-xl mt-5 hover:bg-transparent shadow hover:shadow-md"
                                    href={"https://api.whatsapp.com/send?phone="+event.contactPhone+"&amp;text=Merhaba," +event.title + "etkinliği ile ilgili bilgi almak istiyorum."} target="_blank" rel="nofollow" title="WhatsApp ile Şimdi Yaz">
                                    <FaWhatsapp className="mr-1.5 h-5 w-5 flex-shrink-0 mt-1 text-green-700" aria-hidden="true" />
                                    <p className="font-semibold">WhatsApp</p>
                                </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>          
              </div>
          </div>    
        </div>
        <div className="px-0 md:px-16 pb-6">
            {event.user==session?.user?.email && (
            <div className="px-4">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold leading-7 mb-3 text-gray-900 sm:tracking-tight">
                  Etkinlik Yöneticisi Alanı
                </h2>
              </div>
              <div className="gap-4">
                <div className="flex gap-4">
                  <a
                    href={'/events/edit/'+ event._id}
                    className="p-2 cursor-pointer gap-2 px-4 border flex w-64 rounded-xl mt-5 hover:bg-transparent shadow hover:shadow-md">
                      <FaEdit className="h-5 w-5 flex-shrink-0 mt-1 text-red-700" aria-hidden="true" />
                      <p className="font-semibold">Etkinliğinizi Düzenleyin</p>
                  </a>
                  <a
                    onClick={openDeleteEventModal}
                    className="p-2 gap-2 px-4 border flex rounded-xl mt-5 hover:bg-transparent shadow hover:shadow-md">
                      <AiOutlineDelete className="h-5 w-5 flex-shrink-0 mt-1 text-red-700" aria-hidden="true" />
                      <p className="font-semibold">Etkinliğinizi Silin</p>
                  </a>
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-l font-bold mt-5 leading-7 mb-3 text-gray-900 sm:tracking-tight">
                    Etkinlik Rezervasyon Talepleri
                  </h2>
                  <div className="overflow-scroll">
                  <table className="overflow-scroll">
                    <thead>
                      <tr>
                        <th scope="col" className="arv ati atx avf avv awb axq cfy">İsim Soyisim</th>
                        <th scope="col" className="ara arv avf avv awb axq">Telefon</th>
                        <th scope="col" className="ara arv avf avv awb axq">Email</th>
                        <th scope="col" className="ara arv avf avv awb axq">Kişi Sayısı</th>
                        <th scope="col" className="ara arv avf avv awb axq">Rezervasyon Talebini Oluşturduğu Tarih</th>
                      </tr>
                    </thead>
                    {reservations == 0 && (
                      <tbody className="abx acb border-t  border-gray-200">
                      <tr>
                        <td className="adh arx ati atx avv avz axq cfy"> Bu etkinlik için rezervasyon talebi bulunamadı.</td>
                      </tr>  
                    </tbody>   
                    )}
                    {reservations !== 0 && reservations.map((request) => (
                      <tbody className="abx acb border-t  border-gray-200">
                        <tr>
                          <td className="adh arx ati atx avv avz axq cfy">{request?.reservationName}</td>
                          <td className="adh ara arx avv axm">{request?.reservationTelephone}</td>
                          <td className="adh ara arx avv axm">{request?.reservationMail}</td>
                          <td className="adh ara arx avv axm">{request?.peopleCount}</td>
                          <td className="adh ara arx avv axm">{request?.createdAt.substring(0, 10)}</td>
                        </tr>  
                      </tbody>                    
                      ))}
                  </table>
                  </div>
                </div>
                
              </div>
            </div>
            )}
        </div>
    </Layout>

    </>
    
)
}
