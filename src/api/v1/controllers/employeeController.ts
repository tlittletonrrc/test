import { Request, Response, NextFunction } from "express";
import * as employeeService from "../services/employeeService";
import { Employee } from "../models/employeeModels";

/**
 * Retrieves all employees for a specific branch.
 * @param req - Express request containing branchId in params
 * @param res - Express response
 * @param next - Express next middleware
 */
export const getEmployeesByBranchId = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { branchId } = req.params;
        if (!branchId) {
            res.status(400).json({ message: "Invalid branch ID" });
            return;
        }

        const employees: Employee[] = await employeeService.getEmployeesByBranchId(branchId);
        res.status(200).json({
            message: "Employees retrieved successfully",
            data: employees,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Retrieves all employees in a specific department.
 * @param req - Express request containing department name in params
 * @param res - Express response
 * @param next - Express next middleware
 */
export const getEmployeesByDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { department } = req.params;

        if (!department) {
            res.status(400).json({ message: "Department is required" });
            return;
        }

        const employees: Employee[] = await employeeService.getEmployeesByDepartment(department);
        res.status(200).json({
            message: "Employees retrieved successfully",
            data: employees,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Manages requests and responses to retrieve all Employees
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const getAllEmployees = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const employees: Employee[] = await employeeService.getAllEmployees();
        res.status(200).json({
            message: "Employees retrieved successfully",
            data: employees,
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * 
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const getEmployeeById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;

        const employee: Employee = await employeeService.getEmployeeById(id);

        if (employee) {
            res.status(200).json({
                message: "Employee found successfully",
                data: employee,
            });
        } else {
            res.status(404).json({
                message: `Employee with ID ${id} not found test`,
            });
        }
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests, responses, and validation to create an Employee
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const createEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name, position, department, email, phone, branchId } = req.body;

        if (!name || !position || !department || !email || !phone || !branchId) {
            res.status(400).json({
                message: "Missing required employee fields",
            });
            return;
        }

        const newEmployee: Employee = await employeeService.createEmployee({
            name,
            position,
            department,
            email,
            phone,
            branchId,
        });

        res.status(201).json({
            message: "Employee created successfully",
            data: newEmployee,
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and responses to update an Employee
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
/**
 * Updates an employee in the database.
 * 
 * @param req - The express Request.
 * @param res - The express Response.
 * @param next - The express middleware chaining function.
 * @returns A response with the updated employee data.
 */
export const updateEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const updates: Employee = req.body;

        const updated: Employee = await employeeService.updateEmployee(id, updates);

        res.status(200).json({
            message: "Employee updated successfully",
            data: updated,
        });
    } catch (error: unknown) {
        next(error);
    }
};


/**
 * Manages requests and responses to delete an Employee
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const deleteEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: string = req.params.id;

        await employeeService.deleteEmployee(id);

        res.status(200).json({
            message: "Employee deleted successfully",
        });
    } catch (error: unknown) {
        next(error);
    }
};