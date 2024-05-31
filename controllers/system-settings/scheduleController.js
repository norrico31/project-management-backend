import Models from '../../models/index.js'
const { Schedule } = Models;

// GET
// ALL SCHEDULES
async function getSchedules(req, res) {
    try {
        const schedules = await Schedule.findAll()
        return res.json({message: 'Success', data: schedules})
    } catch (error) {
        return error
    }
}

// GET
// SINGLE SCHEDULE
async function getSchedule(req, res) {
    try {
        const scheduleId = req.body.id
        const schedule = await Schedule.findByPk(scheduleId)
        if (!schedule) return res.json({message: 'Schedule not found!', })
        return res.json({message: 'Success', data: schedule})
    } catch (error) {
        return error
    }
}

// POST
// CREATE SINGLE SCHEDULE
async function createSchedule(req, res) {
    const {name, description} = req.body
    try {
        const createdSchedule = Schedule.create({name, description})
        return res.json({message: 'Created schedule successfully', data: createdSchedule})
    } catch (error) {
        // handle validation for name
        return error
    }
}

// PUT
// UPDATE SINGLE SCHEDULE
async function updateSchedule(req, res) {
    const scheduleId = req.params.id
    const {name, description} = req.body
    try {
        const schedule = await Schedule.findByPk(scheduleId)
        if (!schedule) return res.json({message: 'Schedule not found!'})
        schedule.name = name
        schedule.description = description
        const updateSchedule = await schedule.save()
        return res.json({message: 'Update schedule successfully', data: updateSchedule})
    } catch (error) {
        // handle validation for name
        return error
    }
}

// DELETE
// SINGLE SCHEDULE
async function deleteSchedule(req, res) {
    try {
        const scheduleId = req.params.id
        const deletedSchedule = await Schedule.destroy({where: {id: scheduleId}},)
        return res.json({message: 'Delete schedule successfully', data: deletedSchedule})
    } catch (error) {
        return error
    }
}

export {
    getSchedules,
    getSchedule,
    createSchedule,
    updateSchedule,
    deleteSchedule,
}   