import request from "supertest";
import app from "../src/index";
import { ENV } from "../src/config/environment";
import mongoose from "mongoose";

let server: any;

beforeAll(async () => {
  // Start the server and wait for it to be ready
  server = app.listen(ENV.PORT);
  await new Promise((resolve) => server.on("listening", resolve));
}, 10000); // Increase the timeout to 10 seconds

afterAll(async () => {
  // Close the server and the MongoDB connection
  server.close();
  await mongoose.connection.close();
});

describe("GET /", () => {
  it('responds with "hello world"', async () => {
    const response = await request(app)
      .get("/")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200);
    console.log(response.body);
    expect(response.body).toBeInstanceOf(Object);
  });
});
