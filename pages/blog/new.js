import Layout from "@/components/Layout";
import { useSession } from "next-auth/react"
import {useEffect, useState} from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CampsiteAdd(){
    const {data:session} = useSession();
    const [title,setTitle] = useState("");
    const [shortDesc,setShortDesc] = useState("");
    const [content,setContent] = useState("");
    const [image,setImage] = useState("");
    const [category,setCategory] = useState("Kamp İpuçları ve Püf Noktaları");
    const [language,setLanguage,] = useState("tr");
    
    async function saveBlog(ev) {
        ev.preventDefault();
        if(title==""){
            toast.error('Başlık alanı boş bırakılamaz')
            return
        }
        if(shortDesc==""){
            toast.error('Özet metin alanı boş bırakılamaz')
            return
        }
        if(shortDesc.length>200){
            toast.error('Özet metin 200 karakterden az olmalı')
            return
        }
        if(content==""){
            toast.error('Metin Alanı boş bırakılamaz')
            return
        }
        if(content==""){
          toast.error('Metin Alanı boş bırakılamaz')
          return
        }
        if (!session?.user.email) {
            return
        }
        const data = {title,shortDesc,content,image,category,language}
        const res = await axios.post('/api/blog',data);
        if(res.data=="ok"){
            window.location.reload()
        }else{
            toast.error('İşlem tamamlanamadı, lütfen daha sonra tekrar deneyin.')
        }
    }
    const handleSelectionChange = (selected) => {
        setCategory(selected);
      };
    async function uploadImages(ev){
        if(title==""){
          toast.error('Fotoğraf eklemeye başlamadan önce başlık alanını doldurunuz.')
          return
        }
        const files = ev.target?.files;
        if(files?.length>0){
          if(image?.length>1){
            toast.error('Blog yazılarına sadece bir fotoğraf eklenebilir.')
          }
          else{
            const data = new FormData();
            for(const file of files){
                data.append('file',file)
            }
            const res = await axios.post('/api/upload',data)
            setImage(oldImages => {
               return [...oldImages,...res.data.links]
            })
          }
        }
    }
    function removePhoto(ev, filename){
        if(title==""){
          toast.error('Fotoğraf silmeye başlamadan önce "Kaydet" butonuna basınız.')
          return
        }
        ev.preventDefault();
        setImage([...image.filter(photo => photo !== filename)])
        axios.post('/api/delete', {filename:filename})
        // Assuming you have a button element with an id "myButton"
        const button = document.getElementById("saveBtn");
        // Programmatically click the button
        button.click();
    }
    return(
        <Layout>
            <ToastContainer />
            <div className=' w-full px-16'>
                    <form onSubmit={saveBlog} className="p-5 m-5 border rounded-2xl bg-gray-100">
                        <div className="sm:col-span-4">
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Blog Başlığı
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        placeholder=""
                                        value={title}
                                        onChange={ev => setTitle(ev.target.value)}
                                        type="text"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-full mt-5">
                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                Blog Özet Yazısı
                            </label>
                            <p className="mt-3 text-sm leading-6 text-gray-600">Etkinlik ile ilgili tanıtım metni ekleyebilirsiniz. </p>
                            <div className="mt-2">
                                <textarea
                                rows={3}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder=""
                                value={shortDesc}
                                onChange={ev => setShortDesc(ev.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-span-full mt-5">
                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                Blog Metni
                            </label>
                            <p className="mt-3 text-sm leading-6 text-gray-600"><Link className="underline" href="https://onlinehtmleditor.dev/" target="_blank">https://onlinehtmleditor.dev/</Link> adresine girip, ana başlık olmadan, alt başlıkları da &apos;bold&apos; yaparak yazıyı ekleyin. Font &apos;verdana&apos; olmalı. En son &apos;edit html code&apos; butonuna basıp ilgili kodu alıp alttaki alana yapıştırmalısınız.</p>
                            <div className="mt-2">
                                <textarea
                                rows={30}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder=""
                                value={content}
                                onChange={ev => setContent(ev.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 mt-3">
                                Blog Görseli Ekleyin
                            </label>
                            <p className="mt-3 text-sm leading-6 text-gray-600">
                                Yüklediğiniz ilk fotoğraf etkinlik kapak fotoğrafı olarak kullanılacaktır. Takip eden görseller etkinkik detay sayfasında galeri olarak sergilenecektir.
                                 Kapak fotoğrafınız olmaması durumunda etkinkik türüne göre varsayılan fotoğraf etkinlik kapak fotoğrafı olarak atanacaktır.
                            </p>
                            <div className="mt-2">
                                <div className="mb-2 flex gap-2">
                                {!!image?.length && image.map(link=>(
                                <div className="h-32 flex relative" key={link}>
                                  <img className="rounded-2xl w-full object-cover" src={link} />
                                  <button onClick={(ev)=>removePhoto(ev,link)} className="absolute bottom-1 right-1 text-white bg-black py-2 px-3 bg-opacity-50 rounded-xl cursor-pointer">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                      </svg>
                                  </button>
                                </div>
                                ))}
                                <label className="cursor-pointer bg-gray-200 items-center flex text-sm gap-1 text-gray-500 rounded-md w-24 h-24 border text-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                    </svg>
                                    <div className="">
                                        Upload
                                    </div>
                                    <input type="file" className="hidden" onChange={uploadImages}/>
                                </label>
                                {!image?.length &&(
                                    <div>Etkinliğe fotoğraf yüklemediniz.</div>
                                )}
                                </div>
                            </div>
                        </div>   
                        <div className="sm:col-span-3">
                            <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                Etkinlik Türü
                            </label>
                            <div className="mt-2">
                                <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                >
                                <option>Kamp İpuçları ve Püf Noktaları</option>
                                <option>Kamp Alanı İncelemeleri</option>
                                <option>Outdoor Aktiviteler ve Maceralar</option>
                                <option>Kamp Ateşi Hikayeleri ve Efsaneleri</option>
                                <option>Doğa ve Yaban Hayatı</option>
                                <option>Aile Kampı</option>
                                <option>Kamp Yemekleri ve Tarifler</option>
                                </select>
                            </div>
                        </div>
                        <fieldset className="mt-5">
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Blog Dili</legend>
                            <div className="mt-6 space-y-6">
                                <div className="flex items-center gap-x-3">
                                <input
                                    id="push-everything"
                                    name="push-notifications"
                                    type="radio"
                                    value="tr"
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    onChange={ev => setLanguage(ev.target.value)} checked={language == "tr"}
                                />
                                <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                    Türkçe
                                </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                <input
                                    id="push-email"
                                    name="push-notifications"
                                    type="radio"
                                    value="eng"
                                    onChange={ev => setLanguage(ev.target.value)} checked={language == "eng"}
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                                <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                    İngilizce
                                </label>
                                </div>
                            </div>
                        </fieldset>
                        <button
                            type="submit"
                            id="saveBtn"
                            className="bg-green-900 w-48 p-2 block text-white rounded-2xl mt-5">
                            Kaydet
                        </button>
                    </form>
                </div>
       </Layout>
    )

}