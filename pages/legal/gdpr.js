import Layout from '@/components/Layout'
import Banner from '@/components/Banner'
import Link from "next/link";
import Head from 'next/head'


export default function GDPR() {
 
  return(
    <Layout>
        <Head>
          <title>Gizlilik Bildirimi </title>
          <meta name="description" content="Bu gizlilik bildirimi, şirket adı CampUpp tarafından işletilen web sitesi kullanıcılarının gizlilik haklarını korumak amacıyla sunulmuştur." />
        </Head>
        <main className="pb-24 bg-opacity-100 bg-white">
          <header className="bg-blend-darken bg-no-repeat bg-center bg-cover bg-[url(https://campupp.s3.eu-north-1.amazonaws.com/blog-bg.jpg)] w-full relative h-96">
            <div className="bg-opacity-50 bg-black w-full h-full left-0 top-0 absolute"></div>
            <div className="pl-4 pr-4 -translate-x-1/2 transform translate-y-[-50%] rotate-0 skew-x-0 skew-y-0 scale-x-1 scale-y-1 max-w-screen-xl w-full mx-auto left-1/2 top-20 absolute">
              <span></span>
            </div>
          </header>
          <div className="bg-opacity-100 bg-[rgb(31 41 55/var(--tw-bg-opacity))] p-9 md:px-20 mx-auto my-[-8rem] rounded-[0.25rem] justify-between flex z-20 relative">
            <article className="lg:flex w-full p-10 shadow text-base rounded-md leading-tight max-w-none bg-white">
              <div className="md:w-full lg:w-2/3">
                <nav className="flex mb-8" aria-label="Breadcrumb">
                  <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                      <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-black">
                        <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                        Anasayfa
                      </Link>
                    </li>
                  </ol>
                </nav>
                <h1 className="text-2xl leading-9 font-semibold text-green-800">Gizlilik Bildirimi </h1>
                <p>
                Bu gizlilik bildirimi, şirket adı CampUpp tarafından işletilen web sitesi kullanıcılarının gizlilik haklarını korumak amacıyla sunulmuştur. Lütfen bu Bildirim&apos;i dikkatlice okuyun, çünkü web sitemizi kullanarak ve hizmetlerimizden yararlanarak bu Bildirim&apos;i kabul etmiş oluyorsunuz. 
                </p>
                <h3>Kişisel Verilerin Toplanması ve Kullanımı </h3>
                <p>
                Şirket, web sitemizde gezinirken veya hizmetlerimizden yararlanırken Kullanıcılar&apos;dan bazı kişisel bilgileri toplayabilir. Bu kişisel bilgiler, Kullanıcılar&apos;ın Google hesapları aracılığıyla sağladığı ad, fotoğraf, e-posta adresi ve profil bilgileri gibi bilgileri içerebilir. 
                </p>
                <p>
                Bu kişisel bilgiler, aşağıdaki amaçlarla toplanabilir ve kullanılabilir: 
                </p>
                <ul>
                    <li>Kullanıcıların web sitemizdeki hizmetlerden yararlanabilmelerini sağlamak</li>
                    <li>Kullanıcı taleplerini yerine getirmek ve sorularını yanıtlamak</li>
                    <li>Web sitemizin performansını ve kullanıcı deneyimini iyileştirmek</li>
                    <li>Kullanıcıların birbirleriyle iletişim kurmalarını ve kamp arkadaşı bulmalarını sağlamak</li>
                    <li>Web sitemizdeki etkinlikleri analiz etmek ve istatistiksel amaçlarla kullanmak</li>
                </ul>
                <h3>Kişisel Verilerin Paylaşılması </h3>
                <p>
                Şirket, Kullanıcılar&apos;ın kişisel bilgilerini yasal zorunluluklar veya açık rızaları olmadan üçüncü taraflarla paylaşmayacaktır. Ancak, aşağıdaki durumlar dışında Kullanıcılar&apos;ın kişisel bilgilerini üçüncü taraflarla paylaşabiliriz: 
                </p>
                <ul>
                    <li>Hizmet sağlayıcılar: Web sitemizle ilgili hizmetler sunan tedarikçilerle kişisel bilgilerin paylaşılması (örneğin, sunucu barındırma hizmetleri, veritabanı yönetimi, analitik hizmetleri). </li>
                    <li>Hukuki gereklilikler: Yasal yükümlülüklerin yerine getirilmesi veya yasal bir talep karşılanması durumunda kişisel bilgilerin paylaşılması. </li>
                    <li>Kullanıcıların rızası: Kullanıcıların açık rızası olması durumunda kişisel bilgilerin paylaşılması. </li>
                </ul>
                <h3>Veri Güvenliği </h3>
                <p>Şirket, Kullanıcılar&apos;ın kişisel bilgilerinin güvenliğini sağlamak için uygun teknik ve organizasyonel önlemler almaktadır. Ancak, internet üzerinden yapılan iletişimde tam bir güvenlik sağlanamayacağını ve bilgilerin yetkisiz erişim, kullanım veya ifşa edilmesi riskinin bulunduğunu lütfen unutmayın. </p>
                <h3>Kullanıcı Hakları </h3>
                <p>Kullanıcılar, kişisel bilgileri hakkında aşağıdaki haklara sahiptir: </p>
                <ul>
                    <li>Kişisel bilgilerine erişim hakkı</li>
                    <li>Kişisel bilgilerinin düzeltilmesi veya güncellenmesi hakkı</li>
                    <li>Kişisel bilgilerinin silinmesi hakkı</li>
                    <li>Kişisel bilgilerinin işlenmesine itiraz etme hakkı</li>
                </ul>
                <p>Kullanıcılar, bu haklarını kullanmak veya kişisel verileriyle ilgili herhangi bir sorunuz veya şikayetiniz varsa bizimle &lsquo;info@campupp.com&lsquo; mail adresi üzerinden iletişime geçebilirler.</p>
              </div>
            </article>
          </div>
        </main> 
        <Banner />
    </Layout>
)
}