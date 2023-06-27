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
import { AiOutlineDelete} from "react-icons/ai";

export default function CampsiteAdd(){
  const {data:session} = useSession();  
    const [campsites, setCampsites] = useState([]);
    
    const [modalIsOpen, setIsOpen] = useState(false);
    const [remove, setRemove] = useState("");
    
    useEffect(() => {
      if (session) {
        axios.get('/api/favorites?user='+session.user.email).then(response => {
          setCampsites(response.data);
        });
      }
        
    }, [session]);
    const customStyles = {
    };  
    function openModal(campsite_id) {
      setIsOpen(true);
      setRemove(campsite_id)
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
          <div className="py-8 bg-opacity-100 bg-gray-100 px-16">
          
            <div role="list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 divide-y divide-gray-100">
              {campsites.length !== 0 && campsites.map((person) => (
                
                
              <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow mt-5">
                  <Link href="#">
                      <img class="rounded-t-lg object-cover h-64 w-full" src={person.images[0] ? person.images[0] :"https://campupp.s3.eu-north-1.amazonaws.com/Artboard+1.png" } alt="" />
                  </Link>
                  <div class="p-5">
                      <Link href="#">
                          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{person.title}</h5>
                      </Link>
                      <p class="mb-3 font-normal text-gray-700 h-8 truncate overflow-hidden">{person.description}</p>
                      <div className="block">
                        <button onClick={() => openModal(person._id)} class="inline-flex gap-2 items-center px-3 py-2 text-sm font-medium text-center text-white bg-cc-primary rounded-lg hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer">
                            Favorilerimden Çıkart
                            <AiOutlineDelete className="mr-1.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-3">
                        <Link href={"/campsite/view/"+person._id}  class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-cc-primary rounded-lg hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer">
                          Kamp Yeri Detay
                            <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </Link>

                      </div>
                  </div>
              </div>
              ))}
              
            </div>
            <div>
            {campsites.length == 0 && (
                <div class=" h-screen flex items-center">
                  <div class="text-center w-full">
                      <img
                          src="https://campupp.s3.eu-north-1.amazonaws.com/Artboard+1.png"
                          alt="kamp rezervasyon"
                          className="h-72 object-center mx-auto -mt-32"
                      />
                      <p className="mb-3 font-semibold">Favorilediğiniz Kamp Yeri Bulunamadı </p>
                      <Link href="/"  type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700">Kamp Yerlerini İnceleyin ve Favorilemeye Başlayın!</Link>
                  </div>
                </div>
              )}
            </div>    
          </div>
      </Layout>
      </>
      )
}