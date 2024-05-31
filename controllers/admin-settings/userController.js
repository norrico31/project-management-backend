import Models from '../../models/index.js'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
dotenv.config()

const { User, Role } = Models

// POST 
// Register User
async function registerUser(req, res) {
    const { email, password } = req.body
    try {
        const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10))
        const result = await User.create({ email, password: hashedPassword })
        return res.json({ message: 'Success', data: result })
    } catch (error) {
        return error
    }
}

// POST 
// Login User
async function loginUser(req, res) {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ where: { email } })
        const isMatchPassword = await bcrypt.compare(password, user.password)
        if (!user || !isMatchPassword) return res.json({ message: 'Invalid credentials!' })
        const token = jwt.sign({ user_id: user.id }, process.env.SECRET_KEY, { expiresIn: '7d' })
        return res.json({ message: 'Success', token })
    } catch (error) {
        console.log('error sa login: ', error)
        return error
    }
}

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