jest.mock("../src/api/v1/controllers/employeeController", () => ({
    getAllEmployees: jest.fn((req, res) => res.status(200).send()),
    createEmployee: jest.fn((req, res) => res.status(201).send()),
    getEmployeeById: jest.fn((req, res) => res.status(200).send()),
    updateEmployee: jest.fn((req, res) => res.status(200).send()),
    deleteEmployee: jest.fn((req, res) => res.status(200).send()),
    getEmployeesByBranchId: jest.fn((req, res) => res.status(200).send()),
    getEmployeesByDepartment: jest.fn((req, res) => res.status(200).send()),
}));
import request from "supertest";
import app from "../src/app";
import * as employeeController from "../src/api/v1/controllers/employeeController";
describe("Employee Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/v1/employees/", () => {
        it("should call getAllEmployees controller", async () => {
            await request(app).get("/api/v1/employees/");
            expect(employeeController.getAllEmployees).toHaveBeenCalled();
        });
    });

    describe("POST /api/v1/employees/", () => {
        it("should call createEmployee controller with valid data", async () => {
            const mockEmployee: {
                name: string;
                position: string;
                department: string;
                email: string;
                phone: string;
                branchId: number;
            } = {
                name: "Test User",
                position: "Developer",
                department: "Engineering",
                email: "test@example.com",
                phone: "1234567890",
                branchId: 1,
            };


            await request(app).post("/api/v1/employees/").send(mockEmployee);
            expect(employeeController.createEmployee).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/employees/:id", () => {
        it("should call getEmployeeById controller with valid ID", async () => {
            const employeeId: string = "1";

            await request(app).get(`/api/v1/employees/${employeeId}`);

            expect(employeeController.getEmployeeById).toHaveBeenCalled();
        });
    });

    describe("PUT /api/v1/employees/:id", () => {
        it("should call updateEmployee controller with valid data", async () => {
            const mockEmployee: {
                phone: string;
            } = {
                phone: "9999999999",
            };
            
            const employeeId: string = "10";

            await request(app).put(`/api/v1/employees/${employeeId}`).send(mockEmployee);
            expect(employeeController.updateEmployee).toHaveBeenCalled();
        });
    });

    describe("DELETE /api/v1/employees/:id", () => {
        it("should call deleteEmployee controller with valid ID", async () => {
            const employeeId: string = "20";

            await request(app).delete(`/api/v1/employees/${employeeId}`);
            
            expect(employeeController.deleteEmployee).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/employees/branch/:branchId", () => {
        it("should call getEmployeesByBranchId controller", async () => {
            await request(app).get("/api/v1/employees/branch/1");
            expect(employeeController.getEmployeesByBranchId).toHaveBeenCalled();
        });
    });

    describe("GET /api/v1/employees/department/:department", () => {
        it("should call getEmployeesByDepartment controller", async () => {
            await request(app).get("/api/v1/employees/department/Engineering");
            expect(employeeController.getEmployeesByDepartment).toHaveBeenCalled();
        });
    });
});