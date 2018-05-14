"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var db_1 = require("../../db");
var teachers_1 = __importDefault(require("./teachers"));
var route = express_1.Router();
route.get('/', function (req, res) {
    db_1.Subject.findAll()
        .then(function (subjects) {
        res.status(200).send(subjects);
    })
        .catch(function (err) {
        res.status(500).send(err.message);
    });
});
route.post('/', function (req, res) {
    db_1.Subject.create({
        name: req.body.name,
        courseId: req.body.courseId
    }).then(function (subject) {
        res.status(201).send(subject);
    }).catch(function (err) {
        res.status(501).send(err.message);
    });
});
route.get('/:id', function (req, res) {
    db_1.Subject.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(function (subject) {
        res.status(200).send(subject);
    })
        .catch(function (err) {
        res.status(500).send(err.message);
    });
});
route.put('/:id', function (req, res) {
    db_1.Subject.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(function (subject) {
        subject.update({
            name: req.body.name,
            courseId: req.body.courseId
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
    db_1.Subject.destroy({
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
route.use('/:subjectId/teachers', teachers_1.default);
exports.default = route;
