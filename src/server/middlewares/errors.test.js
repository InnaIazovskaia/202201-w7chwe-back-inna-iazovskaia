const { notFoundError, generalError } = require("./errors");

describe("Given a notFoundError middleware", () => {
  describe("When it receives a response", () => {
    test("Then it should call the response status and json method", () => {
      const res = {
        status: jest.fn(),
        json: jest.fn(),
      };

      notFoundError(null, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalled();
    });
  });
});

describe("Given a generalError middleware", () => {
  describe("When it receives an error with code '401' and message 'Bad request'  and a response", () => {
    test("Then it should call the response with status '401' and json method with the error", () => {
      const res = {
        status: jest.fn(),
        json: jest.fn(),
      };
      const error = {
        code: 401,
        message: "Bad request",
      };
      const expectedError = { error: true, message: error.message };

      generalError(error, null, res);

      expect(res.status).toHaveBeenCalledWith(error.code);
      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });

  describe("When it receives a response", () => {
    test("Then it should call the response with status 500 and json methods with  error", () => {
      const res = {
        status: jest.fn(),
        json: jest.fn(),
      };
      const inputError = {
        code: null,
        message: "hola",
      };
      const expectedCode = 500;
      const expectedError = { error: true, message: "Internal server error" };

      generalError(inputError, null, res);

      expect(res.status).toHaveBeenCalledWith(expectedCode);
      expect(res.json).toHaveBeenCalledWith(expectedError);
    });
  });
});
