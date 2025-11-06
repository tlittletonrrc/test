import request from "supertest";
import app from "../src/app";
import * as branchController from "../src/api/v1/controllers/branchController";

jest.mock("../src/api/v1/controllers/branchController", () => ({
    getAllBranches: jest.fn((req, res) => res.status(200).send()),
    createBranch: jest.fn((req, res) => res.status(201).send()),
    getBranchById: jest.fn((req, res) => res.status(200).send()),
    updateBranch: jest.fn((req, res) => res.status(200).send()),
    deleteBranch: jest.fn((req, res) => res.status(200).send()),
}));

describe("Branch Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/v1/branches/", () => {
        it("should call getAllBranches controller", async () => {
            await request(app).get("/api/v1/branches/");
            expect(branchController.getAllBranches).toHaveBeenCalled();
        });
    });

    describe("POST /api/v1/branches/", () => {
        it("should call createBranch controller with valid data", async () => {
            const mockBranch: {
                name: string;
                address: string;
                phone: string;
            } = {
                name: "Main Office",
                address: "123 Main St",
                phone: "5551231234",
            };

            await request(app).post("/api/v1/branches/").send(mockBranch);
            expect(branchController.createBranch).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/branches/:id", () => {
        it("should call getBranchById controller with valid ID", async () => {
            const branchId: string = "1";

            await request(app).get(`/api/v1/branches/${branchId}`);
            expect(branchController.getBranchById).toHaveBeenCalled();
        });
    });

    describe("PUT /api/v1/branches/:id", () => {
        it("should call updateBranch controller with valid data", async () => {
            const branchId: string = "5";
            const updates: {
                address: string;
            } = {
                address: "456 New Ave",
            };

            await request(app).put(`/api/v1/branches/${branchId}`).send(updates);
            expect(branchController.updateBranch).toHaveBeenCalled();
        });
    });

    describe("DELETE /api/v1/branches/:id", () => {
        it("should call deleteBranch controller with valid ID", async () => {
            const branchId: string = "10";

            await request(app).delete(`/api/v1/branches/${branchId}`);
            expect(branchController.deleteBranch).toHaveBeenCalled();
        });
    });
});