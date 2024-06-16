import {
  Client,
  PlacesNearbyRanking,
} from "@googlemaps/google-maps-services-js";
import { ENV } from "../config/environment";

class GoogleMapsService {
  private client: Client;
  private apiKey: string;

  constructor(apiKey: string) {
    this.client = new Client({});
    this.apiKey = apiKey;
    console.log("API Key:", this.apiKey); // Check the API key
  }

  public async getNearbyGyms(lat: number, lng: number) {
    console.log("getNearbyGyms called with:", lat, lng); // Check the method call
    return await this.client
      .placesNearby({
        params: {
          location: { lat: lat, lng: lng },
          type: "gym",
          key: this.apiKey,
          rankby: PlacesNearbyRanking.distance,
        },
        timeout: 5000, // Increase the timeout
      })
      .then((r) => {
        // console.log(r.data.results.slice(0, 10));
        return r.data.results.slice(0, 10);
      })
      .catch((e) => {
        console.log("Error:", e.response.data); // Check for errors
        return e.response.data.error_message;
      });
  }
}

export const GoogleMaps = new GoogleMapsService(ENV.API_GOOGLE_PLACES_API_KEY);
