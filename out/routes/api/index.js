"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var courses_1 = __importDefault(require("./courses"));
var students_1 = __importDefault(require("./students"));
var subjects_1 = __importDefault(require("./subjects"));
var teachers_1 = __importDefault(require("./teachers"));
var lectures_1 = __importDefault(require("./lectures"));
var route = express_1.Router();
route.use('/courses', courses_1.default);
route.use('/students', students_1.default);
route.use('/subjects', subjects_1.default);
route.use('/teachers', teachers_1.default);
route.use('/lectures', lectures_1.default);
exports.default = route;
