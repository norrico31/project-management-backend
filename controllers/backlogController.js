import { Op } from 'sequelize';
import AsyncHandler  from 'express-async-handler';
import Models from '../models/index.js'
const { Backlog } = Models;

// GET
// ALL BACKLOGS
const getBacklogs = AsyncHandler(async (req, res) => {
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
    const data = await Backlog.findAll({
        ...query,
        include: [
            {
                model: Models.User,
                as: ['user', 'qa_reference', 'fixed_by', 'completed_by'] //TODO: NOT SURE IF WORKING
            },
            {
                model: Models.IssueType,
                as: 'issue_type'
            },
            {
                model: Models.SeverityType,
                as: 'severity_type'
            },
            {
                model: Models.Statuses,
                as: 'status'
            },
            {
                model: Models.Device,
                as: 'device'
            },
        ]
    })
    return res.json({message: 'Success', data})
})

// GET
// SINGLE BACKLOG
const getBacklog = AsyncHandler(async (req, res) => {
    const backlogId = req.params.id
    const data = await Backlog.findByPk(backlogId)
    if (!data) {
        res.status(404)
        throw new Error('Backlog not found!')
    }
    return res.json({message: 'Success', data})
})

// POST
// CREATE SINGLE BACKLOG
const createBacklog = AsyncHandler(async (req, res) => {
    const {projectId} = req.params;
    if (!projectId) {
        res.status(400)
        throw new Error('Please enter project!')
    }
    const {
        issue_type_id,
        severity_type_id,
        qa_reference,
        status_id,
        date_added,
        date_fixed,
        fixed_by,
        completed_by,
        device_id,
        url,
        issues,
        expeted_outcome,
        screenshots,
        notes
    } = req.body;
    const data = await Backlog.create({
        projectId,
        issue_type_id,
        severity_type_id,
        qa_reference,
        status_id,
        date_added,
        date_fixed,
        fixed_by,
        completed_by,
        device_id,
        url,
        issues,
        expeted_outcome,
        screenshots,
        notes
    })
    return res.json({message: 'Create Backlog Successfully!', data})
})

// PUT
// UPDATE SINGLE BACKLOG
const updateBacklog = AsyncHandler(async (req, res) => {
    const backlogId = req.params.id
    if (!backlogId) {
        res.status(400)
        throw new Error('Backlog not found!')
    }
    const {
        projectId,
        issue_type_id,
        severity_type_id,
        qa_reference,
        status_id,
        date_added,
        date_fixed,
        fixed_by,
        completed_by,
        device_id,
        url,
        issues,
        expeted_outcome,
        screenshots,
        notes
    } = req.body;
    let data = await Backlog.findByPk(backlogId)
    if (!data) {
        res.status(404)
        throw new Error('Backlog ID does not exist!')
    }
    data.projectId = projectId
    data.issue_type_id = issue_type_id
    data.severity_type_id = severity_type_id
    data.qa_reference = qa_reference
    data.status_id = status_id
    data.date_added = date_added
    data.date_fixed = date_fixed
    data.fixed_by = fixed_by
    data.completed_by = completed_by
    data.device_id = device_id
    data.url = url
    data.issues = issues
    data.expeted_outcome = expeted_outcome
    data.screenshots = screenshots
    data.notes = notes
    data = await data.save()
    return res.json({message: 'Update Backlog Successfully!', data})
})

// DELETE
// SINGLE BACKLOG
const deleteBacklog = AsyncHandler(async (req, res) => {
    const backlogId = req.params.id
    const data = await Backlog.findByPk(backlogId)
    if (!data) {
        res.status(404)
        throw new Error('Backlog not found!')
    }
    return res.json({message: 'Delete Backlog Successfully!', data})
})

export {
    getBacklogs,
    getBacklog,
    createBacklog,
    updateBacklog,
    deleteBacklog,
}   