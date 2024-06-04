import express from 'express'
const router = express.Router()
import { protect } from '../../middleware/authMiddleware.js'
import {
    getIssueTypes,
    getIssueType,
    createIssueType,
    updateIssueType,
    deleteIssueType,
} from '../../controllers/system-settings/issueTypeController.js'

router.route('/').get(protect, getIssueTypes).post(protect, createIssueType)
router.route('/:id').get(protect, getIssueType).put(protect, updateIssueType).delete(protect, deleteIssueType)

export default router