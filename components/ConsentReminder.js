import { useEffect,useState } from "react";
import Link from "next/link";

export default function GDPR(){
    const [showGdpr,setShowGdpr]= useState(false)

    useEffect(() => {
        let isGdpr = document.cookie.match('(^|;)\\s*' + "showGdpr" + '\\s*=\\s*([^;]+)')?.pop() || '';
        if(isGdpr){
            setShowGdpr(true)
        }
    });
    async function accept(){
        console.log("fff")
        document.cookie = "showGdpr=false";
        setShowGdpr(true)
    }
    if(!showGdpr){
        return (
        <div className="sticky bottom-0 bg-green-100 text-center">
            Bu siteyi kullanarak <Link className="underline" href={"/legal/terms"}>Kullanım Koşulları</Link>&apos;nı ve <Link className="underline" href={"/legal/gdpr"}>Gizlilik Metni</Link>&apos;ni kabul etmiş oluyorsunuz. 
            <button className="flex-none text-center my-1 ml-2 rounded-full bg-cc-primary px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900" onClick={()=>accept()}>Bir daha gösterme</button>
        </div>
        )
    }
}