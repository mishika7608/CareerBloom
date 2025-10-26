import { Router } from "express";
const router = Router();

import { getApplicationStats, getCurrentUser, updateUser } from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import { authorizePermissions, authenticateUser } from "../middleware/authMiddleware.js";

router.get('/current-user', authenticateUser, getCurrentUser);
router.get('/admin/app-stats', [authorizePermissions('admin'), getApplicationStats]);
router.patch('/update-user',authenticateUser, validateUpdateUserInput,  updateUser);

export default router;
