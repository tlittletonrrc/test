import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as branchService from "../services/branchService";
import { Branch } from "../models/branchModels";
import { successResponse, errorResponse } from "../models/responseModels";

/**
 * Retrieves all Branches
 * @param req - Express request
 * @param res - Express response
 * @param next - Express middleware chaining function
 */
export const getAllBranches = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const branches: Branch[] = await branchService.getAllBranches();
        res.status(HTTP_STATUS.OK).json(
            successResponse(branches, "Branches retrieved successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Retrieves a Branch by ID
 * @param req - Express request
 * @param res - Express response
 * @param next - Express middleware chaining function
 */
export const getBranchById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;

        const branch: Branch = await branchService.getBranchById(id);

        if (branch) {
            res.status(HTTP_STATUS.OK).json(
                successResponse(branch, "Branch retrieved successfully")
            );
        } else {
            res.status(HTTP_STATUS.NOT_FOUND).json(
                errorResponse(`Branch with ID ${id} not found`)
            );
        }
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Creates a new Branch
 * @param req - Express request
 * @param res - Express response
 * @param next - Express middleware chaining function
 */
export const createBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name, address, phone } = req.body;

        if (!name || !address || !phone) {
            res.status(HTTP_STATUS.BAD_REQUEST).json(
                errorResponse("Missing required branch fields")
            );
        }

        const newBranch: Branch = await branchService.createBranch({ name, address, phone });
        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newBranch, "Branch created successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Updates an existing Branch
 * @param req - Express request
 * @param res - Express response
 * @param next - Express middleware chaining function
 */
export const updateBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const updates: Branch = req.body;

        const updatedBranch: Branch = await branchService.updateBranch(
            id,
            updates
        );

        if (updatedBranch) {
            res.status(HTTP_STATUS.OK).json(
                successResponse(updatedBranch, "Branch updated successfully")
            );
        } else {
            res.status(HTTP_STATUS.NOT_FOUND).json(
                errorResponse(`Branch with ID ${id} not found`)
            );
        }
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Deletes a Branch
 * @param req - Express request
 * @param res - Express response
 * @param next - Express middleware chaining function
 */
export const deleteBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        await branchService.deleteBranch(id);

        res.status(HTTP_STATUS.OK).json(
            successResponse(null, "Branch deleted successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};
