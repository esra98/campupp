import Layout from '@/components/Layout'
import Banner from '@/components/Banner'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import Script from 'next/script'
import Explore from '@/components/ExploreBanner'

export default function Guides() {
  return(
    <Layout>
        <Script src="https://platform-api.sharethis.com/js/sharethis.js#property=649a64799fbe9100124b55e5&product=sticky-share-buttons&source=platform" async="async" strategy="lazyOnload"/>
        <div className="sharethis-sticky-share-buttons"></div>
        <main className="pb-24 bg-opacity-100 bg-white">
          <header className="bg-blend-darken bg-no-repeat bg-center bg-cover bg-[url(https://campupp.s3.eu-north-1.amazonaws.com/contact-bg.jpg)] w-full relative h-96">
            <div className="bg-opacity-50 bg-black w-full h-full left-0 top-0 absolute"></div>
            <div className="pl-4 pr-4 -translate-x-1/2 transform translate-y-[-50%] rotate-0 skew-x-0 skew-y-0 scale-x-1 scale-y-1 max-w-screen-xl w-full mx-auto left-1/2 top-20 absolute">
              <span></span>
            </div>
          </header>
          <div className="bg-opacity-100 bg-[rgb(31 41 55/var(--tw-bg-opacity))] p-9 md:px-20 mx-auto my-[-8rem] rounded-[0.25rem] justify-between flex z-20 relative">
            <article className="lg:flex w-full py-10 md:p-10 shadow text-base rounded-md leading-tight max-w-none bg-white">
              <div className="w-full">
                <h1 className="text-2xl leading-9 font-semibold text-green-800 text-center">Sık Sorulan Sorular</h1>
                <div className="py-8">
                    <div className="w-full px-0 md:px-4 pt-16">
                        <div className="mx-0 w-full rounded-2xl bg-white p-2">
                            <Disclosure>
                            {({ open }) => (
                                <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>CampUpp nedir?</span>
                                    <ChevronUpIcon
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                  CampUpp kamp yapmayı seven veya kamp yapmak isteyen herkesin en uygun karavan veya çadır kamp yerleri bulabileceği bir oluşumdur. CampUpp ile Türkiye’nin her yerinden kamp yapılacak yerlerin işletmecileri ile iletişime geçebilirsin. Ancak CampUpp sadece bununla kalmaz. İnsanların beraber kamp yapabilecekleri arkadaşlar bulmalarını, açık hava etkinliklerinden haberdar olmalarını ve kampçılık hakkında daha fazla bilgi edinmelerini sağlayan bir alan yaratmayı amaçlar. 
                                </Disclosure.Panel>
                                </>
                            )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2">
                            {({ open }) => (
                                <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>Kamp yerleri ile nasıl iletişime geçebilirim? </span>
                                    <ChevronUpIcon
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                Türkiye&apos;deki en güzel kamp yerleri arasından sana uygun olanı seçerek işletmenin sayfasında bulunan telefon, sosyal medya veya mail adreslerini kullanman yetkililer ile iletişime geçmen için yeterli. Ayrıca sağ altta bulunan WhatsApp butonu, işletme ile kolaylıkla iletişime geçmen için özel olarak tasarlandı.                                </Disclosure.Panel>
                                </>
                            )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2">
                            {({ open }) => (
                                <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>Merak ettiğim bir bilgiyi kamp yerinin sayfasında göremedim. Ne yapmalıyım? </span>
                                    <ChevronUpIcon
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                Tercih etmek isteyebileceğin bir kamp yeri hakkında daha fazla bilgiye ihtiyacın varsa veya yetkililere spesifik bir soru sormak istersen kamp alanlarının iletişim bilgilerini kullanabilirsin. Ayrıca seçtiğin kamp alanının sayfasının altında &quot;Kamp Yerine Soru Sorun&quot; yazan ayrı bir bölüm bulunuyor. Bu bölümden işletmeye daha önce sorulan sorulara göz atabilir ve kamp alanı işletmesine istediğin konu hakkında sorabilirsin.                                </Disclosure.Panel>
                                </>
                            )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2">
                            {({ open }) => (
                                <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>Orman veya deniz kenarı kamp alanları arayışındayım. Kamp yerinin bu gibi özelliklere sahip olup olmadığını nasıl öğrenebilirim? </span>
                                    <ChevronUpIcon
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                Türkiye&apos;de kamp alanları oldukça çeşitli ve her ihtiyaca yönelik işletme bulabilmek mümkün. CampUpp içinde sana uygun olan kamp alanını bulmak istiyorsan ana sayfadan sağ üstte bulunan &quot;Filtrele&quot; butonuna basabilirsin. Bastığın zaman açılan kısımdan ihtiyacın olan özellikleri seçerek sana uygun sonuçları daha kolay görebilirsin. Ayrıca kamp yerlerinin sayfalarında tesislerin fotoğraflarının altında ayrıntılı bir şekilde tesislerin sahip oldukları tüm özellikler yazılı bulunuyor.                                  </Disclosure.Panel>
                                </>
                            )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2">
                            {({ open }) => (
                                <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>Seçtiğim kamp alanına nasıl rezervasyon yaptırabilirim?</span>
                                    <ChevronUpIcon
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                Kamp yerlerinin sayfalarında fiyat bilgilerini ve rezervasyon talebi oluşturma butonunu görebilirsin. Bu butona tıkladığında karşına çıkan sayfaya bilgilerini eksiksizce girmen gerekiyor. Doğru bilgileri girdikten sonra aşağıda yer alan kaydet butonuna basmalısın.  
                                </Disclosure.Panel>
                                </>
                            )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2">
                            {({ open }) => (
                                <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>Rezervasyon oluştururken ücreti yatırmam mı gerekiyor? </span>
                                    <ChevronUpIcon
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                Hayır. CampUpp&quot;tan seçtiğin kamp alanına rezervasyon talebi oluştururken hiçbir ücret ödemiyorsun. CampUpp senden hiçbir ücret almadan rezervasyon talebini kamp yerinin işletmecilerine bildirir. Kamp yeri işletmecisi eğer rezervasyonunu kabul ederse yetkililerle iletişime geçerek ücreti nasıl ödeyeceğin hakkında soru sorabilirsin. Pek çok kamp işletmecisi kamp yeri ücretini giriş veya çıkış esnasında tahsil edecektir.                                 </Disclosure.Panel>
                                </>
                            )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2">
                            {({ open }) => (
                                <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>Rezervasyon talebimi oluşturdum. Kamp yerine gidebilir miyim? </span>
                                    <ChevronUpIcon
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                Rezervasyon talebi oluşturduğunda bu rezervasyon yaptırdığın anlamına gelmiyor. Kamp yerine gitmek için rezervasyon talebinin kamp alanı tarafından onaylandığından emin olmalısın. Rezervasyon talebinin onaylanma durumunu sağ üst köşedeki profiline tıkladıktan sonra açılan &quot;Rezervasyon Taleplerim&quot; butonuna basarak taleplerin arasından görüntüleyebilirsin.  
                                </Disclosure.Panel>
                                </>
                            )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2">
                            {({ open }) => (
                                <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>Rezervasyonum hakkında değişiklik yapmak istiyorum. Ne yapmalıyım? </span>
                                    <ChevronUpIcon
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                Rezervasyon taleplerim sayfasına girerek dilediğin zaman taleplerini silebilir ve tarih, kişi sayısı veya değişiklik yapmak istediğin diğer tüm bilgiler ile kamp alanının sayfasından tekrardan rezervasyon talebi oluşturabilirsin. Ancak talebin daha önceden kamp yeri tarafından onaylanmışsa bile yapacağın yeni rezervasyon talebinin kamp yeri işletmecileri tarafından tekrar onaylanmasını beklemen gerekiyor. Bunun yanı sıra rezervasyon talebini iptal etmeden direkt olarak kamp yeri işletmecileri ile iletişime geçerek de ihtiyacın olan konuda değişiklik yapabilmelerinin mümkün olup olmadığını sorabilirsin.                                 </Disclosure.Panel>
                                </>
                            )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2">
                            {({ open }) => (
                                <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>Yaptırdığım bir rezervasyonu istediğim zaman iptal edebilir miyim? </span>
                                    <ChevronUpIcon
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                Rezervasyon talebin henüz kamp alanı tarafından onaylanmamışsa istediğin zaman talebini iptal edebilirsin. Eğer rezervasyon talebin kamp alanı tarafından onaylanmışsa 5 iptal hakkın bulunuyor. 5 adet onaylanmış rezervasyonunu iptal ettiğinde maalesef ki üyeliğin sonlanacaktır. Kamp yerleri seni bekledikleri için başka rezervasyon almamış ve potansiyel müşterilerini kaybetmiş olabileceklerinden onaylanmış rezervasyonlarını mecbur kalmadıkça iptal etmemeni öneririz.  
                                </Disclosure.Panel>
                                </>
                            )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2">
                            {({ open }) => (
                                <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>Kamp alanı tarafından rezervasyon talebim onaylandı. Ancak işletmeye yazdığımda ulaşamıyorum. Yine de belirlenen tarihlerde kamp yerine gitmeli miyim? </span>
                                    <ChevronUpIcon
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                İstediğin kamp yerine rezervasyonun onaylandıktan sonra ve rezervasyon tarihinden önce en az bir kere işletmeciler ile iletişim kurmanı öneririz. Bu sayede sorun yaşanmayacağından emin olursun. Eğer rezervasyon talebin onaylanmışsa ancak işletme tarafından mesajlarına veya aramalarına dönülmüyorsa bizimle iletişime geçmeni öneriyoruz. Aksi bir durumda CampUpp tarafından bir sorumluluk kabul edilmediğini ve bir sorun olduğunda kamp yeri işletmecileri ile çözmen gerektiğini hatırlatırız.                                  </Disclosure.Panel>
                                </>
                            )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2">
                            {({ open }) => (
                                <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>CampUpp’tan rezervasyonumu yaptırdım ve kamp yeri tarafından onaylandı. Ancak kamp alanına gittiğimde yerin dolduğunu söylediler. Ne yapmalıyım? </span>
                                    <ChevronUpIcon
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                Bu tür sorunlar yaşamamak adına, rezervasyon tarihine kadar belirli aralıklarla kamp yerleri ile iletişime geçmeni tavsiye ederiz. Ancak bu tür bir sorun yaşarsan bizimle iletişime geçmeni çok isteriz. CampUpp, kullanıcılarına doğru bilgiler vermeyi önemseyen bir oluşum olduğu için her türlü şikayetini değerlendirmeye alacak ve gerekirse işletmeyi platformumuzdan uzaklaştıracağız.                                
                                </Disclosure.Panel>
                                </>
                            )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2">
                            {({ open }) => (
                                <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>Karavan kampı yapacaksam rezervasyon talebi oluştururken nelere dikkat etmeliyim?</span>
                                    <ChevronUpIcon
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                CampUpp&apos;tan karavan için konaklama alanlarına bakıyorsan öncelikle kamp alanı ararken &quot;Karavana Uygun&quot; seçeneğini işaretlemelisin. Türkiye kamp tesislerinin bir kısmı sadece çadırla bazıları ise hem çadır hem karavanla konaklamaya uygun olabiliyor. Bazı tesisler ise sadece karavan kamp yerlerine sahip olabiliyor. Bu yüzden karavan ile tatil yapacaksan seçtiğin kamp alanının karavan kabul edip etmediğinden emin olmalı ve rezervasyon talebini ondan sonra oluşturmalısın. Ayrıca rezervasyon talebi oluştururken altta bulunan &quot;Karavan ile mi konaklama yapmak istiyorsunuz?&quot; kısmını işaretlemeli ve tesisle iletişime geçtiğinizde tekrardan karavan ile geleceğinizi hatırlatmalısınız.                                  
                                </Disclosure.Panel>
                                </>
                            )}
                            </Disclosure>
                            <Disclosure as="div" className="mt-2">
                            {({ open }) => (
                                <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>Ödemeyi nakit mi yoksa kredi kartı ile mi yapmalıyım?</span>
                                    <ChevronUpIcon
                                    className={`${
                                        open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-purple-500`}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                                CampUpp tarafından hiçbir şekilde ücret alınmadığını bilmeni isteriz. Ödeme kamp alanı işletmecileri ve senin aranda olacak. Kamp yeri tesislerinin sayfasına girdiğinde &;Bu işletmede ödemenizi kredi kartı ile yapabilirsiniz.&quot; yazısını görürsen bu işletmenin kredi kartı ile de ödeme kabul ettiğini gösterir. Aksi halde kamp yeri ödemelerini sadece nakit veya EFT gibi yollarla tahsil ediyor da olabilir. Ödemeler hakkında daha ayrıntılı bilgi için konaklama yapacağın kamp alanı işletmecileri ile iletişime geçmelisin.                                 </Disclosure.Panel>
                                </>
                            )}
                            </Disclosure>
                        </div>
                    </div>
                </div>
              </div>
            </article>
            <aside>

            </aside>
          </div>
        </main> 
        <Banner />
        <Explore />
    </Layout>
)
}
