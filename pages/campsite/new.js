import CampsiteForm from "@/components/CampsiteForm";
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react"
import {useEffect, useState} from "react";
import axios from "axios";
import Link from "next/link";
export default function CampsiteAdd(){
    const [productInfo, setProductInfo] = useState(null);
    const {data:session} = useSession();  
    useEffect(() => {
        axios.get('/api/campsite?user='+session?.user?.email).then(response => {
          setProductInfo(response.data);
        });
      }, [session]);
    return(
        /*<Layout>
            {productInfo && (
            <>
            <div className=" h-screen -mt-5 w-screen flex items-center">
                <div className='text-center w-full'>
                <p>Zaten oluşturduğunuz bir kamp yeri bulunmakta</p>  
                <Link href="/campsite/edit">Kamp Yerinizi Düzenleyin</Link>
                </div>
            </div>
            </>
            )}
            {!productInfo && (
            <>
                <CampsiteForm/>
            </>
            )}
       </Layout> 
            */
            <Layout>
                {session?.user?.email && (
                    <CampsiteForm/>
                )}
                {!session?.user?.email && (
                    <div>Kullanıcı Girişi Yapınız</div>
                )}
            </Layout>   
        
    )

}