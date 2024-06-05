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
    const userExist = await User.findOne({where: {email}})
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
    if (!email || !password) {
        res.status(400)
        throw new Error('Invalid credentials!')
    }
    const user = await User.findOne({ where: { email } })
    if (!user) {
        res.status(404)
        throw new Error("Email does not exists!")
    }
    const isMatchPassword = await bcrypt.compare(password, user?.password)
    if (!isMatchPassword) {
        res.status(401)
        throw new Error('Invalid credentials!')
    } 
    const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY, { expiresIn: '7d' })
    res.json({ message: 'Login Successfully', token })
})

// GET 
// ALL USERS
const getUsers = AsyncHandler(async (req, res) => {
    const { search = ''} = req.query;
    const query = {
        ...(search !== '') ? {
            where: {
                [Op.or]:[
                    { email: { [Op.like]: `%${search}%` } },
                    { first_name: { [Op.like]: `%${search}%` } },
                    { last_name: { [Op.like]: `%${search}%` } },
                    { middle_name: { [Op.like]: `%${search}%` } },
                    { age: { [Op.like]: `%${search}%` } },
                    { phone_no: { [Op.like]: `%${search}%` } },
                  ]
            }
        } : {}
    }
    const users = await User.findAll({
        ...query,
        attributes: { exclude: 'password' },
        include: [{
            model: Role,
            as: 'role'
        }],
    });
    res.json({message: 'Success', data: users})
})

// GET 
// SINGLE USER
const getUserProfile = AsyncHandler(async (req, res) => {
    const userId = req.user.id
    const user = await User.findOne({ 
        include: [{
            model: Role,
            as: 'role'
        }],
        where: { id: userId }, 
        attributes: { exclude: 'password' } 
    })
    if (!user) {
        res.status(400)
        throw new Error('Profile not found')
    }
    res.json({ message: 'Success', data: user })
})

// PUT 
// UPDATE SINGLE USER
const updateUser = AsyncHandler(async (req, res) => {
    const { id } = req.params; 
    const user = await User.findByPk(id, {
        include: [{
            model: Role,
            as: 'role'
        }],
    });
    if (!user) {
        res.status(404)
        throw new Error('User not found!')
    }
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
    res.json({ message: 'Update User Successfully', data: updatedUser })
})

// DELETE 
// SINGLE USER
const deleteUser = AsyncHandler(async (req, res) => {
    const userId = req.params.id
    const user = await User.findByPk(userId)
    if (!user) {
        res.status(404)
        throw new Error('User not found!')
    }
    await user.destroy()
    res.json({message: 'Delete User Successfully'})
})

export {
    loginUser,
    registerUser,
    getUsers,
    getUserProfile,
    updateUser,
    deleteUser,
}