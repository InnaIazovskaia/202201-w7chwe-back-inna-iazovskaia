const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/User");
const { userLogin } = require("./usersControllers");

describe("Given a userLogin controller", () => {
  describe("When it receives a response with invalid username", () => {
    test("Then it should call next with error 'User not found'", async () => {
      const req = {
        body: {
          username: "Tomas",
          password: "kadjfkd",
        },
      };
      const next = jest.fn();
      const expectedError = new Error("User not found");

      User.findOne = jest.fn().mockResolvedValue(null);

      await userLogin(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a response with valid username 'Tomas' and invalid password 'lalala'", () => {
    test("Then it should call next next with error 'Invalid password for user Tomas'", async () => {
      const password = "lalala";
      const salt = 10;
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = {
        username: "Tomas",
        password: hashedPassword,
      };
      const req = {
        body: {
          username: "Tomas",
          password: "asdjfadjfkjdsf",
        },
      };
      const next = jest.fn();
      const expectedError = new Error("Invalid password for user Tomas");

      User.findOne = jest.fn().mockResolvedValue(user);

      await userLogin(req, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a responce with valid username 'Tomas' and password 'lalala'", () => {
    test("Then it should call json method of the received response", async () => {
      const password = "lalala";
      const salt = 10;
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = {
        username: "Tomas",
        password: hashedPassword,
      };
      const req = {
        body: {
          username: "Tomas",
          password,
        },
      };
      const res = {
        json: jest.fn(),
      };
      const token = "flkjakjdf";

      User.findOne = jest.fn().mockResolvedValue(user);
      jwt.sign = jest.fn().mockResolvedValue(token);

      await userLogin(req, res);

      expect(res.json).toHaveBeenCalled();
    });
  });
});
