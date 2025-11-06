import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { branchSchemas } from "../validations/branchValidation";
import * as branchController from "../controllers/branchController";
import * as employeeController from "../controllers/employeeController";

const router: Router = express.Router();

/**
 * @openapi
 * /branches:
 *   get:
 *     summary: Retrieves a list of branches
 *     tags: [Branches]
 *     responses:
 *       200:
 *         description: A list of branches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */

router.get("/", branchController.getAllBranches);
router.get("/:id", branchController.getBranchById);
router.get("/:branchId/employees", employeeController.getEmployeesByBranchId);
router.delete("/:id", branchController.deleteBranch);

router.post(
    "/",
    validateRequest(branchSchemas.create),
    branchController.createBranch
);

router.put(
    "/:id",
    validateRequest(branchSchemas.update),
    branchController.updateBranch
);

export default router;