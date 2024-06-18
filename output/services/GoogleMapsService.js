"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleMaps = void 0;
const google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
const environment_1 = require("../config/environment");
class GoogleMapsService {
    constructor(apiKey) {
        this.client = new google_maps_services_js_1.Client({});
        this.apiKey = apiKey;
        console.log("API Key:", this.apiKey); // Check the API key
    }
    getNearbyGyms(lat, lng) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("getNearbyGyms called with:", lat, lng); // Check the method call
            return yield this.client
                .placesNearby({
                params: {
                    location: { lat: lat, lng: lng },
                    type: "gym",
                    key: this.apiKey,
                    rankby: google_maps_services_js_1.PlacesNearbyRanking.distance,
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
        });
    }
}
exports.GoogleMaps = new GoogleMapsService(environment_1.ENV.API_GOOGLE_PLACES_API_KEY);
