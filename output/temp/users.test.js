"use strict";
// import request from "supertest";
// import { server } from "../../test/setup.test";
// import { globalState } from "../../test/tests_variable.global";
// const token = globalState.accessToken;
// // describe("Admin API", () => {
// //   it("GET /api/v1/admin/users - Allow admin to get all users", async () => {
// //     const response = await request(server)
// //       .get("/api/v1/admin/users")
// //       .set("Authorization", `Bearer ${token}`)
// //       .expect("Content-Type", /json/)
// //       .expect(200);
// //     expect(response.body.users).toBeDefined();
// //   });
// //   it("GET /api/v1/admin/users/{id} - Get a user by ID", async () => {
// //     const userId = "66252b93bc337b727f77fcb0";
// //     const response = await request(server)
// //       .get(`/api/v1/admin/users/${userId}`)
// //       .set("Authorization", `Bearer ${token}`)
// //       .expect("Content-Type", /json/)
// //       .expect(200);
// //     expect(response.body.user).toBeDefined();
// //   });
// //   it("GET /api/v1/admin/dashboard - Get admin dashboard", async () => {
// //     const response = await request(server)
// //       .get("/api/v1/admin/dashboard")
// //       .set("Authorization", `Bearer ${token}`)
// //       .expect("Content-Type", /json/)
// //       .expect(200);
// //     expect(response.body.dashboard).toBeDefined();
// //   });
// //   it("GET /api/v1/admin/user/profile/{userID} - Get user profile", async () => {
// //     const userId = "66252b93bc337b727f77fcb0";
// //     const response = await request(server)
// //       .get(`/api/v1/admin/user/profile/${userId}`)
// //       .set("Authorization", `Bearer ${token}`)
// //       .expect("Content-Type", /json/)
// //       .expect(200);
// //     expect(response.body.userProfile).toBeDefined();
// //   });
// //   it("DELETE /api/v1/admin/user/profile/{userID} - Delete user profile", async () => {
// //     const userId = "66252b93bc337b727f77fcb0";
// //     const response = await request(server)
// //       .delete(`/api/v1/admin/user/profile/${userId}`)
// //       .set("Authorization", `Bearer ${token}`)
// //       .expect("Content-Type", /json/)
// //       .expect(200);
// //     expect(response.body.message).toBeDefined();
// //   });
// //   it("GET /api/v1/admin/user/packet/{userID} - Get user packet", async () => {
// //     const userId = "66252b93bc337b727f77fcb0";
// //     const response = await request(server)
// //       .get(`/api/v1/admin/user/packet/${userId}`)
// //       .set("Authorization", `Bearer ${token}`)
// //       .expect("Content-Type", /json/)
// //       .expect(200);
// //     expect(response.body.userPacket).toBeDefined();
// //   });
// //   it("POST /api/v1/admin/user/packet/{userID} - Add user packet", async () => {
// //     const userId = "66252b93bc337b727f77fcb0";
// //     const packet = { name: "Packet 1", description: "This is a test packet" };
// //     const response = await request(server)
// //       .post(`/api/v1/admin/user/packet/${userId}`)
// //       .set("Authorization", `Bearer ${token}`)
// //       .send(packet)
// //       .expect("Content-Type", /json/)
// //       .expect(201);
// //     expect(response.body.packet).toBeDefined();
// //   });
// //   it("DELETE /api/v1/admin/user/packet/{userID} - Delete user packet", async () => {
// //     const userId = "66252b93bc337b727f77fcb0";
// //     const packetId = "66252b93bc337b727f77fcb1";
// //     const response = await request(server)
// //       .delete(`/api/v1/admin/user/packet/${userId}/${packetId}`)
// //       .set("Authorization", `Bearer ${token}`)
// //       .expect("Content-Type", /json/)
// //       .expect(200);
// //     expect(response.body.message).toBeDefined();
// //   });
// // });
