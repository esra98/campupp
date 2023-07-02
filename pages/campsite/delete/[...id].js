import Layout from "@/components/Layout";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import { useSession } from "next-auth/react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DeleteProductPage() {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState(null);
  const {id} = router.query;  
  const {data:session} = useSession();   

  useEffect(() => {
    axios.get('/api/campsite?user='+session?.user?.email).then(response => {
      setProductInfo(response.data);
    });
  }, [session]);
  function goBack() {
    router.push('/');
  }
  async function deleteProduct() {
    toast.success('Lütfen işleminiz yapılırken bekleyiniz, silme işlemi birkaç dakika sürebilir.')
    productInfo.images?.map(filename=>{
      axios.post('/api/delete', {filename})
    })
    await axios.delete('/api/campsite?id='+id);
    goBack();
  }
  return (
    <Layout>
      <ToastContainer />
      <div className=" h-screen flex items-center">
        <div className="text-center w-full">
          <p className="mb-3 font-semibold">Kamp yerinizi ({productInfo?.title}) silmek istediğinize emin misiniz? </p>
          <p>Silme işlemini geri alamazsınız.</p>
          <div>
            <button
              onClick={deleteProduct}
              className="bg-rose-900 w-64 p-2 border  text-white rounded-2xl mt-5 hover:bg-transparent hover:text-rose-900 hover:border hover:border-rose-900">
              Evet, Kamp yerimi kalıcı olarak silmek istiyorum.
            </button>
          </div>
          <div>
            <button
              className="bg-green-900 w-64 p-2 border  text-white rounded-2xl mt-5 hover:bg-transparent hover:text-green-900 hover:border hover:border-green-900"
              onClick={goBack}>
              Silmek istemiyorum.
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}