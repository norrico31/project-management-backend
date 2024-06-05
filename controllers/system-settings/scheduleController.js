import { Op } from 'sequelize';
import AsyncHandler  from 'express-async-handler';
import Models from '../../models/index.js'
const { Schedule } = Models;

// GET
// ALL SCHEDULES
const getSchedules = AsyncHandler(async (req, res) => {
    const { search = '' } = req.query;
    const query = {
        ...(search !== '') ? {
            where: {
                [Op.or]:[
                    { name: { [Op.like]: `%${search}%` } },
                    { description: { [Op.like]: `%${search}%` } },
                ]
            }
        } : {}
    }
    const data = await Schedule.findAll(query)
    return res.json({message: 'Success', data})
})

// GET
// SINGLE SCHEDULE
const getSchedule = AsyncHandler(async (req, res) => {
    const scheduleId = req.params.id
    const data = await Schedule.findByPk(scheduleId)
    if (!data) {
        res.status(404)
        throw new Error('Schedule not found!')
    }
    return res.json({message: 'Success', data})
})

// POST
// CREATE SINGLE SCHEDULE
const createSchedule = AsyncHandler(async (req, res) => {
    const {name, description} = req.body
    if (!name) {
        res.status(400)
        throw new Error('Please enter schedule name')
    }
    const data = await Schedule.create({name, description})
    return res.json({message: 'Created schedule successfully', data})
})

// PUT
// UPDATE SINGLE SCHEDULE
const updateSchedule = AsyncHandler(async (req, res) => {
    const scheduleId = req.params.id
    const {name, description} = req.body
    let data = await Schedule.findByPk(scheduleId)
    if (!data) {
        res.status(404)
        throw new Error('Schedule not found!')
    }
    data.name = name
    data.description = description
    data = await data.save()
    return res.json({message: 'Update schedule successfully', data})
})

// DELETE
// SINGLE SCHEDULE
const deleteSchedule = AsyncHandler(async (req, res) => {
    const scheduleId = req.params.id
    let data = await Schedule.findByPk(scheduleId)
    if (!data) {
        res.status(404)
        throw new Error('Schedule not found!')
    }
    data = await data.destroy()
    return res.json({message: 'Delete Schedule Successfully', data})
})

export {
    getSchedules,
    getSchedule,
    createSchedule,
    updateSchedule,
    deleteSchedule,
}   