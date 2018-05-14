"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sequelize_1 = __importDefault(require("sequelize"));
var db = new sequelize_1.default('learning_management_system', 'ngrusr', 'ngrpass', {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    pool: {
        max: 5,
        min: 1,
        idle: 1000 // create connection after this timeout
    }
});
exports.Batch = db.define('batch', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.Course = db.define('course', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.Lecture = db.define('lecture', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.Student = db.define('student', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.Subject = db.define('subject', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.Teacher = db.define('teacher', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.default.STRING,
        allowNull: false
    }
});
exports.StudentBatch = db.define('studentbatch', {
    id: {
        type: sequelize_1.default.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
});
exports.Course.hasMany(exports.Batch);
exports.Batch.belongsTo(exports.Course);
exports.Course.hasMany(exports.Subject);
exports.Subject.belongsTo(exports.Course);
exports.Subject.hasMany(exports.Teacher);
exports.Teacher.belongsTo(exports.Subject);
exports.Batch.hasMany(exports.Lecture);
exports.Lecture.belongsTo(exports.Batch);
exports.Lecture.belongsTo(exports.Subject);
exports.Lecture.belongsTo(exports.Teacher);
exports.Batch.belongsToMany(exports.Student, { through: exports.StudentBatch });
exports.Student.belongsToMany(exports.Batch, { through: exports.StudentBatch });
db.sync()
    .then(function () { return console.log("database has been created"); })
    .catch(function (err) { return console.log(err.message); });
