import { Request, Response, NextFunction } from "express";
import * as employeeController from "../src/api/v1/controllers/employeeController";
import * as employeeService from "../src/api/v1/services/employeeService";
import { Employee } from "../src/api/v1/models/employeeModels";

jest.mock("../src/api/v1/services/employeeService");

describe("Employee Controller", () => {
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

    it("should create a new employee", async () => {
        const mockEmployee: Employee = {
            id: "1",
            name: "Test User",
            position: "Developer",
            department: "Engineering",
            email: "test@example.com",
            phone: "123-456-7890",
            branchId: 1,
        };

        mockReq.body = { ...mockEmployee };
        (employeeService.createEmployee as jest.Mock).mockResolvedValue(mockEmployee);

        await employeeController.createEmployee(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Employee created successfully",
            data: mockEmployee,
        });
    });

    it("should return 400 if required fields are missing", async () => {
        mockReq.body = { name: "Missing fields" };
        await employeeController.createEmployee(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Missing required employee fields",
        });
    });

    it("should return all employees", async () => {
        const mockEmployees: Employee[] = [{ id: "1", name: "Test", position: "Dev", department: "IT", email: "test@a.com", phone: "123", branchId: 1 }];
        (employeeService.getAllEmployees as jest.Mock).mockResolvedValue(mockEmployees);

        await employeeController.getAllEmployees(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Employees retrieved successfully",
            data: mockEmployees,
        });
    });

    it("should call next with error if service fails", async () => {
        const error: Error = new Error("Service failure");
        (employeeService.getAllEmployees as jest.Mock).mockRejectedValue(error);

        await employeeController.getAllEmployees(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockNext).toHaveBeenCalledWith(error);
    });

    it("should get employee by ID", async () => {
        const mockEmployee: Employee = {
            id: "1",
            name: "Alice",
            position: "Manager",
            department: "HR",
            email: "alice@test.com",
            phone: "111",
            branchId: 2,
        };

        mockReq.params = { id: "1" };
        (employeeService.getEmployeeById as jest.Mock).mockResolvedValue(mockEmployee);

        await employeeController.getEmployeeById(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Employee found successfully",
            data: mockEmployee,
        });
    });

    it("should return 404 if employee is not found", async () => {
        mockReq.params = { id: "999" };
        (employeeService.getEmployeeById as jest.Mock).mockResolvedValue(undefined);

        await employeeController.getEmployeeById(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Employee with ID 999 not found test",
        });
    });

    it("should update employee data", async () => {
        const updatedEmployee: Employee = {
            id: "1",
            name: "Alice Updated",
            position: "Manager",
            department: "HR",
            email: "alice@test.com",
            phone: "999-999-9999",
            branchId: 2,
        };

        mockReq.params = { id: "1" };
        mockReq.body = { phone: "999-999-9999" };
        (employeeService.updateEmployee as jest.Mock).mockResolvedValue(updatedEmployee);

        await employeeController.updateEmployee(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Employee updated successfully",
            data: updatedEmployee,
        });
    });

    it("should call next if update fails", async () => {
        const error: Error = new Error("Employee not found");
        mockReq.params = { id: "999" };
        mockReq.body = { phone: "000-000-0000" };
        (employeeService.updateEmployee as jest.Mock).mockRejectedValue(error);

        await employeeController.updateEmployee(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockNext).toHaveBeenCalledWith(error);
    });

    it("should delete employee", async () => {
        mockReq.params = { id: "1" };
        (employeeService.deleteEmployee as jest.Mock).mockResolvedValue(undefined);

        await employeeController.deleteEmployee(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Employee deleted successfully",
        });
    });

    it("should call next if deletion fails", async () => {
        const error: Error = new Error("Employee not found");
        mockReq.params = { id: "999" };
        (employeeService.deleteEmployee as jest.Mock).mockRejectedValue(error);

        await employeeController.deleteEmployee(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockNext).toHaveBeenCalledWith(error);
    });

    it("should return employees for a valid branch ID", async () => {
        const mockEmployees: Employee[] = [
            {
                id: "1",
                name: "Branch Employee",
                position: "Technician",
                department: "Maintenance",
                email: "branch@employee.com",
                phone: "123-456-7890",
                branchId: 3,
            },
        ];

        mockReq.params = { branchId: "3" };
        (employeeService.getEmployeesByBranchId as jest.Mock).mockResolvedValue(mockEmployees);

        await employeeController.getEmployeesByBranchId(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Employees retrieved successfully",
            data: mockEmployees,
        });
    });

    it("should return 400 if branch ID is missing or invalid", async () => {
        mockReq.params = {};
        await employeeController.getEmployeesByBranchId(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Invalid branch ID",
        });
    });

    it("should return employees for a valid department", async () => {
        const mockEmployees: Employee[] = [
            {
                id: "2",
                name: "Department Employee",
                position: "Accountant",
                department: "Finance",
                email: "dept@employee.com",
                phone: "321-654-0987",
                branchId: 1,
            },
        ];

        mockReq.params = { department: "Finance" };
        (employeeService.getEmployeesByDepartment as jest.Mock).mockResolvedValue(mockEmployees);

        await employeeController.getEmployeesByDepartment(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Employees retrieved successfully",
            data: mockEmployees,
        });
    });

    it("should return 400 if department is missing or invalid", async () => {
        mockReq.params = {};

        await employeeController.getEmployeesByDepartment(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Department is required",
        });
    });
});