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

export default function CampsiteAdd(){
  const {data:session} = useSession();  
    const [campsites, setCampsites] = useState([]);
    const [events, setEvents] = useState([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [remove, setRemove] = useState("");
    
    useEffect(() => {
      if (session) {
        axios.get('/api/favorite-event?user='+session.user.email).then(response => {
            setEvents(response.data);
        });
      }
        
    }, [session]);
    const customStyles = {
    };  
    function openModal(event_id) {
      setIsOpen(true);
      setRemove(event_id)
    }
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      
    }
  
    function closeModal() {
      setIsOpen(false);
    }
    
    async function removeFavorites() {
      await axios.delete('/api/favorites?user='+session?.user?.email+'&'+'campsite='+remove);
      toast.success('Kamp yeri favorilerden çıkartıldı')
      setCampsites(campsites.filter(item => item._id !== remove))
      closeModal()
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
                          Bu kamp yerini favorilerden silmek istediğinize emin misiniz?
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
                              onClick={removeFavorites}
                              className="bg-rose-900 w-full p-2 border  text-white rounded-2xl mt-5 hover:bg-transparent hover:text-rose-900 hover:border hover:border-rose-900">
                              Favorilerden Çıkart
                            </button>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
          </Modal>
          <div className="p-10">
            <div className="grid max-w-md gap-10 row-gap-8 lg:max-w-screen-lg sm:row-gap-10 lg:grid-cols-2 xl:max-w-screen-lg sm:mx-auto">
              {events?.length>0 && events.map(event => (
                  <li key={event._id} className="flex justify-between gap-x-6 py-5 border rounded-lg p-10 mt-5">
                    <div className="flex flex-col transition duration-300">
                      <div className="relative w-full h-48">
                        {event.images[0] && (
                          <img
                          src={event.images[0]}
                          className="object-cover w-full h-full rounded-t"
                          alt="Plan"
                        />
                        )}
                        
                      </div>
                      <div className="flex flex-col justify-between flex-grow">
                        <div>
                          <div className="text-lg font-semibold">{event.title}</div>
                          <p className="text-sm text-gray-900">
                              {event.description.length > 100 ? event.description.substring(0, 100) + "...": event.description }
                          </p>
                          {event.price>0 && (
                            <div className="mt-1 mb-4 mr-1 font-bold">
                            {event.price} ₺
                          </div>
                          )}
                          {event.price==0 && (
                            <div className="mt-1 mb-4 mr-1 font-bold">
                            Ücretsiz
                          </div>
                          )}
                          
                        </div>
                        <button
                          href={"/campsite/"+event?.campsite}
                          className="bg-green-900 w-24 p-2 border  text-white rounded-2xl mt-3 hover:bg-transparent hover:text-green-900 hover:border hover:border-green-900">
                          İnceleyin
                        </button>
                      </div>
                    </div>
                  </li>
                  ))} 
              {events.length == 0 && (
                <div className="flex items-center justify-center h-screen -mt-20">
                  <div className="bg-gray-100 p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold mb-4">Favorileriniz boş</h1>
                    <p className="text-gray-700">Kamp yerlerini gezip beğendiğiniz etkinliklerini favorilemeye başlayın!</p>
                  </div>
                </div>
              )}
            </div>
          </div>
      </Layout>
      </>
      )
}