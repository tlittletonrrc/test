import Joi from "joi";
import { RequestSchema } from "../middleware/validate";


/**
 * @openapi
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - name
 *         - position
 *         - department
 *         - email
 *         - phone
 *         - branchId
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the employee
 *           example: "emp_123abc"
 *         name:
 *           type: string
 *           description: Full name of the employee
 *           example: "Jane Smith"
 *         position:
 *           type: string
 *           description: Job title or role of the employee
 *           example: "Software Engineer"
 *         department:
 *           type: string
 *           description: Department where the employee works
 *           example: "Engineering"
 *         email:
 *           type: string
 *           format: email
 *           description: Employee's email address
 *           example: "jane.smith@example.com"
 *         phone:
 *           type: string
 *           description: Employee's phone number (10–15 digits)
 *           example: "2045551234"
 *         branchId:
 *           type: integer
 *           description: ID of the branch the employee belongs to
 *           example: 2
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the employee record was created
 *           example: "2024-01-15T10:30:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the employee record was last updated
 *           example: "2024-01-20T14:45:00Z"
 */
export const employeeSchemas: Record<string, RequestSchema> = {
    // POST /api/v1/employees - Create new Employee
    create: {
        body: Joi.object({
            name: Joi.string().required().messages({
                "any.required": "Employee name is required",
                "string.empty": "Employee name cannot be empty",
            }),
            position: Joi.string().required().messages({
                "any.required": "Position is required",
                "string.empty": "Position cannot be empty",
            }),
            department: Joi.string().required().messages({
                "any.required": "Department is required",
                "string.empty": "Department cannot be empty",
            }),
            email: Joi.string().email().required().messages({
                "any.required": "Email is required",
                "string.email": "Email must be valid",
                "string.empty": "Email cannot be empty",
            }),
            phone: Joi.string()
                .pattern(/^[0-9]{10,15}$/)
                .required()
                .messages({
                    "any.required": "Phone number is required",
                    "string.pattern.base": "Phone number must be 10-15 digits",
                    "string.empty": "Phone number cannot be empty",
                }),
            branchId: Joi.number().integer().positive().required().messages({
                "any.required": "Branch ID is required",
                "number.base": "Branch ID must be a number",
                "number.positive": "Branch ID must be positive",
            }),
        }),
    },

    // PUT /api/v1/employees/:id - Update Employee
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Employee ID is required",
                "string.empty": "Employee ID cannot be empty",
            }),
        }),
        body: Joi.object({
            name: Joi.string().optional().messages({
                "string.empty": "Employee name cannot be empty",
            }),
            position: Joi.string().optional().messages({
                "string.empty": "Position cannot be empty",
            }),
            department: Joi.string().optional().messages({
                "string.empty": "Department cannot be empty",
            }),
            email: Joi.string().email().optional().messages({
                "string.email": "Email must be valid",
                "string.empty": "Email cannot be empty",
            }),
            phone: Joi.string()
                .pattern(/^[0-9]{10,15}$/)
                .optional()
                .messages({
                    "string.pattern.base": "Phone number must be 10-15 digits",
                    "string.empty": "Phone number cannot be empty",
                }),
            branchId: Joi.number().integer().positive().optional().messages({
                "number.base": "Branch ID must be a number",
                "number.positive": "Branch ID must be positive",
            }),
        }),
    },
};
