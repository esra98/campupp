import { Fragment, useState } from 'react';
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from '@react-google-maps/api';
import Layout from '@/components/Layout';
import Banner from '@/components/Banner';

const markers = [
  {
    id: 1,
    name: 'Efes Antik Kenti',
    type: 'antic',
    position: { lat: 37.9399, lng: 27.3419 },
    link: ""
  },
  {
    id: 2,
    name: 'Bergama Antik Kenti (Pergamon)',
    type: 'antic',
    position: { lat: 39.1256, lng: 27.1856 },
  },
  {
    id: 3,
    name: 'Hierapolis Antik Kenti',
    type: 'antic',
    position: { lat: 37.9194, lng: 29.1264 },
  },
  {
    id: 4,
    name: 'Side Antik Kenti',
    type: 'antic',
    position: { lat: 36.7667, lng: 31.3908 },
  },
  {
    id:5,
    name: 'Termessos Antik Kenti',
    type: 'antic',
    position: { lat: 36.9974, lng: 30.5811 },
  },
  {
    id:6,
    name: 'Lidya Yolu',
    type: 'hiking',
    position: { lat: 36.9974, lng: 30.5811 },
  },
  {
    id:7,
    name: 'Aziz Paul Yolu',
    type: 'hiking',
    position: { lat: 37.7192, lng: 31.1207 },
  },
  {
    id:8,
    name: 'Kaçkar Dağları',
    type: 'hiking',
    position: { lat: 40.9545, lng: 41.1184 }
  },
  {
    id:9,
    name: 'Kapadokya Yürüyüş Rotaları',
    type: 'hiking',
    position: { lat: 38.6650, lng: 34.8456 },
  },
  {
    id:10,
    name: 'Aladağlar Milli Parkı',
    type: 'hiking',
    position: { lat: 37.9603, lng: 35.3857 },
  },
  {
    id:12,
    name: 'Pamukkale ',
    type: 'natural',
    position: { lat: 37.9214, lng: 29.1175 },
  },
  {
    id:13,
    name: 'Göreme Milli Parkı',
    type: 'natural',
    position: { lat: 38.6437, lng: 34.8303 },
  },
  {
    id:14,
    name: 'ÖlÜdeniz / Mavi Lagün',
    type: 'natural',
    position: { lat: 36.5529, lng: 29.1150 },
  },
  {
    id:15,
    name: 'Ararat Dağı',
    type: 'natural',
    position: { lat: 39.7000, lng: 44.2917 },
  },
  {
    id:16,
    name: 'Olimpos Milli Parkı',
    type: 'nationalParks',
    position: { lat: 36.3999, lng: 30.4542 },
  },
  {
    id:17,
    name: 'Göksu Delta Milli Parkı',
    type: 'nationalParks',
    position:{ lat: 36.3694, lng: 33.6894 },
  },
  {
    id:18,
    name: 'Gelibolu Yarımadası Tarihi Milli Parkı',
    type: 'nationalParks',
    position:{ lat: 40.2500, lng: 26.4000 },
  },
  {
    id:19,
    name: 'Köprülü Kanyon Milli Parkı',
    type: 'nationalParks',
    position: { lat: 37.0249, lng: 31.1347 },
  },
  {
    id:20,
    name: 'Dilek Yarımadası-Büyük Menderes Delta Milli Parkı',
    type: 'nationalParks',
    position: { lat: 37.7714, lng: 27.1866 },
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
                      {filteredMarkers.map(({ id, name, position }) => (
                        <MarkerF
                          key={id}
                          position={position}
                          onClick={() => handleActiveMarker(id)}
                        >
                          {activeMarker === id ? (
                            <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                              <div>
                                <p>{name}</p>
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
