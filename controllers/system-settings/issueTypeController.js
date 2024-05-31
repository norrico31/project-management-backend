import Models from '../../models/index.js'
const { IssueType } = Models

// GET
// ALL ISSUE TYPES
async function getIssueTypes(req, res) {
    try {
        const issueTypes = await IssueType.findAll()
        return res.json({message: 'Success', data: issueTypes})
    } catch (error) {
        return error
    }
}

// GET
// SINGLE ISSUE TYPE
async function getIssueType(req, res) {
    try {
        const issueTypeId = req.body.id
        const issueType = await IssueType.findByPk(issueTypeId)
        if (!issueType) return res.json({message: 'Issue type not found!', })
        return res.json({message: 'Success', data: issueType})
    } catch (error) {
        return error
    }
}

// POST
// CREATE SINGLE ISSUE TYPE
async function createIssueType(req, res) {
    const {name, description} = req.body
    try {
        const createdIssueType = IssueType.create({name, description})
        return res.json({message: 'Created issue type successfully', data: createdIssueType})
    } catch (error) {
        // handle validation for name
        return error
    }
}

// PUT
// UPDATE SINGLE ISSUE TYPE
async function updateIssueType(req, res) {
    const issueTypeId = req.params.id
    const {name, description} = req.body
    try {
        const issueType = await IssueType.findByPk(issueTypeId)
        if (!issueType) return res.json({message: 'Issue type not found!'})
        issueType.name = name
        issueType.description = description
        const updateIssueType = await issueType.save()
        return res.json({message: 'Update issue type successfully', data: updateIssueType})
    } catch (error) {
        // handle validation for name
        return error
    }
}

// DELETE
// SINGLE ISSUE TYPE
async function deleteIssueType(req, res) {
    try {
        const issueTypeId = req.params.id
        const deletedIssueType = await IssueType.destroy({where: {id: issueTypeId}},)
        return res.json({message: 'Delete issue type successfully', data: deletedIssueType})
    } catch (error) {
        return error
    }
}

export {
    getIssueTypes,
    getIssueType,
    createIssueType,
    updateIssueType,
    deleteIssueType,
}   