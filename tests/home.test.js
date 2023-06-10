import request from "supertest";
import app from "../app";

test("Testing Home Works", async () => {
  const response = await request(app).get("/");
  expect(response.body).toEqual({ message: "Hello World" });
});
