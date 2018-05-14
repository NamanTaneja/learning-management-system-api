"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var db_1 = require("../../db");
var lectures_1 = __importDefault(require("./lectures"));
var route = express_1.Router({ mergeParams: true });
route.get('/', function (req, res) {
    if (typeof (req.params.studentId) != "undefined") {
        db_1.StudentBatch.findAll({
            where: {
                studentId: req.params.studentId
            }
        })
            .then(function (students) {
            var batchIds = [];
            for (var _i = 0, students_1 = students; _i < students_1.length; _i++) {
                var student = students_1[_i];
                batchIds.push(student.batchId);
            }
            db_1.Batch.findAll({
                where: {
                    id: { $in: batchIds }
                }
            })
                .then(function (batches) {
                res.status(200).send(batches);
            })
                .catch(function (err) {
                res.status(500).send(err.message);
            });
        })
            .catch(function (err) {
            res.status(500).send(err.message);
        });
    }
    else if (typeof (req.params.courseId) != "undefined") {
        db_1.Course.findOne({
            include: [{
                    model: db_1.Batch
                }],
            where: {
                id: req.params.courseId
            }
        }).then(function (course) {
            res.status(201).send(course.batches);
        }).catch(function (Error) {
            res.status(501).send(Error.message);
        });
    }
    else if (typeof (req.params.teacherId) != "undefined") {
        db_1.Lecture.findAll({
            where: {
                teacherId: req.params.teacherId
            }
        })
            .then(function (lectures) {
            var batchIds = [];
            for (var _i = 0, lectures_2 = lectures; _i < lectures_2.length; _i++) {
                var lecture = lectures_2[_i];
                batchIds.push(lecture.batchId);
            }
            db_1.Batch.findAll({
                where: {
                    id: { $in: batchIds }
                }
            })
                .then(function (batches) {
                res.status(200).send(batches);
            })
                .catch(function (err) {
                res.status(500).send(err.message);
            });
        })
            .catch(function (err) {
            res.status(500).send(err.message);
        });
    }
});
route.post('/', function (req, res) {
    db_1.Batch.create({
        name: req.body.name,
        courseId: req.params.courseId
    }).then(function (batches) {
        res.status(201).send(batches);
    }).catch(function (err) {
        res.status(501).send('failed to add course');
    });
});
route.get('/:id', function (req, res) {
    db_1.Batch.findOne({
        where: {
            id: req.params.id,
            courseId: req.params.courseId
        }
    }).then(function (batch) {
        res.status(201).send(batch);
    }).catch(function (Error) {
        res.status(501).send(Error.message);
    });
});
route.put('/:id', function (req, res) {
    db_1.Batch.findOne({
        where: {
            id: req.params.id,
            courseId: req.params.courseId
        }
    })
        .then(function (batch) {
        batch.update({
            name: req.body.name
        })
            .then(function (updated) {
            res.status(200).send(updated);
        })
            .catch(function (error) {
            res.status(500).send(error.message);
        });
    });
});
route.delete('/:id', function (req, res) {
    db_1.Batch.destroy({
        where: {
            id: req.params.id,
            courseId: req.params.courseId
        }
    })
        .then(function (rowsDeleted) {
        res.status(200).send(rowsDeleted + " rows deleted");
    })
        .catch(function (error) {
        res.status(500).send(error.message);
    });
});
route.use('/:batchId/lectures', lectures_1.default);
exports.default = route;
