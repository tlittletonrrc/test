import {
    QuerySnapshot,
    DocumentSnapshot,
} from "firebase-admin/firestore";
import { Employee } from "../models/employeeModels";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION: string = "employees";

/**
 * Retrieves all employees from Firestore
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    
    const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
    const employees: Employee[] = snapshot.docs.map((doc) => {
        const data: Omit<Employee, "id"> = doc.data() as Omit<Employee, "id">;
        return structuredClone({ id: doc.id, ...data } as Employee);
    });
    return employees;
    
};

/**
 * Retrieves all employees by branch ID
 */
export const getEmployeesByBranchId = async (branchId: string): Promise<Employee[]> => {

    const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
    const employees: Employee[] = snapshot.docs
        .map((doc) => {
            const data: Omit<Employee, "id"> = doc.data() as Omit<Employee, "id">;
            return { id: doc.id, ...data } as Employee;
        })
        .filter((emp) => emp.branchId.toString() === branchId);
    return structuredClone(employees);

};

/**
 * Retrieves all employees by department
 */
export const getEmployeesByDepartment = async (department: string): Promise<Employee[]> => {
    const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
    const employees: Employee[] = snapshot.docs
        .map((doc) => {
            const data: Omit<Employee, "id"> = doc.data() as Omit<Employee, "id">;
            return { id: doc.id, ...data } as Employee;
        })
        .filter((emp) => emp.department.toLowerCase() === department.toLowerCase());
    return structuredClone(employees);
};

/**
 * Retrieves a single employee by ID
 */
export const getEmployeeById = async (id: string): Promise<Employee> => {
    const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, id);

    if (!doc) {
        throw new Error(`Employee with ID ${id} not found`);
    }

    const data: Omit<Employee, "id"> = doc.data() as Omit<Employee, "id">;
    return structuredClone({ id: doc.id, ...data } as Employee);
};

/**
 * Creates a new employee
 */
export const createEmployee = async (employeeData: Omit<Employee, "id">): Promise<Employee> => {
    const empId: string = await createDocument<Employee>(COLLECTION, employeeData);
    return structuredClone({ id: empId, ...employeeData } as Employee);
};

/**
 * Updates an existing employee
 */
export const updateEmployee = async (
    id: string,
    employeeData: Partial<Omit<Employee, "id">>
): Promise<Employee> => {
    const employee: Employee = await getEmployeeById(id);

    const updatedEmployee: Employee = {
        ...employee,
        ...employeeData,
    };

    await updateDocument<Employee>(COLLECTION, id, updatedEmployee);
    return structuredClone(updatedEmployee);
};

/**
 * Deletes an employee by ID
 */
export const deleteEmployee = async (id: string): Promise<void> => {
    const employee: Employee = await getEmployeeById(id);
    if (!employee) {
        throw new Error(`Employee with ID ${id} not found`);
    }

    await deleteDocument(COLLECTION, id);
};
