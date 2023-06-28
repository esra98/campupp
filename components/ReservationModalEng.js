import {useEffect, useState, useRef} from 'react'
import axios from "axios";
import { useSession} from "next-auth/react"
import {useRouter} from "next/router";
import ModalImage from "react-modal-image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Modal from 'react-modal';
import { IoMdClose } from "react-icons/io";
import { AiOutlineDelete,AiOutlineSend } from "react-icons/ai";


const ReservationModal = ({ owner,placeId, placeName, bungalowRentAvailable,isOpen, onRequestClose }) => {
  const {data:session} = useSession();
   
  const [startDate,setStartDate] = useState("");
  const [endDate,setEndDate] = useState("");
  const [isVanPresent,setIsVanPresent] = useState(false);
  const [bungalowRent,setBungalowRent] = useState(false);
  const [personCount,setPersonCount] = useState(1);
  const [reservationName,setReservationName] = useState("");
  const [reservationTelephone,setReservationTelephone] = useState("");
  const [userMessage,setUserMessage] = useState("");

  const router = useRouter();

  async function saveReservation(){
    if(!reservationName){
        toast.error('The name field cannot be left empty. Please provide your name for the reservation request.')
        return
    }
    if(!reservationTelephone){
        toast.error('The phone number field cannot be left empty. Please provide a phone number to be used for your reservation request.')
        return
    }
    if(reservationTelephone){
        const checkPhone = /^(((\+|00)?(90)|0)[-| ]?)?((5\d{2})[-| ]?(\d{3})[-| ]?(\d{2})[-| ]?(\d{2}))$/.test(reservationTelephone)
        if(!checkPhone){
            toast.error('Please enter a valid phone number.')
            return;
        }
    }
    if(startDate==""){
        toast.error('The start date field cannot be left empty. Please provide the start date for your reservation.')
        return
    }
    if(endDate==""){
        toast.error('The end date field cannot be left empty. Please provide the start date for your reservation.')
        return
    }
    if (endDate <= startDate) {
        toast.error('The end date cannot be before the start date. Please make sure the end date of your reservation is after the start date.')
        return
    }
    
    if(personCount==""){
        toast.error('Please enter the number of people for your reservation.')
        return
    }
    if (!session?.user.email) {
        toast.error('To use this feature, you need to log in.')
        return
    }
    const data = {campsite:placeId,startDate,endDate,reservationName,isVanPresent,personCount,reservationTelephone,bungalowRent,userMessage,campsiteName:placeName,campsiteOwner:owner}
    const res = await axios.post('/api/reservation', {...data,user:session?.user?.email});
    if(res.data=="ok"){
        toast.success('Your reservation request has been created. You can check its status on the "My Reservations" page.')
        onRequestClose()
    }else{
        toast.error('The process could not be completed. Please try again later.')
    }
  }
  return (
        <>
          <Modal
                isOpen={isOpen} onRequestClose={onRequestClose}
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
                        md:w-5/6
                        lg:w-5/6
                        xl:w-4/5
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
                            p-3
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
                                onClick={onRequestClose}
                            >
                                <IoMdClose size={18} />
                            </button>
                            <div className="text-lg font-semibold">
                            Create a Reservation Request
                            </div>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Please provide the name and surname to be used for your reservation request.
                                    </label>
                                    <div className="mt-2">
                                        <input
                                        value={reservationName}
                                        onChange={ev => setReservationName(ev.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 mt-3">
                                    Please provide the phone number to be used for your reservation request. <span className='font-normal'>(It will be sent to the campsite)</span>
                                    </label>
                                    <div className="mt-2">
                                        <input
                                        value={reservationTelephone}
                                        onChange={ev => setReservationTelephone(ev.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 mt-3">
                                    How many people are you making the reservation for?
                                    </label>
                                    <div className="mt-2">
                                        <input
                                        type="number" min="1"
                                        value={personCount}
                                        onChange={ev => setPersonCount(ev.target.value)}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 mt-3">
                                    Could you please provide the dates for your reservation?                                    
                                    </label>
                                    <div className='flex gap-6'>
                                        <div>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                            Start Date
                                            </p>
                                            <div className="mt-2">
                                                <input type="date"
                                                    value={startDate}
                                                    onChange={ev => setStartDate(ev.target.value)}/>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">
                                            End Date
                                            </p>
                                            <div className="mt-2">
                                                <input type="date"
                                                    value={endDate}
                                                    onChange={ev => setEndDate(ev.target.value)}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 mt-3">
                                    If you have any message you would like to convey to the campsite regarding your reservation, you can add it in the field below.
                                    </label>
                                    <textarea
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder=" "
                                    value={userMessage} onChange={ev => setUserMessage(ev.target.value)}
                                    />
                                </div>
                                <div className="mt-2">
                                    <fieldset>
                                        {bungalowRentAvailable && (
                                            <div className=" space-y-6">
                                                <div className="relative flex gap-x-3">
                                                    <div className="flex h-6 items-center">
                                                        <input
                                                        onChange={(e) => setBungalowRent(prevCheck => !prevCheck)} checked={bungalowRent}
                                                        type="checkbox"
                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        />
                                                    </div>
                                                    <div className="text-sm leading-6">
                                                        <label htmlFor="comments" className="font-medium text-gray-900">
                                                        Would you be interested in renting a bungalow at the campsite? <span className='font-normal'>(To obtain information about the pricing, please review the campsite page or reach out to the campsite through the &apos;Ask a Question&apos; section.)</span>
                                                        </label>
                                                    </div> 
                                                </div>
                                            </div>
                                        )}
                                        <div className="mt-3 space-y-6">
                                            <div className="relative flex gap-x-3">
                                                <div className="flex h-6 items-center">
                                                    <input
                                                    onChange={(e) => setIsVanPresent(prevCheck => !prevCheck)} checked={isVanPresent}
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                </div>
                                                <div className="text-sm leading-6">
                                                    <label htmlFor="comments" className="font-medium text-gray-900">
                                                    Would you like to stay in a caravan for your accommodation? <span className='font-normal'>(To obtain information about the pricing, please review the campsite page or reach out to the campsite through the &apos;Ask a Question&apos; section.)</span>
                                                    </label>
                                                </div> 
                                            </div>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                            {/*footer*/}
                            <div class="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-200 rounded-md ">
                                <button onClick={onRequestClose} class="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-300">
                                    <AiOutlineDelete className="mr-1.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                    Close
                                </button>
                                <button onClick={saveReservation} class="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-300">
                                    <AiOutlineSend className="mr-1.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                    Save
                                </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </>
          </Modal>
            
        </>
  )
}
export default ReservationModal;