import Layout from "@/components/LayoutEng";
import {useEffect, useState } from 'react'
import axios from "axios";
import { FaCampground } from "react-icons/fa";
import Link from "next/link";
import { useSession } from "next-auth/react"
import Banner from '@/components/BannerEng'
import Script from 'next/script'
import Explore from "@/components/ExploreBannerEng";

export default function Blogs() {
  const [blogs, setBlogs]= useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const {data:session} = useSession();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`/api/blog?page=${currentPage}&langEng=true`);
        const { blogs, totalPages } = response.data;
        setBlogs(blogs);
        setTotalPages(totalPages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBlogs();
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };
  async function deleteBlog(id){
    await axios.delete('/api/blog?id='+id);
    window.location.reload()
}

  return (
    <Layout>
        <Script src="https://platform-api.sharethis.com/js/sharethis.js#property=649a64799fbe9100124b55e5&product=sticky-share-buttons&source=platform" async="async" strategy="lazyOnload"/>
        <section className="bg-white mt-3">
            {session?.user?.email=="nazifeesra98@gmail.com" && (
            <div className="w-100 text-center">
                <Link href="/blog/new" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700">Yeni Yazı Ekle</Link>
            </div>
            )}
            {session?.user?.email=="ceren.basoglu.16@gmail.com" && (
            <div>
                <Link href="/blog/new" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700">Yeni Yazı Ekle</Link>
            </div>
            )}
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                    <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-semibold text-gray-800">Blogs</h2>
                    <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">Into the Wilderness: Your Ultimate Guide to Camping Adventures and Outdoor Escapes! </p>
                </div> 
                <div className="grid gap-8 lg:grid-cols-3">
                {blogs?.length>0 && blogs.map(blog => (
                    <Link key={blog._id} href={'/en/blog/'+ blog._id} className="p-6 bg-white rounded-lg border border-gray-200 shadow-md">
                        <img className="rounded-lg h-auto mb-5" src={blog.image[0]!==""?blog.image[0]:"https://media.timeout.com/images/105658195/750/422/image.jpg"} alt="office laptop working"/>
                        <div className="flex justify-between items-center mb-5 text-gray-500">
                            <span className="bg-cc-primary hover:opacity-95 hover:shadow-lg text-white text-xs font-medium inline-flex items-center px-3 py-1.5 rounded shadow-md">
                                <FaCampground className="mr-1.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                {blog.category=="Kamp İpuçları ve Püf Noktaları" && (
                                  <div>Camping Tips and Hacks</div>
                                )}
                                {blog.category=="Kamp Alanı İncelemeleri" && (
                                  <div>Campground Review</div>
                                )}
                                {blog.category=="Outdoor Aktiviteler ve Maceralar" && (
                                  <div>Outdoor Activities and Adventures</div>
                                )}
                                {blog.category=="Kamp Ateşi Hikayeleri ve Efsaneleri" && (
                                  <div>Campfire Stories and Legends</div>
                                )}
                                {blog.category=="Doğa ve Yaban Hayatı" && (
                                  <div>Nature and Wildlife</div>
                                )}
                                {blog.category=="Aile Kampı" && (
                                  <div>Family Camping</div>
                                )}
                                {blog.category=="Kamp Yemekleri ve Tarifler" && (
                                  <div>Camp Meals and Recipes</div>
                                )}
                            </span>
                        </div>
                    <h2 className="mb-2 text-2xl tracking-tight text-gray-900">
                        <Link href={'/en/blog/'+ blog._id}>{blog.title}</Link>
                    </h2>
                    <p className="_9OKVeTXzfSwD_NYO6_G XdjN1uxS_rsa3F90ox40 K1PPCJwslha8GUIvV_Cr eCx_6PNzncAD5yo7Qcic">{blog.shortDesc}</p>
                    <Link href={'/en/blog/'+ blog._id} className="inline-flex items-center font-medium text-primary-600 mt-5 hover:underline">
                      Read More
                      <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </Link>
                    {session?.user?.email=="nazifeesra98@gmail.com"  && (
                    <button onClick={()=>deleteBlog(blog._id)} className="inline-flex items-center font-medium text-primary-600 mt-5 hover:underline">
                      Yazıyı Sil
                      <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                    )}
                    {session?.user?.email=="ceren.basoglu.16@gmail.com"  && (
                    <button onClick={()=>deleteBlog(blog._id)} className="inline-flex items-center font-medium text-primary-600 mt-5 hover:underline">
                      Yazıyı Sil
                      <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                    </button>
                    )}
                </Link>                 
                ))}
                </div>  
            </div>
            <div className="w-full text-center pb-16">
                <button onClick={handlePreviousPage} disabled={currentPage === 1} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700">
                Previos
                </button>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700">
                Next
                </button>
            </div>
        </section>
        <Banner />
        <Explore />
    </Layout>
  );
}