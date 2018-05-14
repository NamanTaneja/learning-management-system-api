"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/api/index"));
require("./db");
var app = express_1.default();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use('/', index_1.default);
app.listen(1000);
