# Proyek WS (Web Service Project)

## Table of Contents

- [Introduction](#introduction)
- [Dependencies](#dependencies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Deployment](#deployment)
- [Project Members](#project-members)
- [License](#license)

## Introduction

Proyek WS is a web service project focused on providing fitness-related APIs. The project includes various endpoints such as gym location retrieval using Google Maps, news scraping from fitness-related websites, and user authentication with email verification. The project is developed using TypeScript and Node.js and documented using Swagger.

## Dependencies

- axios
- dotenv
- express
- TypeScript
- @googlemaps/google-maps-services-js

## Prerequisites

- Node.js (tested with v20 LTS and v22.3.0)
- npm

## Installation

1. Clone the repository

    ```sh
    git clone https://github.com/mcpe500/Proyek_WS.git
    cd Proyek_WS
    ```

2. Install dependencies

    ```sh
    npm install
    ```

3. Create a `.env` file from `.env.template` and fill in the necessary values

    ```sh
    cp .env.template .env
    ```

## Environment Variables

The project requires several environment variables to be set. Below is an example of what your `.env` file should look like:

```env
PORT=3000
BACKEND_API_URL=https://api.example.com
SECRET_KEY=your_secret_key
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ACCESS_TOKEN_SECRET=your_access_token_secret
EMAIL_VERIFICATION_TOKEN_SECRET=your_email_verification_token_secret
REFRESH_TOKEN_AGE=3600
ACCESS_TOKEN_AGE=1800
EMAIL_VERIFICATION_AGE=86400

REMEMBER_ME_REFRESH_TOKEN_AGE=604800
REMEMBER_ME_ACCESS_TOKEN_AGE=604800

MONGODB_URI=mongodb://localhost:27017/yourdbname

# MySQL
DB_STATIC_HOST_DIALECT=mysql
DB_STATIC_HOST=localhost
DB_STATIC_PORT=3306
DB_STATIC_USERNAME=root
DB_STATIC_PASSWORD=password
DB_STATIC_DATABASE=yourdbname

# Email
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

API_NINJAS_API_KEY=your_api_ninjas_api_key
API_GOOGLE_PLACES_API_KEY=your_google_places_api_key
```

## Development

To run the development server, use the following command:

```sh
npm run dev
```

## Deployment

To build and deploy the server, follow these steps:

1. Build the project

    ```sh
    npm run build
    ```

2. Deploy the project

    ```sh
    npm run deploy
    ```

## Google Maps Service

The project uses the Google Maps API to provide gym locations based on latitude and longitude. The service is implemented in `GoogleMapsService` class:

```typescript
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
```

## News Scraping

The project provides an endpoint for `/news` which scrapes HTML from a news site using the Puppeteer library for web scraping. Currently, it supports the following sources:

```typescript
import { INewsSource } from "../contracts/dto/NewsRelated.dto";

export const NewsSource: Array<INewsSource> = [
  {
    url: "https://www.fitandwell.com/news",
    name: "fitandwell",
  },
];
export const NewsSourceSearch: Array<INewsSource> = [
  {
    url: "https://www.fitandwell.com/search?searchTerm=",
    name: "fitandwell",
  },
];
```
This setup allows the project to dynamically fetch news articles from the specified sources using Puppeteer's web scraping capabilities.

## Databases

The project uses two types of databases:

1. **MySQL** - Referred to as the static DB, used for storing structured data.
2. **MongoDB** - Referred to as the dynamic DB, used for storing unstructured data. Examples can be found in the `seed_mongo` folder and in `models/dynamic`.

## Email Verification

The project includes an email verification process during user registration. Emails are sent using templates located in the `templates/` folder.

## Project Members

- **WizOfThunder** (Hansen)
- **Lyx312** (Gregorius)
- **mcpe500** (Ivan)
- **hansp17** (Hans)

## License

This project currently has no license.