import { Fragment, useState } from 'react';
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from '@react-google-maps/api';
import Layout from '@/components/Layout';
import Banner from '@/components/Banner';
import Link from "next/link";

var iconSea = {
  path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
  fillColor: '#1E2F97',
  fillOpacity: 1,
  strokeWeight: 0,
  scale: 0.4,
  width: 10,
  height: 130
}
const markers = [
  {
    id: 1,
    name: 'Kabak Koyu',
    type: 'beach',
    position:{ lat: 36.3905, lng: 29.0879 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Kabak Koyu, mistik atmosferi ve nefes kesen manzaralarıyla büyüleyici bir kamp deneyimi sunar. ",
    icon: iconSea
  },
];

export default function BlogPost() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCiVMHghOSlJ4bDV9bpUcYDoOg2ZoSSVLY",
  });

  const [activeMarker, setActiveMarker] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const handleActiveMarker = (markerId) => {
    setActiveMarker(markerId);
  };

  const handleTypeCheckboxChange = (type) => {
    setSelectedTypes((prevSelectedTypes) => {
      if (prevSelectedTypes.includes(type)) {
        return prevSelectedTypes.filter((selectedType) => selectedType !== type);
      } else {
        return [...prevSelectedTypes, type];
      }
    });
  };

  const filteredMarkers = markers.filter((marker) =>
    selectedTypes.includes(marker.type)
  );

  return (
    <Layout>
      <div className="sharethis-sticky-share-buttons"></div>
      <main className="pb-24 bg-opacity-100 bg-white">
        <header className="bg-no-repeat bg-center bg-cover bg-[url(https://campupp.s3.eu-north-1.amazonaws.com/kapadokya.jpg)] w-full relative h-96">
          <div className="bg-opacity-50  w-full h-full left-0 top-0 absolute"></div>
          <div className="pl-4 pr-4 -translate-x-1/2 transform translate-y-[-50%] rotate-0 skew-x-0 skew-y-0 scale-x-1 scale-y-1 max-w-screen-xl w-full mx-auto left-1/2 top-20 absolute">
            <span></span>
          </div>
        </header>
        <div className="bg-opacity-100 bg-[rgb(31 41 55/var(--tw-bg-opacity))] p-2 md:p-9 md:px-20 mx-auto my-[-8rem] rounded-[0.25rem] justify-between flex z-20 relative">
          <article className="w-full p-3 md:p-10 shadow text-base rounded-md leading-tight max-w-none bg-white">
          <div className='my-5'>
            <h1 class="text-3xl mt-5 font-semibold tracking-tight text-green-800">Türkiye&apos;yi Keşfedin!</h1>
            <p class="mt-2 font-light text-gray-500 sm:text-xl dark:text-gray-400">Türkiye&apos;nin çeşitli bölgelerinde bulunan antik kentlerin, açık hava müzelerinin, yürüyüş yollarınını yerlerini gösteren bir harita sunuyoruz.</p>
          </div>
            <div className="container">
              <div className="type-checkboxes md:flex gap-5 my-5">
                <div className="mt-2">
                    <fieldset>
                        <div className="space-y-6">
                            <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                    <input
                                    checked={selectedTypes.includes('antic')}
                                    onChange={() => handleTypeCheckboxChange('antic')}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="comments" className="font-medium text-gray-900">
                                    Antik Şehirler
                                  </label>
                                </div> 
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div className="mt-2">
                    <fieldset>
                        <div className="space-y-6">
                            <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                    <input
                                    checked={selectedTypes.includes('nationalParks')}
                                    onChange={() => handleTypeCheckboxChange('nationalParks')}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="comments" className="font-medium text-gray-900">
                                    Milli Parklar
                                  </label>
                                </div> 
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div className="mt-2">
                    <fieldset>
                        <div className="space-y-6">
                            <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                    <input
                                    checked={selectedTypes.includes('natural')}
                                    onChange={() => handleTypeCheckboxChange('natural')}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="comments" className="font-medium text-gray-900">
                                    Doğal Güzellikler
                                  </label>
                                </div> 
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div className="mt-2">
                    <fieldset>
                        <div className="space-y-6">
                            <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                    <input
                                    checked={selectedTypes.includes('hiking')}
                                    onChange={() => handleTypeCheckboxChange('hiking')}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="comments" className="font-medium text-gray-900">
                                    Yürüyüş Yolu
                                  </label>
                                </div> 
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div className="mt-2">
                    <fieldset>
                        <div className="space-y-6">
                            <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                    <input
                                    checked={selectedTypes.includes('beach')}
                                    onChange={() => handleTypeCheckboxChange('beach')}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="comments" className="font-medium text-gray-900">
                                    Sahiller
                                  </label>
                                </div> 
                            </div>
                        </div>
                    </fieldset>
                </div>
                {/* Add more checkboxes for other marker types */}
              </div>
            </div>
            <Fragment>
              <div className="container">
                <div style={{ height: '90vh', width: '100%' }}>
                  {isLoaded ? (
                    <GoogleMap
                      center={{ lat: 38.9637, lng: 35.2433 }}
                      zoom={6}
                      onClick={() => setActiveMarker(null)}
                      mapContainerStyle={{ width: '100%', height: '90vh' }}
                    >
                      {filteredMarkers.map(({ id, name, position, link, desc, icon}) => (
                        <MarkerF
                          key={id}
                          position={position}
                          className="h-2 w-2"
                          icon={icon}
                          onClick={() => handleActiveMarker(id)}
                          title="Uluru (Ayers Rock)"
                        >
                          {activeMarker === id ? (
                            <InfoWindowF  onCloseClick={() => setActiveMarker(null)}>
                              <div>
                                <p className='font-semibold'>{name}</p>
                                <p>{desc}</p>
                                <button href={link} className='flex-none mt-1 rounded-full text-center bg-cc-primary px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900'>Daha Fazla Bilgi Alın</button>
                              </div>
                            </InfoWindowF>
                          ) : null}
                        </MarkerF>
                      ))}
                    </GoogleMap>
                  ) : null}
                </div>
              </div>
            </Fragment>
          </article>
          <aside></aside>
        </div>
      </main>
      <Banner />
    </Layout>
  );
}
