import { Fragment, useState } from 'react';
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from '@react-google-maps/api';
import Layout from '@/components/LayoutEng';
import Banner from '@/components/BannerEng';
import Link from 'next/link';
import Head from 'next/head';

let anticsIcon = "https://campupp.s3.eu-north-1.amazonaws.com/antics-icon.png" 
let naturalIcons = "https://campupp.s3.eu-north-1.amazonaws.com/naturals-icon.png"
let nationalIcons = "https://campupp.s3.eu-north-1.amazonaws.com/national-parks-icon.png"
let beachesIcons = "https://campupp.s3.eu-north-1.amazonaws.com/beaches-icon.png"
let trekkingIcons = "https://campupp.s3.eu-north-1.amazonaws.com/trekking-icon.png"

const markers = [
  {
    id: 1,
    name: 'Ephesus Ancient City',
    type: 'antics',
    position: { lat: 37.939167, lng: 27.341056 },
    link: "https://www.campupp.com/blog/64b16027c7c333bb2b1de1ef",
    desc: "Ephesus Ancient City is one of the largest and most important ancient cities in Anatolia. It is famous for its enchanting structures such as the Temple of Artemis, the Grand Theater, and the Celsus Library.",
    icon: anticsIcon
  },
  {
    id: 2,
    name: 'Perge Ancient City',
    type: 'antics',
    position: { lat: 36.961389, lng: 30.853889 },
    link: "https://www.campupp.com/blog/64b16345a5ba53153b60b31d",
    desc: "Perge Ancient City is one of the most important cities in Pamphylia. This ancient city takes visitors on a journey through history with its impressive theater, agora (square), and ruins.",
    icon: anticsIcon
  },
  {
    id: 3,
    name: 'Aspendos Ancient Theater',
    type: 'antics',
    position: { lat: 36.940556, lng: 31.169444 },
    link: "https://www.campupp.com/blog/64b16e2dfbefa9181ee16733",
    desc: "Aspendos Ancient Theater is one of the best-preserved ancient theaters from the Roman period. It is famous for its unique acoustics and captivating architecture.",
    icon: anticsIcon
  },
  {
    id: 4,
    name: 'Hierapolis Ancient City',
    type: 'antics',
    position: { lat: 37.9266, lng: 29.1274 },
    link: "https://www.campupp.com/blog/64b171bdfbefa9181ee1673f",
    desc: "Hierapolis Ancient City is located right next to Pamukkale. This ancient city offers visitors a unique experience with its ancient Roman ruins, enchanting theater, and famous thermal springs.",
    icon: anticsIcon
  },
  {
    id: 5,
    name: 'Aphrodisias Ancient City',
    type: 'antics',
    position: { lat: 37.7093, lng: 28.7271 },
    link: "https://www.campupp.com/blog/64b1735dfbefa9181ee16747",
    desc: "Aphrodisias Ancient City was a city dedicated to Aphrodite in ancient times. The city is known for its magnificent theater, stadium, and famous Temple of Aphrodite.",
    icon: anticsIcon
  },
  {
    id: 7,
    name: 'Sagalassos Ancient City',
    type: 'antics',
    position: { lat: 37.6773, lng: 30.5170 },
    link: "https://www.campupp.com/blog/64b1750ffbefa9181ee1674f",
    desc: "Sagalassos Ancient City is an ancient city located in the Taurus Mountains. It stands out with its magnificent views, theater, and Agora.",
    icon: anticsIcon
  },
  {
    id: 10,
    name: 'Troy Ancient City',
    type: 'antics',
    position: { lat: 39.9576, lng: 26.2397 },
    link: "https://www.campupp.com/blog/64b17685fbefa9181ee16757",
    desc: "Troy Ancient City is an ancient city where the legendary Trojan War took place. It is famous for its historical and mythological significance and captivates visitors with its discovered ruins during excavations.",
    icon: anticsIcon
  },
  {
    id: 15,
    name: 'Sardis Ancient City',
    type: 'antics',
    position: { lat: 38.483611, lng: 28.042222 },
    link: "https://www.campupp.com/blog/64b16c9ba5ba53153b60b34d",
    desc: "Sardis Ancient City is a historic city that was the capital of the Lydia Kingdom. It offers visitors a historical journey with its Temple of Artemis, Gymnasium, and ruins along the King's Road.",
    icon: anticsIcon
  },
  {
    id: 38,
    name: 'Nemrut Mountain Ruins',
    type: 'antics',
    position: { lat: 37.980833, lng: 38.740833 },
    link: "https://www.campupp.com/blog/64b16ac1a5ba53153b60b33d",
    desc: "Nemrut Mountain is a historic site located in Adıyaman and contains the royal tombs of the Kingdom of Commagene. Its most important feature is the monumental statues and the unique view created during sunrise or sunset. These ancient tombs and statues provide a fascinating experience with their historical and archaeological significance, along with their natural beauty.",
    icon: anticsIcon
  },
  {
    id: 39,
    name: 'Göbekli Tepe',
    type: 'antics',
    position: { lat: 37.222917, lng: 38.922444 },
    link: "https://www.campupp.com/blog/64b16971a5ba53153b60b335",
    desc: "Göbekli Tepe is considered the world's oldest temple complex and represents a significant turning point in human history, dating back to the 9th millennium BCE.",
    icon: anticsIcon
  },
  {
    id: 40,
    name: 'Ani Ruins',
    type: 'antics',
    position: { lat: 40.5, lng: 43.566667 },
    link: "https://www.campupp.com/blog/64b16821a5ba53153b60b32d",
    desc: "Ani Ruins is a historic site located within the borders of Kars and is an ancient medieval city that was an important center during the Middle Ages.",
    icon: anticsIcon
  },
  {
    id: 41,
    name: 'Alahan Monastery',
    type: 'antics',
    position: { lat: 36.791389, lng: 33.353611 },
    link: "https://www.campupp.com/blog/64b16595a5ba53153b60b325",
    desc: "Alahan Monastery is located in Mut district of Mersin and is an important Byzantine structure. It stands out with its impressive architecture and frescoes and is an important center for religious tourism.",
    icon: anticsIcon
  },
  {
    id: 16,
    name: 'Kaçkar Mountains National Park',
    type: 'nationalParks',
    position: { lat: 40.8403, lng: 41.1029 },
    link: "https://www.campupp.com/blog/64b12b554474824973f1232c",
    desc: "Kaçkar Mountains National Park is home to the magnificent landscapes of Eastern Black Sea. It is known for its high mountains, glacial lakes, and rich biological diversity.",
    icon: nationalIcons
  },
  {
    id: 17,
    name: 'Olympos Beydağları National Park',
    type: 'nationalParks',
    position: { lat: 36.5947, lng: 30.5104 },
    link: "https://www.campupp.com/blog/64b14e176d167ee37cc132ca",
    desc: "Olympos Beydağları National Park is a region in Antalya filled with natural beauty. It is famous for its coastal strip, forests, and the historic city of Olympos.",
    icon: nationalIcons
  },
  {
    id: 18,
    name: 'Yedigöller National Park',
    type: 'nationalParks',
    position: { lat: 40.9373, lng: 31.7408 },
    link: "https://www.campupp.com/blog/64b1540bb4c2e5d6ba18f9e2",
    desc: "Yedigöller National Park encompasses a fascinating natural area within Bolu's Gölcük Nature Park. It is famous for its seven lakes, hiking trails, and pine forests. It serves as a wonderful escape, offering visitors the tranquility and beauty of nature.",
    icon: nationalIcons
  },
  {
    id: 20,
    name: 'Munzur Valley National Park',
    type: 'nationalParks',
    position: { lat: 39.1350, lng: 39.4941 },
    link: "https://www.campupp.com/blog/64b15c75b17a68f6beff710e",
    desc: "Munzur Valley National Park is a protected park preserving the natural beauty of Tunceli. It stands out with its mountains, valleys, waterfalls, and rich flora and fauna diversity.",
    icon: nationalIcons
  },
  {
    id: 21,
    name: 'Kaz Mountains National Park',
    type: 'nationalParks',
    position: { lat: 39.6636, lng: 26.9456 },
    link: "https://www.campupp.com/blog/64b132c24474824973f1233e",
    desc: "Kaz Mountains National Park is home to the natural wonders of Çanakkale. It is known for its lush forests, endemic plant species, and trekking routes.",
    icon: nationalIcons
  },
  {
    id: 61,
    name: 'Uludağ National Park',
    type: 'nationalParks',
    position: { lat: 40.11236822936349, lng: 29.07397314632423 },
    link: "https://www.campupp.com/blog/64b17859fbefa9181ee1675f",
    desc: "Uludağ National Park is a natural treasure nestled among the mysterious mountains of Bursa. Its distinguishing features include soaring mountain peaks, pine forests, and rich flora and fauna diversity.",
    icon: nationalIcons
  },
  {
    id: 30,
    name: 'İğneada Longoz Forests National Park',
    type: 'nationalParks',
    position: { lat: 41.8232, lng: 27.9536 },
    link: "https://www.campupp.com/blog/64b12f274474824973f12336",
    desc: "İğneada Longoz Forests National Park is one of the natural treasures of Kırklareli. It is famous for its longoz forests, wetlands, and endemic plant and animal species.",
    icon: nationalIcons
  },
  {
    id: 35,
    name: 'Uzungöl',
    type: 'natural',
    position: { lat: 40.6194, lng: 40.6194 },
    link: "https://www.campupp.com/blog/64b1270e4474824973f12320",
    desc: "Uzungöl is a region in Trabzon famous for its natural beauty. It captivates visitors with its magnificent lake, green forests, and mountain views.",
    icon: naturalIcons
  },
  {
    id: 36,
    name: 'Pamukkale Travertines',
    type: 'natural',
    position: { lat: 37.9137, lng: 29.1185 },
    link: "https://www.campupp.com/blog/64b104c4e8a2a158a8388284",
    desc: "Pamukkale Travertines are famous for their white travertine terraces and thermal waters. It is a unique place where natural and cultural heritage converge.",
    icon: naturalIcons
  },
  {
    id: 37,
    name: 'Cappadocia',
    type: 'natural',
    position: { lat: 38.6587, lng: 34.8532 },
    link: "https://www.campupp.com/blog/64b125344474824973f12318",
    desc: "Cappadocia is famous for its fairy chimneys, underground cities, and unique rock formations. It is a popular tourist destination known worldwide.",
    icon: naturalIcons
  },
  {
    id: 43,
    name: 'Lake Van',
    type: 'natural',
    position: { lat: 38.6140, lng: 42.9182 },
    link: "https://www.campupp.com/blog/64b1242c4474824973f12310",
    desc: "Lake Van is the largest lake in Turkey and is known for its impressive landscapes, turquoise waters, and the historic Akdamar Island.",
    icon: naturalIcons
  },
  {
    id: 44,
    name: 'Lycian Way',
    type: 'hiking',
    position: { lat: 36.6829, lng: 30.5307 },
    link: "https://www.campupp.com/blog/64b0f869891ed62b93b95db8",
    desc: "The Lycian Way is one of Turkey's most famous hiking trails, stretching from Fethiye to Antalya along the Lycian coast.",
    icon: trekkingIcons
  },
  {
    id: 49,
    name: 'Saint Paul Trail',
    type: 'hiking',
    position: { lat: 38.2995, lng: 31.1758 },
    link: "https://www.campupp.com/blog/64b0fb4ae62b791c619c422d",
    desc: "The Saint Paul Trail is a historical hiking route that spans from west to east across Turkey, starting from the Pisidia region and continuing to Antalya.",
    icon: trekkingIcons
  },
  {
    id: 45,
    name: 'Phrygian Way',
    type: 'hiking',
    position: { lat: 39.09106152062335, lng: 30.420948632876044 },
    link: "https://www.campupp.com/blog/64b0fe0fe62b791c619c4235",
    desc: "The Phrygian Way follows a hiking route in the ancient Phrygia region between Afyonkarahisar and Kütahya, ideal for exploring historical ruins.",
    icon: trekkingIcons
  },
  {
    id: 47,
    name: 'Boztepe Trail',
    type: 'hiking',
    position: { lat: 40.9971015429749, lng: 39.7330785252 },
    link: "https://www.campupp.com/blog/64b0fefee62b791c619c423d",
    desc: "Boztepe Trail covers the hiking route to Boztepe Hill in Trabzon, offering a magnificent view of the Black Sea from the top.",
    icon: trekkingIcons
  },
  {
    id: 48,
    name: 'St. Nicholas Way',
    type: 'hiking',
    position: { lat: 36.24563573809273, lng: 29.9857186719781 },
    link: "https://www.campupp.com/blog/64b0ffc8e62b791c619c4247",
    desc: "The St. Nicholas Way is a historical hiking trail starting from Demre in Antalya and leading to the ancient city of Myra, believed to be the home of Santa Claus. This route is an impressive path that includes ancient ruins, coastal views, and historic villages, making it interesting for history and nature enthusiasts.",
    icon: trekkingIcons
  },
  {
    id: 50,
    name: 'Patara Beach',
    type: 'beach',
    position: { lat: 36.27676189261827, lng: 29.284411772845534 },
    link: "https://www.campupp.com/blog/64aff02d901d8aac5495fef8",
    desc: "Patara Beach is located in Kaş, Antalya, and is famous for its 18-kilometer-long sandy beach. It is also one of the nesting areas for loggerhead sea turtles (Caretta caretta).",
    icon: beachesIcons
  },
  {
    id: 51,
    name: 'Çeşme Altınkum Beach',
    type: 'beach',
    position: { lat: 38.27141381606385, lng: 26.259429422647813 },
    link: "https://www.campupp.com/blog/64aff375ec8e0f8803206e4d",
    desc: "Çeşme Altınkum Beach is located in Çeşme, İzmir and is known for its sandy beach and turquoise waters. It offers water sports facilities as well.",
    icon: beachesIcons
  },
  {
    id: 52,
    name: 'Cleopatra Beach',
    type: 'beach',
    position: { lat: 36.553757257332, lng: 31.972644655040686 },
    link: "https://www.campupp.com/blog/64aff545ec8e0f8803206e55",
    desc: "Cleopatra Beach is located south of Alanya and is famous for its white sand and crystal-clear waters. It is one of the most beautiful beaches on the Riviera.",
    icon: beachesIcons
  },
  {
    id: 53,
    name: 'Çıralı Beach',
    type: 'beach',
    position: { lat: 36.417698108076344, lng: 30.484157303884793 },
    link: "https://www.campupp.com/blog/64aff6b6ec8e0f8803206e5d",
    desc: "Çıralı Beach is located in Kemer, Antalya and is known for its natural beauty, peaceful atmosphere, and the remains of an ancient volcano.",
    icon: beachesIcons
  },
  {
    id: 54,
    name: 'Akyarlar Beach',
    type: 'beach',
    position: { lat: 36.970369432253, lng: 27.29954276335657 },
    link: "https://www.campupp.com/blog/64aff93919da21016f803a05",
    desc: "Akyarlar Beach is located in Bodrum and is known for its long sandy beach, tranquil atmosphere, and windsurfing opportunities.",
    icon: beachesIcons
  },
  {
    id: 55,
    name: 'Ölüdeniz',
    type: 'beach',
    position: { lat: 36.5502914781611, lng: 29.114654997644518 },
    link: "https://www.campupp.com/blog/64affabc19da21016f803a11",
    desc: "Ölüdeniz is a famous beach resort in Fethiye, known for its turquoise-colored lagoon, stunning views, and paragliding activities.",
    icon: beachesIcons
  },
  {
    id: 56,
    name: 'Kabak Cove',
    type: 'beach',
    position: { lat: 36.46139474375252, lng: 29.124948610845266 },
    link: "https://www.campupp.com/blog/64affde80b2b0c9cbdadd780",
    desc: "Kabak Cove is located in Fethiye and is known for its natural beauty, pine forests, and turquoise waters.",
    icon: beachesIcons
  },
  {
    id: 57,
    name: 'Kaputaş Beach',
    type: 'beach',
    position: { lat: 36.228851404184304, lng: 29.4501405661368 },
    link: "https://www.campupp.com/blog/64b0003d19da21016f803a28",
    desc: "Kaputaş Beach is located between Kaş and Kalkan and is famous for its turquoise sea and magnificent natural cliffs.",
    icon: beachesIcons
  },
  {
    id: 58,
    name: 'Altınoluk Beach',
    type: 'beach',
    position: { lat: 39.56528835408052, lng: 26.75376307849442 },
    link: "https://www.campupp.com/blog/64b018ff629683e7542e1556",
    desc: "Altınoluk Beach is located in Edremit, Balıkesir and offers visitors a peaceful holiday experience with its long sandy beach, clear waters, and beautiful scenery.",
    icon: beachesIcons
  },
  {
    id: 59,
    name: 'Sığacık Cove',
    type: 'beach',
    position: { lat: 38.1976708951224, lng: 26.78842047080532 },
    link: "https://www.campupp.com/blog/64b0f458891ed62b93b95dad",
    desc: "Sığacık Cove is located in Seferihisar, İzmir and is famous for its peaceful atmosphere, natural beauty, and historical texture.",
    icon: beachesIcons
  }

];

