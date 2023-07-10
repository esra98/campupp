import Layout from "@/components/Layout";
import axios from "axios";
import { FaComment } from "react-icons/fa";
import { useSession } from "next-auth/react"
import Banner from '@/components/Banner'
import Script from 'next/script'
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import Head from 'next/head'
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { IoMdClose } from "react-icons/io";
import { AiOutlineDelete} from "react-icons/ai";
import Link from "next/link";
const categories = [
  'Kamp arkadaşı arama',
  'Kamp alanı hakkında fikir alma',
  'Kamp malzemeleri hakkında fikir alma',
  'Kamp malzemeleri değiş-tokuş ve takas'
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Community() {
  const {data:session} = useSession();
  const [boards, setBoards]= useState([])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);
  const [searchValueCityFilter, setSearchValueCityFilter] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const [deletedBoardId,setDeletedBoardId] = useState("");
  const [deletedImages,setDeletedImages] = useState("");
  const handleSearch = (searchValueCityFilter) => {
    setSearchValueCityFilter(searchValueCityFilter);
  };

  useEffect(() => {
    async function fetchCampsites(page = 1, limit = 20) {
      setIsLoading(true);
      try {
        let url = `/api/community?page=${page}&limit=${limit}`;

        if (selectedCities.length > 0) {
          const citiesQueryParam = selectedCities.join(',');
          url += `&categories=${citiesQueryParam}`;
        }


        const response = await fetch(url);
        const data = await response.json();

        if (page === 1 || selectedCities.length > 0) {
          setBoards(data.boards);
        } else {
          setBoards(prevCampsites => [...prevCampsites, ...data.boards]);
        }
      } catch (error) {
        console.error('Error fetching campsites:', error);
      }
      setIsLoading(false);
    }

    fetchCampsites(currentPage);
  }, [currentPage, selectedCities]);
  

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleCitySelect = (city) => {
    const updatedCities = selectedCities.includes(city)
      ? selectedCities.filter(selectedCity => selectedCity !== city)
      : [...selectedCities, city];
    setSelectedCities(updatedCities);
    setCurrentPage(1);
    setBoards([]);
  };

  const handleCityDeselect = (place) => {
    setSelectedCities((prevSelectedCities) =>
      prevSelectedCities.filter((city) => city !== place)
    );
  };

  const handleFilterOptionChange = (option, value) => {
    setFilterOptions(prevOptions => ({
      ...prevOptions,
      [option]: value,
    }));
    setCurrentPage(1);
    setCampsites([]);
  };
  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function deleteBoard(){
    await axios.delete('/api/community?id='+deletedBoardId);
    toast.success('Mesaj panonuz silindi')
    deletedImages?.map(filename=>{
        axios.post('/api/delete', {filename})
    })
    setBoards(boards.filter(item => item._id !== deletedBoardId))
    setIsDeleteModalOpen(false)
  }
  return (
    <Layout>
      <Head>
          <title>Kampçılara Sorun - Kamp Komünitesi</title>
          <meta name="description" content="Kamp arkadaşı, kamp malzemeleri ve çok daha fazlası. Mesaj panosu oluşturun ve diğer kampçılarla iletişime geçin"/>
        </Head>
        <Modal
                isOpen={isDeleteModalOpen}
                onRequestClose={closeDeleteModal}
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
                        z-150 
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
                                onClick={closeDeleteModal}
                            >
                                <IoMdClose size={18} />
                            </button>
                            <div className="text-lg font-semibold">
                                Mesaj Panonuzu Silin
                            </div>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                              <p>Mesaj panonuzu silmek istediğinize emin misiniz?</p>
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
                              onClick={()=>{deleteBoard(deletedBoardId)}}
                              className="bg-rose-900 w-full p-2 border  text-white rounded-2xl hover:bg-transparent hover:text-rose-900 hover:border hover:border-rose-900">
                              Panoyu Silin
                            </button>

                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </>
        </Modal>
        <Script src="https://platform-api.sharethis.com/js/sharethis.js#property=649a64799fbe9100124b55e5&product=sticky-share-buttons&source=platform" async="async" strategy="lazyOnload"/>
        <main className="pb-24 bg-opacity-100 bg-white">
          <header className="bg-blend-darken bg-no-repeat bg-center bg-cover bg-[url(https://campupp.s3.eu-north-1.amazonaws.com/blog-bg.jpg)] w-full relative h-96">
            <div className="bg-opacity-50 bg-black w-full h-full left-0 top-0 absolute"></div>
            <div className="pl-4 pr-4 -translate-x-1/2 transform translate-y-[-50%] rotate-0 skew-x-0 skew-y-0 scale-x-1 scale-y-1 max-w-screen-xl w-full mx-auto left-1/2 top-20 absolute">
              <span></span>
            </div>
          </header>
          <div className="bg-opacity-100 bg-[rgb(31 41 55/var(--tw-bg-opacity))] p-3 md:p-9 md:px-20 mx-auto my-[-8rem] rounded-[0.25rem] justify-between flex z-5 relative">
            <article className="w-full p-0 md:p-10 shadow text-base rounded-md leading-tight max-w-none bg-white">
              <div className="w-full flex justify-end">
                
              </div>
              <div className="bg-white">
                <div>
                  {/* Mobile filter dialog */}
                  <Transition.Root show={mobileFiltersOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40" onClose={setMobileFiltersOpen}>
                      <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                      </Transition.Child>

                      <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                          as={Fragment}
                          enter="transition ease-in-out duration-300 transform"
                          enterFrom="translate-x-full"
                          enterTo="translate-x-0"
                          leave="transition ease-in-out duration-300 transform"
                          leaveFrom="translate-x-0"
                          leaveTo="translate-x-full"
                        >
                          <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                            <div className="flex items-center justify-between px-4">
                              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                              <button
                                type="button"
                                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                                onClick={() => setMobileFiltersOpen(false)}
                              >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                              </button>
                            </div>

                            {/* Filters */}
                            <form className="mt-4 border-t border-gray-200">
                            <Disclosure as="div"  className="border-t border-gray-200 px-4 py-6">
                                  {({ open }) => (
                                    <>
                                      <h3 className="-mx-2 -my-3 flow-root">
                                        <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                          <span className="font-medium text-gray-900">Kategoriler</span>
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
                                        <div className="space-y-6  overflow-auto">
                                          {categories
                                            .filter((cityFilter) =>
                                              cityFilter.toLocaleLowerCase('tr-TR').includes(searchValueCityFilter.toLocaleLowerCase('tr-TR'))
                                            )
                                            .map((cityFilter) => (
                                              <div key={cityFilter} className="flex items-center">
                                                <input
                                                  type="checkbox"
                                                  checked={selectedCities.includes(cityFilter)}
                                                  onChange={() => handleCitySelect(cityFilter)}
                                                />
                                                <label className="ml-3 min-w-0 flex-1 text-gray-500">
                                                  {cityFilter}  
                                                </label>
                                                
                                              </div>
                                            ))}
                                        </div>
                                      </Disclosure.Panel>
                                    </>
                                  )}
                                </Disclosure>
                            </form>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </Dialog>
                  </Transition.Root>

                  <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="md:flex items-baseline justify-between border-b border-gray-200 pb-6">
                      <div>
                        <h1 className="text-3xl font-semibold tracking-tight text-green-800">Mesaj Panoları</h1>
                        <p className="mt-2 font-light text-gray-500 sm:text-xl dark:text-gray-400">Aklınıza takılan konularda mesaj panosu oluşturun ve kampçı komünitesinden fikir alın.</p>        
                      </div>                  
                      <div className="flex items-center mt-5">
                        <div>
                            <Link href="/community/new" className="p-2 gap-2 px-4 border flex rounded-xl  hover:bg-transparent shadow hover:shadow-md">
                            <FaComment className="mr-1.5 h-5 w-5 flex-shrink-0 mt-1 text-cc-primary" aria-hidden="true" />
                            <p className="font-semibold">Yeni Pano Oluştur</p>
                            </Link>
                        </div>
                        <button
                          type="button"
                          className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 flex"
                          onClick={() => setMobileFiltersOpen(true)}
                        >
                          <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                          <span className="ml-1">Filtele</span>
                        </button>
                      </div>
                    </div>
                    <section aria-labelledby="products-heading" className="pb-24 pt-6">

                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                      <div className="lg:col-span-4">
                        <div className="bg-white">
                          {boards?.length !==0 && (
                          <div className="mx-auto max-w-2xl px-0 md:px-4 md:py-16 sm:py-24 lg:max-w-7xl lg:px-8">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
                              {boards?.map((board) => (
                                <div key={board._id} href={'/community/'+ board._id} className="group overflow-hidden rounded-xl shadow-md pt-3">
                                  <span class="bg-green-100 text-green-800 text-sm font-medium shadow mr-2 px-2.5 py-1 rounded ml-2">{board.category}</span>
                                  <div class="max-w-sm p-6 ">
                                  <div className="italic text-xs text-gray-700">{board.anonymous ? "anonim" : board.user}:</div>
                                      <a href="#">
                                          <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900">{board.title}</h5>
                                      </a>
                                      <p class="mb-3 font-normal text-gray-700">{board.detail}</p>
                                      <a href={"/community/" + board._id} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                                          İncele
                                          <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                          </svg>
                                      </a>
                                      {board.replies?.length>0 && (
                                        <p className="mt-2 text-xs text-gray-700">{board.replies?.length} kişi bu panoya katıldı</p>
                                      )}
                                  </div>
                                  {session?.user?.email==board?.user && (
                                  <div className='grid justify-items-end w-full'>
                                    <div className='flex gap-2 w-full'>
                                      <button onClick={()=>{setIsDeleteModalOpen(true);setDeletedBoardId(board._id);setDeletedImages(board.images)}}  className="p-2 w-full text-red-700 text-center gap-2 px-4 border flex hover:bg-transparent shadow hover:shadow-md">
                                        <AiOutlineDelete className="h-5 w-5 flex-shrink-0  " aria-hidden="true" />
                                        <div className="font-semibold">Oluşturduğunuz panoyu silin</div>
                                      </button>
                                    </div>
                                  </div>    
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                          )}
                          <div>  
                              {boards?.length==0 && (
                                <div className="pt-32 flex items-center mt-5">
                                  <div className="text-center w-full">
                                      <img
                                          src="https://campupp.s3.eu-north-1.amazonaws.com/Artboard+1.png"
                                          alt="kamp rezervasyon"
                                          className="h-72 object-center mx-auto -mt-32"
                                      />
                                      <p className="mb-3 font-semibold">Aradığınız Kriterlere Göre Bir Mesaj Panosu Bulunamadı </p>
                                      <p className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg ">Filtrelerden bazılarını temizleyerek yeniden deneyebilirsiniz</p>
                                  </div>
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='text-center'>
                      <button className='py-2.5 px-5 mr-2 mb-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-cc-primary focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700' onClick={handleLoadMore} disabled={isLoading}>
                        {isLoading ? 'Yükleniyor...' : 'Devamını Yükle'}
                      </button>
                    </div>
                    </section>
                  </main>
                </div>
              </div>
            </article>
          </div>
        </main> 
        <Banner />
    </Layout>
  );
}