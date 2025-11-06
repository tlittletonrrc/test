import express, { Router } from "express";
import * as employeeController from "../controllers/employeeController";
import { validateRequest } from "../middleware/validate";
import { employeeSchemas } from "../validations/employeeValidation";

const router: Router = express.Router();

// "/api/v1/employees" prefixes all below routes
router.get("/", employeeController.getAllEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.delete("/:id", employeeController.deleteEmployee);
router.get("/branch/:branchId", employeeController.getEmployeesByBranchId);
router.get("/department/:department", employeeController.getEmployeesByDepartment);

router.post(
    "/",
    validateRequest(employeeSchemas.create),
    employeeController.createEmployee
);

router.put(
    "/:id",
    validateRequest(employeeSchemas.update),
    employeeController.updateEmployee
);

export default router;