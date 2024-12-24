interface Location {
  latitude: number;
  longitude: number;
}

export const getNearbyPlaces = async (
  location: Location,
  radius: number = 10000 // 10km
) => {
  try {
    // Burada Google Places API veya başka bir servis kullanabilirsiniz
    // Örnek bir API çağrısı:
    const response = await fetch(
      `YOUR_API_ENDPOINT?lat=${location.latitude}&lng=${location.longitude}&radius=${radius}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching nearby places:', error);
    return [];
  }
}; 