import { Fragment, useState } from 'react';
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from '@react-google-maps/api';
import Layout from '@/components/Layout';
import Banner from '@/components/Banner';

let anticsIcon = "https://campupp.s3.eu-north-1.amazonaws.com/antics-icon.png" 
let naturalIcons = "https://campupp.s3.eu-north-1.amazonaws.com/naturals-icon.png"
let nationalIcons = "https://campupp.s3.eu-north-1.amazonaws.com/national-parks-icon.png"
let beachesIcons = "https://campupp.s3.eu-north-1.amazonaws.com/beaches-icon.png"
let trekkingIcons = "https://campupp.s3.eu-north-1.amazonaws.com/trekking-icon.png"

const markers = [
  {
    id: 1,
    name: 'Efes Antik Kenti',
    type: 'antics',
    position:{ lat: 37.9394, lng: 27.3414 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Efes Antik Kenti, Anadolu'nun en büyük ve en önemli antik kentlerinden biridir. Büyüleyici Artemis Tapınağı, Büyük Tiyatro ve Celsus Kütüphanesi gibi görkemli yapılarıyla ünlüdür.",
    icon: anticsIcon
  },
  {
    id: 2,
    name: 'Perge Antik Kenti',
    type: 'antics',
    position:{ lat: 36.9042, lng: 30.6667 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Perge Antik Kenti, Pamfilya'nın en önemli şehirlerinden biridir. Bu antik kent, etkileyici tiyatrosu, agora (meydan) alanı ve kalıntılarıyla ziyaretçilerini tarihin derinliklerine götürür.",
    icon: anticsIcon
  },
  {
    id: 3,
    name: 'Aspendos Antik Tiyatrosu',
    type: 'antics',
    position:{ lat: 36.9831, lng: 31.1256 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Aspendos Antik Tiyatrosu, Roma döneminden günümüze ulaşan en iyi korunmuş antik tiyatrolardan biridir. Eşsiz akustiği ve büyüleyici mimarisiyle ünlüdür.",
    icon: anticsIcon
  },
  {
    id: 4,
    name: 'Hierapolis Antik Kenti',
    type: 'antics',
    position:{ lat: 37.9214, lng: 29.1212 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Hierapolis Antik Kenti, Pamukkale'nin hemen yanında yer alır. Bu antik kent, antik Roma dönemine ait kalıntıları, büyüleyici tiyatrosu ve ünlü termal su kaynaklarıyla ziyaretçilerine benzersiz bir deneyim sunar.",
    icon: anticsIcon
  },
  {
    id: 5,
    name: 'Afrodisias Antik Kenti',
    type: 'antics',
    position:{ lat: 37.7177, lng: 28.7239 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Afrodisias Antik Kenti, antik çağda Afrodit'e adanmış bir kentti. Kent, muhteşem tiyatrosu, stadyumu ve ünlü Afrodit Tapınağı ile bilinir.",
    icon: anticsIcon
  },
  {
    id: 6,
    name: 'Side Antik Kenti',
    type: 'antics',
    position:{ lat: 36.7643, lng: 31.3938 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Side Antik Kenti, Akdeniz kıyısında yer alır ve tarihi M.Ö. 7. yüzyıla kadar uzanır. Antik tiyatrosu, agora'sı ve Roma dönemine ait kalıntılarıyla ünlüdür.",
    icon: anticsIcon
  },
  {
    id: 7,
    name: 'Sagalassos Antik Kenti',
    type: 'antics',
    position:{ lat: 37.6032, lng: 30.4722 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Sagalassos Antik Kenti, Toros Dağları'nda yer alan bir antik kenttir. Muhteşem manzaraları, tiyatrosu ve Agora'sı ile dikkat çeker.",
    icon: anticsIcon
  },
  {
    id: 8,
    name: 'Pergamon Antik Kenti',
    type: 'antics',
    position:{ lat: 39.1264, lng: 27.1827 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Pergamon Antik Kenti, antik çağın önemli bir merkeziydi. Büyüleyici manzaraları, tiyatrosu, Zeus Altarı ve kütüphanesiyle ünlüdür.",
    icon: anticsIcon
  },
  {
    id: 9,
    name: 'Xanthos Antik Kenti',
    type: 'antics',
    position:{ lat: 36.3827, lng: 29.3162 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Xanthos Antik Kenti, Likya'nın başkenti olarak bilinir. UNESCO Dünya Mirası Listesi'nde yer alır ve kalıntıları arasında tiyatro, tapınaklar ve anıtlar bulunur.",
    icon: anticsIcon
  },
  {
    id: 10,
    name: 'Troya Antik Kenti',
    type: 'antics',
    position:{ lat: 39.9572, lng: 26.2386 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Troya Antik Kenti, efsanevi Truva Savaşı'nın yer aldığı antik bir kenttir. Tarihi ve mitolojik önemiyle ünlüdür ve kazılar sırasında keşfedilen kalıntılarıyla ziyaretçileri büyüler.",
    icon: anticsIcon
  },
  {
    id: 11,
    name: 'Termessos Antik Kenti',
    type: 'antics',
    position: { lat: 36.9568, lng: 30.5072 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Termessos Antik Kenti, Toros Dağları'nın eteklerinde konumlanmış bir kenttir. Doğal güzellikleri, savunma duvarları ve tiyatrosuyla ünlüdür.",
    icon: anticsIcon
  },
  {
    id: 12,
    name: 'Milet Antik Kenti',
    type: 'antics',
    position:{ lat: 37.5146, lng: 27.2742 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Milet Antik Kenti, antik dönemin en önemli liman kentlerinden biriydi. Büyük Agora, tiyatro ve ünlü Didyma Tapınağı kalıntılarıyla ziyaretçilerini etkiler.",
    icon: anticsIcon
  },
  {
    id: 13,
    name: 'Myra Antik Kenti',
    type: 'antics',
    position:{ lat: 36.2493, lng: 29.9938 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Myra Antik Kenti, Likya bölgesinde yer alan bir antik kenttir. Ünlü tiyatrosu, mezar anıtları ve St. Nicholas Kilisesi ile dikkat çeker.",
    icon: anticsIcon
  },
  {
    id: 14,
    name: 'Aphrodisias Antik Kenti',
    type: 'antics',
    position:{ lat: 37.7182, lng: 28.7201 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Aphrodisias Antik Kenti, antik çağda Afrodit'e adanmış bir kentti. Heykeltıraşlık okulu, tiyatrosu ve büyüleyici Afrodit Tapınağı ile ünlüdür.",
    icon: anticsIcon
  },
  {
    id: 15,
    name: 'Sardes Antik Kenti',
    type: 'antics',
    position: { lat: 38.4811, lng: 28.0229 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Sardes Antik Kenti, Lidya Krallığı'nın başkenti olan tarihi bir kenttir. Artemis Tapınağı, Gymnasium ve Kral Yolu üzerindeki kalıntılarıyla ziyaretçilerine tarihi bir yolculuk sunar.",
    icon: anticsIcon
  },
  {
    id: 38,
    name: 'Nemrut Dağı Kalıntıları',
    type: 'antics',
    position: { lat: 37.9659, lng: 38.7321 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Nemrut Dağı, Adıyaman'da bulunan tarihi bir alan olup, Kommagene Krallığı'nın kral mezarlarını içerir. En önemli özelliği, devasa heykelleri ve güneş doğarken veya batarken yaratılan eşsiz manzarasıdır. Bu antik mezarlar ve heykeller, tarihi ve arkeolojik önemiyle birlikte doğal güzellikleriyle de büyüleyici bir deneyim sunar.",
    icon: anticsIcon
  },
  {
    id: 39,
    name: 'Göbekli Tepe',
    type: 'antics',
    position:  { lat: 37.2230, lng: 38.9227 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Göbekli Tepe, dünyanın en eski tapınak kompleksi olarak kabul edilir ve M.Ö. 9. binyıla kadar uzanan tarihiyle insanlık tarihinde önemli bir dönüm noktasını temsil eder.",
    icon: anticsIcon
  },
  {
    id: 40,
    name: 'Ani Harabeleri',
    type: 'antics',
    position: { lat: 40.5064, lng: 43.5737 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Ani Harabeleri, Kars'ın sınırları içinde yer alan bir tarihi mekandır ve Ortaçağ döneminde önemli bir merkez olan eski bir Ortaçağ kentidir.",
    icon: anticsIcon
  },
  {
    id: 41,
    name: 'Alahan Manastırı',
    type: 'antics',
    position: { lat: 36.5462, lng: 33.0789 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Alahan Manastırı, Mersin'in Mut ilçesinde yer alır ve Bizans dönemine ait önemli bir yapıdır. Etkileyici mimarisi ve freskleriyle dikkat çeker ve inanç turizmi için önemli bir merkezdir.",
    icon: anticsIcon
  },




  {
    id: 16,
    name: 'Kaçkar Dağları Milli Parkı',
    type: 'nationalParks',
    position: { lat: 40.9509, lng: 41.1375 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Kaçkar Dağları Milli Parkı, Doğu Karadeniz'in muhteşem manzaralarına ev sahipliği yapar. Yüksek dağları, buzul gölleri ve zengin biyolojik çeşitliliğiyle bilinir.",
    icon: nationalIcons
  },
  {
    id: 17,
    name: 'Olympos Beydağları Milli Parkı',
    type: 'nationalParks',
    position:  { lat: 36.4632, lng: 30.4256 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Olympos Beydağları Milli Parkı, Antalya'nın doğal güzelliklerle dolu bir bölgesidir. Sahil şeridi, ormanları ve tarihi Olympos şehri ile ünlüdür.",
    icon: nationalIcons
  },
  {
    id: 18,
    name: 'Yedigöller Milli Parkı',
    type: 'nationalParks',
    position: { lat: 40.2786, lng: 31.0024 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Yedigöller Milli Parkı, Bolu'nun Gölcük Tabiat Parkı içinde yer alan büyüleyici bir doğal alanı kapsar. Yedi adet gölden oluşan manzarası, yürüyüş parkurları ve çam ormanlarıyla ünlüdür. Ziyaretçilere doğanın sakinliğini ve güzelliğini sunan harika bir kaçış noktasıdır.",
    icon: nationalIcons
  },
  {
    id: 19,
    name: 'Köprülü Kanyon Milli Parkı',
    type: 'nationalParks',
    position: { lat: 37.0131, lng: 31.1152 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Köprülü Kanyon Milli Parkı, Antalya'nın Manavgat ilçesinde yer alır. Harika kanyonu, rafting imkanları ve doğal güzellikleriyle ünlüdür.",
    icon: nationalIcons
  },
  {
    id: 20,
    name: 'Munzur Vadisi Milli Parkı',
    type: 'nationalParks',
    position: { lat: 39.3515, lng: 39.1802 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Munzur Vadisi Milli Parkı, Tunceli'nin doğal güzelliklerini koruyan bir parktır. Dağlar, vadiler, şelaleler ve zengin flora-fauna çeşitliliğiyle dikkat çeker.",
    icon: nationalIcons
  },
  {
    id: 21,
    name: 'Kazdağı Milli Parkı',
    type: 'nationalParks',
    position: { lat: 40.2786, lng: 31.0024 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Kazdağı Milli Parkı, Çanakkale'nin doğal güzelliklerine ev sahipliği yapar. Yemyeşil ormanları, endemik bitki türleri ve trekking rotalarıyla tanınır.",
    icon: nationalIcons
  },
  {
    id: 22,
    name: 'Kızılırmak Delta Sulak Alanı Milli Parkı',
    type: 'nationalParks',
    position: { lat: 40.8722, lng: 34.7983 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Kızılırmak Delta Sulak Alanı Milli Parkı, Kızılırmak Nehri'nin Karadeniz'e döküldüğü bir doğa harikasıdır. Kuş gözlemciliği için önemli bir noktadır.",
    icon: nationalIcons
  },
  {
    id: 23,
    name: 'Beyşehir Gölü Milli Parkı',
    type: 'nationalParks',
    position:  { lat: 37.7691, lng: 31.6748 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Beyşehir Gölü Milli Parkı, Konya'nın en büyük gölü olan Beyşehir Gölü çevresinde yer alır. Göçmen kuşların uğrak noktası ve doğal güzellikleriyle ünlüdür.",
    icon: nationalIcons
  },
  {
    id: 24,
    name: 'Akyatan Gölü Milli Parkı',
    type: 'nationalParks',
    position: { lat: 40.2786, lng: 31.0024 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Akyatan Gölü Milli Parkı, Adana'nın doğal güzelliklerinden biridir. Sulak alanı, flamingoları ve diğer su kuşlarıyla ünlüdür.",
    icon: nationalIcons
  },
  {
    id: 25,
    name: 'Altınbeşik Mağarası Milli Parkı',
    type: 'nationalParks',
    position: { lat: 37.2431, lng: 31.7753 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Altınbeşik Mağarası Milli Parkı, Antalya'nın Isparta sınırında yer alan büyüleyici bir mağaradır. Yer altı gölleri, sarkıtları ve dikitleri ile bilinir.",
    icon: nationalIcons
  },
  {
    id: 26,
    name: 'Küre Dağları Milli Parkı',
    type: 'nationalParks',
    position:  { lat: 41.1797, lng: 34.0427 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Küre Dağları Milli Parkı, Kastamonu, Bartın, Karabük ve Zonguldak illerinde yer alır. Yaban hayatı, ormanları ve doğal peyzajıyla dikkat çeker.",
    icon: nationalIcons
  },
  {
    id: 27,
    name: 'Istranca Ormanları Milli Parkı',
    type: 'nationalParks',
    position: { lat: 41.1955, lng: 27.8774 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Istranca Ormanları Milli Parkı, Trakya'nın doğal güzelliklerini koruyan bir parktır. Ormanları, yaylaları ve zengin bitki örtüsü ile ön plana çıkar.",
    icon: nationalIcons
  },
  {
    id: 28,
    name: 'Aladağlar Milli Parkı',
    type: 'nationalParks',
    position: { lat: 37.8083, lng: 35.4294 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Aladağlar Milli Parkı, Niğde ve Kayseri illeri arasında yer alan dağlık bir bölgedir. Yüksek zirveleri, buzulları ve doğa yürüyüşleri için ideal rotalarıyla ünlüdür.",
    icon: nationalIcons
  },
  {
    id: 29,
    name: 'Sarıkamış-Allahuekber Dağları Milli Parkı',
    type: 'nationalParks',
    position: { lat: 40.4955, lng: 42.5747 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Sarıkamış-Allahuekber Dağları Milli Parkı, Kars'ın doğal güzelliklerine ev sahipliği yapar. Kış sporları için popüler bir destinasyondur ve endemik bitki türlerine de ev sahipliği yapar.",
    icon: nationalIcons
  },
  {
    id: 30,
    name: 'İğneada Longoz Ormanları Milli Parkı',
    type: 'nationalParks',
    position:  { lat: 41.8667, lng: 27.9000 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"İğneada Longoz Ormanları Milli Parkı, Kırklareli'nin doğal hazinelerinden biridir. Longoz ormanları, sulak alanlar ve endemik bitki ve hayvan türleriyle ünlüdür.",
    icon: nationalIcons
  },

  {
    id: 31,
    name: 'Düden Şelalesi',
    type: 'natural',
    position:   { lat: 36.8747, lng: 30.7479 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Düden Şelalesi, Antalya'nın doğal güzelliklerinden biridir ve muhteşem şelaleleriyle ziyaretçilerine büyüleyici bir manzara sunar.",
    icon: naturalIcons
  },
  {
    id: 32,
    name: 'Saklıkent Kanyonu',
    type: 'natural',
    position: { lat: 36.5564, lng: 29.4234 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Saklıkent Kanyonu, Antalya'nın güneyinde yer alır ve etkileyici kanyon manzarası, buz gibi suyu ve doğa yürüyüşü olanaklarıyla ünlüdür.",
    icon: naturalIcons
  },
  {
    id: 33,
    name: 'Göksu Deltası',
    type: 'natural',
    position: { lat: 36.5216, lng: 32.0633 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Göksu Deltası, Antalya ve Mersin arasında yer alır ve kuş gözlemciliği için önemli bir alan olup, sulak alanları ve doğal yaşamıyla ünlüdür.",
    icon: naturalIcons
  },
  {
    id: 34,
    name: 'Sultan Sazlığı',
    type: 'natural',
    position: { lat: 38.2649, lng: 41.4021 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Sultan Sazlığı, Van Gölü'nün batısında yer alır ve nadir kuş türlerinin yaşadığı, sulak alanların ve sazlıkların olduğu bir doğal rezervdir.",
    icon: naturalIcons
  },
  {
    id: 35,
    name: 'Uzungöl',
    type: 'natural',
    position: {  lat: 40.6067, lng: 39.3663 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Uzungöl, Trabzon'un doğal güzellikleriyle ünlü bir bölgesidir ve muhteşem gölü, yeşil ormanları ve dağ manzaralarıyla ziyaretçilerini büyüler.",
    icon: naturalIcons
  },
  {
    id: 36,
    name: 'Pamukkale Travertenleri',
    type: 'natural',
    position: { lat: 37.9231, lng: 29.1209 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Pamukkale Travertenleri, beyaz kireçtaşları ve termal sularıyla ünlüdür ve doğal ve kültürel mirasın birleştiği benzersiz bir yerdir.",
    icon: naturalIcons
  },
  {
    id: 37,
    name: 'Cappadocia (Kapadokya)',
    type: 'natural',
    position: {  lat: 40.6067, lng: 39.3663 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Kapadokya, peri bacaları, yer altı şehirleri ve benzersiz kaya oluşumlarıyla ünlüdür ve dünya çapında bir turistik cazibe merkezidir.",
    icon: naturalIcons
  },
  {
    id: 42,
    name: 'Cennet ve Cehennem Çukurları',
    type: 'natural',
    position:  { lat: 37.7580, lng: 34.6045 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Cennet ve Cehennem Çukurları, Niğde'nin bor ilçesinde yer alır ve derin kanyonları, doğal oluşumları ve zengin bitki örtüsüyle dikkat çeker.",
    icon: naturalIcons
  },
  {
    id: 43,
    name: 'Van Gölü',
    type: 'natural',
    position: { lat: 38.5067, lng: 42.2864 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Van Gölü, Türkiye'nin en büyük gölüdür ve etkileyici manzaraları, turkuaz renkli suları ve tarihi Akdamar Adası ile ünlüdür.",
    icon: naturalIcons
  },

  {
    id: 44,
    name: 'Likya Yolu',
    type: 'hiking',
    position:{ lat: 36.3326, lng: 29.6093 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Likya Yolu, Türkiye'nin en ünlü yürüyüş rotalarından biridir ve Antalya'nın Fethiye ilçesinden başlayarak Likya kıyılarını takip eder.",
    icon: trekkingIcons
  },
  {
    id: 49,
    name: 'Aziz Paul Yolu',
    type: 'hiking',
    position: { lat: 37.9224, lng: 31.1393 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Saint Paul Trail, Türkiye'nin batısından doğusuna uzanan tarihi bir yürüyüş rotasıdır ve Pisidia bölgesinden başlayarak Antalya'ya kadar devam eder.",
    icon: trekkingIcons
  },
  {
    id: 45,
    name: 'Frig Yolu',
    type: 'hiking',
    position: { lat: 37.9224, lng: 31.1393 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Frig Yolu, Afyonkarahisar ve Kütahya illeri arasında yer alan antik Phrygia bölgesindeki yürüyüş rotasını takip eder ve tarihi kalıntıları keşfetmek için idealdir.",
    icon: trekkingIcons
  },
  {
    id: 46 ,
    name: 'İbrahimpaşa Yolu',
    type: 'hiking',
    position: { lat: 38.6310, lng: 34.8422 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"İbrahimpaşa Yolu, Kapadokya'nın gizli köylerinden biri olan İbrahimpaşa'da başlayan yürüyüş rotasını içerir ve peri bacaları arasında keyifli bir keşif sunar.",
    icon: trekkingIcons
  },
  {
    id: 47 ,
    name: 'Boztepe Yolu',
    type: 'hiking',
    position: { lat: 38.6310, lng: 34.8422 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Boztepe Yolu, Trabzon'un Boztepe tepesine çıkan yürüyüş rotasını kapsar ve tepeden muhteşem Karadeniz manzarası sunar.",
    icon: trekkingIcons
  },
  {
    id: 48 ,
    name: 'Aziz Nikola Yolu',
    type: 'hiking',
    position:{ lat: 36.2167, lng: 29.9733 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"St. Nicholas Yolu, Antalya'nın Demre ilçesinden başlayan ve Noel Baba'nın yaşadığına inanılan Myra Antik Kenti'ne kadar uzanan tarihi bir yürüyüş parkurudur. Bu yol, antik kalıntıları, sahil manzaralarını ve tarihi köyleri içeren etkileyici bir rotadır ve tarih ve doğa severler için ilgi çekicidir.",
    icon: trekkingIcons
  },

  {
    id: 50,
    name: 'Patara Plajı',
    type: 'beach',
    position:{ lat: 36.2627, lng: 29.3135 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Patara Plajı, Antalya'nın Kaş ilçesinde yer alır ve 18 kilometrelik uzun kumsalıyla ünlüdür, aynı zamanda caretta carettaların üreme alanlarından biridir.",
    icon: beachesIcons
  },
  {
    id: 51,
    name: 'Çeşme Altınkum Plajı',
    type: 'beach',
    position: { lat: 38.3191, lng: 26.3145 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Çeşme Altınkum Plajı, İzmir'in Çeşme ilçesinde bulunur ve kumsalı, turkuaz suları ve su sporları olanaklarıyla ünlüdür.",
    icon: beachesIcons
  },
  {
    id: 51,
    name: 'Cleopatra Plajı',
    type: 'beach',
    position:{ lat: 36.5470, lng: 31.9861 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Cleopatra Plajı, Alanya'nın güneyinde yer alır ve beyaz kumları ve berrak sularıyla ünlüdür, Riviera'nın en güzel plajlarından biridir.",
    icon: beachesIcons
  },
  {
    id: 51,
    name: 'Çıralı Plajı',
    type: 'beach',
    position: { lat: 36.3795, lng: 30.4779 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Çıralı Plajı, Antalya'nın Kemer ilçesinde yer alır ve doğal güzelliği, sakin atmosferi ve yanardağ kalıntılarıyla ünlüdür..",
    icon: beachesIcons
  },
  {
    id: 51,
    name: 'Akyarlar Plajı',
    type: 'beach',
    position: { lat: 37.0211, lng: 27.3475 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Akyarlar Plajı, Bodrum'un güneyinde yer alır ve uzun kumsalı, sakin atmosferi ve rüzgar sörfü olanaklarıyla bilinir.",
    icon: beachesIcons
  },
  {
    id: 51,
    name: 'Ölüdeniz',
    type: 'beach',
    position: { lat: 36.5456, lng: 29.1234 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Ölüdeniz, Fethiye'de yer alan ünlü bir sahil beldesidir ve turkuaz renkli lagünü, etkileyici manzarası ve yamaç paraşütü (paragliding) aktiviteleriyle ünlüdür.",
    icon: beachesIcons
  },
  {
    id: 51,
    name: 'Kabak Koyu',
    type: 'beach',
    position:{ lat: 36.4435, lng: 29.0922 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Kabak Koyu, Fethiye'nin batısında yer alır ve doğal güzelliği, çam ormanları ve turkuaz sularıyla ünlüdür.",
    icon: beachesIcons
  },
  {
    id: 51,
    name: 'Kaputaş Plajı',
    type: 'beach',
    position: { lat: 36.3823, lng: 29.3635 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Kaputaş Plajı, Muğla'nın Kalkan ilçesinde yer alır ve turkuaz renkli denizi ve çevresindeki muhteşem doğal kayalıklarıyla ünlüdür.",
    icon: beachesIcons
  },
  {
    id: 51,
    name: 'Altınoluk Plajı',
    type: 'beach',
    position: { lat: 39.5442, lng: 26.7507 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Altınoluk Plajı, Balıkesir'in Edremit ilçesinde yer alır ve uzun kumsalı, temiz suları ve güzel manzarasıyla ziyaretçilerine huzurlu bir tatil imkanı sunar.",
    icon: beachesIcons
  },
  {
    id: 51,
    name: 'Sığacık Koyu',
    type: 'beach',
    position:{ lat: 38.2539, lng: 26.9354 },
    link: "https://developers.google.com/maps/documentation/javascript/markers",
    desc:"Sığacık Koyu, İzmir'in Seferihisar ilçesinde yer alır ve sakin atmosferi, doğal güzellikleri ve tarihi dokusuyla ünlüdür.",
    icon: beachesIcons
  },

];

export default function BlogPost() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCiVMHghOSlJ4bDV9bpUcYDoOg2ZoSSVLY",
  });

  const [activeMarker, setActiveMarker] = useState(null);
  const [selectedTypes, setSelectedTypes] = useState(["antics","nationalParks","natural","hiking","beach"]);

  const handleActiveMarker = (markerId) => {
    setActiveMarker(markerId);
  };

  const handleTypeCheckboxChange = (type) => {
    setSelectedTypes((prevSelectedTypes) => {
      if (prevSelectedTypes.includes(type)) {
        return prevSelectedTypes.filter((selectedType) => selectedType !== type);
      } else {
        return [...prevSelectedTypes, type];
      }
    });
  };

  const filteredMarkers = markers.filter((marker) =>
    selectedTypes.includes(marker.type)
  );

  return (
    <Layout>
      <div className="sharethis-sticky-share-buttons"></div>
      <main className="pb-24 bg-opacity-100 bg-white">
        <header className="bg-no-repeat bg-center bg-cover bg-[url(https://campupp.s3.eu-north-1.amazonaws.com/kapadokya.jpg)] w-full relative h-96">
          <div className="bg-opacity-50  w-full h-full left-0 top-0 absolute"></div>
          <div className="pl-4 pr-4 -translate-x-1/2 transform translate-y-[-50%] rotate-0 skew-x-0 skew-y-0 scale-x-1 scale-y-1 max-w-screen-xl w-full mx-auto left-1/2 top-20 absolute">
            <span></span>
          </div>
        </header>
        <div className="bg-opacity-100 bg-[rgb(31 41 55/var(--tw-bg-opacity))] p-2 md:p-9 md:px-20 mx-auto my-[-8rem] rounded-[0.25rem] justify-between flex z-20 relative">
          <article className="w-full p-3 md:p-10 shadow text-base rounded-md leading-tight max-w-none bg-white">
          <div className='my-5'>
            <h1 className="text-3xl mt-5 font-semibold tracking-tight text-green-800">Türkiye&apos;yi Keşfedin!</h1>
            <p className="mt-2 font-light text-gray-500 sm:text-xl dark:text-gray-400">Türkiye&apos;nin çeşitli bölgelerinde bulunan antik kentlerin, açık hava müzelerinin, yürüyüş yollarınını yerlerini gösteren bir harita sunuyoruz.</p>
          </div>
            <div className="container">
              <div className="type-checkboxes md:flex gap-5 my-5">
                <div className="mt-2">
                    <fieldset>
                        <div className="space-y-6">
                            <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                    <input
                                    checked={selectedTypes.includes('antics')}
                                    onChange={() => handleTypeCheckboxChange('antics')}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="comments" className="font-medium text-gray-900">
                                    Antik Şehirler
                                  </label>
                                </div> 
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div className="mt-2">
                    <fieldset>
                        <div className="space-y-6">
                            <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                    <input
                                    checked={selectedTypes.includes('nationalParks')}
                                    onChange={() => handleTypeCheckboxChange('nationalParks')}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="comments" className="font-medium text-gray-900">
                                    Milli Parklar
                                  </label>
                                </div> 
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div className="mt-2">
                    <fieldset>
                        <div className="space-y-6">
                            <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                    <input
                                    checked={selectedTypes.includes('natural')}
                                    onChange={() => handleTypeCheckboxChange('natural')}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="comments" className="font-medium text-gray-900">
                                    Doğal Güzellikler
                                  </label>
                                </div> 
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div className="mt-2">
                    <fieldset>
                        <div className="space-y-6">
                            <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                    <input
                                    checked={selectedTypes.includes('hiking')}
                                    onChange={() => handleTypeCheckboxChange('hiking')}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="comments" className="font-medium text-gray-900">
                                    Yürüyüş Yolu
                                  </label>
                                </div> 
                            </div>
                        </div>
                    </fieldset>
                </div>
                <div className="mt-2">
                    <fieldset>
                        <div className="space-y-6">
                            <div className="relative flex gap-x-3">
                                <div className="flex h-6 items-center">
                                    <input
                                    checked={selectedTypes.includes('beach')}
                                    onChange={() => handleTypeCheckboxChange('beach')}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                </div>
                                <div className="text-sm leading-6">
                                    <label htmlFor="comments" className="font-medium text-gray-900">
                                    Sahiller
                                  </label>
                                </div> 
                            </div>
                        </div>
                    </fieldset>
                </div>
                {/* Add more checkboxes for other marker types */}
              </div>
            </div>
            <Fragment>
              <div className="container">
                <div style={{ height: '90vh', width: '100%' }}>
                  {isLoaded ? (
                    <GoogleMap
                      center={{ lat: 38.9637, lng: 35.2433 }}
                      zoom={6}
                      onClick={() => setActiveMarker(null)}
                      mapContainerStyle={{ width: '100%', height: '90vh' }}
                    >
                      {filteredMarkers.map(({ id, name, position, link, desc, icon}) => (
                        <MarkerF
                          key={id}
                          position={position}
                          className="h-2 w-2"
                          icon={icon}
                          onClick={() => handleActiveMarker(id)}
                          title={name}
                        >
                          {activeMarker === id ? (
                            <InfoWindowF  onCloseClick={() => setActiveMarker(null)}>
                              <div>
                                <p className='font-semibold'>{name}</p>
                                <p>{desc}</p>
                                <button href={link} className='flex-none mt-1 rounded-full text-center bg-cc-primary px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900'>Daha Fazla Bilgi Alın</button>
                              </div>
                            </InfoWindowF>
                          ) : null}
                        </MarkerF>
                      ))}
                    </GoogleMap>
                  ) : null}
                </div>
              </div>
            </Fragment>
          </article>
          <aside></aside>
        </div>
      </main>
      <Banner />
    </Layout>
  );
}
