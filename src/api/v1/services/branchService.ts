import {
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore";
import { Branch } from "../models/branchModels";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION: string = "branches";

/**
 * Retrieves all branches from Firestore
 */
export const getAllBranches = async (): Promise<Branch[]> => {
    const snapshot: QuerySnapshot = await getDocuments(COLLECTION);
    const branches: Branch[] = snapshot.docs.map((doc) => {
        const data: Omit<Branch, "id"> = doc.data() as Omit<Branch, "id">;
        return structuredClone({ id: doc.id, ...data });
    });
    return branches;
};

/**
 * Creates a new branch
 * @param branchData - The data for the new branch
 * @returns The created branch with generated ID
 */
export const createBranch = async (branchData: {
    name: string;
    address: string;
    phone: string;
}): Promise<Branch> => {
    const newBranch: Partial<Branch> = { ...branchData };

    const branchId: string = await createDocument<Branch>(COLLECTION, newBranch);

    return structuredClone({ id: branchId, ...newBranch } as Branch);
};

/**
 * Retrieves a single branch by ID
 * @param id - The ID of the branch
 * @returns The branch if found
 */
export const getBranchById = async (id: string): Promise<Branch> => {
    const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, id);

    if (!doc) {
        throw new Error(`Branch with ID ${id} not found`);
    }

    const data: Omit<Branch, "id"> = doc.data() as Omit<Branch, "id">;
    return structuredClone({ id: doc.id, ...data } as Branch);
};

/**
 * Updates an existing branch
 * @param id - The ID of the branch to update
 * @param branchData - Fields to update (name, address, phone)
 * @returns The updated branch
 */
export const updateBranch = async (
    id: string,
    branchData: Partial<Omit<Branch, "id">>
): Promise<Branch> => {
    const branch: Branch = await getBranchById(id);

    const updatedBranch: Branch = {
        ...branch,
        ...branchData,
    };

    await updateDocument<Branch>(COLLECTION, id, updatedBranch);

    return structuredClone(updatedBranch);
};

/**
 * Deletes a branch by ID
 * @param id - The ID of the branch to delete
 */
export const deleteBranch = async (id: string): Promise<void> => {
    const branch: Branch = await getBranchById(id);
    if (!branch) {
        throw new Error(`Branch with ID ${id} not found`);
    }

    await deleteDocument(COLLECTION, id);
};
