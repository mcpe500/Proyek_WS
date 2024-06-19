import { ENV } from "../../../config/environment";

export default {
  get: {
    tags: ["gyms"],
    summary: "Get nearest gyms",
    description: `This endpoint returns the nearest gyms based on the provided latitude, longitude, and radius. you can use the frontend <a href="${ENV.BACKEND_API_URL}:${ENV.PORT}/location">${ENV.BACKEND_API_URL}:${ENV.PORT}/location</a>`,
    operationId: "getNearestGyms",
    security: [
      {
        bearerAuth: [],
      },
    ],
    parameters: [
      {
        name: "lat",
        in: "query",
        required: true,
        schema: {
          type: "number",
        },
        description: "Latitude of the location to search gyms around.",
      },
      {
        name: "lng",
        in: "query",
        required: true,
        schema: {
          type: "number",
        },
        description: "Longitude of the location to search gyms around.",
      },
    ],
    responses: {
      "200": {
        description: "Gyms retrieved successfully",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                data: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      business_status: { type: "string" },
                      geometry: {
                        type: "object",
                        properties: {
                          location: {
                            type: "object",
                            properties: {
                              lat: { type: "number" },
                              lng: { type: "number" },
                            },
                          },
                          viewport: {
                            type: "object",
                            properties: {
                              northeast: {
                                type: "object",
                                properties: {
                                  lat: { type: "number" },
                                  lng: { type: "number" },
                                },
                              },
                              southwest: {
                                type: "object",
                                properties: {
                                  lat: { type: "number" },
                                  lng: { type: "number" },
                                },
                              },
                            },
                          },
                        },
                      },
                      icon: { type: "string" },
                      icon_background_color: { type: "string" },
                      icon_mask_base_uri: { type: "string" },
                      name: { type: "string" },
                      opening_hours: {
                        type: "object",
                        properties: {
                          open_now: { type: "boolean" },
                        },
                      },
                      photos: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            height: { type: "number" },
                            html_attributions: {
                              type: "array",
                              items: { type: "string" },
                            },
                            photo_reference: { type: "string" },
                            width: { type: "number" },
                          },
                        },
                      },
                      place_id: { type: "string" },
                      plus_code: {
                        type: "object",
                        properties: {
                          compound_code: { type: "string" },
                          global_code: { type: "string" },
                        },
                      },
                      reference: { type: "string" },
                      scope: { type: "string" },
                      types: {
                        type: "array",
                        items: { type: "string" },
                      },
                      vicinity: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      "500": {
        description: "Internal Server Error",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: { type: "string" },
              },
            },
            examples: {
              internalServerError: {
                summary: "Internal server error",
                value: {
                  message: "Internal server error",
                },
              },
            },
          },
        }
      },
    },
  },
};

