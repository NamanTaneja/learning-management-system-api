"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var db_1 = require("../../db");
var batches_1 = __importDefault(require("./batches"));
var route = express_1.Router();
route.get('/', function (req, res) {
    db_1.Course.findAll()
        .then(function (courses) {
        res.status(200).send(courses);
    })
        .catch(function (err) {
        res.status(500).send({
            error: "Could not find courses"
        });
    });
});
route.post('/', function (req, res) {
    db_1.Course.create({
        name: req.body.name
    }).then(function (course) {
        res.status(201).send(course);
    }).catch(function (err) {
        res.status(501).send('failed to add course');
    });
});
route.get('/:id', function (req, res) {
    db_1.Course.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(function (courses) {
        res.status(200).send(courses);
    })
        .catch(function (err) {
        res.status(500).send({
            error: "Could not find courses"
        });
    });
});
route.put('/:id', function (req, res) {
    db_1.Course.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(function (course) {
        course.update({
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
    db_1.Course.destroy({
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
route.use('/:courseId/batches', batches_1.default);
exports.default = route;
