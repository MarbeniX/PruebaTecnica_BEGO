import axios from "axios";

export const getPlaceDetails = async (placeId: string) => {
    try {
        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=ChIJiRp93iEC0oURvJVqErpVVHw&key=${apiKey}`
        );
        if (response.status !== 200) {
            throw new Error("Failed to fetch place details");
        }
        const result = response.data.result;
        return {
            address: result.formatted_address,
            place_id: result.place_id,
            latitude: result.geometry.location.lat,
            longitude: result.geometry.location.lng,
        };
    } catch (error) {
        throw new Error("Failed to fetch place details");
    }
};
