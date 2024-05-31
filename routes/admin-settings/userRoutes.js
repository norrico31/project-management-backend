import express from 'express'
import { protect } from '../../middleware/authentication.js'
const router = express.Router()
import {
    getUsers,
    getUserProfile,
    updateUser,
    deleteUser,
    registerUser,
    loginUser,
} from '../../controllers/admin-settings/userController.js'

router.route('/').get(protect, getUsers).post(protect, registerUser)
router.post('/login', loginUser)
router.get('/profile', protect, getUserProfile)
router.route('/:id').put(protect, updateUser).delete(protect, deleteUser)

export default router