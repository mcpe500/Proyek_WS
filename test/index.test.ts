import request from "supertest";
import app from "../src/index"; // replace with the path to your Express application

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
