import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../src/api/v1/middleware/validate";
import { branchSchemas } from "../src/api/v1/validations/branchValidation";
import { MiddlewareFunction } from "../src/api/v1/types/express";
import { HTTP_STATUS } from "../src/constants/httpConstants";

describe("Branch Validation Middleware", () => {
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockReq = {
      body: {},
      params: {},
      query: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  it("should pass validation for valid branch data", () => {
    mockReq.body = {
      name: "Downtown Branch",
      address: "123 Main Street",
      phone: "2045551234",
    };

    const middleware: MiddlewareFunction = validateRequest(branchSchemas.create);

    middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  it("should fail validation when phone is invalid", () => {
    mockReq.body = {
      name: "Downtown Branch",
      address: "123 Main Street",
      phone: "abc",
    };

    const middleware: MiddlewareFunction = validateRequest(branchSchemas.create);

    middleware(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).not.toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({
        error: expect.stringContaining("Validation error: Body: Phone number must be 10-15 digits"),
      })
    );
  });
});
