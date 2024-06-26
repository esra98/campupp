import { useSession} from "next-auth/react"
import Layout from '@/components/LayoutEng'
import Banner from '@/components/BannerEng'
import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import Link from "next/link";
import Script from 'next/script'
import Head from 'next/head'
import Explore from "@/components/ExploreBannerEng";

export default function BlogPost({title, content, image, shortDesc }) {
  const [recentBlogs, setRecentBlogs] = useState([])
  const [wrappedHtml, setWrappedHtml] = useState("")
  const router = useRouter();
  const {id} = router.query;
  useEffect(()=>{
    if(!id){
        return;
    }
    else{
        axios.get('/api/blog?recent=true&langEng=true').then(response => {
            setRecentBlogs(response.data);
        });  
    }
  }, [id])
  
  return(
    <Layout>
        <Head>
          <title>{title}</title>
          <meta name="description" content={shortDesc} />
        </Head>
        <Script src="https://platform-api.sharethis.com/js/sharethis.js#property=649a64799fbe9100124b55e5&product=sticky-share-buttons&source=platform" async="async" strategy="lazyOnload"/>
        <div className="sharethis-sticky-share-buttons"></div>
        {title && (
        <>
        <main className="pb-24 bg-opacity-100 bg-white">
          <header className="bg-blend-darken bg-no-repeat bg-center bg-cover bg-[url(https://campupp.s3.eu-north-1.amazonaws.com/blog-bg.jpg)] w-full relative h-96">
            <div className="bg-opacity-50 bg-black w-full h-full left-0 top-0 absolute"></div>
            <div className="pl-4 pr-4 -translate-x-1/2 transform translate-y-[-50%] rotate-0 skew-x-0 skew-y-0 scale-x-1 scale-y-1 max-w-screen-xl w-full mx-auto left-1/2 top-20 absolute">
              <span></span>
            </div>
          </header>
          <div className="bg-opacity-100 bg-[rgb(31 41 55/var(--tw-bg-opacity))] p-5 md:px-20 mx-auto my-[-8rem] rounded-[0.25rem] justify-between flex z-20 relative">
            <article className="lg:flex w-full px-2 py-5 md:p-10 shadow text-base rounded-md leading-tight max-w-none bg-white">
              <div className="md:w-full lg:w-2/3">
                <nav className="flex mb-8" aria-label="Breadcrumb">
                  <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                      <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-black">
                        <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                        Home
                      </Link>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                        <Link href="/blog" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-black">Blog</Link>
                      </div>
                    </li>
                  </ol>
                </nav>
                <h1 className="text-2xl leading-9 font-semibold text-green-800">{title}</h1>
                {image?.length>0 && (
                  <figure>
                     <img className="rounded-lg mb-5" src={image[0] } alt=""/>
                  </figure>
                )}
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>
              <div className="md:w-full lg:w-1/3">
                <div className="p-0 lg:p-10 lg:pt-0">
                  <h4 className="font-bold leading-5 mb-4 mt-10 text-green-800 lg:mt-0">
                    Recent Blog Posts
                  </h4>
                  {recentBlogs?.length>0 && recentBlogs.map(recentBlog=>(
                    <Link href={"/en/blog/"+recentBlog._id} key={recentBlog._id}>
                      <div className="items-center flex mb-5">
                        <img className="rounded-md max-w-full w-24 h-24 mr-4" src={recentBlog.image[0]!==""?recentBlog.image[0]:"https://media.timeout.com/images/105658195/750/422/image.jpg"}/>
                        <div>
                          <h5 className="leading-tight font-bold text-base mb-2">{recentBlog.title}</h5>
                          <Link href={"/en/blog/"+recentBlog._id} className="inline-flex items-center font-medium text-primary-600 hover:underline">
                            Read More
                            <svg className="ml-2 w-4 h-4 mt-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                          </Link>
                        </div>
                      </div>
                      
                    </Link>
                  ))}
                </div>
              </div>
            </article>
            <aside>

            </aside>
          </div>
        </main>        
        </>
        )}
        {!title && (
            <div>Araığınız yazı bulunamadı, kaldırılmış olabilir</div>
        )}
        <Banner />
        <Explore/>
    </Layout>
)
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const response = await axios.get('https://www.campupp.com/api/blog?id=' + id);
  let wrappedContent = response.data.content.replace(
    /<strong\b[^>]*>(.*?)<\/strong>/g,
    '<div className="my-5"><strong>$1</strong></div>'
  );
  wrappedContent = wrappedContent.replace(
    /<a\b(.*?)>/g,
    '<a$1 className="underline font-bold" target="_blank">'
  );
  return { props: { title:response.data.title,content:wrappedContent, image: response.data.image, shortDesc:response.data.shortDesc } };
}