import Joi from "joi";
import { RequestSchema } from "../middleware/validate";

/**
 * @openapi
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       required:
 *         - name
 *         - address
 *         - phone
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the branch
 *           example: "br_123abc"
 *         name:
 *           type: string
 *           description: Name of the branch
 *           example: "Downtown Office"
 *         address:
 *           type: string
 *           description: Physical address of the branch
 *           example: "123 Main Street, Winnipeg, MB"
 *         phone:
 *           type: string
 *           description: Branch phone number (10–15 digits)
 *           example: "2045557890"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the branch record was created
 *           example: "2025-01-01T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: When the branch record was last updated
 *           example: "2025-01-05T08:30:00Z"
 */

/**
 * Branch schema organised by request type
 */
export const branchSchemas: Record<string, RequestSchema> = {
    // POST /api/v1/branches - Create new Branch
    create: {
        body: Joi.object({
            name: Joi.string().required().messages({
                "any.required": "Branch name is required",
                "string.empty": "Branch name cannot be empty",
            }),
            address: Joi.string().required().messages({
                "any.required": "Address is required",
                "string.empty": "Address cannot be empty",
            }),
            phone: Joi.string()
                .pattern(/^[0-9]{10,15}$/)
                .required()
                .messages({
                    "any.required": "Phone number is required",
                    "string.pattern.base": "Phone number must be 10-15 digits",
                }),
        }),
    },

    // PUT /api/v1/branches/:id - Update Branch
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Branch ID is required",
                "string.empty": "Branch ID cannot be empty",
            }),
        }),
        body: Joi.object({
            name: Joi.string().optional().messages({
                "string.empty": "Name cannot be empty",
            }),
            address: Joi.string().optional().messages({
                "string.empty": "Address cannot be empty",
            }),
            phone: Joi.string()
                .pattern(/^[0-9]{10,15}$/)
                .optional()
                .messages({
                    "string.pattern.base": "Phone number must be 10-15 digits",
                }),
        }),
    },
};
