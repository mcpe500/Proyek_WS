// import request from "supertest";
// import { server } from "./setup.test";
// import { globalState } from "./tests_variable.global";

// describe("Auth API", () => {
//   it("POST /api/v1/auth/register - Register a new user", async () => {
//     const newUser = {
//       username: "string",
//       email: "user@example.com",
//       password: "string",
//       fullName: "string",
//       phone: "1909714996351",
//     };

//     const response = await request(server)
//       .post("/api/v1/auth/register")
//       .send(newUser)
//       .expect("Content-Type", /json/)
//       .expect(201);

//     expect(response.body.msg).toBe("User created successfully");
//   });

//   it("POST /api/v1/auth/login - User login", async () => {
//     const userCredentials = {
//       username: "string",
//       email: "",
//       password: "string",
//       rememberMe: true,
//     };

//     const response = await request(server)
//       .post("/api/v1/auth/login")
//       .send(userCredentials)
//       .expect("Content-Type", /json/)
//       .expect(200);

//     const cookies = response.headers["set-cookie"];
//     if (cookies && cookies.length > 0) {
//       const refreshTokenCookie = Array.isArray(cookies)
//         ? cookies
//             .find((cookie: string) => cookie.startsWith("refreshToken="))
//             ?.split(";")[0]
//             .split("=")[1]
//         : "";

//       globalState.refreshToken = refreshTokenCookie || "";
//     }
//     globalState.accessToken = response.body.accessToken;
//     expect(response.body.msg).toBe("Logged in successfully");
//   });

//   it("POST /api/v1/auth/token - Generate a new access token using a refresh token", async () => {
//     const response = await request(server)
//       .post("/api/v1/auth/token")
//       .set("Cookie", `refreshToken=${globalState.refreshToken}`)
//       .expect("Content-Type", /json/)
//       .expect(200);

//     expect(response.body.accessToken).toBeDefined();
//   });

//   it("POST /api/v1/auth/refresh_token - Generate a new refresh token", async () => {
//     const response = await request(server)
//       .post("/api/v1/auth/refresh_token")
//       .set("Cookie", `refreshToken=${globalState.refreshToken}`)
//       .expect("Content-Type", /json/)
//       .expect(200);

//     const cookies = response.headers["set-cookie"];
//     if (cookies && cookies.length > 0) {
//       const refreshTokenCookie = Array.isArray(cookies)
//         ? cookies
//             .find((cookie: string) => cookie.startsWith("refreshToken="))
//             ?.split(";")[0]
//             .split("=")[1]
//         : "";
//       expect(refreshTokenCookie).toBeDefined();
//     }
//   });

//   it("GET /api/v1/auth/verify/{emailVerificationToken} - Verify user's email", async () => {
//     const emailVerificationToken = "your_email_verification_token";

//     const response = await request(server)
//       .get(`/api/v1/auth/verify/${emailVerificationToken}`)
//       .expect("Content-Type", /json/)
//       .expect(200);

//     expect(response.body.message).toBe("Email verified successfully");
//   });
// });
