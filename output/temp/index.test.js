"use strict";
// import request from "supertest";
// import { createServer } from "http"; // Import createServer from 'http'
// import app from "../src/index";
// import { ENV } from "../src/config/environment";
// import mongoose from "mongoose";
// // import { server } from "./setup.test";
// // });
// // describe("Auth API", () => {
// //   it("POST /api/v1/auth/register - Register a new user", async () => {
// //     const newUser = {
// //       username: "testuser",
// //       email: "testuser@example.com",
// //       password: "testpassword",
// //       full_name: "Test User",
// //       phone: "1234567890",
// //     };
// //     const response = await request(server)
// //       .post("/api/v1/auth/register")
// //       .send(newUser)
// //       .expect("Content-Type", /json/)
// //       .expect(201);
// //     expect(response.body.msg).toBe("User created successfully");
// //   });
// //   it("POST /api/v1/auth/login - User login", async () => {
// //     const userCredentials = {
// //       username: "testuser",
// //       email: "testuser@example.com",
// //       password: "testpassword",
// //     };
// //     const response = await request(server)
// //       .post("/api/v1/auth/login")
// //       .send(userCredentials)
// //       .expect("Content-Type", /json/)
// //       .expect(200);
// //     expect(response.body.msg).toBe("User logged in successfully");
// //   });
// //   it("POST /api/v1/auth/token - Generate a new access token using a refresh token", async () => {
// //     const refreshToken = "your_refresh_token"; // Ganti dengan refresh token yang valid
// //     const response = await request(server)
// //       .post("/api/v1/auth/token")
// //       .send({ refreshToken })
// //       .expect("Content-Type", /json/)
// //       .expect(200);
// //     expect(response.body.accessToken).toBeDefined();
// //   });
// //   it("POST /api/v1/auth/refresh_token - Generate a new refresh token", async () => {
// //     const refreshToken = "your_refresh_token"; // Ganti dengan refresh token yang valid
// //     const response = await request(server)
// //       .post("/api/v1/auth/refresh_token")
// //       .send({ refreshToken })
// //       .expect("Content-Type", /json/)
// //       .expect(200);
// //     expect(response.body.refreshToken).toBeDefined();
// //   });
// //   it("GET /api/v1/auth/verify/{emailVerificationToken} - Verify user's email", async () => {
// //     const emailVerificationToken = "your_email_verification_token"; // Ganti dengan token verifikasi email yang valid
// //     const response = await request(server)
// //       .get(`/api/v1/auth/verify/${emailVerificationToken}`)
// //       .expect("Content-Type", /json/)
// //       .expect(200);
// //     expect(response.body.message).toBe("Email verified successfully");
// //   });
// //   // Tambahkan tes lainnya sesuai kebutuhan
// // });
// // describe("Users API", () => {
// //   it("GET /api/v1/users - Get all users", async () => {
// //     const token = "";
// //     const response = await request(server)
// //       .get("/api/v1/users")
// //       .set("Authorization", `Bearer ${token}`) // Set the token in the Authorization header
// //       .expect("Content-Type", /json/)
// //       .expect(200);
// //     expect(response.body.user).toBeDefined();
// //   });
// //   it("GET /api/v1/users/{id} - Get a user by ID", async () => {
// //     const userId = "your_user_id"; // Ganti dengan ID pengguna yang valid
// //     const response = await request(server)
// //       .get(`/api/v1/users/${userId}`)
// //       .expect("Content-Type", /json/)
// //       .expect(200);
// //     expect(response.body.user).toBeDefined();
// //   });
// //   it("GET /api/v1/users/dashboard - Get user dashboard", async () => {
// //     const token = "your_token"; // Ganti dengan token yang valid
// //     const response = await request(server)
// //       .get("/api/v1/users/dashboard")
// //       .set("Authorization", `Bearer ${token}`)
// //       .expect("Content-Type", /json/)
// //       .expect(200);
// //     expect(response.body.user).toBeDefined();
// //   });
// //   it("PUT /api/v1/users/profile - Edit user profile", async () => {
// //     const token = "your_token"; // Ganti dengan token yang valid
// //     const userProfile = {
// //       old_password: "old_password",
// //       new_password: "new_password",
// //       confirm_password: "new_password",
// //       full_name: "New Full Name",
// //       phone: "1234567890",
// //       age: 30,
// //       gender: "Male",
// //       height: 180,
// //       weight: 75,
// //       fitnessGoals: "WEIGHT_LOSS",
// //       healthInformation: "No known health issues",
// //     };
// //     const response = await request(server)
// //       .put("/api/v1/users/profile")
// //       .set("Authorization", `Bearer ${token}`)
// //       .send(userProfile)
// //       .expect("Content-Type", /json/)
// //       .expect(200);
// //     expect(response.body.user).toBeDefined();
// //   });
// //   // Tambahkan tes lainnya sesuai kebutuhan
// // });
