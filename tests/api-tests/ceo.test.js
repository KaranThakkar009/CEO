// Karan Thakkar - Test script for ceo

// required packages
const request = require("supertest");
const app = require("../../index");
const db = require("../../db-init/dbConn");

// closing db connection
afterAll(() => {
  return db.$pool.end();
});

// 1. GET API should return error code 400 and a message "No records found!" if there's no entry in database
describe("GET API to fetch records of ceo 'No records found!'", () => {
  it('should return error code 400 and a message "No records found!" if theres no entry in database', async () => {
    const response = await request(app)
      .get("/api/ceo/")
      .set("Content-type", "application/json");
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual("No records found!");
  });
});

// 2. POST API should return success code 200 and a message "CEO added successfully" if name,company_name,salary,globalrank,status is provided in the body
describe("POST API to add new ceo 'CEO added successfully'", () => {
  it('should return success code 200 and a message "CEO added successfully" if name,company_name,salary,globalrank,email is provided in the body', async () => {
    let payload = JSON.stringify({
      name: "Karan",
      company_name: "Google",
      salary: "2800",
      globalrank: 1,
      email: "Karan@google.com",
    });
    const response = await request(app)
      .post("/api/ceo/addCEO/")
      .send(payload)
      .set("Content-type", "application/json");
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual("CEO added successfully");
  });
});

// 3. GET API should return success code 200 and a message "Record fetched successfully" if alteast one record is present in database
describe("GET API to fetch records of ceo 'Record fetched successfully'", () => {
  it('should return success code 200 and a message "Record fetched successfully" if alteast one record is present in database', async () => {
    const response = await request(app)
      .get("/api/ceo/")
      .set("Content-type", "application/json");
    expect(response.statusCode).toBe(200);
    expect(response.body.data).toEqual(expect.any(Array));
    expect(response.body.message).toEqual("Record fetched successfully");
  });
});

// 4. POST Api should return an error code of 400 and a message "Record already exists cannot add!" if email already exists in database
describe("POST API to add new ceo 'Record already exists cannot add!'", () => {
  it('should return an error code of 400 and a message "Record already exists cannot add!" if email already exists in database', async () => {
    let payload = JSON.stringify({
      name: "Karan",
      company_name: "Google",
      salary: "2800",
      globalrank: 1,
      email: "Karan@google.com",
    });
    const response = await request(app)
      .post("/api/ceo/addCEO/")
      .send(payload)
      .set("Content-type", "application/json");
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual("Record already exists cannot add!");
  });
});

// 5. POST Api should return an error code of 400 and a message "All fields required!" if ceo_name,ceo_company,ceo_salary,ceo_globalrank,status any one of them is not provided in the request
describe("POST API to add new ceo 'All fields required!'", () => {
  it('should return an error code of 400 and a message "All fields required!" if email,name,company_name,salary,globalrank,salary any one of them is not provided in the body', async () => {
    let payload = JSON.stringify({
      globalrank: 1,
    });
    const response = await request(app)
      .post("/api/ceo/addCEO/")
      .send(payload)
      .set("Content-type", "application/json");
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual("All fields required!");
  });
});

// 6. PUT Api should return an error code of 400 and a message "All fields required!" if name,salary any of one is not provided in the request
describe("PUT API to update ceo 'ALl fields required'", () => {
  it('should return an error code of 400 and a message "All fields required!" if email,salary any one of them is not provided in the body', async () => {
    let payload = JSON.stringify({
      salary: 1000,
    });
    const response = await request(app)
      .put("/api/ceo/updateCEO/")
      .send(payload)
      .set("Content-type", "application/json");
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toEqual("All fields required!");
  });
});

// 7. PUT Api should return an success code of 200 and a message "CEO updated successfully" if email,salary is provided in the request
describe("PUT API to update ceo 'CEO updated successfully'", () => {
  it('should return an error code of 200 and a message "CEO updated successfully" if email,salary is provided in the body', async () => {
    let payload = JSON.stringify({
      email: "Karan@google.com",
      salary: 1000,
    });
    const response = await request(app)
      .put("/api/ceo/updateCEO/")
      .send(payload)
      .set("Content-type", "application/json");
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual("CEO updated successfully");
  });
});
