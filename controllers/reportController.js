import Models from '../models/index.js'
const { Report, User } = Models;

// GET
// ALL REPORT
async function getReports(req, res) {
    try {
        const reports = await Report.findAll({
            include: {
                model: User,
                as: 'user'
            }
        })
        return res.json({message: 'Success', data: reports})
    } catch (error) {
        return error
    }
}

// GET
// SINGLE REPORT
async function getReport(req, res) {
    try {
        const reportId = req.body.id
        const report = await Report.findByPk(reportId)
        if (!report) return res.json({message: 'Report not found!', })
        return res.json({message: 'Success', data: report})
    } catch (error) {
        return error
    }
}

// POST
// CREATE SINGLE REPORT
async function createReport(req, res) {
    const {name, description} = req.body
    try {
        const createdReport = Report.create({name, description})
        return res.json({message: 'Created report successfully', data: createdReport})
    } catch (error) {
        // handle validation for name
        return error
    }
}

// PUT
// UPDATE SINGLE REPORT
async function updateReport(req, res) {
    const reportId = req.params.id
    const {date, user_id, description, actual_time_spent} = req.body
    try {
        const report = await Report.findByPk(reportId)
        if (!report) return res.json({message: 'Report not found!'})
        report.date = date
        report.description = description
        report.user_id = user_id
        report.actual_time_spent = actual_time_spent
        const updateReport = await report.save()
        return res.json({message: 'Update report successfully', data: updateReport})
    } catch (error) {
        // handle validation for name
        return error
    }
}

// DELETE
// SINGLE REPORT
async function deleteReport(req, res) {
    try {
        const reportId = req.params.id
        const deletedReport = await Report.destroy({where: {id: reportId}},)
        return res.json({message: 'Delete report successfully', data: deletedReport})
    } catch (error) {
        return error
    }
}

export {
    getReports,
    getReport,
    createReport,
    updateReport,
    deleteReport,
}   