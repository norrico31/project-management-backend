import { Op } from 'sequelize'
import AsyncHandler  from 'express-async-handler'
import Models from '../models/index.js'

// GET
// ALL OPTIMIZATIONS
const getOptimizations = AsyncHandler(async (req, res) => {
    const { search = '' } = req.query;
    const query = {
        ...(search !== '') ? {
            where: {
                [Op.or]:[
                    // TODO: HOW TO SEARCH DEEP OBJECT RELATION
                    { name: { [Op.like]: `%${search}%` } },
                    { description: { [Op.like]: `%${search}%` } },
                ]
            }
        } : {}
    }

    const data = await Models.Optimization.findAll({
        ...query,
        include: [
            {
                model: Models.User,
                as: 'tested_by' //TODO: arrays of user_id
            },
            {
                model: Models.Project,
                as: 'project'
            },
        ]
    })

    return res.json({ message: 'Success', data })
})

export {
    getOptimizations,
}