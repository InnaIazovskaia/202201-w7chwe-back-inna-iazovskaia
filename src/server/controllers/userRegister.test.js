const User = require("../../database/models/User");
const { userRegister } = require("./usersControllers");

describe("Given a userRegister controller", () => {
  describe("When it receives a request and database isn't connected", () => {
    test("Then it should call next method with an error: 'Couldn't create user", async () => {
      const next = jest.fn();
      const req = {
        body: { name: "Lola" },
      };
      const error = new Error("Couldn't create user");

      User.create = jest.fn().mockRejectedValue(error);

      await userRegister(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
