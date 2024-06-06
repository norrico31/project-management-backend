import { Op } from 'sequelize';
import AsyncHandler  from 'express-async-handler';
import Models from '../models/index.js'

// GET
// ALL DEVELOPMENTS
const getDevelopments = AsyncHandler(async (req, res) => {
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
    const data = await Models.Development.findAll({
        ...query,
        include: [
            {
                model: Models.User,
                as: 'user' //TODO: arrays of user_id
            },
            {
                model: Models.Statuses,
                as: 'status'
            },
        ]
    })
    return res.json({message: 'Success', data})
})

// GET
// SINGLE DEVELOPMENT
const getDevelopment = AsyncHandler(async (req, res) => {
    const devId = req.params.id
    const data = await Models.Development.findByPk(devId)
    if (!data) {
        res.status(404)
        throw new Error('Development not found!')
    }
    return res.json({message: 'Success', data})
})

// POST
// CREATE SINGLE DEVELOPMENT
const createDevelopment = AsyncHandler(async (req, res) => {
    const {projectId} = req.params;
    if (!projectId) {
        res.status(400)
        throw new Error('Please enter project!')
    }
    const {
        name,
        user_id,
        start_date,
        finish_date,
        deadline,
        duration,
        status_id
    } = req.body;
    const data = await Models.Development.create({
        projectId,
        name,
        user_id,
        start_date,
        finish_date,
        deadline,
        duration,
        status_id,
    })
    return res.json({message: 'Create Development Successfully!', data})
})

// PUT
// UPDATE SINGLE DEVELOPMENT
const updateDevelopment = AsyncHandler(async (req, res) => {
    const devId = req.params.id
    if (!devId) {
        res.status(400)
        throw new Error('Development not found!')
    }
    const {
        projectId,
        name,
        user_id,
        start_date,
        finish_date,
        deadline,
        duration,
        status_id,
    } = req.body;
    let data = await Models.Development.findByPk(devId)
    if (!data) {
        res.status(404)
        throw new Error('Development ID does not exist!')
    }
    data.projectId = projectId
    data.name = name
    data.user_id = user_id
    data.start_date = start_date
    data.finish_date = finish_date
    data.deadline = deadline
    data.duration = duration
    data.status_id = status_id
    data = await data.save()
    return res.json({message: 'Update Development Successfully!', data})
})

// DELETE
// SINGLE DEVELOPMENT
const deleteDevelopment = AsyncHandler(async (req, res) => {
    const devId = req.params.id
    const data = await Models.Development.findByPk(devId)
    if (!data) {
        res.status(404)
        throw new Error('Development not found!')
    }
    return res.json({message: 'Delete Development Successfully!', data})
})

export {
    getDevelopments,
    getDevelopment,
    createDevelopment,
    updateDevelopment,
    deleteDevelopment
}