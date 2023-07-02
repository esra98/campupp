import Layout from "@/components/Layout";
import { useSession } from "next-auth/react"
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import Script from 'next/script'
import Link from "next/link";

export default function CampsiteAdd(){
  const {data:session} = useSession();  
  const [campsites, setCampsites] = useState([]);
  const [word, setWord] = useState([]);
  const router = useRouter();
  const currentUrl = router.asPath;
  const searched = currentUrl.slice('/search?'.length);  
    useEffect(() => {
        console.log(searched)
        axios.get('/api/campsite?searchInput='+searched).then(response => {
            setCampsites(response.data);
          });
        setWord(searched)
    }, [searched]);
    const customStyles = {
    };  
    return (
      <Layout>
        <Script src="https://platform-api.sharethis.com/js/sharethis.js#property=649a64799fbe9100124b55e5&product=sticky-share-buttons&source=platform" async="async" strategy="lazyOnload"/>
          <div className="py-8 px-16 bg-opacity-100 bg-gray-100">
              <p><span className="font-bold">{word}</span> için arama sonuçları:</p>
              <div>
              {campsites.length == 0 && (
                  <div className="flex items-center mt-48 md:mt-36">
                    <div className="text-center w-full">
                        <img
                            src="https://campupp.s3.eu-north-1.amazonaws.com/Artboard+1.png"
                            alt="kamp rezervasyon"
                            className="h-72 object-center mx-auto -mt-32"
                        />
                        <p className="mb-3 font-semibold">Arama Kriterlerinize Uygun Kamp Yeri Bulunamadı </p>
                        <Link href="/"  type="button" className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-green-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700">Kamp Yerlerini İnceleyin ve Favorilemeye Başlayın!</Link>
                    </div>
                  </div>
                )}
              </div>
              <div role="list" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 divide-y divide-gray-100">
                {campsites.length !== 0 && campsites.map((person) => (
                  
                  <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow mt-5" key={person._id}>
                    <Link href="#">
                        <img className="rounded-t-lg object-cover h-64 w-full" src={person.images[0] ? person.images[0] :"https://campupp.s3.eu-north-1.amazonaws.com/Artboard+1.png" } alt="" />
                    </Link>
                    <div className="p-5">
                        <Link href="#">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">{person.title}</h5>
                        </Link>
                        <p className="mb-3 font-normal text-gray-700 h-8 truncate overflow-hidden">{person.description}</p>
                        <div className="block">
                        </div>
                        <div className="mt-3">
                          <Link href={"/campsite/view/"+person._id}  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-cc-primary rounded-lg hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer">
                            Kamp Yeri Detay
                              <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                          </Link>

                        </div>
                    </div>
                </div>
                ))}
            </div>
          </div>
      </Layout>
    )
}