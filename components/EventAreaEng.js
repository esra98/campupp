import {useEffect, useState, useRef} from 'react'
import axios from "axios";
import { useSession} from "next-auth/react"
import {useRouter} from "next/router";
import ModalImage from "react-modal-image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Modal from 'react-modal';
import { IoMdClose } from "react-icons/io";
import { MdDateRange } from "react-icons/md";
import { MultiSelect } from "react-multi-select-component";
import Link from 'next/link';

const options = [
  { label: 'Yoga', value: 'yoga' },
  { label: 'Trekking', value: 'trekking' },
  { label: 'Sailing', value: 'sailing' },
  // Add more options as needed
];

  const EventArea = ({ owner,placeId }) => {
  const {data:session} = useSession();
  const [viewModelIsOpen, setViewModelIsOpen] = useState(false)
  const [viewedEventTitle, setViewedEventTitle] = useState(null)
  const [viewedEventDescription, setViewedEventDescription] = useState(null)
  const [viewedEventRequirement, setViewedEventRequirement] = useState(null)
  const [viewedEventCategory, setViewedEventCategory] = useState(null)
  const [viewedEventPrice, setViewedEventPrice] = useState(null)
  const [viewedEventImages, setViewedEventImages] = useState(null)
  const [viewedEventStartDate, setViewedEventStartDate] = useState(null)
  const [viewedEventEndDate, setViewedEventEndDate] = useState(null)

 
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [price,setPrice] = useState(''); 
  const [startDate,setStartDate] = useState('');
  const [endDate,setEndDate] = useState('');
  const [category,setCategory] = useState([]);
  const [images,setImages] = useState([]);
  const [requirement,setRequirement] = useState("");

  const [editId,setEditId] = useState('');
  const [editTitle,setEditTitle] = useState('');
  const [editDescription,setEditDescription] = useState('');
  const [editPrice,setEditPrice] = useState(''); 
  const [editStartDate,setEditStartDate] = useState('');
  const [editEndDate,setEditEndDate] = useState('');
  const [editCategory,setEditCategory] = useState([]);
  const [editImages,setEditImages] = useState([]);
  const [editRequirement,setEditRequirement] = useState("");

  const [deleteId,setDeleteId] = useState('');
  const [deleteImages,setDeleteImages] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false);
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
  const [events, setEvents] = useState(null)
  const router = useRouter();
  const {id} = router.query;
  useEffect(()=>{
    if(!id){
        return;
    }else{
        axios.get('/api/events?campsite='+id).then(response => {
          setEvents(response.data);
      });
    }
  }, [id])
  function openViewModal(event) {
    setViewedEventTitle(event.title)
    setViewedEventDescription(event.description)
    setViewedEventRequirement(event.requirement)
    setViewedEventCategory(event.category)
    setViewedEventPrice(event.price)
    setViewedEventImages(event.images)
    setViewedEventStartDate(event.startDate)
    setViewedEventEndDate(event.endDate)
    setViewModelIsOpen(true);

  }
  function closeViewModal() {
      setViewModelIsOpen(false);
  }
  function openEditEventModal(event) {
    setEditId(event._id)
    setEditTitle(event.title)
    setEditDescription(event.description)
    setEditRequirement(event.requirement)
    setEditCategory(event.category)
    setEditPrice(event.price)
    setEditImages(event.images)
    setEditStartDate(event.startDate)
    setEditEndDate(event.endDate)
    setIsEditEventModalOpen(true);

  }
  function closeEditEventModal() {
    setIsEditEventModalOpen(false);
  }
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', options);
  };
  useEffect(()=>{
    if(viewedEventEndDate){
      setViewedEventEndDate(formatDate(viewedEventEndDate))
    }
    if(viewedEventStartDate){
      setViewedEventStartDate(formatDate(viewedEventStartDate))
    }
  }, [viewedEventEndDate,viewedEventStartDate])
  async function openDeleteEventModal(){
    setIsDeleteModalOpen(true);
  }
  function closeDeleteEventModal() {
    setIsDeleteModalOpen(false);
  }
  function openNewEventModal() {
    setIsNewEventModalOpen(true);
  }
  function closeNewEventModal() {
    setIsNewEventModalOpen(false);
  }
  async function deleteEvent(){
    if(deleteId){
      await axios.delete('/api/events?id='+deleteId);
    }
    else{
      toast.success('Başarısız, lütfen daha sonra tekrar deneyin')
    }
    toast.success('Yorumunuz silindi')
    deleteImages?.map(filename=>{
        axios.post('/api/delete', {filename})
    })
    setEvents(events.filter(item => item._id !== deleteId))
    setDeleteId(null)
    closeDeleteEventModal()
  }
  async function saveEditedEvent(){
    if(editId){
        if(editStartDate==""){
          toast.error('Başlangıç tarihi alanı boş bırakılamaz.')
          return
        }
        const res = await axios.put('/api/events', {title:editTitle,_id:editId, description:editDescription,price:editPrice,startDate:editStartDate,endDate:editEndDate,category:editCategory,images:editImages,requirement:editRequirement});
        if(res.data == "ok"){
          toast.error('Ok  ')
        }else{
            toast.error('Başarısız, lütfen daha sonra tekrar deneyin')
        }
    }
    else{
        toast.error('Başarısız, lütfen daha sonra tekrar deneyin')
    }
    setEditId("")
    setEditTitle("")
    setEditDescription("")
    setEditRequirement("")
    setEditCategory("")
    setEditPrice("")
    setEditImages("")
    setEditStartDate("")
    setEditEndDate("")
    setIsEditEventModalOpen(false);
  }
  async function uploadEditImages(ev){
    const files = ev.target?.files;
    if(files?.length>0){
        const data = new FormData();
        for(const file of files){
            data.append('file',file)
        }
        const res = await axios.post('/api/upload',data)
        setEditImages(oldImages => {
           return [...oldImages,...res.data.links]
        })
    }
  }
  function removeEditPhoto(ev, filename){
    ev.preventDefault();
    setEditImages([...editImages.filter(photo => photo !== filename)])
    axios.post('/api/delete', {filename:filename})
  }
  async function uploadImages(ev){
    const files = ev.target?.files;
    if(files?.length>0){
        const data = new FormData();
        for(const file of files){
            data.append('file',file)
        }
        const res = await axios.post('/api/upload',data)
        setImages(oldImages => {
           return [...oldImages,...res.data.links]
        })
    }
  }
  function removePhoto(ev, filename){
    ev.preventDefault();
    setImages([...editImages.filter(photo => photo !== filename)])
    axios.post('/api/delete', {filename:filename})
  }
  const handleSelectionChange = (selected) => {
    setCategory(selected);
  };
  async function saveEvent(){
    if(title==""){
      toast.error('Başlık alanı boş bırakılamaz')
      return
    }
    if(description==""){
        toast.error('Detay bilgi alanı boş bırakılamaz')
        return
    }
    if(price==""){
        toast.error('Fiyat Alanı boş bırakılamaz')
        return
    }
    if(startDate==""){
        toast.error('Başlangıç tarihi alanı boş bırakılamaz.')
        return
    }
    if(endDate==""){
        toast.error('Bitiş tarihi alanı boş bırakılamaz.')
        return
    }
    if (endDate <= startDate) {
        toast.error('Bitiş tarihi başlangıç tarihinden önce olamaz.')
        return
    }
    if (!session?.user.email) {
        return
    }
    const selectedValues = category.map(option => option.value);
    const categoryList = selectedValues.join(',');
    const data = {title,campsite:placeId,description,price,startDate,endDate,category:categoryList,images,requirement}
    const res = await axios.post('/api/events', {...data,user:session?.user?.email});
    if(res.data=="ok"){
        toast.success('Etkinliğiniz oluşturuldu. Görüntülemek için sayfanızı yenileyiniz.')
    }else{
        toast.error('İşlem tamamlanamadı, lütfen daha sonra tekrar deneyin.')
    }
  }
  
  return (
        <>
          <Modal
                isOpen={isNewEventModalOpen}
                onRequestClose={closeNewEventModal}
                contentLabel="Example Modal"
                >
                <>
                    <div
                    className="
                        justify-center 
                        items-center 
                        flex 
                        overflow-x-hidden 
                        overflow-y-auto 
                        fixed 
                        inset-0 
                        z-50 
                        outline-none 
                        focus:outline-none
                        bg-neutral-800/70
                    "
                    >
                    <div className="
                        relative 
                        w-full
                        md:w-4/6
                        lg:w-3/6
                        xl:w-2/5
                        my-6
                        mx-auto 
                        lg:h-auto
                        md:h-auto
                        lg:mt-36
                        "
                    >
                        {/*content*/}
                        <div className={`
                        translate
                        duration-300
                        h-full
                        `}>
                        <div className="
                            translate
                            h-full
                            lg:h-auto
                            md:h-auto
                            border-0 
                            rounded-lg 
                            shadow-lg 
                            relative 
                            flex 
                            flex-col 
                            w-full 
                            bg-white 
                            outline-none 
                            focus:outline-none
                        "
                        >
                            {/*header*/}
                            <div className="
                            flex 
                            items-center 
                            p-6
                            rounded-t
                            justify-center
                            relative
                            border-b-[1px]
                            "
                            >
                            <button
                                className="
                                p-1
                                border-0 
                                hover:opacity-70
                                transition
                                absolute
                                left-9
                                "
                                onClick={closeNewEventModal}
                            >
                                <IoMdClose size={18} />
                            </button>
                            <div className="text-lg font-semibold">
                              Etkinlik Ekleyin
                            </div>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                              <div >
                                <h2 className="text-2xl mt4">Etkinlik Başlığı</h2>
                                <input
                                  type="text"
                                  placeholder="product name"
                                  value={title}
                                  onChange={ev => setTitle(ev.target.value)}/>
                                <h2 className="text-2xl mt4">Etkinlik Detayları</h2>
                                <input
                                  type="text"
                                  placeholder="product name"
                                  value={description}
                                  onChange={ev => setDescription(ev.target.value)}/>
                                <h2 className="text-2xl mt4">Etkinlik Şartları</h2>
                                <input
                                  type="text"
                                  placeholder="product name"
                                  value={requirement}
                                  onChange={ev => setRequirement(ev.target.value)}/>
                                <h2 className="text-2xl mt4">Fiyat</h2>
                                <input
                                  type="number" placeholder="price"
                                  value={price}  min="0"
                                  onChange={ev => setPrice(ev.target.value)}/>
                                <h2 className="text-2xl mt4">Etkinliğinizi en iyi hangileri tanımıyor?</h2>
                                <label htmlFor="category">Category:</label>
                                <MultiSelect
                                    options={options}
                                    value={category}
                                    onChange={handleSelectionChange}
                                    labelledBy="Select"
                                />
                                <h2 className="text-2xl mt4">Etkinlik tarihleri</h2>
                                <label className="block">Başlangıç:</label>
                                <input type="date"
                                    value={startDate}
                                    onChange={ev => setStartDate(ev.target.value)}/>
                                <label className="block">Bitiş:</label>
                                <input type="date"
                                    value={endDate}
                                    onChange={ev => setEndDate(ev.target.value)}/>
                                <h2 className="text-2xl mt4">Fotoğraflarınızı Düzenleyin</h2>
                                    <div className="mb-2 flex gap-2">
                                        {!!images?.length && images.map(link=>(
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
                                        {!images?.length &&(
                                            <div>yoruma fotoğraf yüklemediniz</div>
                                        )}
                                    </div>
                                <button
                                    onClick={saveEvent}
                                    className="bg-green-900 w-full p-2  text-white rounded-2xl">
                                    Etkinliğinizi Kaydedin
                                </button>
                              </div>
                            </div>
                            {/*header*/}
                            <div className="
                            flex 
                            items-center 
                            p-6
                            py-3
                            my-3
                            rounded-t
                            justify-center
                            relative
                            border-t-[1px]
                            "
                            >
                            <div className="text-lg font-semibold">

                            <button
                              onClick={closeNewEventModal}
                              className="bg-rose-900 w-full p-2 border  text-white rounded-2xl hover:bg-transparent hover:text-rose-900 hover:border hover:border-rose-900">
                              Kapat
                            </button>

                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </>
            </Modal>
            <Modal
                isOpen={isDeleteModalOpen}
                onRequestClose={closeDeleteEventModal}
                contentLabel="Example Modal"
                >
                <>
                    <div
                    className="
                        justify-center 
                        items-center 
                        flex 
                        overflow-x-hidden 
                        overflow-y-auto 
                        fixed 
                        inset-0 
                        z-50 
                        outline-none 
                        focus:outline-none
                        bg-neutral-800/70
                    "
                    >
                    <div className="
                        relative 
                        w-full
                        md:w-4/6
                        lg:w-3/6
                        xl:w-2/5
                        my-6
                        mx-auto 
                        lg:h-auto
                        md:h-auto
                        lg:mt-24
                        "
                    >
                        {/*content*/}
                        <div className={`
                        translate
                        duration-300
                        h-full
                        `}>
                        <div className="
                            translate
                            h-full
                            lg:h-auto
                            md:h-auto
                            border-0 
                            rounded-lg 
                            shadow-lg 
                            relative 
                            flex 
                            flex-col 
                            w-full 
                            bg-white 
                            outline-none 
                            focus:outline-none
                        "
                        >
                            {/*header*/}
                            <div className="
                            flex 
                            items-center 
                            p-6
                            rounded-t
                            justify-center
                            relative
                            border-b-[1px]
                            "
                            >
                            <button
                                className="
                                p-1
                                border-0 
                                hover:opacity-70
                                transition
                                absolute
                                left-9
                                "
                                onClick={closeDeleteEventModal}
                            >
                                <IoMdClose size={18} />
                            </button>
                            <div className="text-lg font-semibold">
                              Etkinliğinizi Silin
                            </div>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                              <p>Etkinliği silmek istediğinize emin misiniz?</p>
                            </div>
                            {/*header*/}
                            <div className="
                            flex 
                            items-center 
                            p-6
                            py-3
                            my-3
                            rounded-t
                            justify-center
                            relative
                            border-t-[1px]
                            "
                            >
                            <div className="text-lg font-semibold">

                            <button
                              onClick={deleteEvent}
                              className="bg-rose-900 w-full p-2 border  text-white rounded-2xl hover:bg-transparent hover:text-rose-900 hover:border hover:border-rose-900">
                              Etkinliği Sil
                            </button>

                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </>
            </Modal>
            <Modal
                isOpen={viewModelIsOpen}
                onRequestClose={closeViewModal}
                contentLabel="Example Modal"
                >
                <>
                    <div
                    className="
                        justify-center 
                        items-center 
                        flex 
                        overflow-x-hidden 
                        overflow-y-auto 
                        fixed 
                        inset-0 
                        z-50 
                        outline-none 
                        focus:outline-none
                        bg-neutral-800/70
                    "
                    >
                    <div className="
                        relative 
                        w-full
                        md:w-4/6
                        lg:w-3/6
                        xl:w-2/5
                        my-6
                        mx-auto 
                        lg:h-auto
                        md:h-auto
                        lg:mt-24
                        "
                    >
                        {/*content*/}
                        <div className={`
                        translate
                        duration-300
                        h-full
                        `}>
                        <div className="
                            translate
                            h-full
                            lg:h-auto
                            md:h-auto
                            border-0 
                            rounded-lg 
                            shadow-lg 
                            relative 
                            flex 
                            flex-col 
                            w-full 
                            bg-white 
                            outline-none 
                            focus:outline-none
                        "
                        >
                            {/*header*/}
                            <div className="
                            flex 
                            items-center 
                            p-6
                            rounded-t
                            justify-center
                            relative
                            border-b-[1px]
                            "
                            >
                            <button
                                className="
                                p-1
                                border-0 
                                hover:opacity-70
                                transition
                                absolute
                                left-9
                                "
                                onClick={closeViewModal}
                            >
                                <IoMdClose size={18} />
                            </button>
                            <div className="text-lg font-semibold">
                              {viewedEventTitle}

                            </div>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                              <div className='flex gap-8 my-3'>
                                {viewedEventImages?.length>0 && viewedEventImages.map(image => (
                                  <ModalImage
                                  key={image}
                                  className='h-24 border rounded-lg shadow'
                                  small={image}
                                  large={image}
                                  alt="Hello World!"
                                  />
                                ))}
                              </div>
                              <h2 className="text-base font-semibold leading-7 text-gray-900 border-t-[1px]">{viewedEventTitle}</h2>
                              <>{viewedEventStartDate} - {viewedEventEndDate}</>
                              <p className="mt-1 text-sm leading-6 text-gray-600 ">
                                {viewedEventDescription}
                              </p>
                              {viewedEventRequirement && (
                                <>
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Etkinliğe Katılım İçin Gerekli Şartlar</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                  {viewedEventRequirement}
                                </p>
                                </>
                              )}
                            </div>
                            {/*header*/}
                            <div className="
                            flex 
                            items-center 
                            p-6
                            py-3
                            my-3
                            rounded-t
                            justify-center
                            relative
                            border-t-[1px]
                            "
                            >
                            <div className="text-lg font-semibold">

                            <button
                              onClick={closeViewModal}
                              className="bg-rose-900 w-full p-2 border  text-white rounded-2xl hover:bg-transparent hover:text-rose-900 hover:border hover:border-rose-900">
                              Kapat
                            </button>

                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </>
            </Modal>
            <Modal
                isOpen={isEditEventModalOpen}
                onRequestClose={ closeEditEventModal}
                contentLabel="Example Modal"
                >
                <>
                    <div
                    className="
                        justify-center 
                        items-center 
                        flex 
                        overflow-x-hidden 
                        overflow-y-auto 
                        fixed 
                        inset-0 
                        z-50 
                        outline-none 
                        focus:outline-none
                        bg-neutral-800/70
                    "
                    >
                    <div className="
                        relative 
                        w-full
                        md:w-4/6
                        lg:w-3/6
                        xl:w-2/5
                        my-6
                        mx-auto 
                        lg:h-auto
                        md:h-auto
                        lg:mt-24
                        "
                    >
                        {/*content*/}
                        <div className={`
                        translate
                        duration-300
                        h-full
                        `}>
                        <div className="
                            translate
                            h-full
                            lg:h-auto
                            md:h-auto
                            border-0 
                            rounded-lg 
                            shadow-lg 
                            relative 
                            flex 
                            flex-col 
                            w-full 
                            bg-white 
                            outline-none 
                            focus:outline-none
                        "
                        >
                            {/*header*/}
                            <div className="
                            flex 
                            items-center 
                            p-6
                            rounded-t
                            justify-center
                            relative
                            border-b-[1px]
                            "
                            >
                            <button
                                className="
                                p-1
                                border-0 
                                hover:opacity-70
                                transition
                                absolute
                                left-9
                                "
                                onClick={closeEditEventModal}
                            >
                                <IoMdClose size={18} />
                            </button>
                            <div className="text-lg font-semibold">
                              Etkinliği Düzenleyin
                            </div>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                              <div >
                                <h2 className="text-2xl mt4">Etkinlik Başlığı</h2>
                                <input
                                  type="text"
                                  placeholder="product name"
                                  value={editTitle}
                                  onChange={ev => setEditTitle(ev.target.value)}/>
                                <h2 className="text-2xl mt4">Etkinlik Detayları</h2>
                                <input
                                  type="text"
                                  placeholder="product name"
                                  value={editDescription}
                                  onChange={ev => setEditDescription(ev.target.value)}/>
                                <h2 className="text-2xl mt4">Etkinlik Şartları</h2>
                                <input
                                  type="text"
                                  placeholder="product name"
                                  value={editRequirement}
                                  onChange={ev => setEditRequirement(ev.target.value)}/>
                                <h2 className="text-2xl mt4">Fiyat</h2>
                                <input
                                  type="text"
                                  placeholder="product name"
                                  value={editPrice}
                                  onChange={ev => setEditPrice(ev.target.value)}/>
                                <h2 className="text-2xl mt4">Etkinlik tarihleri</h2>
                                <label className="block">Başlangıç:</label>
                                <input type="date"
                                    value={editStartDate}
                                    onChange={ev => setEditStartDate(ev.target.value)}/>
                                <label className="block">Bitiş:</label>
                                <input type="date"
                                    value={editEndDate}
                                    onChange={ev => setEditEndDate(ev.target.value)}/>
                                <h2 className="text-2xl mt4">Fotoğraflarınızı Düzenleyin</h2>
                                    <div className="mb-2 flex gap-2">
                                        {!!editImages?.length && editImages.map(link=>(
                                        <div className="h-32 flex relative" key={link}>
                                        <img className="rounded-2xl w-full object-cover" src={link} />
                                        <button onClick={(ev)=>removeEditPhoto(ev,link)} className="absolute bottom-1 right-1 text-white bg-black py-2 px-3 bg-opacity-50 rounded-xl cursor-pointer">
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
                                            <input type="file" className="hidden" onChange={uploadEditImages}/>
                                        </label>
                                        {!editImages?.length &&(
                                            <div>yoruma fotoğraf yüklemediniz</div>
                                        )}
                                    </div>
                                <button
                                    onClick={saveEditedEvent}
                                    className="bg-green-900 w-full p-2  text-white rounded-2xl">
                                    Değişikliği Kaydet
                                </button>
                              </div>
                            </div>
                            {/*header*/}
                            <div className="
                            flex 
                            items-center 
                            p-6
                            py-3
                            my-3
                            rounded-t
                            justify-center
                            relative
                            border-t-[1px]
                            "
                            >
                            <div className="text-lg font-semibold">

                            <button
                              onClick={closeEditEventModal}
                              className="bg-rose-900 w-full p-2 border  text-white rounded-2xl hover:bg-transparent hover:text-rose-900 hover:border hover:border-rose-900">
                              Düzenle
                            </button>

                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </>
            </Modal>
            <ToastContainer />
            <div className="gap-x-8 gap-y-10">
              {owner==session?.user?.email && (
              <a
                href="/events/new" target="_blank"
                className="p-2 gap-2 px-4 border flex w-72 rounded-xl mt-5 hover:bg-transparent shadow hover:shadow-md">
                  <svg aria-hidden="true" className="w-5 h-5 text-yellow-400 mt-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  <p className="font-semibold">Kamp Yerinize Etkinlik Ekleyin</p>
              </a>
              )}
              {events?.length<1 && (
              <div class="flex items-center mb-5 mt-5">
               No events has been added for this camsite
              </div>
              )}
              <div className='lg:grid-cols-3 max-w-none mx-0 mt-20 gap-8 grid-rows-auto grid px-0 md:px-16'>
                {events?.length>0 && events.map(event => (
                  <Link key={event._id} href={'/en/events/'+ event._id} className='pt-80 pb-8 px-8 bg-gray-900 rounded-lg overflow-hidden justify-end flex flex-col isolate relative shadow-lg'>
                    {event.category==="Movement" && event.images.length==0 && (
                      <img class="object-cover inset-0 z-[-10] h-full w-full absolute" src="https://campupp.s3.eu-north-1.amazonaws.com/events-movement.jpg" />
                    )}
                    {event.category==="Hiking"  && event.images.length==0 &&(
                      <img class="object-cover inset-0 z-[-10] h-full w-full absolute" src="https://campupp.s3.eu-north-1.amazonaws.com/events-hiking.jpg" />
                    )}
                    {event.category==="Spor Festivali"  && event.images.length==0 &&(
                      <img class="object-cover inset-0 z-[-10] h-full w-full absolute" src="https://campupp.s3.eu-north-1.amazonaws.com/events-sport-fest.jpg" />
                    )}
                    {event.category==="Müzik Festivali"  && event.images.length==0 &&(
                      <img class="object-cover inset-0 z-[-10] h-full w-full absolute" src="https://campupp.s3.eu-north-1.amazonaws.com/events-music-fest.jpg" />
                    )}
                    {event.category==="Outdoor" && event.images.length==0 &&(
                      <img class="object-cover inset-0 z-[-10] h-full w-full absolute" src="https://campupp.s3.eu-north-1.amazonaws.com/events-outdoor.jpg" />
                    )}
                    {event.category==="Yoga" && event.images.length==0 &&(
                      <img class="object-cover inset-0 z-[-10] h-full w-full absolute" src="https://campupp.s3.eu-north-1.amazonaws.com/events-yoga.jpg" />
                    )}
                    {event.category==="Masaj & Wellness" && event.images.length==0 &&(
                      <img class="object-cover inset-0 z-[-10] h-full w-full absolute" src="https://campupp.s3.eu-north-1.amazonaws.com/events-message.jpg" />
                    )}
                    {event.category==="Çocuklara Özel" && event.images.length==0  &&(
                      <img class="object-cover inset-0 z-[-10] h-full w-full absolute" src="https://campupp.s3.eu-north-1.amazonaws.com/events-kid.jpg" />
                    )}
                    {event.category==="Meditation & İnziva" && event.images.length==0  &&(
                      <img class="object-cover inset-0 z-[-10] h-full w-full absolute" src="https://campupp.s3.eu-north-1.amazonaws.com/events-meditation.jpg" />
                    )}
                    {event.category==="Fitness" && event.images.length==0  &&(
                      <img class="object-cover inset-0 z-[-10] h-full w-full absolute" src="https://campupp.s3.eu-north-1.amazonaws.com/events-fitness.jpg"/>
                    )}
                    {event.images.length!==0  &&(
                      <img class="object-cover inset-0 z-[-10] h-full w-full absolute" src={event.images[0]}/>
                    )}
                    <div class="absolute inset-0 z-[-10] amj amv ani"></div>
                    <div class="absolute inset-0 z-[-10] rounded-lg bbo bbs bcj"></div>
                    <div className='text-white leading-6 font-medium text-base m-0 mt-3 absolute w-full'>
                    </div>
                    <button className="absolute top-3 right-5 text-white bg-yellow-300 py-2 px-3 bg-opacity-80 rounded-xl cursor-pointer flex">
                      {event.category}
                    </button>
                    {event.price=="0" && (
                      <button className="absolute top-3 text-white bg-green-500 py-2 px-3 bg-opacity-80 rounded-xl cursor-pointer flex">
                        Free
                      </button>
                    )}
                    <div className='absolute bottom-0'>
                      <div className='flex'>
                        <MdDateRange className="mr-1.5 h-5 w-5 flex-shrink-0 mt-1 text-white" aria-hidden="true" />
                        <time datetime="2020-02-12" class="text-white mb-4">{event.startDate.substring(0, 10)} / {event.endDate.substring(0, 10)}</time>
                      </div>
                      <div className='mt-2'>
                        <h3 className='text-white leading-6 font-medium text-base mt-5 absolute bottom-20 w-full'>
                          <a>
                            <span className='inset-0 absolute'>{event.title}</span>
                          </a>
                        </h3>
                      </div>
                      
                    </div>
                    
                  </Link>
                ))}  
              </div>
            </div>
        </>
  )
}
export default EventArea;