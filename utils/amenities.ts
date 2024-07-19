export const amenityIcons = {
  'ac': 'ac',
  'parking': 'parking',
  'conciergeService': 'conciergeService',
  'maidService': 'maidService',
  'securityService': 'securityService',
  'lobbyBuilding': 'lobbyBuilding',
  'maidsRoom': 'maidsRoom',
  'studyRoom': 'studyRoom',
  'balcony': 'balcony',
  'walkInCloset': 'walkInCloset',
  'elevator': 'elevator',
  'pets': 'pets',
  'jacuzzi': 'jacuzzi',
  'sauna': 'sauna',
  'sharedGym': 'sharedGym',
  'privateGym': 'privateGym',
  'sharedPool': 'sharedPool',
  'privatePool': 'privatePool',
  'smartHomeTechnology': 'smart-home',
  'highSpeedInternet': 'wifi',
  'cableTV': 'tv',
  'satelliteTV': 'tv',
  'barbecueArea': 'barbecueArea',
  'childrensPlayArena': 'childrensPlayArena',
  'garden': 'garden',
  'landscapedGardens': 'garden',
  'cafeteria': 'coffee-maker',
  'groceryDelivery': 'shipping',
  'laundryService': 'hanger',
  'prayerRoom': 'smoke-free',
  'receptionService': 'conciergeService',
  'retailInBuilding': 'store',
  'valetParking': 'parking',
  'spa': 'spa',
  'viewLandmark': 'viewLandmark',
  'nearbyHospitals': 'nearbyHospitals',
  'nearbyPubTransport': 'nearbyPubTransport',
  'nearbySchools': 'nearbySchools',
  'nearbyShoppingMalls': 'nearbyShoppingMalls',
  'viewWater': 'viewWater'
}

export const formatAmenityName = (amenity: string): string => {
  let formattedName = amenity[0].toUpperCase()
  for (let i = 1; i < amenity.length; i++) {
    const char = amenity[i]
    if (char.toUpperCase() === char) {
      formattedName += ' ' + char.toLowerCase()
    } else {
      formattedName += char
    }
  }
  return formattedName
}
