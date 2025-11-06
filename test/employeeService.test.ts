import * as employeeService from "../src/api/v1/services/employeeService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";
import { Employee } from "../src/api/v1/models/employeeModels";

// Mock the repository module
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Employee Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const mockEmployees: Employee[] = [
        { id: "1", name: "Alice Johnson", position: "Branch Manager", department: "Management", email: "alice.johnson@pixell-river.com", phone: "604-555-0148", branchId: 1 },
        { id: "2", name: "Amandeep Singh", position: "Customer Service Representative", department: "Customer Service", email: "amandeep.singh@pixell-river.com", phone: "780-555-0172", branchId: 2 },
    ];

    it("should retrieve all employees", async () => {
        const mockSnapshot = {
            docs: mockEmployees.map((emp) => ({
                id: emp.id,
                data: () => {
                    const { id, ...rest } = emp;
                    return rest;
                },
            })),
        };

        (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue(mockSnapshot);

        const result = await employeeService.getAllEmployees();

        expect(firestoreRepository.getDocuments).toHaveBeenCalledWith("employees");
        expect(result).toEqual(mockEmployees);
    });

    it("should retrieve employees by branch ID", async () => {
        const mockSnapshot = {
            docs: mockEmployees.map((emp) => ({
                id: emp.id,
                data: () => {
                    const { id, ...rest } = emp;
                    return rest;
                },
            })),
        };

        (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue(mockSnapshot);

        const result = await employeeService.getEmployeesByBranchId("1");

        expect(result).toEqual([mockEmployees[0]]);
    });

    it("should retrieve employees by department", async () => {
        const mockSnapshot = {
            docs: mockEmployees.map((emp) => ({
                id: emp.id,
                data: () => {
                    const { id, ...rest } = emp;
                    return rest;
                },
            })),
        };

        (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue(mockSnapshot);

        const result = await employeeService.getEmployeesByDepartment("Customer Service");

        expect(result).toEqual([mockEmployees[1]]);
    });

    it("should retrieve an employee by ID", async () => {
        const mockDoc = {
            id: mockEmployees[0].id,
            data: () => {
                const { id, ...rest } = mockEmployees[0];
                return rest;
            },
            exists: true,
        };

        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(mockDoc);

        const result = await employeeService.getEmployeeById(mockEmployees[0].id);

        expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith("employees", mockEmployees[0].id);
        expect(result).toEqual(mockEmployees[0]);
    });

    it("should create a new employee", async () => {
        const employeeData: Omit<Employee, "id"> = {
            name: "Alice Johnson",
            position: "Branch Manager",
            department: "Management",
            email: "alice.johnson@pixell-river.com",
            phone: "604-555-0148",
            branchId: 1,
        };
        const mockId = "3";

        (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(mockId);

        const result: Employee = await employeeService.createEmployee(employeeData);

        expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
            "employees",
            employeeData
        );
        expect(result).toEqual({ id: mockId, ...employeeData });
    });

    it("should update an existing employee", async () => {
        const employeeId = "1";
        const updateData: Partial<Omit<Employee, "id">> = { department: "HR" };

        jest.spyOn(employeeService, "getEmployeeById").mockResolvedValue(mockEmployees[0]);
        (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(undefined);

        const result = await employeeService.updateEmployee(employeeId, updateData);

        expect(employeeService.getEmployeeById).toHaveBeenCalledWith(employeeId);
        expect(firestoreRepository.updateDocument).toHaveBeenCalledWith("employees", employeeId, { ...mockEmployees[0], ...updateData });
        expect(result).toEqual({ ...mockEmployees[0], ...updateData });
    });

    it("should delete an employee", async () => {
        const employeeId = "1";

        jest.spyOn(employeeService, "getEmployeeById").mockResolvedValue(mockEmployees[0]);
        (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(undefined);

        await employeeService.deleteEmployee(employeeId);

        expect(employeeService.getEmployeeById).toHaveBeenCalledWith(employeeId);
        expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith("employees", employeeId);
    });
});