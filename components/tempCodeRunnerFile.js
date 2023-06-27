    <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
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
                                onClick={closeModal}
                            >
                                <IoMdClose size={18} />
                            </button>
                            <div className="text-lg font-semibold">
                                Yorum Ekleyin
                            </div>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                            <div >
                                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                                        <input type="checkbox" value="checked" onChange={(e) => setAnonymous(prevCheck => !prevCheck)} checked={anonymous}/>
                                        <span>Yorumu anonim olarak ekle</span>
                                    </label>
                                    <h2 className="text-2xl mt4">Yorum Başlığı</h2>
                                    <input
                                    type="text"
                                    placeholder="product name"
                                    value={commentTitle}
                                    onChange={ev => setCommentTitle(ev.target.value)}/>
                                    <h2 className="text-2xl mt4">Yorum Metni</h2>
                                    <textarea
                                    placeholder="description"
                                    value={commentDetail}
                                    onChange={ev => setCommentDetail(ev.target.value)}
                                    />  
                                    <h2 className="text-2xl mt4">Puanınız (5 üzerinden)</h2>
                                    <input
                                    type="number" placeholder="price"
                                    value={commentPoint}
                                    onChange={ev => setCommentPoint(ev.target.value)}
                                    />
                                    <h2 className="text-2xl mt4">Fotoğraflarınızı Yükleyin</h2>
                                    <div className="mb-2 flex gap-2">
                                        {!!commentImages?.length && commentImages.map(link=>(
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
                                        {!commentImages?.length &&(
                                            <div>yoruma fotoğraf yüklemediniz</div>
                                        )}
                                    </div>
                                    <button
                                    onClick={saveComment}
                                    id="saveBtn"
                                    className="bg-green-900 w-full p-2  text-white rounded-2xl">
                                    Kaydet
                                    </button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </>
            </Modal>