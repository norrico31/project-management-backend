import Models from '../models/index.js'
const { Backlogs, User } = Models;

// GET
// ALL BACKLOGS
async function getBacklogs(req, res) {
    try {
        const backlogs = await Backlogs.findAll({
            include: {
                model: User,
                as: 'user'
            }
        })
        return res.json({message: 'Success', data: backlogs})
    } catch (error) {
        return error
    }
}

// GET
// SINGLE BACKLOG
async function getBacklog(req, res) {
    try {
        const backlogId = req.body.id
        const backlog = await Backlogs.findByPk(backlogId)
        if (!backlog) return res.json({message: 'Backlog not found!', })
        return res.json({message: 'Success', data: backlog})
    } catch (error) {
        return error
    }
}

// POST
// CREATE SINGLE BACKLOG
async function createBacklog(req, res) {
    const {name, description} = req.body
    try {
        const createdBacklogs = Backlogs.create({name, description})
        return res.json({message: 'Create backlog successfully', data: createdBacklogs})
    } catch (error) {
        // handle validation for name
        return error
    }
}

// PUT
// UPDATE SINGLE BACKLOG
async function updateBacklog(req, res) {
    const backlogId = req.params.id
    // TODO: CHANGE PROPS   
    const {date, user_id, description, actual_time_spent} = req.body
    try {
        const backlog = await Backlogs.findByPk(backlogId)
        if (!backlog) return res.json({message: 'Backlogs not found!'})
        backlog.date = date
        backlog.description = description
        backlog.user_id = user_id
        backlog.actual_time_spent = actual_time_spent
        const updatedBacklog = await backlog.save()
        return res.json({message: 'Update backlog successfully', data: updatedBacklog})
    } catch (error) {
        // handle validation for name
        return error
    }
}

// DELETE
// SINGLE BACKLOG
async function deleteBacklog(req, res) {
    try {
        const backlogId = req.params.id
        const deletedBacklog = await Backlogs.destroy({where: {id: backlogId}},)
        return res.json({message: 'Delete backlog successfully', data: deletedBacklog})
    } catch (error) {
        return error
    }
}

export {
    getBacklogs,
    getBacklog,
    createBacklog,
    updateBacklog,
    deleteBacklog,
}   