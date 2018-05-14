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
    if (typeof (req.params.subjectId) != 'undefined') {
        db_1.Teacher.findAll({
            where: {
                subjectId: req.params.subjectId
            }
        })
            .then(function (teachers) {
            res.status(200).send(teachers);
        })
            .catch(function (err) {
            res.status(500).send({
                error: "Could not find teachers"
            });
        });
    }
    else {
        db_1.Teacher.findAll()
            .then(function (teachers) {
            res.status(200).send(teachers);
            // console.log("hi")
        })
            .catch(function (err) {
            res.status(500).send({
                error: "Could not find teachers"
            });
        });
    }
});
route.post('/', function (req, res) {
    db_1.Teacher.create({
        name: req.body.name,
        subjectId: req.body.subjectId
    }).then(function (teachers) {
        res.status(201).send(teachers);
    }).catch(function (err) {
        res.status(501).send(err.message);
    });
});
route.get('/:id', function (req, res) {
    if (typeof (req.params.subjectId) != 'undefined') {
        res.status(500).send("wrong request");
        return;
    }
    db_1.Teacher.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(function (teacher) {
        res.status(200).send(teacher);
    })
        .catch(function (err) {
        res.status(500).send({
            error: "Could not find teacher"
        });
    });
});
route.put('/:id', function (req, res) {
    if (typeof (req.params.subjectId) != 'undefined') {
        res.status(500).send("wrong request");
        return;
    }
    db_1.Teacher.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(function (teacher) {
        teacher.update({
            name: req.body.name,
            subjectId: req.body.subjectId
        })
            .then(function (updated) {
            res.status(200).send(updated);
        })
            .catch(function (error) {
            res.status(500).send(error.message);
        });
    })
        .catch(function (error) {
        res.status(500).send(error.message);
    });
});
route.delete('/:id', function (req, res) {
    if (typeof (req.params.subjectId) != 'undefined') {
        res.status(500).send("wrong request");
        return;
    }
    db_1.Teacher.destroy({
        where: ({
            id: req.params.id
        })
    })
        .then(function (rowDeleted) {
        res.status(200).send(rowDeleted + " rows deleted");
    })
        .catch(function (err) {
        res.status(500).send(err.message);
    });
});
route.use('/:teacherId/batches', batches_1.default);
exports.default = route;
