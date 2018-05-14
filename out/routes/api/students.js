"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var db_1 = require("../../db");
var batches_1 = __importDefault(require("./batches"));
var route = express_1.Router({ mergeParams: true });
route.get('/', function (req, res) {
    db_1.Student.findAll()
        .then(function (students) {
        res.status(200).send(students);
    })
        .catch(function (err) {
        res.status(500).send(err.message);
    });
});
route.post('/', function (req, res) {
    if (typeof (req.body.batchId) == 'undefined') {
        res.status(500).send("batchId not present");
        return;
    }
    db_1.Batch.findOne({ where: { id: req.body.batchId } })
        .then(function (batchFound) {
        if (!batchFound) {
            res.status(500).send("batchId not correct");
            return;
        }
    });
    db_1.Student.create({
        name: req.body.name,
    })
        .then(function (student) {
        db_1.StudentBatch.create({
            studentId: student.id,
            batchId: req.body.batchId
        })
            .then(function (studentBatch) {
            res.status(200).send(student);
        });
    })
        .catch(function (err) {
        res.status(501).send('failed to add student');
    });
});
route.get('/:id', function (req, res) {
    db_1.Student.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(function (student) {
        res.status(200).send(student);
    })
        .catch(function (err) {
        res.status(500).send(err.message);
    });
});
route.put('/:id', function (req, res) {
    db_1.Student.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(function (student) {
        student.update({
            name: req.body.name
        });
    })
        .then(function (updated) {
        res.status(200).send(updated);
    })
        .catch(function (error) {
        res.status(500).send(error.message);
    });
});
route.delete('/:id', function (req, res) {
    db_1.StudentBatch.destroy({
        where: {
            studentId: req.params.id
        }
    }).then(function () {
        db_1.Student.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (rowsDeleted) {
            res.status(200).send(rowsDeleted + " rows deleted");
        }).catch(function (error) {
            res.status(500).send(error.message);
        });
    }).catch(function (error) {
        res.status(500).send(error.message);
    });
});
route.use('/:studentId/batches', batches_1.default);
exports.default = route;
