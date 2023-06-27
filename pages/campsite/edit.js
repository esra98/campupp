import Layout from "@/components/Layout";
import CampsiteForm from "@/components/CampsiteForm";
import {useEffect, useState} from "react";
import axios from "axios";
import { useSession } from "next-auth/react"
import Link from "next/link";


export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);

  const {data:session} = useSession();   

  useEffect(() => {
    axios.get('/api/campsite?user='+session?.user?.email).then(response => {
      setProductInfo(response.data);
    });
  }, [session]);
  return (
    <Layout>
      
      {productInfo && (
        <div className="p-5 pb-16">
          <CampsiteForm {...productInfo} />
          <Link className="ml-10 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600" href={'/campsite/delete/'+productInfo._id}>
              Kamp Yerini Sil
          </Link>
        </div>
        
      )}
      {!productInfo && (
        <div className=" h-screen -mt-5 w-screen flex items-center">
        <div className='text-center w-full'>
          <p>Kamp yeri oluşturduktan sonra düzenleme özelliğini kullanabilirsiniz.</p>  
          <Link href="/campsite/new">Kamp Yerinizi Ekleyin</Link>
        </div>
      </div>
      )}
    </Layout>
  );
}