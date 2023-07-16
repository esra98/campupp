import {Campsite} from "@/models/Campsite";
import {mongooseConnect} from "@/lib/mongoose";

export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();

  if (method === 'GET') {
    if (req.query?.user) {
      res.json(await Campsite.findOne({user:req.query.user}));
    } 
    else if(req.query?.map) {
      res.json(await Campsite.find().select('title _id mapLatitute mapLangtitute'))
    }
    else if(req.query?.counts) {
      try {
        const cityOccurrences = await Campsite.aggregate([
          {
            $group: {
              _id: '$city',
              count: { $sum: 1 },
            },
          },
          {
            $project: {
              _id: 0,
              city: '$_id',
              count: 1,
            },
          },
        ]);
    
        const result = {};
    
        cityOccurrences.forEach((city) => {
          result[city.city] = city.count;
        });
    
        res.json(result);
      } catch (error) {
        console.error('Error getting city occurrences:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
  
    }
    else if(req.query?.id) {
      res.json(await Campsite.findOne({_id:req.query.id}));
    }
    else if(req.query?.searchInput) {
      res.json(await Campsite.find({
        $or: [
          { title: { $regex: req.query.searchInput, $options: 'i' } },
          { city: { $regex: req.query.searchInput, $options: 'i' } },
          { description: { $regex: req.query.searchInput, $options: 'i' } },
          { district: { $regex: req.query.searchInput, $options: 'i' } }, // case-insensitive search on title
          { address: { $regex: req.query.searchInput, $options: 'i' } } // case-insensitive search on address
          
        ]
      }));
    }
    else {
      res.json(await Campsite.find());
    }
  }  

  if (method === 'POST') {
    const {title,description,price,images,user, address, selectedCounty, selectedCity,activitiesYoga, isPublicTransportationPossible,mapLatitute,mapLangtitute,
      activitiesCanoing, activitiesTrekking, activitiesSurf, activitiesBeachVolleyball,activitiesVolleyball,activitiesSpa, activitiesAtv, activitiesParagliding, activitiesBoatRental, 
      activitiesBoatTour, activitiesPool,isFriendlyAlcohol,isFriendlyKid,isFriendlyRemoteWork,isFriendlyVan,isFriendlyPet, descriptionKid,descriptionPet,descriptionRemoteWork,
      descriptionVan,isPresentBungalow,isPresentBreakfastIncluded,isNearSea,distanceSea,isNearLake, distanceLake,isNearForest, distanceForest,isNearRestaurant, distanceRestaurant,isNearStore,distanceStore,isNearBar,distanceBar,
      isPresentPrivateBeach, isPresentSunbedIncluded, isPresentSunbedRenting,isPresentDishwasher, isPresentElectricity,isPresentFirePit,isPresentFridge,isPresentHotWater,isPresentKitchen,
      isPresentLaundry, isPresentMicrowave, isPresentParkLot, isPresentShower, isPresentStowe, isPresentWC, isPresentWifi, contactTel, contactInstagram, contactFacebook,
      isEnglishSpoken,isGermanSpoken,isRussianSpoken,isSpanishSpoken,titleEnglish,descriptionEnglish,isPriceVisible,isReservationModuleAvailable,isPaymentCash,isPaymentCreditCard,isPaymentIban,
      isPresentPicnicTable,isReservationModuleBungalowRentingPossible,priceDefaultType,priceBungalow,priceVan,contactTelAlt} = req.body;
    const productDoc = await Campsite.create({
      user,title,description,price,images,address,district:selectedCounty, city:selectedCity,activitiesYoga, isPublicTransportationPossible,mapLatitute,mapLangtitute,
      activitiesCanoing, activitiesTrekking, activitiesSurf, activitiesBeachVolleyball,activitiesVolleyball,activitiesSpa, activitiesAtv, activitiesParagliding, activitiesBoatRental, 
      activitiesBoatTour, activitiesPool,isFriendlyAlcohol,isFriendlyKid,isFriendlyRemoteWork,isFriendlyVan,isFriendlyPet, descriptionKid,descriptionPet,descriptionRemoteWork,
      descriptionVan,isPresentBungalow,isPresentBreakfastIncluded,isNearSea,distanceSea,isNearLake, distanceLake,isNearForest, distanceForest,isNearRestaurant, distanceRestaurant,isNearStore,distanceStore,isNearBar,distanceBar,
      isPresentPrivateBeach, isPresentSunbedIncluded, isPresentSunbedRenting,isPresentDishwasher, isPresentElectricity,isPresentFirePit,isPresentFridge,isPresentHotWater,isPresentKitchen,
      isPresentLaundry, isPresentMicrowave, isPresentParkLot, isPresentShower, isPresentStowe, isPresentWC, isPresentWifi, contactTel, contactInstagram, contactFacebook,
      isEnglishSpoken,isGermanSpoken,isRussianSpoken,isSpanishSpoken,titleEnglish,descriptionEnglish,isPriceVisible,isReservationModuleAvailable,isPaymentCash,isPaymentCreditCard,isPaymentIban,
      isPresentPicnicTable,isReservationModuleBungalowRentingPossible,priceDefaultType,priceBungalow,priceVan,contactTelAlt
    })
    res.json(productDoc);
  }

  if (method === 'PUT') {
    const {title,description,price,images,_id, address, selectedCounty, selectedCity,activitiesYoga, isPublicTransportationPossible,mapLatitute,mapLangtitute,
      activitiesCanoing, activitiesTrekking, activitiesSurf, activitiesBeachVolleyball,activitiesVolleyball,activitiesSpa, activitiesAtv, activitiesParagliding, activitiesBoatRental, 
      activitiesBoatTour, activitiesPool,isFriendlyAlcohol,isFriendlyKid,isFriendlyRemoteWork,isFriendlyVan,isFriendlyPet, descriptionKid,descriptionPet,descriptionRemoteWork,
      descriptionVan,isPresentBungalow,isPresentBreakfastIncluded,isNearSea,distanceSea,isNearLake, distanceLake,isNearForest, distanceForest,isNearRestaurant, distanceRestaurant,isNearStore,distanceStore,isNearBar,distanceBar,
      isPresentPrivateBeach, isPresentSunbedIncluded, isPresentSunbedRenting,isPresentDishwasher, isPresentElectricity,isPresentFirePit,isPresentFridge,isPresentHotWater,isPresentKitchen,
      isPresentLaundry, isPresentMicrowave, isPresentParkLot, isPresentShower, isPresentStowe, isPresentWC, isPresentWifi, contactTel, contactInstagram, contactFacebook,
      isEnglishSpoken,isGermanSpoken,isRussianSpoken,isSpanishSpoken,titleEnglish,descriptionEnglish,isPriceVisible,isReservationModuleAvailable,isPaymentCash,isPaymentCreditCard,isPaymentIban,
      isPresentPicnicTable,isReservationModuleBungalowRentingPossible,priceDefaultType,priceBungalow,priceVan,contactTelAlt} = req.body;
    await Campsite.updateOne({_id}, {title,description,price,images,address,district:selectedCity, city:selectedCounty,activitiesYoga, isPublicTransportationPossible,mapLatitute,mapLangtitute,
      activitiesCanoing, activitiesTrekking, activitiesSurf, activitiesBeachVolleyball,activitiesVolleyball,activitiesSpa, activitiesAtv, activitiesParagliding, activitiesBoatRental, 
      activitiesBoatTour, activitiesPool,isFriendlyAlcohol,isFriendlyKid,isFriendlyRemoteWork,isFriendlyVan,isFriendlyPet, descriptionKid,descriptionPet,descriptionRemoteWork,
      descriptionVan,isPresentBungalow,isPresentBreakfastIncluded,isNearSea,distanceSea,isNearLake, distanceLake,isNearForest, distanceForest,isNearRestaurant, distanceRestaurant,isNearStore,distanceStore,isNearBar,distanceBar,
      isPresentPrivateBeach, isPresentSunbedIncluded, isPresentSunbedRenting,isPresentDishwasher, isPresentElectricity,isPresentFirePit,isPresentFridge,isPresentHotWater,isPresentKitchen,
      isPresentLaundry, isPresentMicrowave, isPresentParkLot, isPresentShower, isPresentStowe, isPresentWC, isPresentWifi, contactTel, contactInstagram, contactFacebook,
      isEnglishSpoken,isGermanSpoken,isRussianSpoken,isSpanishSpoken,titleEnglish,descriptionEnglish,isPriceVisible,isReservationModuleAvailable,isPaymentCash,isPaymentCreditCard,isPaymentIban,
      isPresentPicnicTable,isReservationModuleBungalowRentingPossible,priceDefaultType,priceBungalow,priceVan,contactTelAlt});
    res.json(true);
  }

  if (method === 'DELETE') {
    if (req.query?.id) {
      await Campsite.deleteOne({_id:req.query?.id});
      res.json(true);
    }
  }
}