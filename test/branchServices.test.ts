import * as branchService from "../src/api/v1/services/branchService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";
import { Branch } from "../src/api/v1/models/branchModels";

// Mock the repository module
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Branch Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const mockBranches: Branch[] = [
        {
            id: "1",
            name: "Vancouver Branch",
            address: "1300 Burrard St, Vancouver, BC, V6Z 2C7",
            phone: "604-456-0022",
        },
        {
            id: "2",
            name: "Edmonton Branch",
            address: "7250 82 Ave NW, Edmonton, AB, T6B 0G4",
            phone: "780-468-6800",
        },
    ];

    it("should retrieve all branches", async () => {
        const mockSnapshot = {
            docs: mockBranches.map((branch) => ({
                id: branch.id,
                data: () => {
                    const { id, ...rest } = branch;
                    return rest;
                },
            })),
        };

        (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue(mockSnapshot);

        const result = await branchService.getAllBranches();

        expect(firestoreRepository.getDocuments).toHaveBeenCalledWith("branches");
        expect(result).toEqual(mockBranches);
    });

    it("should retrieve a branch by ID", async () => {
        const mockDoc = {
            id: mockBranches[0].id,
            data: () => {
                const { id, ...rest } = mockBranches[0];
                return rest;
            },
            exists: true,
        };

        (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(mockDoc);

        const result = await branchService.getBranchById(mockBranches[0].id);

        expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith("branches", mockBranches[0].id);
        expect(result).toEqual(mockBranches[0]);
    });

    it("should create a new branch", async () => {
        const branchData = {
            name: "Calgary Branch",
            address: "123 Main St, Calgary, AB",
            phone: "403-555-1234",
        };
        const mockId = "3";

        (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(mockId);

        const result: Branch = await branchService.createBranch(branchData);

        expect(firestoreRepository.createDocument).toHaveBeenCalledWith("branches", branchData);
        expect(result).toEqual({ id: mockId, ...branchData });
    });

    it("should update an existing branch", async () => {
        const branchId = "1";
        const updateData: Partial<Omit<Branch, "id">> = { phone: "604-999-9999" };

        jest.spyOn(branchService, "getBranchById").mockResolvedValue(mockBranches[0]);
        (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(undefined);

        const result = await branchService.updateBranch(branchId, updateData);

        expect(branchService.getBranchById).toHaveBeenCalledWith(branchId);
        expect(firestoreRepository.updateDocument).toHaveBeenCalledWith("branches", branchId, { ...mockBranches[0], ...updateData });
        expect(result).toEqual({ ...mockBranches[0], ...updateData });
    });

    it("should delete a branch", async () => {
        const branchId = "1";

        jest.spyOn(branchService, "getBranchById").mockResolvedValue(mockBranches[0]);
        (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(undefined);

        await branchService.deleteBranch(branchId);

        expect(branchService.getBranchById).toHaveBeenCalledWith(branchId);
        expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith("branches", branchId);
    });
});