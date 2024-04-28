import request from "supertest";
import { createServer } from "http"; // Import createServer from 'http'
import app from "../src/index";
import { ENV } from "../src/config/environment";
import mongoose from "mongoose";

let server: any;

beforeAll(async () => {
  const httpServer = createServer(app); // Create a separate HTTP server for testing
  server = httpServer.listen(3001);
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close(); // Close the separate server
});

describe("GET /", () => {
  it('responds with "hello world"', async () => {
    const response = await request(server) // Send requests to the separate server
      .get("/")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200);
    expect(response.text).toBe("Hello World");
  });
});
