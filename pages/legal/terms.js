import Layout from '@/components/Layout'
import Banner from '@/components/Banner'
import Link from "next/link";
import Head from 'next/head'


export default function BlogPost({title, content, image, shortDesc }) {
 
  return(
    <Layout>
        <Head>
          <title>Kullanım Koşulları</title>
          <meta name="description" content='CampUpp web sitesini ("Site") ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda aşağıdaki kullanım koşullarını kabul etmiş olursunuz. Lütfen bu koşulları dikkatlice okuyun. ' />
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
                <h1 className="text-2xl leading-9 font-semibold text-green-800">Kullanım Koşulları </h1>
                <p>
                CampUpp web sitesini (&lsquo;Site&lsquo;) ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda aşağıdaki kullanım koşullarını kabul etmiş olursunuz. Lütfen bu koşulları dikkatlice okuyun. 
                </p>
                <h3>Site Kullanımı ve İçeriği </h3>
                <p>
                a. Site, Türkiye&apos;deki kamp alanlarını aramak, rezervasyon yapmak ve kamp alanları hakkında bilgi edinmek için kullanılabilir. 
                </p>
                <p>
                b. CampUpp, kamp alanı rezervasyonlarından veya kamp alanları hakkında sağlanan bilgilerden sorumlu değildir. Bu bilgiler, kamp alanları tarafından sağlanır ve sadece referans amaçlıdır. Rezervasyonların doğruluğu ve hizmetlerin kalitesi kamp alanlarına aittir. 
                </p>
                <h3>Üyelik Hesapları </h3>
                <p>
                a. Siteye üye olurken Google hesabınızı kullanabilirsiniz. Bu durumda, Google&apos;ın gizlilik politikası da geçerli olacaktır. 
                </p>
                <p>
                b. Üyelik hesabınızı güvende tutmak ve erişimi sınırlamak sizin sorumluluğunuzdadır. 
                </p>
                <p>
                c. Üyelik hesabınızı başkalarıyla paylaşmamalı ve başka kullanıcıların hesaplarını izinsiz olarak kullanmamalısınız. 
                </p>
                <h3>
                Kullanıcı İçeriği 
                </h3>
                <p>
                a. Site üzerinden yapılan yorumlar, puanlamalar ve iletiler (&lsquo;Kullanıcı İçeriği&lsquo;) kullanıcıların kendi sorumluluğundadır. 
                </p>
                <p>
                b. Kullanıcı İçeriği, başkalarının fikri mülkiyet haklarını ihlal etmemeli veya yasa dışı, saldırgan, hakaret içeren veya uygunsuz içerikler içermemelidir. 
                </p>
                <p>
                c. CampUpp, Kullanıcı İçeriği&apos;nin doğruluğunu veya güvenilirliğini garanti etmez. Kullanıcılar, Kullanıcı İçeriği&apos;ni kendi sorumluluklarına göre kullanmalıdır. 
                </p>
                <h3>Yasaklar </h3>
                <p>Siteyi kullanırken aşağıdaki faaliyetler yasaktır:</p>
                <ul>
                    <li>Yasalara aykırı veya hileli davranışlar</li>
                    <li>Diğer kullanıcıların gizlilik haklarını ihlal etmek</li>                    
                    <li>Siteye zarar vermek, ağa saldırmak veya sistemlere müdahale etmek</li>
                    <li>Siteye zarar vermek, ağa saldırmak veya sistemlere müdahale etmek</li>
                </ul>
                <h3>Siteye zarar vermek, ağa saldırmak veya sistemlere müdahale etmek</h3>
                <ul>
                    <li>CampUpp, Site üzerinden sunulan bilgilerin doğruluğunu, eksiksizliğini veya güncelliğini garanti etmez.</li>
                    <li>CampUpp, Siteye erişimde veya kullanımda meydana gelen kesintiler, hatalar veya veri kayıpları nedeniyle sorumluluk kabul etmez.</li>
                </ul>
                <h3>Fikri Mülkiyet Hakları </h3>
                <ul>
                    <li>Site üzerindeki tüm içerik ve materyaller CampUpp veya ilgili sahiplerinin mülkiyetindedir. </li>
                    <li>CampUpp&apos;un yazılı izni olmadan, Site üzerindeki herhangi bir içeriği kopyalamak, değiştirmek, dağıtmak veya yayınlamak yasaktır.</li>
                </ul>
                <h3>Diğer Sitelere Bağlantılar </h3>
                <p>Site, üçüncü taraf web sitelerine veya kaynaklara bağlantılar içerebilir. Bu bağlantılar, sadece kullanıcıların kolaylık sağlaması içindir. CampUpp, bu web sitelerinin içeriklerinden veya kullanımından sorumlu değildir.</p>
                <h3>Değişiklik ve Sonlandırma </h3>
                <ul>
                    <li>CampUpp, kullanım koşullarını dilediği zaman değiştirme veya sonlandırma hakkını saklı tutar.</li>
                    <li>Kullanıcılar, Siteyi kullanmaya devam etmekle değişiklikleri kabul etmiş sayılır. </li>
                </ul>
                <p>Herhangi bir soru, öneri veya şikayetiniz varsa, lütfen &lsquo;info@campupp.com&lsquo; mail adresinden bize ulaşın. </p>
              </div>
            </article>
          </div>
        </main> 
        <Banner />
    </Layout>
)
}