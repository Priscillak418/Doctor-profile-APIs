import request from "supertest";
import app from "../app";

const id = Math.random().toString(36).replace("0.", "");

test("Testing patients Works", async () => {
  const patient = {
    _id: id,
    name: "John Doe",
    gender: "M",
    dateOfBirth: new Date("2020-01-01").toISOString(),
    contactInformation: 124234435,
    medicalHistory: "none",
  };
  let response = await request(app).get(`/patient/${patient._id}`);
  expect(response.body).toBeNull();

  response = await request(app).post("/patient").send(patient);
  expect(response.body).toMatchObject(patient);

  response = await request(app).get(`/patient/${patient._id}`);
  expect(response.body).toMatchObject(patient);

  response = await request(app).delete(`/patient/${patient._id}`);
  expect(response.body).toEqual({ message: "success" });
});
