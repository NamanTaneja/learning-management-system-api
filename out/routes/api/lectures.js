"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var db_1 = require("../../db");
var route = express_1.Router({ mergeParams: true });
route.get('/', function (req, res) {
    if (typeof (req.params.batchId) == 'undefined') {
        db_1.Lecture.findAll()
            .then(function (lectures) {
            res.status(200).send(lectures);
        })
            .catch(function (err) {
            res.status(500).send(err.message);
        });
    }
    else {
        db_1.Batch.findOne({
            include: [{
                    model: db_1.Lecture
                }],
            where: {
                id: req.params.batchId
            }
        }).then(function (batch) {
            res.status(201).send(batch.lectures);
        }).catch(function (Error) {
            res.status(501).send(Error.message);
        });
    }
});
route.post('/', function (req, res) {
    db_1.Course.findOne({
        where: {
            id: req.params.courseId
        }
    })
        .then(function (courseExists) {
        if (!courseExists) {
            res.status(500).send("invalid course id");
            return;
        }
    });
    db_1.Batch.findOne({
        where: {
            id: req.params.batchId
        }
    })
        .then(function (batchExists) {
        if (!batchExists) {
            res.status(500).send("Invalid batch Id");
            return;
        }
        db_1.Teacher.findOne({
            where: {
                id: req.body.teacherId
            }
        }).then(function (teacher) {
            console.log("teacher" + teacher);
            if (!teacher) {
                res.status(500).send("Invalid teacher id");
                return;
            }
            db_1.Subject.findOne({
                where: {
                    id: teacher.subjectId
                }
            }).then(function (subject) {
                if (!subject) {
                    res.status(500).send("Invalid subject id");
                    return;
                }
                db_1.Lecture.create({
                    name: req.body.name,
                    batchId: req.params.batchId,
                    subjectId: teacher.subjectId,
                    teacherId: req.body.teacherId
                }).then(function (lecture) {
                    res.status(201).send(lecture);
                }).catch(function (error) {
                    res.status(500).send(error.message);
                });
            }).catch(function (error) {
                res.status(500).send(error.message);
            });
        }).catch(function (error) {
            res.status(500).send(error.message);
        });
    }).catch(function (error) {
        res.status(500).send(error.message);
    });
});
route.get('/:id', function (req, res) {
    db_1.Lecture.findOne({
        where: {
            batchId: req.params.batchId,
            id: req.params.id
        }
    }).then(function (lecture) {
        res.status(201).send(lecture);
    }).catch(function (Error) {
        res.status(501).send(Error.message);
    });
});
route.put('/:id', function (req, res) {
    db_1.Lecture.findOne({
        where: {
            batchId: req.params.batchId,
            id: req.params.id
        }
    })
        .then(function (lecture) {
        lecture.update({
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
    db_1.Lecture.destroy({
        where: {
            batchId: req.params.batchId,
            id: req.params.id
        }
    })
        .then(function (rowsDeleted) {
        res.status(200).send(rowsDeleted + " rows deleted");
    })
        .catch(function (error) {
        res.status(500).send(error.message);
    });
});
exports.default = route;
