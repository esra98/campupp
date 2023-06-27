import { useSession} from "next-auth/react"
import Layout from '@/components/Layout'
import Banner from '@/components/Banner'
import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/router";
import Link from "next/link";
import Script from 'next/script'

export default function BlogPost() {
  const {data:session} = useSession();
  const [blog, setBlog] = useState([])
  const [recentBlogs, setRecentBlogs] = useState([])
  const [wrappedHtml, setWrappedHtml] = useState("")
  const router = useRouter();
  const {id} = router.query;
  useEffect(()=>{
    if(!id){
        return;
    }
    else{
        axios.get('/api/blog?id='+id).then(response => {
            setBlog(response.data);
          });
        axios.get('/api/blog?recent=true').then(response => {
            setRecentBlogs(response.data);
        });  
    }
  }, [id])

  const wrapStrongTags = (htmlContent) => {
    console.log(htmlContent)
    let wrappedContent = htmlContent.replace(
      /<strong\b[^>]*>(.*?)<\/strong>/g,
      '<div className="my-5"><strong>$1</strong></div>'
    );
    wrappedContent = htmlContent.replace(
      /<a\b(.*?)>/g,
      '<a$1 class="underline font-bold" target="_blank">'
    );
    return wrappedContent
  };

  useEffect(()=>{
    if(blog.content){
        const wrapped = wrapStrongTags(blog.content);
        setWrappedHtml(wrapped)
    }
  }, [blog])
  
  return(
    <Layout>
        <Script src="https://platform-api.sharethis.com/js/sharethis.js#property=649a64799fbe9100124b55e5&product=sticky-share-buttons&source=platform" async="async" strategy="lazyOnload"/>
        <div className="sharethis-sticky-share-buttons"></div>
        {blog && (
        <>
        <main className="pb-24 bg-opacity-100 bg-white">
          <header className="bg-blend-darken bg-no-repeat bg-center bg-cover bg-[url(https://campupp.s3.eu-north-1.amazonaws.com/blog-bg.jpg)] w-full relative h-96">
            <div className="bg-opacity-50 bg-black w-full h-full left-0 top-0 absolute"></div>
            <div className="pl-4 pr-4 -translate-x-1/2 transform translate-y-[-50%] rotate-0 skew-x-0 skew-y-0 scale-x-1 scale-y-1 max-w-screen-xl w-full mx-auto left-1/2 top-20 absolute">
              <span></span>
            </div>
          </header>
          <div className="bg-opacity-100 bg-[rgb(31 41 55/var(--tw-bg-opacity))] p-9 md:px-20 mx-auto my-[-8rem] rounded-[0.25rem] justify-between flex z-20 relative">
            <article className="lg:flex w-full p-10 shadow text-base rounded-md leading-tight max-w-none bg-white">
              <div className="md:w-full lg:w-2/3">
                <nav className="flex mb-8" aria-label="Breadcrumb">
                  <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                      <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-black">
                        <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                        Anasayfa
                      </Link>
                    </li>
                    <li>
                      <div className="flex items-center">
                        <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                        <Link href="/blog" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-black">Blog</Link>
                      </div>
                    </li>
                  </ol>
                </nav>
                <h1 className="text-2xl leading-9 font-semibold text-green-800">{blog.title}</h1>

                {blog?.image?.length>0 && (
                  <figure>
                     <img className="rounded-lg mb-5" src={blog.image[0] } alt=""/>
                  </figure>
                )}
                <div dangerouslySetInnerHTML={{ __html: wrappedHtml }} />
              </div>
              <div className="md:w-full lg:w-1/3">
                <div className="p-0 lg:p-10 lg:pt-0">
                  <h4 className="font-bold leading-5 mb-4 mt-10 text-green-800 lg:mt-0">
                    Diğer Blog Yazıları
                  </h4>
                  {recentBlogs?.length>0 && recentBlogs.map(recentBlog=>(
                    <Link href={"/blog/"+recentBlog._id} key={recentBlog._id}>
                      <div className="items-center flex mb-5">
                        <img className="rounded-md max-w-full w-24 h-24 mr-4" src={recentBlog.image[0]!==""?recentBlog.image[0]:"https://media.timeout.com/images/105658195/750/422/image.jpg"}/>
                        <div>
                          <h5 className="leading-tight font-bold text-base mb-2">{recentBlog.title}</h5>
                          <Link href="#" className="inline-flex items-center font-medium text-primary-600 hover:underline">
                            Yazının Tamamını Okuyun
                            <svg className="ml-2 w-4 h-4 mt-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
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
        {!blog && (
            <div>Araığınız yazı bulunamadı, kaldırılmış olabilir</div>
        )}
        <Banner />
    </Layout>
)
}
