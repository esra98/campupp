import Layout from '@/components/Layout'
import Banner from '@/components/Banner'
import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import Link from "next/link";
import Script from 'next/script'
import Head from 'next/head'
import { FaUserAlt, FaReplyAll} from "react-icons/fa";
import ModalImage from "react-modal-image";
import { useSession} from "next-auth/react"
import Modal from 'react-modal';
import { IoMdClose } from "react-icons/io";
import { AiOutlineDelete,AiOutlineSend} from "react-icons/ai";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

export default function BlogPost() {
  const [board, setBoard] = useState([])
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false)
  const [anonymous,setAnonymous]= useState(false)
  const [replyText, setReplyText]= useState("")
  const router = useRouter();
  const {id} = router.query;
  const {data:session} = useSession();
  useEffect(()=>{
    if(!id){
        return;
    }else{
        axios.get('/api/community?id='+id).then(response => {
            setBoard(response.data);
          });
    }
  }, [id])
  function openReplyModal(){
    if (!session?.user.email) {
        toast.error('Bu özelliği kullanmak için giriş yapmanız gerekmektedir.')
        return
    }
    setIsReplyModalOpen(true)
  }
  function closeReplyModal(){
    setIsReplyModalOpen(false)
  }
  async function saveReply(){
    if(!session?.user?.email){
        toast.error('Bu özelliği kullanabilmek için öncelikle sitemize üye olmalısın. ')
      }
    if(replyText==""){
        toast.error('Metin kısmını boş bırakmayınız.')
        return
    }
    const data = {id:id, user:session?.user?.email, anonymous, replyText, isNewReply:true}
    const res = await axios.post('/api/community',data);
    if(res.data=="ok"){
        window.location.reload()
    }
    else{
        toast.error('Bir hata oluştu, lütfen daha sonra tekrar deneyiniz.')
    }
  }
  return(
    <Layout>
        <Head>
          <title>Kampçılara Sorun - Kamp Komünitesi</title>
          <meta name="description" content="Kamp arkadaşı, kamp malzemeleri ve çok daha fazlası. Mesaj panosu oluşturun ve diğer kampçılarla iletişime geçin"/>
        </Head>
        <ToastContainer />
        <Modal
              isOpen={isReplyModalOpen}
              onRequestClose={closeReplyModal}
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
                          p-3
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
                            onClick={closeReplyModal}
                          >
                            <IoMdClose size={18} />
                          </button>
                          <div className="text-lg font-semibold">
                            Yorumuzu Ekleyin
                          </div>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                          <div >
                            <div className="mt-2">
                              <fieldset>
                                <div className="space-y-6">
                                  <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                      <input
                                        onChange={(e) => setAnonymous(prevCheck => !prevCheck)} checked={anonymous}
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                      />
                                    </div>
                                    <div className="text-sm leading-6">
                                      <label htmlFor="comments" className="font-medium text-gray-900">
                                        Yorumunuzu anonim olarak eklemek istiyorsanız yandaki kutucuğu seçiniz.
                                      </label>
                                    </div> 
                                  </div>
                                </div>
                              </fieldset>
                            </div>
                            <div>
                              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 mt-3">
                                Yorum Metni
                              </label>
                              <textarea
                                rows={3}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder=" "
                                value={replyText} onChange={ev => setReplyText(ev.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        {/*footer*/}
                        <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-200 rounded-md ">
                                <button onClick={closeReplyModal} className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-300">
                                    <AiOutlineDelete className="mr-1.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                    Kapat
                                </button>
                                <button onClick={saveReply} className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-300">
                                    <AiOutlineSend className="mr-1.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                    Yorumunuzu Kaydedin
                                </button>
                            </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
        </Modal>
        <Script src="https://platform-api.sharethis.com/js/sharethis.js#property=649a64799fbe9100124b55e5&product=sticky-share-buttons&source=platform" async="async" strategy="lazyOnload"/>
        <div className="sharethis-sticky-share-buttons"></div>
        {board && (
        <>
        <main className="pb-24 bg-opacity-100 bg-white">
          <header className="bg-blend-darken bg-no-repeat bg-center bg-cover bg-[url(https://campupp.s3.eu-north-1.amazonaws.com/blog-bg.jpg)] w-full relative h-96">
            <div className="bg-opacity-50 bg-black w-full h-full left-0 top-0 absolute"></div>
            <div className="pl-4 pr-4 -translate-x-1/2 transform translate-y-[-50%] rotate-0 skew-x-0 skew-y-0 scale-x-1 scale-y-1 max-w-screen-xl w-full mx-auto left-1/2 top-20 absolute">
              <span></span>
            </div>
          </header>
          <div className="bg-opacity-100 bg-[rgb(31 41 55/var(--tw-bg-opacity))] p-9 md:px-20 mx-auto my-[-8rem] rounded-[0.25rem] justify-between flex z-5 relative">
            <article className="lg:flex w-full p-10 shadow text-base rounded-md leading-tight max-w-none bg-white">
              <div className="w-full">
                <nav className="flex justify-between mb-8" aria-label="Breadcrumb">
                  <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                      <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-black">
                        <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                        Anasayfa
                      </Link>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                        <Link href="/community" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-black">Komünite</Link>
                      </div>
                    </li>
                  </ol>
                  <div>
                    <button onClick={() => openReplyModal()}  className="p-2 gap-2 px-4 border flex rounded-xl  hover:bg-transparent shadow hover:shadow-md">
                        <FaReplyAll  className="mr-1.5 h-5 w-5 flex-shrink-0 mt-1 text-cc-primary" aria-hidden="true" />
                        <p className="font-semibold">Panoya Yorum Ekleyin</p>
                    </button>
                  </div>
                </nav>
                <div>
                    <div>
                        <h1 className="text-2xl leading-9 font-semibold text-green-800">{board.title}</h1>
                        <p>{board.detail}</p>
                        {board?.images?.length>0 && board?.images.map(image => (
                        <ModalImage
                            key={image}
                            className='h-48 border rounded-lg shadow mt-3'
                            small={image}
                            large={image}
                            alt="Hello World!"
                        />
                        ))}
                        <time class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">{board?.createdAt?.substring(0, 10)}</time>
                    </div>
                    <div className='mt-8'>
                        <ol class="relative border-l border-gray-200"> 
                            {board.replies?.length>0 && board.replies.map((reply, index) => (                 
                            <li class="mb-10 ml-6" key={board.replies.created}>            
                                <span class="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
                                    <FaUserAlt className="mr-1.5 h-5 w-5 flex-shrink-0 ml-1.5" aria-hidden="true" />
                                </span>
                                <div class="items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex">
                                    <time class="mb-1 text-xs font-normal text-gray-400 sm:order-last sm:mb-0">{reply.created.substring(0, 10)}</time>
                                    <div>
                                        <div class="text-sm font-semibold text-gray-500 italic">{reply.anonymous ? "Anonim" : reply.user}: </div>
                                        <div class="text-sm font-normal text-gray-500 ">{reply.replyText} </div>
                                    </div>
                                </div>
                            </li>
                            ))}
                        </ol>
                    </div>
                </div>
                
              </div>
            </article>
            <aside>

            </aside>
          </div>
        </main>        
        </>
        )}
        {!board && (
            <div>Araığınız yazı bulunamadı, kaldırılmış olabilir</div>
        )}
        <Banner />
    </Layout>
)
}