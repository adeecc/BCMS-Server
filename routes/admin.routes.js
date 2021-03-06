const express = require("express");
const router = express.Router();
const adminService = require("../services/admin.service");
const authService = require("../services/auth.service");

router.delete('/course/:id', authService.validate(['admin']), (req, res, next) => {
    adminService.deleteCourse(id, (err, queryRes) => {
        if (!err) {
            res.send(queryRes)
        } else {
            res.status(500).send({name: err.name, message: err.message})
        }
    })
})

router.post('/course/create', authService.validate(['admin']), (req, res, next) => {
    const courseDetails = req.body.course
    const instructorId = req.body.instructorId
    if (courseDetails != null && instructorId != null) {
        adminService.createCourse(instructorId, courseDetails, (err, queryRes) => {
            if (!err) {
                res.send(queryRes)
            } else {
                res.status(500).send({name: err.name, message: err.message});
            }
        })
    } else {
        res.status(400).send({name: 'Invalid parameters', message: 'The parameters sent are invalid'});
    }
})

router.get('/role', authService.validate(['admin']), (req, res, next) => {
    adminService.getAllRoles((err, queryRes) => {
        if (!err) {
            res.send(queryRes.rows)
        } else {
            res.status(500).send({name: err.name, message: err.message});
        }
    })
})

router.post('/role/add', authService.validate(['admin']), (req, res, next) => {
    const rid = req.body.rid
    const uid = req.body.uid
    if (rid != null && uid != null) {
        adminService.addRole(uid, rid, (err, queryRes) => {
            if (!err) {
                res.send(queryRes)
            } else {
                res.status(500).send({name: err.name, message: err.message});
            }
        })
    } else {
        res.status(400).send({name: 'Invalid parameters', message: 'The parameters sent are invalid'});
    }
})

router.post('/role/delete', authService.validate(['admin']), (req, res, next) => {
    const rid = req.body.rid
    const uid = req.body.uid
    if (rid != null && uid != null) {
        adminService.deleteRole(uid, rid, (err, queryRes) => {
            if (!err) {
                res.send(queryRes)
            } else {
                res.status(500).send({name: err.name, message: err.message});
            }
        })
    } else {
        res.status(400).send({name: 'Invalid parameters', message: 'The parameters sent are invalid'});
    }
})

module.exports = router;