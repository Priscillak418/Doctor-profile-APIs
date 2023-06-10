import request from "supertest";
import app from "../app";

const id = Math.random().toString(36).replace("0.", "");

test("Testing  Doctor Works", async () => {
  const doctor = {
    _id: "doctor_" + id,
    firstName: "John",
    lastName: "Doe",
    location: "New York",
    speciality: "Cardiology",
    experiences: "ten years of experience",
    education: "MD, Cardiology",
    doctorsConnection: "Medical Association",
  };
  const patient = {
    _id: "patient_" + id,
    name: "John Doe",
    gender: "M",
    dateOfBirth: new Date("2020-01-01").toISOString(),
    contactInformation: 124234435,
    medicalHistory: "none",
  };
  let response = await request(app).get(`/doctor/${doctor._id}`);
  expect(response.body).toBeNull();

  response = await request(app).post("/doctor").send(doctor);
  expect(response.body).toMatchObject(doctor);

  response = await request(app).get(`/doctor/${doctor._id}`);
  expect(response.body).toMatchObject(doctor);

  response = await request(app)
    .post(`/doctor/${doctor._id}`)
    .send({ location: "Europe", lastName: "Derric" });
  expect(response.body).toMatchObject({
    location: "Europe",
    lastName: "Derric",
  });

  response = await request(app).get(`/doctor/${doctor._id}`);
  expect(response.body).toMatchObject({
    location: "Europe",
    lastName: "Derric",
  });

  response = await request(app).post("/patient").send(patient);
  expect(response.body).toMatchObject(patient);
  const patientsURL = `/doctor/${doctor._id}/patients`;

  response = await request(app).get(patientsURL);
  expect(response.body).toMatchObject([]);

  response = await request(app)
    .post(patientsURL)
    .send({ patient_id: patient._id });
  expect(response.body).toMatchObject({ message: "success" });
  response = await request(app).get(patientsURL);
  expect(response.body).toMatchObject([patient]);

  const patientsReviewsURL = `/doctor/${doctor._id}/patients/reviews`;

  response = await request(app).get(patientsReviewsURL);
  expect(response.body).toMatchObject([]);

  response = await request(app)
    .post(patientsReviewsURL)
    .send({ patient_id: patient._id, review: "Awesome Doctor" });
  expect(response.body).toMatchObject({ message: "success" });
  response = await request(app).get(patientsReviewsURL);
  expect(response.body).toMatchObject([
    {
      patient: patient,
      review: "Awesome Doctor",
    },
  ]);

  response = await request(app)
    .delete(patientsURL)
    .send({ patient_id: patient._id });
  expect(response.body).toMatchObject({ message: "success" });

  response = await request(app).delete(`/doctor/${doctor._id}`);
  expect(response.body).toEqual({ message: "success" });
  response = await request(app).get(`/doctor/${doctor._id}`);
  expect(response.body).toBeNull();

  response = await request(app).get(patientsURL);
  expect(response.body).toMatchObject([]);
},10000);
