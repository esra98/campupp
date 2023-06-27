import CampsiteForm from "@/components/CampsiteForm";
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react"
import {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";
import Modal from 'react-modal';
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineDelete,AiOutlineDoubleRight } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";

export default function CampsiteAdd(){
  const {data:session} = useSession();  
    const [enrolledEvents, setEnrolledEvents] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [removeEnrolledId, setRemoveEnrolledId] = useState("");

    const [favoriteEvents, setFavoriteEvents] = useState([]);
    const [modalDeleteFavoriteOpen, setIsModalDeleteFavoriteOpen] = useState(false);
    const [removeFavoritedId, setRemoveFavoritedId] = useState("");

    const [myEvents, setMyEvents] = useState([]);
    
    useEffect(() => {
      if (session) {
        axios.get('/api/reservation-event?user='+session.user.email).then(response => {
            setEnrolledEvents(response.data);
        });
        axios.get('/api/events?userFavorite='+session.user.email).then(response => {
            setFavoriteEvents(response.data);
        });
        axios.get('/api/events?user='+session.user.email).then(response => {
            setMyEvents(response.data);
        });
      }
        
    }, [session]);
    const customStyles = {  
    };  
    function openModal(campsite_id) {
      setIsOpen(true);
      setRemoveEnrolledId(campsite_id)
    }
    function closeModal() {
        setIsOpen(false);
      }
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      
    }
    function openDeleteFavoriteModal(campsite_id) {
        setIsModalDeleteFavoriteOpen(true);
        setRemoveFavoritedId(campsite_id)
      }
      function closeDeleteFavoriteModal() {
        setIsModalDeleteFavoriteOpen(false);
        }
    
    async function removeEnrolled() {
        const res = await axios.delete('/api/reservation-event?id='+removeEnrolledId);
        if(res.data == "ok"){
            window.location.reload()
        }else{
            toast.error('Başarısız, lütfen daha sonra tekrar deneyin')
        }
    }
    async function removeFavoriteEvent() {
        if(session.user.email){
            const res = await axios.put('/api/events', {deletedId:removeFavoritedId,user:session.user.email});
            if(res.data == "ok"){
                window.location.reload()
            }else{
                toast.error('Başarısız, lütfen daha sonra tekrar deneyin')
            }
        }
    }
    if(!session){
      return(
          <>
              Bu özelliği kullanabilmek için giriş yapmalısınız.
          </>
      )
  }
    return (
      <>
      <Layout>
          <ToastContainer />
          <Modal
              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
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
                    h-full 
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
                            onClick={closeModal}
                          >
                            <IoMdClose size={18} />
                          </button>
                          <div className="text-lg font-semibold">
                            
                          </div>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                          Bu etkinlik için yaptığınız kaydı silmek istediğinize emin misiniz?
                        </div>
                        {/*footer*/}
                        <div className="flex flex-col gap-2 p-6">
                          <div 
                            className="
                              flex 
                              flex-row 
                              items-center 
                              gap-4 
                              w-full
                            "
                          >
                            <button
                              onClick={()=>{removeEnrolled()}}
                              className="bg-rose-900 w-full p-2 border  text-white rounded-2xl mt-5 hover:bg-transparent hover:text-rose-900 hover:border hover:border-rose-900">
                              Kaydı Sil
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
              isOpen={modalDeleteFavoriteOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeDeleteFavoriteModal}
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
                    h-full 
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
                            onClick={closeDeleteFavoriteModal}
                          >
                            <IoMdClose size={18} />
                          </button>
                          <div className="text-lg font-semibold">
                            
                          </div>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                          Bu etkinliği favorilerinizden silmek istediğinize emin misiniz?
                        </div>
                        {/*footer*/}
                        <div className="flex flex-col gap-2 p-6">
                          <div 
                            className="
                              flex 
                              flex-row 
                              items-center 
                              gap-4 
                              w-full
                            "
                          >
                            <button
                              onClick={()=>{removeFavoriteEvent()}}
                              className="bg-rose-900 w-full p-2 border  text-white rounded-2xl mt-5 hover:bg-transparent hover:text-rose-900 hover:border hover:border-rose-900">
                              Kaydı Sil
                            </button>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
          </Modal>
          <div className="-mt-16">
            {enrolledEvents.length == 0 && favoriteEvents.length == 0 && (
            <div class=" h-screen flex items-center">
              <div class="text-center w-full">
                  <img
                      src="https://campupp.s3.eu-north-1.amazonaws.com/Artboard+1.png"
                      alt="kamp rezervasyon"
                      className="h-72 object-center mx-auto -mt-32"
                  />
                  <p className="mb-3 font-semibold">Favorilediğiniz ya da Kayıt Olduğunuz Etkinlik Bulunamadı </p>
                  <a href="/" type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700">Etkinlikleri inceleyin, favorileyin, kayıt olun!</a>
              </div>
            </div>
            )}
          </div>
          {enrolledEvents.length !== 0 && (
            <div className="py-8 sm:px-16 px-0"> 
            {enrolledEvents.length !== 0 && (
                  <h3 className="font-bold leading-7 mb-3 text-center text-gray-900 sm:truncate sm:text-xl sm:tracking-tight">
                  Yaptığım Etkinlik Rezervasyon Talepleri
              </h3>
            )}
            <div role="list" className="lg:grid-cols-3 max-w-none mx-0 gap-8 py-10 grid-rows-auto grid px-16 relative">
            {enrolledEvents.length !== 0 && enrolledEvents.map((event) => (
              <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
                  <div className="flex flex-col p-5">
                      <h5 className="font-bold leading-7 mb-1">{event.eventTitle}</h5>
                      <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">Kayıt İsmi</p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{event.reservationName}</p>
                      </div>
                      <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">İletişim Telefon Numarası</p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{event.reservationTelephone}</p>
                      </div>
                      <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">İletişim Email Adresi</p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{event.reservationMail}</p>
                      </div>
                      <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">Kayıt Talebi Yapıan Kişi Sayısı</p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{event.peopleCount}</p>
                      </div>
                      <div className="flex mt-4 space-x-3 md:mt-6">
                          <a onClick={()=>openModal(event._id)} className="inline-flex cursor-pointer items-center px-4 py-2 text-sm font-medium text-center text-white bg-rose-700 rounded-lg hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-blue-300">Rezervasyonu Sil</a>
                          <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200">Etkinliği İncele</a>
                      </div>
                  </div>
              </div>
            ))}
            </div>
        </div>
          )}
        
          <div className="py-8 sm:px-16 px-0"> 
              {favoriteEvents.length !== 0 && (
                    <h3 className="my-16 text-center font-bold leading-7 mb-3 text-gray-900 sm:truncate sm:text-xl sm:tracking-tight">
                    Favorilediğim Etkinlikler
                </h3>
              )}
              <div role="list" className="lg:grid-cols-3 max-w-none mx-0 gap-8 grid-rows-auto grid px-16 relative">
              {favoriteEvents.length !== 0 && favoriteEvents.map((event) => (
                <div>
                    <a href={'/events/'+ event._id} className='pt-80 pb-8 px-8 bg-gray-900 rounded-lg overflow-hidden justify-end flex flex-col isolate relative shadow-lg'>
                    {event.category==="Movement" && event.images.length==0 && (
                    <img class="object-cover inset-0 z-[-10] h-full w-full absolute" src="https://campupp.s3.eu-north-1.amazonaws.com/events-movement.jpg" />
                    )}
                    {event.category==="Hiking"  && event.images.length==0 &&(
                    <img class="object-cover inset-0 z-[-10] h-full w-full absolute" src="https://campupp.s3.eu-north-1.amazonaws.com/events-hiking.jpg" />
                    )}
                    {event.category==="Spor Festivali"  && event.images.length==0 &&(
                    <img class="object-cover inset-0 z-[-10] h-full w-full absolute" src="https://campupp.s3.eu-north-1.amazonaws.com/events-sport-fest.jpg" />
                    )}
                    {event.category==="Müzik Festivali"  && event.images.length==0 &&(
                    <img class="object-cover inset-0 z-[-10] h-full w-full absolute" src="https://campupp.s3.eu-north-1.amazonaws.com/events-music-fest.jpg" />
                    )}
                    {event.category==="Outdoor" && event.images.length==0 &&(
                    <img class="object-cover inset-0 z-[-10] h-full w-full absolute" src="https://campupp.s3.eu-north-1.amazonaws.com/events-outdoor.jpg" />
                    )}
                    {event.category==="Yoga" && event.images.length==0 &&(
                    <img class="object-cover inset-0 z-[-10] h-full w-full absolute" src="https://campupp.s3.eu-north-1.amazonaws.com/events-yoga.jpg" />
                    )}
                    {event.category==="Masaj & Wellness" && event.images.length==0 &&(
                    <img class="object-cover inset-0 z-[-10] h-full w-full absolute" src="https://campupp.s3.eu-north-1.amazonaws.com/events-message.jpg" />
                    )}
                    {event.category==="Çocuklara Özel" && event.images.length==0  &&(
                    <img class="object-cover inset-0 z-[-10] h-full w-full absolute" src="https://campupp.s3.eu-north-1.amazonaws.com/events-kid.jpg" />
                    )}
                    {event.category==="Meditation & İnziva" && event.images.length==0  &&(
                    <img class="object-cover inset-0 z-[-10] h-full w-full absolute" src="https://campupp.s3.eu-north-1.amazonaws.com/events-meditation.jpg" />
                    )}
                    {event.category==="Fitness" && event.images.length==0  &&(
                    <img class="object-cover inset-0 z-[-10] h-full w-full absolute" src="https://campupp.s3.eu-north-1.amazonaws.com/events-fitness.jpg"/>
                    )}
                    {event.images.length!==0  &&(
                    <img class="object-cover inset-0 z-[-10] h-full w-full absolute" src={event.images[0]}/>
                    )}
                    <div class="absolute inset-0 z-[-10] amj amv ani"></div>
                    <div class="absolute inset-0 z-[-10] rounded-lg bbo bbs bcj"></div>
                    <div className='text-white leading-6 font-medium text-base m-0 mt-3 absolute w-full'>
                    </div>
                    <button className="absolute top-3 right-5 text-white bg-yellow-300 py-2 px-3 bg-opacity-80 rounded-xl cursor-pointer flex">
                    {event.category}
                    </button>
                    {event.price=="0" && (
                    <button className="absolute top-3 text-white bg-green-500 py-2 px-3 bg-opacity-80 rounded-xl cursor-pointer flex">
                        Ücretsiz
                    </button>
                    )}
                    <div className='absolute bottom-0'>
                        <div className='flex'>
                            <MdDateRange className="mr-1.5 h-5 w-5 flex-shrink-0 mt-1 text-white" aria-hidden="true" />
                            <time datetime="2020-02-12" class="text-white mb-4">{event.startDate.substring(0, 10)} / {event.endDate.substring(0, 10)}</time>
                        </div>
                        <div className='mt-2'>
                            <h3 className='text-white leading-6 font-medium text-base mt-5 absolute bottom-20 w-full'>
                            <a>
                                <span className='inset-0 absolute'>{event.title}</span>
                            </a>
                            </h3>
                        </div>
                    </div>
                    </a>
                    <button onClick={()=>{openDeleteFavoriteModal(event._id)}} className="mt-4 m-auto text-white bg-rose-700 hover:bg-rose-800 py-2 px-3 bg-opacity-80 rounded-xl cursor-pointer flex">
                        Favorilerden Çıkart
                    </button>
                </div>
                
              ))}
              </div>
          </div>
          
          
          
      </Layout>
      </>
      )
}