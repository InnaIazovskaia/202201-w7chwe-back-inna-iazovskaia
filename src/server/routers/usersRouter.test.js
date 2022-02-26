require("dotenv").config();
const { MongoMemoryServer } = require("mongodb-memory-server");
const bcrypt = require("bcrypt");
const { default: mongoose } = require("mongoose");
const request = require("supertest");
const databaseConnect = require("../../database/index");
const User = require("../../database/models/User");
const app = require("../index");

let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const connectionString = mongo.getUri();

  await databaseConnect(connectionString);
});

beforeEach(async () => {
  const cryptPassword = await bcrypt.hash("userpassword", 10);
  await User.create({
    name: "Tomas",
    username: "superTomas",
    password: cryptPassword,
  });
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

describe("Given a /users/register/ endpoint", () => {
  describe("When it receives POST request with user", () => {
    test("Then it should respond with 200 and the user", async () => {
      const newUser = {
        name: "Jim",
        username: "superJim",
        password: "jimpassword",
      };
      const { body } = await request(app)
        .post("/users/register")
        .send(newUser)
        .expect(200);

      expect(body.username).toBe(newUser.username);
    });
  });

  describe("When it receives POST request with existing user", () => {
    test("Then it should respond with 500 status code and error message 'Couldn't create user'", async () => {
      const newUser = {
        name: "Tomas",
        username: "superTomas",
        password: "tatata",
      };
      const expectedErrorMessage = "Couldn't create user";

      const { body } = await request(app)
        .post("/users/register")
        .send(newUser)
        .expect(500);

      expect(body.message).toBe(expectedErrorMessage);
    });
  });
});
