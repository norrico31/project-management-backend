import AsyncHandler from 'express-async-handler'
import Models from '../../models/index.js'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
dotenv.config()

const { User, Role } = Models

// POST 
// Register User
const registerUser = AsyncHandler(async (req, res) => {
    const { email, password } = req.body
    const userExist = await User.findOne({email})
    if (userExist) {
        res.status(400)
        throw new Error('User already exists!')
    }
    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10))
    const user = await User.create({ email, password: hashedPassword })
    if (user) {
        res.status(201).json({
            message: 'User create successfully', 
            data: user
        })
    }
    res.status(400)
    throw new Error('Invalid user data')
})

// POST 
// Login User
const loginUser = AsyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    const isMatchPassword = await bcrypt.compare(password, user.password)
    if (!user || !isMatchPassword) {
        res.status(400)
        throw new Error('Invalid credentials!')
    } 
    const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY, { expiresIn: '7d' })
    return res.status(200).json({ message: 'Login Successfully', token })
})

// GET 
// ALL USERS
async function getUsers(req, res) {
    try {
        const users = await User.findAll({
            attributes: { exclude: 'password' },
            include: [{
                model: Role,
                as: 'role'
            }],
        });
        return res.json({ msg: 'Success', data: users })
    } catch (error) {
        return error
    }
}
// if ()

// GET 
// SINGLE USER
async function getUserProfile(req, res) {
    try {
        const userId = req.user.id
        const user = await User.findOne({ where: { id: userId }, attributes: { exclude: 'password' } })
        return res.json({ message: 'Success', data: user })
    } catch (error) {
        return error
    }
}

// PUT 
// UPDATE SINGLE USER
async function updateUser(req, res) {
    try {
        const { id } = req.params; // Assuming you pass the user ID as a URL parameter
        const {
            email,
            password,
            role_id,
            first_name,
            last_name,
            middle_name,
            age,
            phone_no
        } = req.body;
        const user = await User.findByPk(id, {
            include: [{
                model: Role,
                as: 'role'
            }],
        });
        if (!user) return res.status(404).send({ message: 'User not found!' });
        user.email = email;
        user.role_id = role_id;
        user.first_name = first_name;
        user.last_name = last_name;
        user.middle_name = middle_name;
        user.age = age;
        user.phone_no = phone_no;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10)
            user.password = hashedPassword;
        }
        const updatedUser = await user.save()

        res.json({ message: 'User updated successfully', data: updatedUser })
    } catch (error) {
        res.json({ message: 'Error', error: `Invalid ${error.fields[0]}` })
        return error
    }
}

// DELETE 
// SINGLE USER
async function deleteUser(req, res) {
    try {
        const userId = req.params.id
        const deletedUser = await User.destroy({ where: { id: userId } },)
        return res.json({ message: 'Delete User Successfully', data: deletedUser })
    } catch (error) {
        return error
    }
}

export {
    loginUser,
    registerUser,
    getUsers,
    getUserProfile,
    updateUser,
    deleteUser,
}