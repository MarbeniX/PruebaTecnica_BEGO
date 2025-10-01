import axios from "axios";

export const getPlaceDetails = async (placeId: string) => {
    try {
        const apiKey = process.env.GOOGLE_PLACES_API_KEY;
        const response = await axios.get(
            `https://places.googleapis.com/v1/places/ChIJiRp93iEC0oURvJVqErpVVHw?fields=id&key=${apiKey}`
        );
        if (response.status !== 200) {
            throw new Error("Failed to fetch place details");
        }
        const data = response.data;
        return data;
    } catch (error) {
        // console.error("Error fetching place details:", error);
        throw new Error("Failed to fetch place details");
    }
};
