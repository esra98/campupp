import { useEffect, useState, Fragment } from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { FunnelIcon, MinusIcon, PlusIcon, MapIcon} from '@heroicons/react/20/solid'
import Head from 'next/head';
import Layout from '@/components/Layout';
import Slider from '@/components/Slider';
import Map from '@/components/Map';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import Script from 'next/script'
import Link from 'next/link';
import axios from "axios";

const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
const cities = [
  'Adana',
  'Adıyaman',
  'Afyonkarahisar',
  'Ağrı',
  'Amasya',
  'Ankara',
  'Antalya',
  'Ardahan',
  'Artvin',
  'Aydın',
  'Balıkesir',
  'Bartın',
  'Batman',
  'Bayburt',
  'Bilecik',
  'Bingöl',
  'Bitlis',
  'Bolu',
  'Burdur',
  'Bursa',
  'Çanakkale',
  'Çankırı',
  'Çorum',
  'Denizli',
  'Diyarbakır',
  'Düzce',
  'Edirne',
  'Elazığ',
  'Erzincan',
  'Erzurum',
  'Eskişehir',
  'Gaziantep',
  'Giresun',
  'Gümüşhane',
  'Hakkâri',
  'Hatay',
  'Iğdır',
  'Isparta',
  'İstanbul',
  'İzmir',
  'Kahramanmaraş',
  'Karabük',
  'Karaman',
  'Kars',
  'Kastamonu',
  'Kayseri',
  'Kırıkkale',
  'Kırklareli',
  'Kırşehir',
  'Kilis',
  'Kocaeli',
  'Konya',
  'Kütahya',
  'Malatya',
  'Manisa',
  'Mardin',
  'Mersin',
  'Muğla',
  'Muş',
  'Nevşehir',
  'Niğde',
  'Ordu',
  'Osmaniye',
  'Rize',
  'Sakarya',
  'Samsun',
  'Siirt',
  'Sinop',
  'Sivas',
  'Şanlıurfa',
  'Şırnak',
  'Tekirdağ',
  'Tokat',
  'Trabzon',
  'Tunceli',
  'Uşak',
  'Van',
  'Yalova',
  'Yozgat',
  'Zonguldak'
]
function CampsiteList() {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState("");
  const [campsites, setCampsites] = useState([]);
  const [cityCounts, setCityCounts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [isMapOpen, setIsMapOpen] = useState(false)
  const [searchValueCityFilter, setSearchValueCityFilter] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    isNearSea: false,
    isNearLake: false,
    isNearForest: false,
    isPresentHotWater: false,
    isPresentWifi: false,
    isFriendlyAlcohol: false,
  });
  const handleSearch = (searchValueCityFilter) => {
    setSearchValueCityFilter(searchValueCityFilter);
  };

  useEffect(() => {
    async function fetchCampsites(page = 1, limit = 20) {
      setIsLoading(true);
      try {
        let url = `/api/campsites?page=${page}&limit=${limit}`;

        if (selectedCities.length > 0) {
          const citiesQueryParam = selectedCities.join(',');
          url += `&cities=${citiesQueryParam}`;
        }

        // Add filter options to the query parameters
        const filterParams = new URLSearchParams(filterOptions);
        url += `&${filterParams.toString()}`;

        const response = await fetch(url);
        const data = await response.json();

        if (page === 1 || selectedCities.length > 0) {
          setCampsites(data.campsites);
        } else {
          setCampsites(prevCampsites => [...prevCampsites, ...data.campsites]);
        }
      } catch (error) {
        console.error('Error fetching campsites:', error);
      }
      setIsLoading(false);
    }

    fetchCampsites(currentPage);
  }, [currentPage, selectedCities, filterOptions]);
  
  useEffect(() => { 
    axios.get('/api/campsite?counts='+true).then(response => {
      setCityCounts(response.data);
    });
  }, [])

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleCitySelect = (city) => {
    const updatedCities = selectedCities.includes(city)
      ? selectedCities.filter(selectedCity => selectedCity !== city)
      : [...selectedCities, city];
    setSelectedCities(updatedCities);
    setCurrentPage(1);
    setCampsites([]);
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

  const handleSearchBar = (event) => {
    event.preventDefault();
    if(searchInput?.length<3){
      toast.error("Lütfen en az üç karakter girip arama yapınız.")
      return
    }
    router.push(`/search?${searchInput}`);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSearch(event);
    }
  };
  return (
    <Layout className="min-h-screen">
      <Script src="https://platform-api.sharethis.com/js/sharethis.js#property=649a64799fbe9100124b55e5&product=sticky-share-buttons&source=platform" async="async" strategy="lazyOnload"/>

      <Head>
        <title>CampUpp - Kamp Yerlerini İnceleyin, Favorileyin, Rezervasyon Yapın</title>
        <meta
          name="description"
          content="Kamp yerlerini inceleyin, favorileyin. Deniz, göl, orman, duş, sıcak su, wifi gibi özelliklerini inceleyin."
          key="desc"
        />
        <meta property="og:title" content="CampUpp - Kamp Yerlerini İnceleyin, Favorileyin, Rezervasyon Yapın" />
        <meta
          property="og:description"
          content="Kamp yerlerini inceleyin, favorileyin. Deniz, göl, orman, duş, sıcak su, wifi gibi özelliklerini inceleyin."
        />
        <meta
          property="og:image"
          content="https://campupp.s3.eu-north-1.amazonaws.com/Artboard+1.png"
        />
      </Head>
      <ToastContainer />
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
                    <h2 className="text-lg font-medium text-gray-900">Filtreler</h2>
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
                    <h3 className="sr-only">Categories</h3>
                      <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">Şehir Seçin</span>
                                <span className="ml-6 flex items-center">
                                  {open ? (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="">
                              <div className='relative'>
                                <div className="sticky my-3 top-0">
                                  {selectedCities?.map((place) => (
                                    <button key={place} type="button" className="flex gap-2 text-white bg-cc-primary focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1.5 mr-2 mb-2">
                                      {place}
                                      <XMarkIcon className="h-4 w-4 mt-0.5" aria-hidden="true" onClick={() => handleCityDeselect(place)} />
                                    </button>
                                  ))}
                                  <div>
                                  </div>
                                  <input
                                    type="text"
                                    placeholder="Şehir arayın"
                                    onChange={(e) => handleSearch(e.target.value)}
                                    className="border border-gray-300 rounded px-4 py-2"
                                  />
                                </div>
                                <div className="space-y-6 h-48 overflow-auto">
                                  {cities
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
                                          {cityFilter} <span className='font-bold'>{cityCounts[cityFilter]}</span>
                                        </label>
                                        
                                      </div>
                                    ))}
                                </div>

                                
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                      <Disclosure as="div" className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">Tesis Özellikleri</span>
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
                                  <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={filterOptions.isNearSea}
                                        onChange={event =>
                                          handleFilterOptionChange('isNearSea', event.target.checked)
                                        }
                                    />
                                    <label
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      Denize Yakın
                                    </label>
                                  </div>
                                  <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={filterOptions.isNearLake}
                                        onChange={event =>
                                          handleFilterOptionChange('isNearLake', event.target.checked)
                                        }
                                    />
                                    <label
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      Göle Yakın
                                    </label>
                                  </div>
                                  <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={filterOptions.isNearForest}
                                        onChange={event =>
                                          handleFilterOptionChange('isNearForest', event.target.checked)
                                        }
                                    />
                                    <label
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      Ormana Yakın
                                    </label>
                                  </div>
                                  <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={filterOptions.isPresentBungalow}
                                        onChange={event =>
                                          handleFilterOptionChange('isPresentBungalow', event.target.checked)
                                        }
                                    />
                                    <label
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      Bungalow Kiralanabilir
                                    </label>
                                  </div>
                                  <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={filterOptions.isFriendlyVan}
                                        onChange={event =>
                                          handleFilterOptionChange('isFriendlyVan', event.target.checked)
                                        }
                                    />
                                    <label
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      Karavana Uygun
                                    </label>
                                  </div>
                                  <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={filterOptions.isFriendlyRemoteWork}
                                        onChange={event =>
                                          handleFilterOptionChange('isFriendlyRemoteWork', event.target.checked)
                                        }
                                    />
                                    <label
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      Uzaktan Çalışmaya Uygun
                                    </label>
                                  </div>
                                  <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={filterOptions.isFriendlyAlcohol}
                                        onChange={event =>
                                          handleFilterOptionChange('isFriendlyAlcohol', event.target.checked)
                                        }
                                    />
                                    <label
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      Alkolsüz
                                    </label>
                                  </div>
                                  <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={filterOptions.isPublicTransportationPossiblel}
                                        onChange={event =>
                                          handleFilterOptionChange('isPublicTransportationPossible', event.target.checked)
                                        }
                                    />
                                    <label
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      Toplu Taşıma ile Ulaşım
                                    </label>
                                  </div>
                                  <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={filterOptions.isPresentWifi}
                                        onChange={event =>
                                          handleFilterOptionChange('isPresentWifi', event.target.checked)
                                        }
                                    />
                                    <label
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      Wi-Fi
                                    </label>
                                  </div>
                                  <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={filterOptions.isPresentShower}
                                        onChange={event =>
                                          handleFilterOptionChange('isPresentShower', event.target.checked)
                                        }
                                    />
                                    <label
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      Duş Alanı
                                    </label>
                                  </div>
                                  <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={filterOptions.isPresentHotWater}
                                        onChange={event =>
                                          handleFilterOptionChange('isPresentHotWater', event.target.checked)
                                        }
                                    />
                                    <label
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      Sıcak Su
                                    </label>
                                  </div>
                                  <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={filterOptions.isPresentKitchen}
                                        onChange={event =>
                                          handleFilterOptionChange('isPresentKitchen', event.target.checked)
                                        }
                                    />
                                    <label
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      Mutfak
                                    </label>
                                  </div>
                                  <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={filterOptions.isPaymentCreditCard}
                                        onChange={event =>
                                          handleFilterOptionChange('isPaymentCreditCard', event.target.checked)
                                        }
                                    />
                                    <label
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      Kredi Kartı ile Ödeme
                                    </label>
                                  </div>
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
          <div className="block md:flex items-baseline justify-between border-b border-gray-200 py-6">
            <form className='md:w-96 mb-5 md:mb-0'  onSubmit={handleSearchBar}>   
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input type="text"
                      id="searchInput"  
                      placeholder='isim, adres, açıklama arayın'
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}  onKeyDown={handleKeyDown} className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " required
                    />
                    <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-cc-primary hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 cursor-pointer">Ara</button>
                </div>
            </form>
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  {!isMapOpen && (
                    <button onClick={()=>{setIsMapOpen(true)}} className="cursor-pointer group inline-flex justify-start text-sm font-medium text-gray-700 hover:text-gray-900">
                    Haritadan Seç
                    <MapIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </button>
                  )}
                  {isMapOpen && (
                    <button onClick={()=>{setIsMapOpen(false)}} className="cursor-pointer group inline-flex justify-start text-sm font-medium text-gray-700 hover:text-gray-900">
                    Haritayı Kapat
                    <MapIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </button>
                  )}
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="flex -m-2 ml-4 p-2 text-gray-400 hover:text-gray-600 sm:ml-6 border border-gray-200 rounded shadow"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className='mr-3 text-gray-700 font-medium'>Filtrele</span>
                <FunnelIcon className="h-5 w-5 mt-1" aria-hidden="true" />
              </button>
            </div>
          </div>
          <section aria-labelledby="products-heading">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
            <div className={isMapOpen ?'block' : 'hidden'} >
              <Map />
            </div>                    
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
              <div className="lg:col-span-4">
              <div className="bg-white">
                {campsites?.length !==0 && (
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
                    {campsites?.map((place) => (
                      <Link key={place._id} href={'/campsite/view/'+ place._id} className="group overflow-hidden rounded-xl">
                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden xl:aspect-h-8 xl:aspect-w-7">
                          <Slider photos={place.images}/>
                        </div>
                        <h3 className="mt-4 text-lg font-medium text-gray-900">{place.title}</h3>
                        {place.city && place.district && (
                          <p className="mt-1 text-sm text-gray-700">{place.city}/{place.district}</p>
                        )}
                        {place.price && (
                          <p className="mt-1 text-lg text-gray-700">{place.price} ₺</p>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
                )}
                <div>  
                    {campsites?.length==0 && (
                      <div className="pt-32 flex items-center mt-5">
                      <div className="text-center w-full">
                          <img
                              src="https://campupp.s3.eu-north-1.amazonaws.com/Artboard+1.png"
                              alt="kamp rezervasyon"
                              className="h-72 object-center mx-auto -mt-32"
                          />
                          <p className="mb-3 font-semibold">Aradığınız Kriterlere Göre Bir Kamp Alanı Bulunamadı </p>
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
    </Layout>
  );
}

export default CampsiteList;
