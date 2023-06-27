import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { useSession } from "next-auth/react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {FiAlertTriangle} from "react-icons/fi";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
export default function ProductForm({
  _id,
  title:existingTitle,
  description:existingDescription,
  price:existingPrice,
  priceDefaultType:existingPriceDefaultType,
  priceBungalow:existingPriceBungalow,
  priceVan:existingPriceVan,
  isPaymentCash:existingIsPaymentCash,
  isPaymentIban:existingIsPaymentIban,
  isPaymentCreditCard:existingIsPaymentCreditCard,
  isPriceVisible:existingIsPriceVisible,
  isReservationModuleAvailable:existingIsReservationModuleAvailable,
  isReservationModuleBungalowRentingPossible:existingIsReservationModuleBungalowRentingPossible,
  images:existingImages,
  address:existingAddress,
  city: existingCity,
  district: existingDistrict,
  activitiesYoga: existingActivitiesYoga,
  activitiesCanoing: existingActivitiesCanoing,
  activitiesTrekking: existingActivitiesTrekking,
  activitiesSurf: existingActivitiesSurf,
  activitiesBeachVolleyball: existingActivitiesBeachVolleyball,
  activitiesVolleyball: existingActivitiesVolleyball,
  activitiesSpa: existingActivitiesSpa,
  activitiesAtv: existingActivitiesAtv,
  activitiesParagliding: existingActivitiesParagliding,
  activitiesBoatRental: existingActivitiesBoatRental,
  activitiesBoatTour: existingActivitiesBoatTour,
  activitiesPool: existingActivitiesPool,

  isFriendlyVan: existingIsFriendlyVan,
  descriptionVan: existingDescriptionVan,
  isFriendlyKid: existingIsFriendlyKid,
  descriptionKid: existingDescriptionKid,
  isFriendlyRemoteWork: existingIsFriendlyRemoteWork,
  descriptionRemoteWork: existingDescriptionRemoteWork,
  isFriendlyPet: existingIsFriendlyPet,
  descriptionPet: existingDescriptionPet,
  isFriendlyAlcohol: existingIsFriendlyAlcohol,
  isPresentBungalow: existingIsPresentBungalow,
  isPresentBreakfastIncluded: existingIsPresentBreakfastIncluded,
  isPublicTransportationPossible:existingIsPublicTransportationPossible,
  mapLatitute:existingMapLatitute,
  mapLangtitute: existingMapLangtitute,
  isNearSea: existingIsNearSea,
  distanceSea: existingDistanceSea,
  isPresentPrivateBeach: existingIsPresentPrivateBeach,
  isPresentSunbedIncluded: existingIsPresentSunbedIncluded,
  isPresentSunbedRenting: existingIsPresentSunbedRenting,
  isNearLake: existingIsNearLake,
  distanceLake: existingDistanceLake,
  isNearForest: existingIsNearForest,
  distanceForest: existingDistanceForest,
  isNearRestaurant: existingIsNearRestaurant,
  distanceRestaurant: existingDistanceRestaurant,
  isNearStore: existingIsNearStore,
  distanceStore: existingDistanceStore,
  isNearBar: existingIsNearBar,
  distanceBar: existingDistanceBar,

  isPresentWC: existingIsPresentWC,
  isPresentParkLot: existingIsPresentParkLot,
  isPresentShower: existingIsPresentShower,
  isPresentHotWater: existingIsPresentHotWater,
  isPresentWifi: existingIsPresentWifi,
  isPresentKitchen: existingIsPresentKitchen,
  isPresentFridge: existingIsPresentFridge,
  isPresentLaundry: existingIsPresentLaundry,
  isPresentFirePit: existingIsPresentFirePit,
  isPresentElectricity: existingIsPresentElectricity,
  isPresentDishwasher: existingIsPresentDishwasher,
  isPresentMicrowave: existingIsPresentMicrowave,
  isPresentStowe: existingIsPresentStowe,
  isPresentPicnicTable: existingIsPresentPicnicTable,
  contactTel:existingContactTel,
  contactInstagram:existingContactInstagram,
  contactFacebook:existingContactFacebook,

  isEnglishSpoken: existingIsEnglishSpoken,
  isGermanSpoken: existingIsGermanSpoken,
  isRussianSpoken: existingIsRussianSpoken,
  isSpanishSpoken: existingisSpanishSpoken,
  titleEnglish: existingTitleEnglish,
  descriptionEnglish: existingDescriptionEnglish,

}) {
  const [title,setTitle] = useState(existingTitle || '');
  const [description,setDescription] = useState(existingDescription || '');
  const [price,setPrice] = useState(existingPrice || '');
  const [priceDefaultType,setPriceDefaultType] = useState(existingPriceDefaultType || '');
  const [priceBungalow,setPriceBungalow] = useState(existingPriceBungalow || '');
  const [priceVan,setPriceVan] = useState(existingPriceVan || '');
  const [isPriceVisible, setIsPriceVisible] = useState(existingIsPriceVisible || false)
  const [isReservationModuleAvailable, setIsReservationModuleAvailable] = useState(existingIsReservationModuleAvailable || false)
  const [isReservationModuleBungalowRentingPossible, setIsReservationModuleBungalowRentingPossible] = useState(existingIsReservationModuleBungalowRentingPossible || false)
  const [isPaymentIban, setIsPaymentIban] = useState(existingIsPaymentIban || false)
  const [isPaymentCash, setIsPaymentCash] = useState(existingIsPaymentCash || false)
  const [isPaymentCreditCard, setIsPaymentCreditCard] = useState(existingIsPaymentCreditCard || false)
  const [images,setImages] = useState(existingImages || []);

  const[contactTel, setContactTel] = useState(existingContactTel||'')
  const[contactInstagram, setContactInstagram] = useState(existingContactInstagram||'')
  const[contactFacebook, setContactFacebook] = useState(existingContactFacebook||'')
  
  const [address,setAddress] = useState(existingAddress || '')
  const [city, setCity] = useState(existingCity || '')
  const [district, setDistrict] = useState(existingDistrict || '')
  const [cities, setCities] = useState( []);
  const [selectedCounty, setSelectedCountry] = useState(existingDistrict || '');
  const [selectedCity, setSelectedCity] = useState(existingCity || '');

  const [activitiesYoga, setActivitiesYoga] = useState(existingActivitiesYoga || false)
  const [activitiesCanoing, setActivitiesCanoing] = useState(existingActivitiesCanoing || false)
  const [activitiesTrekking, setActivitiesTrekking] = useState(existingActivitiesTrekking || false)
  const [activitiesSurf, setActivitiesSurf] = useState(existingActivitiesSurf || false)
  const [activitiesBeachVolleyball, setActivitiesBeachVolleyball] = useState(existingActivitiesBeachVolleyball|| false)
  const [activitiesVolleyball, setActivitiesVolleyball] = useState(existingActivitiesVolleyball || false)
  const [activitiesSpa, setActivitiesSpa] = useState(existingActivitiesSpa || false)
  const [activitiesAtv, setActivitiesAtv] = useState(existingActivitiesAtv || false)
  const [activitiesParagliding, setActivitiesParagliding] = useState( existingActivitiesParagliding|| false)
  const [activitiesBoatRental, setActivitiesBoatRental] = useState(existingActivitiesBoatRental || false)
  const [activitiesBoatTour, setActivitiesBoatTour] = useState(existingActivitiesBoatTour || false)
  const [activitiesPool, setActivitiesPool] = useState(existingActivitiesPool || false)

  const [isFriendlyVan, setIsFriendlyVan] = useState(existingIsFriendlyVan || false)
  const [descriptionVan, setDescriptionVan] = useState(existingDescriptionVan || '')
  const [isFriendlyRemoteWork, setIsFriendlyRemoteWork] = useState(existingIsFriendlyRemoteWork || false)
  const [descriptionRemoteWork, setDescriptionRemoteWork] = useState( existingDescriptionRemoteWork|| '')
  const [isFriendlyKid, setIsFriendlyKid] = useState(existingIsFriendlyKid || false)
  const [descriptionKid, setDescriptionKid] = useState(existingDescriptionKid || '')
  const [isFriendlyPet, setIsFriendlyPet] = useState(existingIsFriendlyPet || false)
  const [descriptionPet, setDescriptionPet] = useState(existingDescriptionPet || '')
  const [isFriendlyAlcohol, setIsFriendlyAlcohol] = useState(existingIsFriendlyAlcohol || false) 
  const [isPresentBungalow, setIsPresentBungalow] = useState(existingIsPresentBungalow|| false) 
  const [isPresentBreakfastIncluded, setIsPresentBreakfastIncluded] = useState(existingIsPresentBreakfastIncluded|| false)
  const [isPublicTransportationPossible, setIsPublicTransportationPossible] = useState(existingIsPublicTransportationPossible|| false)
  const [mapLatitute,setMapLatitute] = useState(existingMapLatitute || "");
  const [mapLangtitute,setMapLangtitute] = useState(existingMapLangtitute || "");

  const [isNearSea, setIsNearSea] = useState(existingIsNearSea || false) 
  const [distanceSea, setDistanceSea] = useState(existingDistanceSea || 1)
  const [isPresentPrivateBeach, setIsPresentPrivateBeach]= useState(existingIsPresentPrivateBeach || false)
  const [isPresentSunbedIncluded, setIsPresentSunbedIncluded]= useState(existingIsPresentSunbedIncluded || false)
  const [isPresentSunbedRenting, setIsPresentSunbedRenting] = useState(existingIsPresentSunbedRenting || false)
  const [isNearLake, setIsNearLake] = useState( existingIsNearLake|| false) 
  const [distanceLake, setDistanceLake] = useState(existingDistanceLake || 1)
  const [isNearForest, setIsNearForest] = useState(existingIsNearForest || false) 
  const [distanceForest, setDistanceForest] = useState(existingDistanceForest || 1)
  const [isNearRestaurant, setIsNearRestaurant] = useState(existingIsNearRestaurant || false) 
  const [distanceRestaurant, setDistanceRestaurant] = useState(existingDistanceRestaurant || 1)
  const [isNearStore, setIsNearStore] = useState(existingIsNearStore || false) 
  const [distanceStore, setDistanceStore] = useState(existingDistanceStore || 1)
  const [isNearBar, setIsNearBar] = useState(existingIsNearBar || false) 
  const [distanceBar, setDistanceBar] = useState(existingDistanceBar || 1)

  const [isPresentWC, setIsPresentWC] = useState(existingIsPresentWC || false) 
  const [isPresentParkLot, setIsPresentParkLot] = useState(existingIsPresentParkLot || false) 
  const [isPresentShower, setIsPresentShower] = useState(existingIsPresentShower || false) 
  const [isPresentHotWater, setIsPresentHotWater] = useState(existingIsPresentHotWater || false) 
  const [isPresentWifi, setIsPresentWifi] = useState(existingIsPresentWifi || false) 
  const [isPresentKitchen, setIsPresentKitchen] = useState(existingIsPresentKitchen || false) 
  const [isPresentFridge, setIsPresentFridge] = useState(existingIsPresentFridge || false) 
  const [isPresentDishwasher, setIsPresentDishwasher] = useState(existingIsPresentDishwasher || false) 
  const [isPresentMicrowave, setIsPresentMicrowave] = useState(existingIsPresentMicrowave || false) 
  const [isPresentStowe, setIsPresentStowe] = useState(existingIsPresentStowe || false) 
  const [isPresentLaundry, setIsPresentLaundry] = useState(existingIsPresentLaundry || false) 
  const [isPresentFirePit, setIsPresentFirePit] = useState(existingIsPresentFirePit || false) 
  const [isPresentElectricity, setIsPresentElectricity] = useState(existingIsPresentElectricity || false) 
  const [isPresentPicnicTable, setIsPresentPicnicTable] = useState(existingIsPresentPicnicTable || false) 

  const [isEnglishSpoken, setIsEnglishSpoken] = useState(existingIsEnglishSpoken || false) 
  const [isGermanSpoken, setIsGermanSpoken] = useState(existingIsGermanSpoken || false) 
  const [isRussianSpoken, setIsRussianSpoken] = useState(existingIsRussianSpoken || false) 
  const [isSpanishSpoken, setIsSpanishSpoken] = useState(existingisSpanishSpoken || false) 
  const [titleEnglish, setTitleEnglish] = useState(existingTitleEnglish || '')
  const [descriptionEnglish, setDescriptionEnglish] = useState(existingDescriptionEnglish || '')
 
  const router = useRouter()
  const {data:session} = useSession();

  async function saveProduct(ev) {
    ev.preventDefault();
    if(title==""){
      toast.error('Başlık alanı boş bırakılamaz')
      return
    }
    if(contactTel){
        const checkPhone = /^(((\+|00)?(90)|0)[-| ]?)?((5\d{2})[-| ]?(\d{3})[-| ]?(\d{2})[-| ]?(\d{2}))$/.test(contactTel)
        if(!checkPhone){
          toast.error('Geçerli bir telefon numarası giriniz.')
          return;
        }
      }
    const data = {
      title,description,price,images, address,selectedCounty, selectedCity,activitiesYoga,isPublicTransportationPossible,mapLatitute,mapLangtitute,
      activitiesCanoing, activitiesTrekking, activitiesSurf, activitiesBeachVolleyball,activitiesVolleyball,activitiesSpa, activitiesAtv, activitiesParagliding, activitiesBoatRental, 
      activitiesBoatTour, activitiesPool,isFriendlyAlcohol,isFriendlyKid,isFriendlyRemoteWork,isFriendlyVan,isFriendlyPet, descriptionKid,descriptionPet,descriptionRemoteWork,descriptionVan,
      isPresentBungalow,isPresentBreakfastIncluded,isNearSea,distanceSea,isNearLake, distanceLake,isNearForest, distanceForest,isNearRestaurant, distanceRestaurant,isNearStore,distanceStore,isNearBar,distanceBar,
      isPresentPrivateBeach, isPresentSunbedIncluded, isPresentSunbedRenting,isPresentDishwasher, isPresentElectricity,isPresentFirePit,isPresentFridge,isPresentHotWater,isPresentKitchen,
      isPresentLaundry, isPresentMicrowave, isPresentParkLot, isPresentShower, isPresentStowe, isPresentWC, isPresentWifi, contactTel, contactInstagram, contactFacebook,isEnglishSpoken,
      isGermanSpoken,isRussianSpoken,isSpanishSpoken,titleEnglish,descriptionEnglish,isPriceVisible,isReservationModuleAvailable,isPaymentCash,isPaymentCreditCard,isPaymentIban,
      isPresentPicnicTable,isReservationModuleBungalowRentingPossible,priceDefaultType,priceBungalow,priceVan
    };
    if (_id) {
      //update
      await axios.put('/api/campsite', {...data,_id});
    } else {
      //create
      await axios.post('/api/campsite', {...data,user:session?.user?.email});
    }
    toast.success('Kamp yeriniz güncellendi')
  }

  async function uploadImages(ev){
    if(title==""){
      toast.error('Fotoğraf eklemeye başlamadan önce başlık alanını doldurunuz.')
      return
    }
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
    const button = document.getElementById("saveBtn");
    // Programmatically click the button
    button.click();
  }
  async function removePhoto(ev, filename){
    if(title==""){
      toast.error('Fotoğraf silmeye başlamadan önce "Kaydet" butonuna basınız.')
      return
    }
    ev.preventDefault();
    setImages([...images.filter(photo => photo !== filename)])
    await axios.post('/api/delete', {filename:filename})
    // Assuming you have a button element with an id "myButton"
    const button = document.getElementById("saveBtn");
    // Programmatically click the button
    button.click();
  }
  const countries = {
    Adana: ["Aladağ", "Ceyhan", "Çukurova", "Feke", "İmamoğlu", "Karaisalı", "Karataş", "Kozan", "Pozantı", "Saimbeyli", "Sarıçam", "Seyhan", "Tufanbeyli", "Yumurtalık", "Yüreğir"],
    Adıyaman: ["Besni", "Çelikhan", "Gerger", "Gölbaşı", "Kahta", "Merkez", "Samsat", "Sincik", "Tut"],
    Afyonkarahisar: ["Başmakçı", "Bayat", "Bolvadin", "Çay", "Çobanlar", "Dazkırı", "Dinar", "Emirdağ", "Evciler", "Hocalar", "İhsaniye", "İscehisar", "Kızılören", "Merkez", "Sandıklı", "Sinanpaşa", "Sultandağı", "Şuhut"],
    Ağrı: ["Diyadin", "Doğubayazıt", "Eleşkirt", "Hamur", "Merkez", "Patnos", "Taşlıçay", "Tutak"],
    Aksaray: ["Ağaçören", "Eskil", "Gülağaç", "Güzelyurt", "Merkez", "Ortaköy", "Sarıyahşi"],
    Amasya: ["Göynücek", "Gümüşhacıköy", "Hamamözü", "Merkez", "Merzifon", "Suluova", "Taşova"],
    Ankara: ["Akyurt", "Altındağ", "Ayaş", "Balâ", "Beypazarı", "Çamlıdere", "Çankaya", "Çubuk", "Elmadağ", "Etimesgut", "Evren", "Gölbaşı", "Güdül", "Haymana", "Kahramankazan", "Kalecik", "Keçiören", "Kızılcahamam", "Mamak", "Nallıhan", "Polatlı", "Pursaklar", "Sincan", "Şereflikoçhisar", "Yenimahalle"],
    Antalya: ["Akseki", "Aksu", "Alanya", "Demre", "Döşemealtı", "Elmalı", "Finike", "Gazipaşa", "Gündoğmuş", "İbradı", "Kaş", "Kemer", "Kepez", "Konyaaltı", "Korkuteli", "Kumluca", "Manavgat", "Muratpaşa", "Serik"],
    Ardahan: ["Çıldır", "Damal", "Göle", "Hanak", "Merkez", "Posof"],
    Artvin: ["Ardanuç", "Arhavi", "Borçka", "Hopa", "Kemalpaşa", "Murgul", "Merkez", "Şavşat", "Yusufeli"],
    Aydın: ["Bozdoğan", "Buharkent", "Çine", "Didim", "Efeler", "Germencik", "İncirliova", "Karacasu", "Karpuzlu", "Koçarlı", "Köşk", "Kuşadası", "Kuyucak", "Merkez", "Nazilli", "Söke", "Sultanhisar", "Yenipazar"],
    Balıkesir: ["Altıeylül", "Ayvalık", "Balya", "Bandırma", "Bigadiç", "Burhaniye", "Dursunbey", "Edremit", "Erdek", "Gönen", "Havran", "İvrindi", "Karesi", "Kepsut", "Manyas", "Marmara", "Savaştepe", "Sındırgı", "Susurluk"],
    Bartın: ["Merkez", "Amasra", "Kurucaşile", "Ulus"],
    Batman: ["Beşiri", "Gercüş", "Hasankeyf", "Kozluk", "Merkez", "Sason"],
    Bayburt: ["Aydıntepe", "Demirözü", "Merkez"],
    Bilecik: ["Bozüyük", "Gölpazarı", "İnhisar", "Merkez", "Osmaneli", "Pazaryeri", "Söğüt", "Yenipazar"],
    Bingöl: ["Adaklı", "Genç", "Karlıova", "Kiğı", "Merkez", "Solhan", "Yayladere", "Yedisu"],
    Bitlis: ["Adilcevaz", "Ahlat", "Güroymak", "Hizan", "Merkez", "Mutki", "Tatvan"],
    Bolu: ["Dörtdivan", "Gerede", "Göynük", "Kıbrıscık", "Mengen", "Merkez", "Mudurnu", "Seben", "Yeniçağa"],
    Burdur: ["Ağlasun", "Altınyayla", "Bucak", "Çavdır", "Çeltikçi", "Gölhisar", "Karamanlı", "Kemer", "Merkez", "Tefenni", "Yeşilova"],
    Bursa: ["Büyükorhan", "Gemlik", "Gürsu", "Harmancık", "İnegöl", "İznik", "Karacabey", "Keles", "Kestel", "Mudanya", "Mustafakemalpaşa", "Nilüfer", "Orhaneli", "Orhangazi", "Osmangazi", "Yenişehir", "Yıldırım"],
    Çanakkale: ["Ayvacık", "Bayramiç", "Biga", "Bozcaada", "Çan", "Eceabat", "Ezine", "Gelibolu", "Gökçeada", "Lapseki", "Merkez", "Yenice"],
    Çankırı: ["Atkaracalar", "Bayramören", "Çerkeş", "Eldivan", "Ilgaz", "Kızılırmak", "Korgun", "Kurşunlu", "Merkez", "Orta", "Şabanözü", "Yapraklı"],
    Çorum: ["Alaca", "Bayat", "Boğazkale", "Dodurga", "İskilip", "Kargı", "Laçin", "Mecitözü", "Merkez", "Oğuzlar", "Ortaköy", "Osmancık", "Sungurlu", "Uğurludağ"],
    Denizli: ["Acıpayam", "Babadağ", "Baklan", "Bekilli", "Beyağaç", "Bozkurt", "Buldan", "Çal", "Çameli", "Çardak", "Çivril", "Güney", "Honaz", "Kale", "Merkez", "Pamukkale", "Sarayköy", "Serinhisar", "Tavas"],
    Diyarbakır: ["Bağlar", "Bismil", "Çermik", "Çınar", "Çüngüş", "Dicle", "Eğil", "Ergani", "Hani", "Hazro", "Kayapınar", "Kocaköy", "Kulp", "Lice", "Silvan", "Sur", "Yenişehir"],
    Düzce: ["Akçakoca", "Cumayeri", "Çilimli", "Gölyaka", "Gümüşova", "Kaynaşlı", "Merkez", "Yığılca"],
    Edirne: ["Enez", "Havsa", "İpsala", "Keşan", "Lalapaşa", "Meriç", "Merkez", "Süloğlu", "Uzunköprü"],
    Elazığ: ["Ağın", "Alacakaya", "Arıcak", "Baskil", "Karakoçan", "Keban", "Kovancılar", "Maden", "Merkez", "Palu", "Sivrice"],
    Erzincan: ["Çayırlı", "İliç", "Kemah", "Kemaliye", "Merkez", "Otlukbeli", "Refahiye", "Tercan", "Üzümlü"],
    Erzurum: ["Aşkale", "Aziziye", "Çat", "Hınıs", "Horasan", "İspir", "Karaçoban", "Karayazı", "Köprüköy", "Narman", "Oltu", "Olur", "Palandöken", "Pasinler", "Pazaryolu", "Şenkaya", "Tekman", "Tortum", "Uzundere", "Yakutiye"],
    Eskişehir: ["Alpu", "Beylikova", "Çifteler", "Günyüzü", "Han", "İnönü", "Mahmudiye", "Merkez", "Mihalıççık", "Mihalgazi", "Odunpazarı", "Sarıcakaya", "Seyitgazi", "Sivrihisar", "Tepebaşı"],
    Gaziantep: ["Araban", "Karkamış", "Nizip", "Oğuzeli", "Yavuzeli", "Şahinbey", "Şehitkamil"],
    Giresun: ["Alucra", "Bulancak", "Çamoluk", "Çanakçı", "Dereli", "Doğankent", "Espiye", "Eynesil", "Görele", "Güce", "Keşap", "Merkez", "Piraziz", "Şebinkarahisar", "Tirebolu", "Yağlıdere"],
    Gümüşhane: ["Kelkit", "Köse", "Kürtün", "Merkez", "Şiran", "Torul"],
    Hakkari: ["Çukurca", "Merkez", "Şemdinli", "Yüksekova"],
    Hatay: ["Altınözü", "Antakya", "Arsuz", "Belen", "Defne", "Dörtyol", "Erzin", "Hassa", "İskenderun", "Kırıkhan", "Kumlu", "Payas", "Reyhanlı", "Samandağ", "Yayladağı"],
    Iğdır: ["Aralık", "Karakoyunlu", "Merkez", "Tuzluca"],
    Isparta: ["Aksu", "Atabey", "Eğirdir", "Gelendost", "Gönen", "Keçiborlu", "Merkez", "Senirkent", "Sütçüler", "Şarkikaraağaç", "Uluborlu", "Yalvaç", "Yenişarbademli"],
    İstanbul: ["Adalar", "Arnavutköy", "Ataşehir", "Avcılar", "Bağcılar", "Bahçelievler", "Bakırköy", "Başakşehir", "Bayrampaşa", "Beşiktaş", "Beykoz", "Beylikdüzü", "Beyoğlu", "Büyükçekmece", "Çatalca", "Çekmeköy", "Esenler", "Esenyurt", "Eyüp", "Fatih", "Gaziosmanpaşa", "Güngören", "Kadıköy", "Kağıthane", "Kartal", "Küçükçekmece", "Maltepe", "Pendik", "Sancaktepe", "Sarıyer", "Silivri", "Sultanbeyli", "Sultangazi", "Şile", "Şişli", "Tuzla", "Ümraniye", "Üsküdar", "Zeytinburnu"],
    İzmir: ["Aliağa", "Balçova", "Bayındır", "Bayraklı", "Bergama", "Beydağ", "Bornova", "Buca", "Çeşme", "Çiğli", "Dikili", "Foça", "Gaziemir", "Güzelbahçe", "Karabağlar", "Karaburun", "Karşıyaka", "Kemalpaşa", "Kınık", "Kiraz", "Konak", "Menderes", "Menemen", "Narlıdere", "Ödemiş", "Seferihisar", "Selçuk", "Tire", "Torbalı", "Urla"],
    Kahramanmaraş: ["Afşin", "Andırın", "Dulkadiroğlu", "Ekinözü", "Elbistan", "Göksun", "Merkez", "Nurhak", "Onikişubat", "Pazarcık", "Türkoğlu"],
    Karabük: ["Eflani", "Eskipazar", "Karabük", "Ovacık", "Safranbolu", "Yenice"],
    Karaman: ["Ayrancı", "Başyayla", "Ermenek", "Karaman", "Kazımkarabekir", "Sarıveliler"],
    Kars: ["Akyaka", "Arpaçay", "Digor", "Kağızman", "Kars", "Sarıkamış", "Selim", "Susuz"],
    Kastamonu: ["Abana", "Ağlı", "Araç", "Azdavay", "Bozkurt", "Cide", "Çatalzeytin", "Daday", "Devrekani", "Doğanyurt", "Hanönü", "İhsangazi", "İnebolu", "Kastamonu", "Küre", "Pınarbaşı", "Seydiler", "Şenpazar", "Taşköprü", "Tosya"],
    Kayseri: ["Akkışla", "Bünyan", "Develi", "Felahiye", "Hacılar", "İncesu", "Kocasinan", "Melikgazi", "Özvatan", "Pınarbaşı", "Sarıoğlan", "Sarız", "Talas", "Tomarza", "Yahyalı", "Yeşilhisar"],
    Kırıkkale: ["Bahşılı", "Balışeyh", "Çelebi", "Delice", "Karakeçili", "Keskin", "Kırıkkale", "Sulakyurt", "Yahşihan"],
    Kırklareli: ["Babaeski", "Demirköy", "Kırklareli", "Kofçaz", "Lüleburgaz", "Pehlivanköy", "Pınarhisar", "Vize"],
    Kırşehir: ["Akçakent", "Akpınar", "Boztepe", "Çiçekdağı", "Kaman", "Kırşehir", "Mucur"],
    Kilis: ["Elbeyli", "Merkez", "Musabeyli", "Polateli"],
    Kocaeli: ["Başiskele", "Çayırova", "Darıca", "Derince", "Dilovası", "Gebze", "Gölcük", "İzmit", "Kandıra", "Karamürsel", "Kartepe", "Körfez"],
    Konya: ["Ahırlı", "Akören", "Akşehir", "Altınekin", "Beyşehir", "Bozkır", "Cihanbeyli", "Çeltik", "Çumra", "Derbent", "Derebucak", "Doğanhisar", "Emirgazi", "Ereğli", "Güneysınır", "Hadim", "Halkapınar", "Hüyük", "Ilgın", "Kadınhanı", "Karapınar", "Karatay", "Kulu", "Meram", "Sarayönü", "Selçuklu", "Seydişehir", "Taşkent", "Tuzlukçu", "Yalıhüyük", "Yunak"],
    Kütahya: ["Altıntaş", "Aslanapa", "Çavdarhisar", "Domaniç", "Dumlupınar", "Emet", "Gediz", "Hisarcık", "Kütahya", "Pazarlar", "Şaphane", "Simav", "Tavşanlı"],
    Malatya: ["Akçadağ", "Arapgir", "Arguvan", "Battalgazi", "Darende", "Doğanşehir", "Doğanyol", "Hekimhan", "Kale", "Kuluncak", "Pütürge", "Yazıhan", "Yeşilyurt"],
    Manisa: ["Ahmetli", "Akhisar", "Alaşehir", "Demirci", "Gölmarmara", "Gördes", "Kırkağaç", "Köprübaşı", "Kula", "Salihli", "Sarıgöl", "Saruhanlı", "Selendi", "Soma", "Turgutlu", "Yunusemre"],
    Mardin: ["Artuklu", "Dargeçit", "Derik", "Kızıltepe", "Mazıdağı", "Midyat", "Nusaybin", "Ömerli", "Savur", "Yeşilli"],
    Mersin: ["Akdeniz", "Anamur", "Aydıncık", "Bozyazı", "Çamlıyayla", "Erdemli", "Gülnar", "Mezitli", "Mut", "Silifke", "Tarsus", "Toroslar", "Yenişehir"],
    Muğla: ["Bodrum", "Dalaman", "Datça", "Fethiye", "Kavaklıdere", "Köyceğiz", "Marmaris", "Menteşe", "Milas", "Ortaca", "Seydikemer", "Ula", "Yatağan"],
    Muş: ["Bulanık", "Hasköy", "Korkut", "Malazgirt", "Merkez", "Varto"],
    Nevşehir: ["Acıgöl", "Avanos", "Derinkuyu", "Gülşehir", "Hacıbektaş", "Kozaklı", "Merkez", "Ürgüp"],
    Niğde: ["Altunhisar", "Bor", "Çamardı", "Çiftlik", "Merkez", "Ulukışla"],
    Ordu: ["Akkuş", "Altınordu", "Aybastı", "Çamaş", "Çatalpınar", "Çaybaşı", "Fatsa", "Gölköy", "Gülyalı", "Gürgentepe", "İkizce", "Kabadüz", "Kabataş", "Korgan", "Kumru", "Mesudiye", "Perşembe", "Ulubey", "Ünye"],
    Osmaniye: ["Bahçe", "Düziçi", "Hasanbeyli", "Kadirli", "Merkez", "Sumbas", "Toprakkale"],
    Rize: ["Ardeşen", "Çamlıhemşin", "Çayeli", "Derepazarı", "Fındıklı", "Güneysu", "Hemşin", "İkizdere", "İyidere", "Kalkandere", "Pazar", "Rize"],
    Sakarya: ["Adapazarı", "Akyazı", "Arifiye", "Erenler", "Ferizli", "Geyve", "Hendek", "Karapürçek", "Karasu", "Kaynarca", "Kocaali", "Pamukova", "Sapanca", "Serdivan", "Söğütlü", "Taraklı"],
    Samsun: ["Alaçam", "Asarcık", "Atakum", "Ayvacık", "Bafra", "Canik", "Çarşamba", "Havza", "İlkadım", "Kavak", "Ladik", "Ondokuzmayıs", "Salıpazarı", "Tekkeköy", "Terme", "Vezirköprü", "Yakakent"],
    Siirt: ["Baykan", "Eruh", "Kurtalan", "Merkez", "Pervari", "Şirvan", "Tillo"],
    Sinop: ["Ayancık", "Boyabat", "Dikmen", "Durağan", "Erfelek", "Gerze", "Merkez", "Saraydüzü", "Türkeli"],
    Sivas: ["Akıncılar", "Altınyayla", "Divriği", "Doğanşar", "Gemerek", "Gölova", "Hafik", "İmranlı", "Kangal", "Koyulhisar", "Merkez", "Suşehri", "Şarkışla", "Ulaş", "Yıldızeli", "Zara"],
    Şanlıurfa: ["Akçakale", "Birecik", "Bozova", "Ceylanpınar", "Eyyübiye", "Halfeti", "Haliliye", "Harran", "Hilvan", "Karaköprü", "Siverek", "Suruç", "Viranşehir"],
    Şırnak: ["Beytüşşebap", "Cizre", "Güçlükonak", "İdil", "Merkez", "Silopi", "Uludere"],
    Tekirdağ: ["Çerkezköy", "Çorlu", "Ergene", "Hayrabolu", "Kapaklı", "Malkara", "Marmaraereğlisi", "Muratlı", "Saray", "Süleymanpaşa", "Şarköy"],
    Tokat: ["Almus", "Artova", "Başçiftlik", "Erbaa", "Merkez", "Niksar", "Pazar", "Reşadiye", "Sulusaray", "Turhal", "Yeşilyurt", "Zile"],
    Trabzon: ["Akçaabat", "Araklı", "Arsin", "Beşikdüzü", "Çarşıbaşı", "Çaykara", "Dernekpazarı", "Düzköy", "Hayrat", "Köprübaşı", "Maçka", "Of", "Ortahisar", "Sürmene", "Tonya", "Vakfıkebir", "Yomra"],
    Tunceli: ["Çemişgezek", "Hozat", "Mazgirt", "Merkez", "Nazımiye", "Ovacık", "Pertek"],
    Uşak: ["Banaz", "Eşme", "Karahallı", "Merkez", "Sivaslı", "Ulubey"],
    Van: ["Başkale", "Çaldıran", "Çatak", "Edremit", "Erciş", "Gevaş", "Gürpınar", "İpekyolu", "Muradiye", "Özalp", "Saray", "Tuşba"],
    Yalova: ["Altınova", "Armutlu", "Çiftlikköy", "Merkez", "Termal"],
    Yozgat: ["Akdağmadeni", "Aydıncık", "Boğazlıyan", "Çandır", "Çayıralan", "Çekerek", "Kadışehri", "Merkez", "Saraykent", "Sarıkaya", "Sorgun", "Şefaatli", "Yenifakılı", "Yerköy"],
    Zonguldak: ["Alaplı", "Çaycuma", "Devrek", "Ereğli", "Gökçebey", "Kilimli", "Kozlu", "Merkez"]
  };

  const countryList = Object.keys(countries).map(key => ({
    name: key
  }));

  function handleCountrySelect(e) {
    const countrySel = e.target.value;
    const citiesSel = countrySel !== "" ? countries[countrySel] : "";
    setSelectedCountry(countrySel);
    setCities(citiesSel);
    setSelectedCity("");
  }

  function handleCitySelect(e) {
    const citiesSel = e.target.value;
    setSelectedCity(citiesSel);
  }
  return (
      <>
      <ToastContainer />
      <form onSubmit={saveProduct} className="p-5 m-5 relative">
      <button
          type="submit"
          id="saveBtn"
          className="transition ease-in-out delay-150 fixed w-64 right-10 z-50 bottom-10 shadow-lg mt-5 rounded-md bg-green-800 px-3 py-2 text-sm font-semibold text-white hover:-translate-y-1 hover:scale-110 hover:bg-green-900 duration-300">
          Değişiklikleri Kaydet
        </button>
        <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-6">
                <h1 className="text-base font-bold leading-7 text-gray-900">Kamp Yeri Profili</h1>
                <div className="py-3 px-12 bg-yellow-100 opacity-50 mt-6 rounded-lg  shadow-sm flex gap-2">
                    <FiAlertTriangle className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                    <p className="text-sm opacity-100 text-black">Bu sayfada girdiğiniz bilgiler, kamp yerinizin sayfasında açık bir şekilde yayınlanacaktır. Lütfen bilgilerinizi girerken dikkatli olunuz.</p>
                </div>
            </div>
            <div className="border-b border-gray-900/10 pb-6">
                
                <h2 className="text-base font-semibold leading-7 text-gray-900">Genel Bilgiler</h2>
                
                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Kamp yerinizin adı:
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                    placeholder=""
                                    value={title}
                                    onChange={ev => setTitle(ev.target.value)}
                                    type="text"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-full">
                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                            Kamp yerinizin kısa tanıtım yazısı:
                        </label>
                        <p className="mt-3 text-sm leading-6 text-gray-600">Kamp yerinizi tanıtan kısa bir yazı ekleyiniz. </p>
                        <div className="mt-2">
                            <textarea
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder=""
                            value={description}
                            onChange={ev => setDescription(ev.target.value)}
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            İletişim ve Adres Bilgileri
                        </label>
                        <p className="mt-3 text-sm leading-6 text-gray-600">Paylaştığınız tüm iletişim bilgileri profilinizde açık bir şekilde yayınlanacaktır.</p>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm font-bold">Telefon Numarası :</span>
                                <input
                                    type="tel"
                                    placeholder="telefon numarası"
                                    value={contactTel} onChange={ev => setContactTel(ev.target.value)}
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className="py-3 px-12 bg-yellow-100 opacity-50 mt-6 rounded-lg  shadow-sm flex gap-2">
                                <FiAlertTriangle className="h-10 w-10 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                <p className="text-sm opacity-100 text-black">Telefon numaranızı <span className="font-bold">&apos;905*********&apos;</span> formatında yazmamanız durumunda, profilinizdeki WhatsApp üzerinden mesaj at butonu doğru çalışmayacaktır. Numaranızı başında + işareti olmadan 90 yazarak başlatıp rakamlar arasında boşluk bırakmayız.</p>
                            </div>
                            <div className="flex rounded-md mt-5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm font-bold">Instagram sayfası :</span>
                                <input
                                    type="tel"
                                    placeholder="Instagram sayfası"
                                    value={contactInstagram} onChange={ev => setContactInstagram(ev.target.value)}
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                />
                            </div>
                            <div className="flex rounded-md mt-5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm font-bold">Facebook sayfası :</span>
                                <input
                                    type="tel"
                                    placeholder="Facebook sayfası"
                                    value={contactFacebook} onChange={ev => setContactFacebook(ev.target.value)}
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                />
                            </div>

                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 mt-5">
                                    Kamp yerinizin açık adresi / Yol tarifi:
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <textarea
                                    rows={3}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="   adres"
                                    value={address} onChange={ev => setAddress(ev.target.value)}
                                    />
                                    </div>
                                </div>
                            </div>

                            <div className="Container mt-2">
                                <div className="my-3 text-sm leading-6 text-gray-600">
                                {city} / {district} olarak seçim yaptınız, değiştirmek için aşağıdaki alanı kullanabilirsiniz.
                                </div>
                                <select className="border p-1" name="Countries" onChange={e => handleCountrySelect(e)} value={selectedCounty} >
                                {selectedCity && (
                                    <option key={selectedCity} value={selectedCity}>
                                        {selectedCity}
                                    </option>
                                    )}
                                    {countryList.map((country, key) => (
                                        <option key={key} value={country.name}>
                                        {country.name}
                                        </option>
                                    ))}
                                </select>
                                <select className="border ml-4 p-1" name="Cities" onChange={e => handleCitySelect(e)} value={selectedCity} >
                                    
                                    <option value="">İlçe seçiniz.</option>
                                    {cities.map((city, key) => (
                                    <option key={key} value={city}>
                                        {city}
                                    </option>
                                    ))}
                                </select>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 mt-5">
                                    Kamp yerinizin kordinat bilgilerini aşağıda belirtirseniz harita üzerinde gösterilecektir. Kordinatınızı nasıl bulacağınızı bilmiyorsanız, <a href="https://youtu.be/yFavIeiWmO8" target="_blank">bu videoyu</a> izleyebilirsiniz.
                                </label>
                                <div className="mt-2">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm font-bold">Enlem kordinatı :</span>
                                    <input
                                        type="tel"
                                        placeholder="Enlem kordinatı"
                                        value={mapLatitute} onChange={ev => setMapLatitute(ev.target.value)}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                                <div className="mt-2">
                                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm font-bold">Boylam kordinatı :</span>
                                    <input
                                        type="tel"
                                        placeholder="Boylam kordinatı"
                                        value={mapLangtitute} onChange={ev => setMapLangtitute(ev.target.value)}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 mt-5">
                                    Rezarvasyon Modülü
                                </label>
                                <div className="mt-2">
                                    <p className="my-3 text-sm leading-6 text-gray-600">Sitemiz üzerinden kullanıcıların kamp yeriniz için rezervasyon talebi oluşturmasına izin vermek istiyor musunuz?</p>
                                    <fieldset>
                                    <div className="mt-6 space-y-6">
                                        <div className="relative flex gap-x-3">
                                            <div className="flex h-6 items-center">
                                                <input
                                                onChange={(e) => setIsReservationModuleAvailable(prevCheck => !prevCheck)} checked={isReservationModuleAvailable}
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                            </div>
                                            <div className="text-sm leading-6">
                                                <label htmlFor="comments" className="font-medium text-gray-900">
                                                Kullanıcıların rezervasyon talebi oluşturmasına izin verin.
                                                </label>
                                            </div> 
                                        </div>
                                    </div>
                                    {isReservationModuleAvailable && (
                                        <div className="mt-6 space-y-6">
                                            <div className="relative flex gap-x-3">
                                                <div className="flex h-6 items-center">
                                                    <input
                                                    onChange={(e) => setIsReservationModuleBungalowRentingPossible(prevCheck => !prevCheck)} checked={isReservationModuleBungalowRentingPossible}
                                                    type="checkbox"
                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                </div>
                                                <div className="text-sm leading-6">
                                                    <label htmlFor="comments" className="font-medium text-gray-900">
                                                    Bungalow kiralama olanağınız varsa, kullanıcıya rezervasyon talebi oluşturulurken bungalow kiralama seçeneği sunmak ister misiniz?
                                                    </label>
                                                </div> 
                                                
                                            </div>
                                        </div>
                                    )}
                                </fieldset>
                                <div className="py-3 px-12 bg-yellow-100 opacity-50 mt-6 rounded-lg  shadow-sm flex gap-2">
                                    <FiAlertTriangle className="h-24 w-24 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                    <p className="text-sm opacity-100 text-black">Sitemiz üzerinden rezervasyon yapılması halince kullanıcıdan herhangi bir ödeme alınmamaktadır, rezervasyonda belirtilen tarihlerde kullanıcının kamp yerine gelmesi halinde fiziksel olarak ödeme alınacaktır. Sitemiz üzerinden kamp yeri sahibi olarak talebi kabul etme ya da reddetme hakkınız bulunmaktadır ve bu bilgi rezervasyonu yapan kullanıcıya sitemiz üzerinden sunulacaktır. Kullanıcının da rezervasyonunu, rezervasyon tarihinden önce iptal etme seçeneği bulunmaktadır.</p>
                                </div>
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 mt-5">
                                    Fiyat bilgisi:
                                </label>
                                <div className="sm:col-span-3">
                                <div className="mt-2 flex gap-3">
                                    <select
                                    value={priceDefaultType}
                                    onChange={(e) => setPriceDefaultType(e.target.value)}
                                    id="country"
                                    name="country"
                                    autoComplete="country-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option >Gecelik Kişi Başı Konaklama</option>
                                        <option>Gecelik Çadır Başı Konaklama</option>
                                    </select>
                                    <input
                                        type="number" min="0"
                                        placeholder="Fiyat bilgisi (tl cinsinden)"
                                        onChange={ev => setPrice(ev.target.value)}
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                </div>
                            </div>
                            <div className="sm:col-span-4 flex gap-3 mt-3">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 mt-5">
                                    Bungalow kiralama imkanı sunuyorsanız, gecelik bungalow kiralama ücretinizi burada belirtebilirsiniz:
                                </label>
                                <div className="sm:col-span-3">
                                    <div className="mt-3">
                                        <input
                                            type="number" min="0"
                                            placeholder="Fiyat bilgisi (tl cinsinden)"
                                            onChange={ev => setPriceBungalow(ev.target.value)}
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            <div>
                            </div>
                            </div>
                            <div className="sm:col-span-4 flex gap-3 mt-3">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 mt-5">
                                    Karavanlara yönelik ayrı bir fiyatlandırma politikanız varsa, karavan başı gecelik ücretinizi burada belirtebilirsiniz.
                                </label>
                                <div className="sm:col-span-3">
                                    <div className="mt-3">
                                        <input
                                            type="number" min="0"
                                            placeholder="Fiyat bilgisi (tl cinsinden)"
                                            onChange={ev => setPriceVan(ev.target.value)}
                                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            <div>
                            </div>
                            </div>
                            </div>
                            <div className="border-b border-gray-900/10 pb-6">
                                <fieldset>
                                    <div className="mt-6 space-y-6">
                                        <div className="relative flex gap-x-3">
                                            <div className="flex h-6 items-center">
                                                <input
                                                onChange={(e) => setIsPriceVisible(prevCheck => !prevCheck)} checked={isPriceVisible}
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                            </div>
                                            <div className="text-sm leading-6">
                                                <label htmlFor="comments" className="font-medium text-gray-900">
                                                Girdiğiniz fiyat bilgisi kullanıcılara görünür olarak sayfanıza eklensin mi? Yandaki kutucuğu seçerek fiyat bilginizi görünür yapın.
                                                </label>
                                            </div> 
                                        </div>
                                    </div>
                                    <h2 className="text-base font-semibold leading-7 text-gray-900 mt-5">Aşağıdaki ödeme yöntemlerinden hangilerini kabul etmektesiniz? Uyanlardan hepsini işaretleyiniz.</h2>
                                    <div className="mt-3 space-y-6">
                                        <div className="relative flex gap-x-3">
                                            <div className="flex h-6 items-center">
                                                <input
                                                onChange={(e) => setIsPaymentCash(prevCheck => !prevCheck)} checked={isPaymentCash}
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                            </div>
                                            <div className="text-sm leading-6">
                                                <label htmlFor="comments" className="font-medium text-gray-900">
                                                Nakit 
                                                </label>
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="mt-3 space-y-6">
                                        <div className="relative flex gap-x-3">
                                            <div className="flex h-6 items-center">
                                                <input
                                                onChange={(e) => setIsPaymentIban(prevCheck => !prevCheck)} checked={isPaymentIban}
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                            </div>
                                            <div className="text-sm leading-6">
                                                <label htmlFor="comments" className="font-medium text-gray-900">
                                                 IBAN numarasına Havale / EFT
                                                </label>
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="mt-3 space-y-6">
                                        <div className="relative flex gap-x-3">
                                            <div className="flex h-6 items-center">
                                                <input
                                                onChange={(e) => setIsPaymentCreditCard(prevCheck => !prevCheck)} checked={isPaymentCreditCard}
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                />
                                            </div>
                                            <div className="text-sm leading-6">
                                                <label htmlFor="comments" className="font-medium text-gray-900">
                                                Kredi kartı
                                                </label>
                                            </div> 
                                        </div>
                                    </div>
                                </fieldset>
                                <div className="py-3 px-12 bg-yellow-100 opacity-50 mt-6 rounded-lg  shadow-sm flex gap-2">
                                    <FiAlertTriangle className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                    <p className="text-sm opacity-100 text-black">Sitemiz üzerinden herhangi bir ödeme alınmamaktadır, ziyaretçilerden tesisiniz dahilinde ödeme tahsil ettiğiniz yolları seçiniz.</p>
                                </div>
                            </div>
                            
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 mt-5">
                                    Fotoğraf galerisi:
                                </label>
                                <div className="py-3 px-12 bg-yellow-100 opacity-50 mt-6 rounded-lg  shadow-sm flex gap-2">
                                    <FiAlertTriangle className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                    <p className="text-sm opacity-100 text-black">Tüm fotoğraf yükleme ve silme işlemlerinden sonra formun en altındaki kaydet butonuna basmayı unutmayın.</p>
                                </div>
                                <div className="mt-2">
                                <p className="my-3 text-sm leading-6 text-gray-600">Kamp sitenizi yansıtan yüksek kaliteli ve bol sayıda fotoğraf eklenmesi sizi öne çıkaracaktır.</p>
                                {!images?.length &&(
                                    <div className="py-3 px-12 bg-yellow-100 opacity-50 mt-6 rounded-lg  shadow-sm flex gap-2 w-ful">
                                        <FiAlertTriangle className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                        <p className="text-sm opacity-100 text-black">Fotoğraf galeriniz boş</p>
                                    </div>
                                    )}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    
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
                                    <div className="mt-2 block justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center">
                                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                >
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={uploadImages} />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <div className="border-b border-gray-900/10 pb-6">
                <h2 className="text-base font-semibold leading-7 text-gray-900">İşletmeniz ile İlgili Bilgiler</h2>
                <fieldset>
                    <p className="my-3 text-sm leading-6 text-gray-600">Aşağıdaki kutucuklardan uygun olanları işaretleyiniz.</p>
                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setIsFriendlyVan(prevCheck => !prevCheck)} checked={isFriendlyVan}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                İşletmeniz karavanların kalması için uygun mu? Uygunsa kutucuğu işaretleyiniz.
                                </label>
                                {isFriendlyVan && (
                                <>
                                    <p className="text-gray-500">Karavanlara yönelik özel bir hizmetiniz ya da kısıtlamalarınız varsa burada ayrıca metin olarak belirtebilirsiniz. Boş bırakabilirsiniz.</p>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <textarea
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder=""
                                        value={descriptionVan} onChange={ev => setDescriptionVan(ev.target.value)}
                                        />
                                        </div>
                                    </div>
                                </>
                                )}
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setIsFriendlyPet(prevCheck => !prevCheck)} checked={isFriendlyPet}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                Tesisiniz evcil hayvan kabul etmekte midir?
                                </label>
                                {isFriendlyPet && (
                                <>
                                    <p className="text-gray-500">Evcil hayvan ebatı, cinsi gibi konularda sınırlamanız varsa belirtiniz. Boş bırakabilirsiniz.</p>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <textarea
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder=""
                                        value={descriptionPet} onChange={ev => setDescriptionPet(ev.target.value)}
                                        />
                                        </div>
                                    </div>
                                </>
                                )}
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setIsFriendlyRemoteWork(prevCheck => !prevCheck)} checked={isFriendlyRemoteWork}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                Uzaktan çalışma için tesisiniz uygun mudur? Uygunsa kutucuğu işaretleyiniz.
                                </label>
                                {isFriendlyRemoteWork && (
                                <>
                                    <p className="text-gray-500">Uzaktan çalışma ile ilgili sağladığınız imkanları belirtebilirsiniz (masa, sınırsız internet internet hızı gibi). Boş bırakabilirsiniz.</p>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <textarea
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder=""
                                        value={descriptionRemoteWork} onChange={ev => setDescriptionRemoteWork(ev.target.value)}
                                        />
                                        </div>
                                    </div>
                                </>
                                )}
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setIsFriendlyKid(prevCheck => !prevCheck)} checked={isFriendlyKid}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                Tesisiniz çocuklar için uygun mudur? Uygunsa kutucuğu işaretleyiniz.
                                </label>
                                {isFriendlyKid && (
                                <>
                                    <p className="text-gray-500">Çocuklar için özel hizmetleriniz varsa belirtiniz, örneğin çocuk bakımı hizmeti, park, merdivenlerde korkuluk vs. Boş bırakabilirsiniz.</p>
                                    <div className="mt-2">
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                        <textarea
                                        rows={3}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder=""
                                        value={descriptionKid} onChange={ev => setDescriptionKid(ev.target.value)}
                                        />
                                        </div>
                                    </div>
                                </>
                                )}
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setIsFriendlyAlcohol(prevCheck => !prevCheck)} checked={isFriendlyAlcohol}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                İşletmeniz alkolsüz müdür? 
                                </label>
                                <p className="text-gray-500">Yandaki kutucuğu işaretlerseniz sayfanız alkolsüz olarak gösterilecektir.</p>
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setIsPresentBreakfastIncluded(prevCheck => !prevCheck)} checked={isPresentBreakfastIncluded}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                Fiyata kahvaltı dahil midir? Dahilse yandaki kutucuğu işaretleyiniz.
                                </label>
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setIsPresentBungalow(prevCheck => !prevCheck)} checked={isPresentBungalow}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                Bungalow kiralama inkanı sunuyor musunuz? Uygunsa kutucuğu işaretleyiniz.
                                </label>
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setIsPublicTransportationPossible(prevCheck => !prevCheck)} checked={isPublicTransportationPossible}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                Kamp yeriniz toplu taşıma ile ulaşıma uygun mudur? (maksimum on beş dakikalık yürüme mesafesi)
                                </label>
                            </div> 
                        </div>
                    </div>
                </fieldset>
            </div>
            <div className="border-b border-gray-900/10 pb-6">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Aktiviteler</h2>
                <fieldset>
                    <p className="my-3 text-sm leading-6 text-gray-600">İşletmenizde konaklayan ziyaretçilerin katılabileceği, işletme içindeki ve yakınlarındaki aktiviteleri işaretleyiniz.</p>
                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setActivitiesYoga(prevCheck => !prevCheck)} checked={activitiesYoga}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                Yoga
                                </label>
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setActivitiesTrekking(prevCheck => !prevCheck)} checked={activitiesTrekking}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                Yürüyüş Parkuru
                                </label>
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setActivitiesCanoing(prevCheck => !prevCheck)} checked={activitiesCanoing}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                Kano
                                </label>
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setActivitiesSurf(prevCheck => !prevCheck)} checked={activitiesSurf}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                Sörf
                                </label>
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setActivitiesBeachVolleyball(prevCheck => !prevCheck)} checked={activitiesBeachVolleyball}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                Plaj Voleybolu
                                </label>
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setActivitiesVolleyball(prevCheck => !prevCheck)} checked={activitiesVolleyball}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                Voleybol
                                </label>
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setActivitiesSpa(prevCheck => !prevCheck)} checked={activitiesSpa}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                Spa / Masaj
                                </label>
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setActivitiesAtv(prevCheck => !prevCheck)} checked={activitiesAtv}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                Atv
                                </label>
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setActivitiesParagliding(prevCheck => !prevCheck)} checked={activitiesParagliding}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                Yamaç Paraşütü
                                </label>
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setActivitiesBoatRental(prevCheck => !prevCheck)} checked={activitiesBoatRental}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                Tekne Kiralama
                                </label>
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setActivitiesBoatTour(prevCheck => !prevCheck)} checked={activitiesBoatTour}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                Tekne Turu
                                </label>
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setActivitiesPool(prevCheck => !prevCheck)} checked={activitiesPool}   
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                Yüzme Havuzu
                                </label>
                            </div> 
                        </div>
                    </div>
                </fieldset>
            </div>
            <div className="border-b border-gray-900/10 pb-6">
                <h2 className="text-base font-semibold leading-7 text-gray-900">İşletmenizin Yakınlarındaki Yerler</h2>
                <fieldset>
                    <p className="my-3 text-sm leading-6 text-gray-600">Aşağıdaki kutucuklardan uygun olanları işaretleyiniz.</p>
                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setIsNearSea(prevCheck => !prevCheck)} checked={isNearSea}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                İşletmeniz denize yakın mı? Yakınsa kutucuğu işaretleyiniz.
                                </label>
                                {isNearSea && (
                                <>
                                    <p className="text-gray-500 text-sm my-2">Denize olan mesafeyi belirtiniz.</p>
                                    <div className="radio">
                                        <label>
                                            <input
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                                            type="radio"
                                            value="1"
                                            onChange={ev => setDistanceSea(ev.target.value)} checked={distanceSea == "1"}
                                            />
                                            Denize sıfır
                                        </label>
                                    </div>
                                    <div className="radio gap-2">
                                        <label>
                                            <input
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                                            type="radio"
                                            value="2"
                                            onChange={ev => setDistanceSea(ev.target.value)} checked={distanceSea == "2"}
                                            />
                                            Yürüme Mesafesi
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                                            type="radio"
                                            value="3"
                                            onChange={ev => setDistanceSea(ev.target.value)} checked={distanceSea == "3"}
                                            />
                                            Kısa araç mesafesi
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                                            type="radio"
                                            value="4"
                                            onChange={ev => setDistanceSea(ev.target.value)} checked={distanceSea == "4"}
                                            />
                                            Uzak araç mesafesi
                                        </label>
                                    </div>
                                </>
                                )}
                                <div className="mt-3">
                                    <label>
                                        <input
                                        onChange={(e) => setIsPresentPrivateBeach(prevCheck => !prevCheck)} checked={isPresentPrivateBeach}
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </label>
                                    <label htmlFor="comments" className="font-medium text-gray-900 ml-2">
                                      İşletmeniz kendine özel plajı var mıdır? Varsa kutucuğu işaretleyiniz.
                                    </label>
                                </div>
                                <div className="mt-3">
                                    <label>
                                        <input
                                        onChange={(e) => setIsPresentSunbedIncluded(prevCheck => !prevCheck)} checked={isPresentSunbedIncluded}
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </label>
                                    <label htmlFor="comments" className="font-medium text-gray-900 ml-2">
                                      İşletmeniz gecelik fiyatına deniz şezlongu / şemsiyesi kiralama ücreti de dahil midir? Dahilse kutucuğu işaretleyiniz.
                                    </label>
                                </div>
                                <div className="mt-3">
                                    <label>
                                        <input
                                        onChange={(e) => setIsPresentSunbedRenting(prevCheck => !prevCheck)} checked={isPresentSunbedRenting}
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </label>
                                    <label htmlFor="comments" className="font-medium text-gray-900 ml-2">
                                      İşletmeniz deniz şezlongu / şemsiyesi kiralama hizmeti vermekte midir? Varsa kutucuğu işaretleyiniz.
                                    </label>
                                </div>
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setIsNearLake(prevCheck => !prevCheck)} checked={isNearLake}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                İşletmeniz göle yakın mı? Yakınsa kutucuğu işaretleyiniz.
                                </label>
                                {isNearLake && (
                                <>
                                    <p className="text-gray-500 text-sm my-2">Göle olan mesafeyi belirtiniz.</p>
                                    <div className="radio">
                                        <label>
                                            <input
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                                            type="radio"
                                            value="1"
                                            onChange={ev => setDistanceLake(ev.target.value)} checked={distanceLake == "1"}
                                            />
                                            Göle sıfır/Göl kenarında
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                                            type="radio"
                                            value="2"
                                            onChange={ev => setDistanceLake(ev.target.value)} checked={distanceLake == "2"}
                                            />
                                            Yürüme Mesafesi
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                                            type="radio"
                                            value="3"
                                            onChange={ev => setDistanceLake(ev.target.value)} checked={distanceLake == "3"}
                                            />
                                            Kısa araç mesafesi
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                                            type="radio"
                                            value="4"
                                            onChange={ev => setDistanceLake(ev.target.value)} checked={distanceLake == "4"}
                                            />
                                            Uzak araç mesafesi
                                        </label>
                                    </div>
                                </>
                                )}
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setIsNearRestaurant(prevCheck => !prevCheck)} checked={isNearRestaurant}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                İşletmeniz yakınında veya içinde restoran bulunmakta mıdır? Varsa kutucuğu işaretleyiniz.
                                </label>
                                {isNearRestaurant && (
                                <>
                                <p className="text-gray-500 text-sm my-2">Restorana olan mesafeyi belirtiniz.</p>
                                <div className="radio">
                                    <label>
                                        <input
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                                        type="radio"
                                        value="1"
                                        onChange={ev => setDistanceRestaurant(ev.target.value)} checked={distanceRestaurant == "1"}
                                        />
                                        Tesis içinde
                                    </label>
                                </div>
                                <div className="radio">
                                    <label>
                                        <input
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                                        type="radio"
                                        value="2"
                                        onChange={ev => setDistanceRestaurant(ev.target.value)} checked={distanceRestaurant == "2"}
                                        />
                                        Yürüme Mesafesi
                                    </label>
                                </div>
                                <div className="radio">
                                    <label>
                                        <input
                                        type="radio"
                                        value="3"
                                        onChange={ev => setDistanceRestaurant(ev.target.value)} checked={distanceRestaurant == "3"}
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                                        />
                                        Kısa araç mesafesi
                                    </label>
                                </div>
                                <div className="radio">
                                    <label>
                                        <input
                                        type="radio"
                                        value="4"
                                        onChange={ev => setDistanceRestaurant(ev.target.value)} checked={distanceRestaurant == "4"}
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                                        />
                                        Uzak araç mesafesi
                                    </label>
                                </div>
                            </>
                                )}
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setIsNearBar(prevCheck => !prevCheck)} checked={isNearBar}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                İşletmeniz yakında bar / eğlence mekanı bulunmakta mıdır? Varsa kutucuğu işaretleyiniz.
                                </label>
                                {isNearBar && (
                                <>
                                    <p className="text-gray-500 text-sm my-2">Bara olan mesafeyi belirtiniz.</p>
                                    <div className="radio">
                                        <label>
                                            <input
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                                            type="radio"
                                            value="1"
                                            onChange={ev => setDistanceBar(ev.target.value)} checked={distanceBar == "1"}
                                            />
                                            Tesis içinde
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                                            type="radio"
                                            value="2"
                                            onChange={ev => setDistanceBar(ev.target.value)} checked={distanceBar == "2"}
                                            />
                                            Yürüme Mesafesi
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                                            type="radio"
                                            value="3"
                                            onChange={ev => setDistanceBar(ev.target.value)} checked={distanceBar == "3"}
                                            />
                                            Kısa araç mesafesi
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                                            type="radio"
                                            value="4"
                                            onChange={ev => setDistanceBar(ev.target.value)} checked={distanceBar == "4"}
                                            />
                                            Uzak araç mesafesi
                                        </label>
                                    </div>
                                </>
                                )}
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setIsNearForest(prevCheck => !prevCheck)} checked={isNearForest}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                İşletmeniz yakında orman bulunmakta mıdır? Varsa kutucuğu işaretleyiniz.
                                </label>
                                {isNearForest && (
                                <>
                                    <p className="text-gray-500 text-sm my-2">Ormana olan mesafeyi belirtiniz.</p>
                                    <div className="radio">
                                        <label>
                                            <input
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                                            type="radio"
                                            value="1"
                                            onChange={ev => setDistanceForest(ev.target.value)} checked={distanceForest == "1"}
                                            />
                                            Tesis orman içinde
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                                            type="radio"
                                            value="2"
                                            onChange={ev => setDistanceForest(ev.target.value)} checked={distanceForest == "2"}
                                            />
                                            Yürüme Mesafesi
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                                            type="radio"
                                            value="3"
                                            onChange={ev => setDistanceForest(ev.target.value)} checked={distanceForest == "3"}
                                            />
                                            Kısa araç mesafesi
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                                            type="radio"
                                            value="4"
                                            onChange={ev => setDistanceForest(ev.target.value)} checked={distanceForest == "4"}
                                            />
                                            Uzak araç mesafesi
                                        </label>
                                    </div>
                                </>
                                )}
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setIsNearStore(prevCheck => !prevCheck)} checked={isNearStore}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                İşletmeniz yakında market bulunmakta mıdır? Varsa kutucuğu işaretleyiniz.
                                </label>
                                {isNearStore && (
                                <>
                                    <p className="text-gray-500 text-sm my-2">Markete olan mesafeyi belirtiniz.</p>
                                    <div className="radio">
                                        <label>
                                            <input
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                                            type="radio"
                                            value="1"
                                            onChange={ev => setDistanceStore(ev.target.value)} checked={distanceStore == "1"}
                                            />
                                            Tesis içinde
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                                            type="radio"
                                            value="2"
                                            onChange={ev => setDistanceStore(ev.target.value)} checked={distanceStore == "2"}
                                            />
                                            Yürüme Mesafesi
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                                            type="radio"
                                            value="3"
                                            onChange={ev => setDistanceStore(ev.target.value)} checked={distanceStore == "3"}
                                            />
                                            Kısa araç mesafesi
                                        </label>
                                    </div>
                                    <div className="radio">
                                        <label>
                                            <input
                                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600 mr-2"
                                            type="radio"
                                            value="4"
                                            onChange={ev => setDistanceStore(ev.target.value)} checked={distanceStore == "4"}
                                            />
                                            Uzak araç mesafesi
                                        </label>
                                    </div>
                                </> 
                                )}
                            </div> 
                        </div>
                    </div>
                </fieldset>
            </div>
            <div className="border-b border-gray-900/10 pb-6">
                <h2 className="text-base font-semibold leading-7 text-gray-900">İşletme Ortak Alanları</h2>
                <fieldset>
                    <p className="my-3 text-sm leading-6 text-gray-600">İşletmenizin sunduğu ortak alan hizmetlerini işaretleyiniz.</p>
                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setIsPresentWC(prevCheck => !prevCheck)} checked={isPresentWC}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                WC
                                </label>
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setIsPresentParkLot(prevCheck => !prevCheck)} checked={isPresentParkLot}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                Park Alanı
                                </label>
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setIsPresentShower(prevCheck => !prevCheck)} checked={isPresentShower}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                Duş
                                </label>
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setIsPresentHotWater(prevCheck => !prevCheck)} checked={isPresentHotWater}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                Sıcak Su (Duş)
                                </label>
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setIsPresentWifi(prevCheck => !prevCheck)} checked={isPresentWifi}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                Wifi
                                </label>
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setIsPresentKitchen(prevCheck => !prevCheck)} checked={isPresentKitchen}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                Mutfak
                                </label>
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setIsPresentLaundry(prevCheck => !prevCheck)} checked={isPresentLaundry}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                Çamaşır Makinesi
                                </label>
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setIsPresentFirePit(prevCheck => !prevCheck)} checked={isPresentFirePit}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                Kamp Ateşi
                                </label>
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setIsPresentElectricity(prevCheck => !prevCheck)} checked={isPresentElectricity}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                Elektrik
                                </label>
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setIsPresentDishwasher(prevCheck => !prevCheck)} checked={isPresentDishwasher}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                Bulaşık Makinesi
                                </label>
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setIsPresentMicrowave(prevCheck => !prevCheck)} checked={isPresentMicrowave}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                Mikrodalga Fırın
                                </label>
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setIsPresentFridge(prevCheck => !prevCheck)} checked={isPresentFridge}
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                Buzdolabı
                                </label>
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setIsPresentStowe(prevCheck => !prevCheck)} checked={isPresentStowe}  
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                Ocak
                                </label>
                            </div> 
                        </div>
                    </div>

                    <div className="mt-6 space-y-6">
                        <div className="relative flex gap-x-3">
                            <div className="flex h-6 items-center">
                                <input
                                onChange={(e) => setIsPresentPicnicTable(prevCheck => !prevCheck)} checked={isPresentPicnicTable}  
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="text-sm leading-6">
                                <label htmlFor="comments" className="font-medium text-gray-900">
                                Piknik Masası / Yemek alanı
                                </label>
                            </div> 
                        </div>
                    </div>
                </fieldset>
            </div>
            <div className="border-b border-gray-900/10 pb-6">
                
                <h2 className="text-base font-semibold leading-7 text-gray-900">Yabancı Ziyaretçilere Yönelik</h2>
                
                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Kamp yerinizin adı (İngilizce):
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                    placeholder=" "
                                    value={titleEnglish}
                                    onChange={ev => setTitleEnglish(ev.target.value)}
                                    type="text"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-full">
                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                            Kamp yerinizin kısa tanıtım yazısı (İngilizce):
                        </label>
                        <p className="mt-3 text-sm leading-6 text-gray-600">Kamp yerinizi tanıtan kısa bir yazı ekleyiniz. </p>
                        <div className="mt-2">
                            <textarea
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder=""
                            value={descriptionEnglish}
                            onChange={ev => setDescriptionEnglish(ev.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-span-full">
                        <p className="mt-3 text-sm leading-6 text-gray-600">İşletmenizde aşağıdaki dillerden hangileri ile ziyaretçilerinize hizmet verebilmektesiniz? Uygun olanları işaretleyiniz. </p>
                        <fieldset>
                            <div className="mt-6 space-y-6">
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                        onChange={(e) => setIsEnglishSpoken(prevCheck => !prevCheck)} checked={isEnglishSpoken}
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="comments" className="font-medium text-gray-900">
                                        İngilizce
                                        </label>
                                    </div> 
                                </div>
                            </div>
                            <div className="mt-6 space-y-6">
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                        onChange={(e) => setIsGermanSpoken(prevCheck => !prevCheck)} checked={isGermanSpoken}
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="comments" className="font-medium text-gray-900">
                                        Almanca
                                        </label>
                                    </div> 
                                </div>
                            </div>
                            <div className="mt-6 space-y-6">
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                        onChange={(e) => setIsRussianSpoken(prevCheck => !prevCheck)} checked={isRussianSpoken}
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="comments" className="font-medium text-gray-900">
                                        Rusça
                                        </label>
                                    </div> 
                                </div>
                            </div>
                            <div className="mt-6 space-y-6">
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                        onChange={(e) => setIsSpanishSpoken(prevCheck => !prevCheck)} checked={isSpanishSpoken}
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="comments" className="font-medium text-gray-900">
                                        İspanyolca
                                        </label>
                                    </div> 
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    
                </div>
            </div>
        </div>

        
      </form>
      </>
  );
}