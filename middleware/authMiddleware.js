import 'dotenv'
// dotenv.config()
import jwt from 'jsonwebtoken'
import Models from '../models/index.js'
const {User} = Models


const protect = async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
            const user = await User.findByPk(decoded.user_id)
            if (!user) {
                res.status(400)
                throw new Error('Token Expired')
            }
            req.user = user
            next()
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' })
        }
    }
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' })
    }
}

const admin = async (req, res, next) => {
    if (req.user && req.user.isAdmin) return next()
    return res.status(401).json({ message: 'Not authorized as an admin' })
}

export {
    protect,
    admin
}