export default function BlogPost() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCiVMHghOSlJ4bDV9bpUcYDoOg2ZoSSVLY",
  });

  const [activeMarker, setActiveMarker] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState(["antics","nationalParks","natural","hiking","beach"]);

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
      <Head>
        <title>CampUpp - Explore Türkiye</title>
        <meta
          name="description"
          content="There are many places to see in Türkiye! Explore beaches, national parks, wonders of nature, ancient cities on a single map. Start planning your camping holiday in Türkiye!"
          key="desc"
        />
        <meta property="og:title" content="CampUpp - Türkiye&apos;yi Keşfedin!" />
        <meta
          property="og:description"
          content="There are many places to see in Türkiye! Explore beaches, national parks, wonders of nature, ancient cities on a single map. Start planning your camping holiday in Türkiye!"
        />
        <meta
          property="og:image"
          content="https://campupp.s3.eu-north-1.amazonaws.com/Artboard+1.png"
        />
      </Head>
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
            <h1 className="text-3xl mt-5 font-semibold tracking-tight text-green-800">There are many places to see in Türkiye!</h1>
            <p className="mt-2 font-light text-gray-500 sm:text-xl dark:text-gray-400">Explore beaches, national parks, wonders of nature, ancient cities on a single map. Start planning your camping holiday in Türkiye!</p>
          </div>
            <div className="container">
              <div className="type-checkboxes md:flex gap-5 my-5">
                <div className="mt-2">
                    <fieldset>
                        <div className="space-y-6">
                            <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                    <input
                                    checked={selectedTypes.includes('antics')}
                                    onChange={() => handleTypeCheckboxChange('antics')}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="comments" className="font-medium text-gray-900">
                                    Ancient Cities
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
                                    National Parks
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
                                    Wonders of Nature
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
                                    Culture/Trekking  Routes 
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
                                    Beaches
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
                          title={name}
                        >
                          {activeMarker === id ? (
                            <InfoWindowF  onCloseClick={() => setActiveMarker(null)}>
                              <div className='pb-3'>
                                <p className='font-semibold'>{name}</p>
                                <p className='pb-3'>{desc}</p>
                                <Link href={link} className='flex-none rounded-full text-center bg-cc-primary px-3 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900'>Daha Fazla Bilgi Alın</Link>
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
