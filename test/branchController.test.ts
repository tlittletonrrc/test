import { Request, Response, NextFunction } from "express";
import * as branchController from "../src/api/v1/controllers/branchController";
import * as branchService from "../src/api/v1/services/branchService";
import { Branch } from "../src/api/v1/models/branchModels";

jest.mock("../src/api/v1/services/branchService");

describe("Branch Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { params: {}, body: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    it("should create a new branch", async () => {
        const mockBranch: Branch = {
            id: "1",
            name: "Downtown Office",
            address: "123 City Rd",
            phone: "555-9999",
        };

        mockReq.body = { ...mockBranch };
        (branchService.createBranch as jest.Mock).mockResolvedValue(mockBranch);

        await branchController.createBranch(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: "success",
            message: "Branch created successfully",
            data: mockBranch,
        });
    });

    it("should return 400 if required fields are missing", async () => {
            const mockBody = {};
            mockReq.body = mockBody;

            (branchService.createBranch as jest.Mock).mockImplementation(() => {
                throw new Error("Service should not be called");
            });

            await branchController.createBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(400);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "error",
                error: "Missing required branch fields",
            });
        });
    it("should return all branches", async () => {
        const mockBranches: Branch[] = [
            { id: "1", name: "Main", address: "Main St", phone: "123-456" },
        ];
        (branchService.getAllBranches as jest.Mock).mockResolvedValue(mockBranches);

        await branchController.getAllBranches(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: "success",
            message: "Branches retrieved successfully",
            data: mockBranches,
        });
    });

    it("should call next if getAllBranches fails", async () => {
        const error: Error = new Error("DB error");
        (branchService.getAllBranches as jest.Mock).mockRejectedValue(error);

        await branchController.getAllBranches(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockNext).toHaveBeenCalledWith(error);
    });

    it("should get a branch by ID", async () => {
        const mockBranch: Branch = {
            id: "1",
            name: "Branch A",
            address: "456 Elm",
            phone: "555-1234",
        };

        mockReq.params = { id: "1" };
        (branchService.getBranchById as jest.Mock).mockResolvedValue(mockBranch);

        await branchController.getBranchById(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: "success",
            message: "Branch retrieved successfully",
            data: mockBranch,
        });
    });

    it("should return 404 if updated branch not found", async () => {
        mockReq.params = { id: "999" };
        mockReq.body = { address: "Doesn't Matter" };

        (branchService.updateBranch as jest.Mock).mockResolvedValue(undefined);

        await branchController.updateBranch(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: "error",
            error: "Branch with ID 999 not found",
            code: undefined,
        });
    });

    it("should update a branch", async () => {
        const updatedBranch: Branch = {
            id: "1",
            name: "Updated Branch",
            address: "999 Updated St",
            phone: "555-9999",
        };

        mockReq.params = { id: "1" };
        mockReq.body = { address: "999 Updated St" };

        (branchService.updateBranch as jest.Mock).mockResolvedValue(updatedBranch);

        await branchController.updateBranch(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: "success",
            message: "Branch updated successfully",
            data: updatedBranch,
        });
    });

    it("should delete a branch", async () => {
        mockReq.params = { id: "1" };
        (branchService.deleteBranch as jest.Mock).mockResolvedValue(undefined);

        await branchController.deleteBranch(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: "success",
            message: "Branch deleted successfully",
            data: null,
        });
    });

    it("should call next if deleteBranch fails", async () => {
        const error: Error = new Error("Delete failed");
        mockReq.params = { id: "99" };
        (branchService.deleteBranch as jest.Mock).mockRejectedValue(error);

        await branchController.deleteBranch(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockNext).toHaveBeenCalledWith(error);
    });
});
