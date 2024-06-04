import express from 'express'
const router = express.Router()
import { protect } from '../../middleware/authMiddleware.js'
import {
    getRoles,
    getRole,
    createRole,
    updateRole,
    deleteRole,
} from '../../controllers/admin-settings/roleController.js'

router.route('/').get(protect, getRoles).post(protect, createRole)
router.route('/:id').get(protect, getRole).put(protect, updateRole).delete(protect, deleteRole)

export default router