import { createServer } from "http";
import mongoose from "mongoose";
import app from "../src/index";
import request from "supertest";

let server: any;
let refreshToken = "";
let accessToken = "";
let firstValidUser: any = {};

beforeAll(async () => {
  const httpServer = createServer(app);
  server = httpServer.listen(3001);
});

afterAll(async () => {
  await mongoose.connection.close();
  server.close();
});

describe("GET /", () => {
  it('responds with "This API Service is currently running"', async () => {
    const response = await request(server) // Send requests to the separate server
      .get("/")
      .expect("Content-Type", "text/html; charset=utf-8")
      .expect(200);
    expect(response.text).toBe("This API Service is currently running");
  });
});

describe("Auth API", () => {
  it("POST /api/v1/auth/register - Register a new user", async () => {
    const newUser = {
      username: "string",
      email: "user@example.com",
      password: "string",
      fullName: "string",
      phone: "1909714996351",
    };

    const response = await request(server)
      .post("/api/v1/auth/register")
      .send(newUser)
      .expect("Content-Type", /json/)
      .expect(201);

    expect(response.body.msg).toBe("User created successfully");
  });

  it("POST /api/v1/auth/login - User login", async () => {
    const userCredentials = {
      username: "string",
      email: "",
      password: "string",
      rememberMe: true,
    };

    const response = await request(server)
      .post("/api/v1/auth/login")
      .send(userCredentials)
      .expect("Content-Type", /json/)
      .expect(200);

    const cookies = response.headers["set-cookie"];
    if (cookies && cookies.length > 0) {
      const refreshTokenCookie = Array.isArray(cookies)
        ? cookies
            .find((cookie: string) => cookie.startsWith("refreshToken="))
            ?.split(";")[0]
            .split("=")[1]
        : "";

      refreshToken = refreshTokenCookie || "";
    }
    accessToken = response.body.token;
    expect(response.body.msg).toBe("Logged in successfully");
  });

  it("POST /api/v1/auth/token - Generate a new access token using a refresh token", async () => {
    const response = await request(server)
      .post("/api/v1/auth/token")
      .set("Cookie", `refreshToken=${refreshToken}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.accessToken).toBeDefined();
  });

  it("POST /api/v1/auth/refresh_token - Generate a new refresh token", async () => {
    const response = await request(server)
      .post("/api/v1/auth/refresh_token")
      .set("Cookie", `refreshToken=${refreshToken}`)
      .expect("Content-Type", /json/)
      .expect(200);

    const cookies = response.headers["set-cookie"];
    if (cookies && cookies.length > 0) {
      const refreshTokenCookie = Array.isArray(cookies)
        ? cookies
            .find((cookie: string) => cookie.startsWith("refreshToken="))
            ?.split(";")[0]
            .split("=")[1]
        : "";
      expect(refreshTokenCookie).toBeDefined();
    }
  });

  it("GET /api/v1/auth/verify/{emailVerificationToken} - Verify user's email", async () => {
    const emailVerificationToken = "your_email_verification_token";

    const response = await request(server)
      .get(`/api/v1/auth/verify/${emailVerificationToken}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.message).toBe("Email verified successfully");
  });
});

describe("Admin API", () => {
  beforeAll(async () => {
    const userCredentials = {
      username: "string",
      password: "string",
    };

    const loginResponse = await request(server)
      .post("/api/v1/auth/login")
      .send(userCredentials)
      .expect("Content-Type", /json/)
      .expect(200);
    accessToken = loginResponse.body.token;
    // console.log("accessToken", accessToken);

    if (!accessToken) {
      throw new Error("Login failed, no access token received");
    }
  });

  it("GET /api/v1/admin/users - Allow admin to get all users", async () => {
    const response = await request(server)
      .get("/api/v1/admin/users")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect("Content-Type", /json/)
      .expect(200);

    response.body.users.forEach((u: any) => {
      if (u.isEmailVerified == true) {
        firstValidUser = u;
        return;
      }
    });

    expect(response.body.users).toBeDefined();
  });

  it("GET /api/v1/admin/users/{id} - Get a user by ID", async () => {
    // const userId = "66252ce53e09d8a230f75998";
    const userId = firstValidUser._id;
    const response = await request(server)
      .get(`/api/v1/admin/users/${userId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.user).toBeDefined();
  });

  it("GET /api/v1/admin/dashboard - Get admin dashboard", async () => {
    const response = await request(server)
      .get("/api/v1/admin/dashboard")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.total_user).toBeDefined();
    expect(response.body.free_package_user).toBeDefined();
    expect(response.body.non_free_package_user).toBeDefined();
  });

  it("GET /api/v1/admin/user/profile/{userID} - Get user profile", async () => {
    // const userId = "66252b93bc337b727f77fcb0";
    const userId = firstValidUser._id;

    const response = await request(server)
      .get(`/api/v1/admin/user/profile/${userId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect("Content-Type", /json/)
      .expect(200);
    expect(response.body.username).toBeDefined();
    expect(response.body.full_name).toBeDefined();
    expect(response.body.email).toBeDefined();
    expect(response.body.phone).toBeDefined();
    expect(response.body.balance).toBeDefined();
  });

  it("DELETE /api/v1/admin/user/profile/{userID} - Delete user profile", async () => {
    const userId = "0";

    const response = await request(server)
      .delete(`/api/v1/admin/user/profile/${userId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.message).toBeDefined();
  });

  it("GET /api/v1/admin/user/packet/{userID} - Get user packet", async () => {
    // const userId = "66252b93bc337b727f77fcb0";
    const userId = firstValidUser._id;

    const response = await request(server)
      .get(`/api/v1/admin/user/packet/${userId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect("Content-Type", /json/)
      .expect(200);
      
    expect(response.body.username).toBeDefined();
    expect(response.body.nama).toBeDefined();
    expect(response.body.subscription_start).toBeDefined();
    expect(response.body.subscription_end).toBeDefined();
    expect(response.body.packet).toBeDefined();
    expect(response.body.packet.Paket_id).toBeDefined();
    expect(response.body.packet.Paket_name).toBeDefined();
    expect(response.body.packet.Paket_description).toBeDefined();
    expect(response.body.packet.Paket_Limit).toBeDefined();
    expect(response.body.packet.Paket_price).toBeDefined();
    expect(response.body.packet.Paket_price_currency).toBeDefined();
  });

  it("POST /api/v1/admin/user/packet/{userID} - Add user packet", async () => {
    const userId = "66252b93bc337b727f77fcb0";
    const packet = { name: "Packet 1", description: "This is a test packet" };

    const response = await request(server)
      .post(`/api/v1/admin/user/packet/${userId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send(packet)
      .expect("Content-Type", /json/)
      .expect(201);

    expect(response.body.packet).toBeDefined();
  });

  it("DELETE /api/v1/admin/user/packet/{userID} - Delete user packet", async () => {
    const userId = "66252b93bc337b727f77fcb0";
    const packetId = "66252b93bc337b727f77fcb1";

    const response = await request(server)
      .delete(`/api/v1/admin/user/packet/${userId}/${packetId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.message).toBeDefined();
  });

  it("PUT /api/v1/admin/user/packet/{userID} - Update user packet", async () => {
    const userId = "66252b93bc337b727f77fcb0";
    const packetId = "66252b93bc337b727f77fcb1";
    const updatedPacket = {
      name: "Updated Packet",
      description: "This is an updated packet",
    };

    const response = await request(server)
      .put(`/api/v1/admin/user/packet/${userId}/${packetId}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .send(updatedPacket)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.packet).toBeDefined();
  });
});
