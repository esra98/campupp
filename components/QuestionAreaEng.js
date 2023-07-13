import { useEffect, useState } from 'react'
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react"
import {useRouter} from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Modal from 'react-modal';
import { IoMdClose } from "react-icons/io";
import { BsArrowReturnRight } from "react-icons/bs";
import { FaQuestion,FaReplyAll } from "react-icons/fa";
import { AiOutlineDelete,AiOutlineSend} from "react-icons/ai";

const QuestionArea = ({ placeId, owner }) => {
  const {data:session} = useSession();
  const [editedCommentImages,setEditedCommentImages] = useState("");
  const [repliedQuestionId,setRepliedQuestionId] = useState("");
  const [replyModelIsOpen, setReplyModelIsOpen] = useState(false);
  const [questions, setQuestions] = useState(null)
  const [replyText, setReplyText] = useState("")
  const [questionText, setQuestionText]= useState("")
  const [questionAnonymous,setQuestionAnonymous]= useState(false)
  const [modalQuestionIsOpen, setModalQuestionIsOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletedQuestionId,setDeletedQuestionId] = useState("");
  const router = useRouter();
  const {id} = router.query;
  console.log(id)
  useEffect(()=>{
    if(!id){
        return;
    }else{
        axios.get('/api/question?campsite='+id).then(response => {
            setQuestions(response.data);
        });
    }
  }, [id])
  async function deleteQuestion(question_id){
    await axios.delete('/api/comment?id='+question_id);
    toast.success('Question deleted')
    setQuestions(questions.filter(item => item._id !== question_id))
    closeDeleteEventModal()
  }
  function openReplyModal() {
    if(!session?.user?.email){
        toast.error('To use this feature, you need to first sign up on our website.')
      }
      else{
        setReplyModelIsOpen(true);
      }
  }

  function closeReplyModal() {
    setReplyModelIsOpen(false);
  }
  async function saveReplyQuestion(){
    if(repliedQuestionId){        
        const res = await axios.put('/api/question', {replyText,_id:repliedQuestionId});
        if(res.data == "ok"){
          window.location.reload();
        }else{
          toast.error('An error occurred. Please try again later.')
        }
      }
      else{
          toast.error('An error occurred. Please try again later.')
      }
    }    
 
  function openQuestionModal() {
    if(!session?.user?.email){
        toast.error('To use this feature, you need to first sign up on our website.')
      }
      else{
        setModalQuestionIsOpen(true);
      }

  }
  function closeQuestionModal() {
      setModalQuestionIsOpen(false);
  }
  const modalStyles = {
      overlay: {
          margin:"0px",
          padding:"0px",
      }
      
  }; 
  async function saveQuestion(){
    if(questionText==""){
        toast.error('Question area can not be left blank.')
        return
    }
    const data = {
        askedBy:session?.user.email,askedTo:placeId,anonymous:questionAnonymous,questionText,replyText:""
    };
    const res = await axios.post('/api/question', data);
    if(res.data=="ok"){
      window.location.reload();
    }else{
      toast.error('An error occurred. Please try again later.')
    }
    closeQuestionModal()
  }
  function closeDeleteEventModal() {
    setIsDeleteModalOpen(false);
  }
  return (
        <>
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
                                Delete Question
                            </div>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                              <p>Are you sure to delete your question?</p>
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
                              onClick={()=>{deleteQuestion(deletedQuestionId)}}
                              className="bg-rose-900 w-full p-2 border  text-white rounded-2xl hover:bg-transparent hover:text-rose-900 hover:border hover:border-rose-900">
                              Delete Question
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
                isOpen={replyModelIsOpen}
                onRequestClose={closeReplyModal}
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
                        h-full 
                        lg:h-auto
                        md:h-auto
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
                                onClick={closeReplyModal}
                            >
                                <IoMdClose size={18} />
                            </button>
                            <div className="text-lg font-semibold">
                                Reply Question
                            </div>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                            <div>
                              <div >
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                  Reply Text
                                </label>
                                <textarea
                                  rows={3}
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  placeholder=" "
                                  value={replyText} onChange={ev => setReplyText(ev.target.value)}
                                />
                              </div>
                            </div>
                        </div>
                        {/*footer*/}
                        <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-200 rounded-md ">
                                  <button onClick={closeReplyModal} className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-300">
                                    <AiOutlineDelete className="mr-1.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                      Close
                                  </button>
                                  <button onClick={saveReplyQuestion} className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-300">
                                    <AiOutlineSend className="mr-1.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                      Save Answer
                                  </button>
                                </div> 
                          </div>
                        </div>
                    </div>
                    </div>
                </>
          </Modal>
          <Modal
              isOpen={modalQuestionIsOpen}
              onRequestClose={closeQuestionModal}
              style={modalStyles}
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
                    h-full 
                    lg:h-auto
                    md:h-auto
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
                            onClick={closeQuestionModal}
                          >
                            <IoMdClose size={18} />
                          </button>
                          <div className="text-lg font-semibold">
                            Ask a question to this campsite
                          </div>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                          <div >
                            <div className="mt-2">
                                <fieldset>
                                  <div className="space-y-6">
                                    <div className="relative flex gap-x-3">
                                      <div className="flex h-6 items-center">
                                        <input
                                          onChange={(e) => setQuestionAnonymous(prevCheck => !prevCheck)} checked={questionAnonymous}
                                          type="checkbox"
                                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                      </div>
                                      <div className="text-sm leading-6">
                                        <label htmlFor="comments" className="font-medium text-gray-900">
                                        If you want to ask your question anonymously, please select the checkbox next to it.
                                        </label>
                                      </div> 
                                    </div>
                                  </div>
                                </fieldset>
                              </div>
                              <div>
                              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 mt-3">
                                Your question
                              </label>
                              <textarea
                                rows={3}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder=" "
                                value={questionText} onChange={ev => setQuestionText(ev.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        {/*footer*/}
                        <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-200 rounded-md ">
                              <button onClick={closeQuestionModal} className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-300">
                                <AiOutlineDelete className="mr-1.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                  Close
                              </button>
                              <button onClick={()=>{saveQuestion();setModalQuestionIsOpen(false);}} className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-300">
                                <AiOutlineSend className="mr-1.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
                                  Save Question
                              </button>
                            </div> 
                      </div>
                    </div>
                  </div>
                </div>
              </>
          </Modal>
          <ToastContainer />
          <div>
            <div className="flex justify-start md:justify-end">
              {questions?.length<1 && (
              <div>
                <div className="gap-2 px-4 py-2 flex rounded-xl hover:bg-transparent">
                  No question has been asked yet.
                </div>
              </div>
              )}
              <div>
                <button onClick={() => openQuestionModal()}  className="p-2 gap-2 px-4 border flex rounded-xl  hover:bg-transparent shadow hover:shadow-md">
                  <FaQuestion className="mr-1.5 h-5 w-5 flex-shrink-0 mt-1 text-cc-primary" aria-hidden="true" />
                  <p className="font-semibold">Ask question to this campsite</p>
                </button>
              </div>
            </div>
            <ul>
            {questions?.length>0 && questions.map(question => (
              <li key={question._id} className="px-5 w-full py-3 shadow rounded-md px-18 mt-5">
                <div className="flex gap-x-4 px-8 py-4">
                  <div className="min-w-0">
                    {question?.anonymous && (
                    <h3 className='font-medium'>Anonymous</h3>
                    )}
                    {!question?.anonymous && (
                    <h3 className='font-medium'>{question?.askedBy}</h3>
                    )}
                    <time dateTime={question?.createdAt} className='text-xs text-gray-500'>{question?.createdAt.substring(0, 10)}</time>
                    <p className="font-small leading-7 text-gray-500 mt-1">{question?.questionText}</p>
                    {question?.replyText && (
                      <>
                      <div>
                        <h3 className='font-xs underline'>Host answer</h3>
                      </div>
                      <p className="font-small leading-7 text-gray-500 flex">
                        <BsArrowReturnRight className="mr-1.5 h-5 w-5 flex-shrink-0 mt-1 text-cc-primary" aria-hidden="true" />
                        {question?.replyText}</p>
                      </>
                      
                    )}
                  </div>
                </div>
                {question?.askedBy==session?.user?.email && (
                <div className='grid justify-items-end w-full'>
                  <div className='flex gap-2'>
                    <button onClick={()=>{setDeletedQuestionId(question._id); setIsDeleteModalOpen(true)}}  className="p-2 gap-2 px-4 border flex rounded-xl  hover:bg-transparent shadow hover:shadow-md">
                      <AiOutlineDelete className="h-5 w-5 flex-shrink-0 mt-1 text-red-700" aria-hidden="true" />
                    </button>
                  </div>
                </div>   
                )}
                {owner==session?.user?.email && (
                <div className='grid justify-items-end w-full mt-5'>
                  <div className='flex gap-2'>
                    <button onClick={()=>{openReplyModal();setRepliedQuestionId(question._id)}} className="p-2 gap-2 px-4 border flex rounded-xl  hover:bg-transparent shadow hover:shadow-md">
                      <FaReplyAll className="h-5 w-5 flex-shrink-0 mt-1 text-red-700" aria-hidden="true" />
                      Answer
                    </button>
                  </div>
                </div>   
                )}
              </li>
            ))}  
            </ul>
          </div>
        </>
  )
}
export default QuestionArea;