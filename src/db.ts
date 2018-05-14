import Sequelize from 'sequelize';
import {IBatch} from './models/Batch';
import {ICourse} from './models/Course';
import {ILecture} from './models/Lecture';
import {IStudent} from './models/Student';
import {ISubject} from './models/Subject';
import {ITeacher} from './models/Teacher';
import { IStudentBatch } from './models/StudentBatch';

const db = new Sequelize('learning_management_system', 'ngrusr', 'ngrpass', {
dialect: 'mysql',
host: 'localhost',
port: 3306,
pool: {
max: 5, // max 5 connection
min: 1, // min 1 connection
idle: 1000 // create connection after this timeout
}
})

export const Batch=db.define<IBatch,any>('batch',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
}
}) 
 
export const Course=db.define<ICourse,any>('course',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type:Sequelize.STRING,
        allowNull: false
    }
})

export const Lecture=db.define<ILecture,any>('lecture',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export const Student=db.define<IStudent,any>('student',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}) 

export const Subject=db.define<ISubject,any>('subject',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}) 

export const Teacher=db.define<ITeacher,any>('teacher',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}) 

export const StudentBatch=db.define<IStudentBatch,any>('studentbatch',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey:true
    }
    
}) 

Course.hasMany(Batch)
Batch.belongsTo(Course)

Course.hasMany(Subject)
Subject.belongsTo(Course)

Subject.hasMany(Teacher)
Teacher.belongsTo(Subject)

Batch.hasMany(Lecture)
Lecture.belongsTo(Batch)

Lecture.belongsTo(Subject)

Lecture.belongsTo(Teacher)

Batch.belongsToMany(Student,{through:StudentBatch})
Student.belongsToMany(Batch,{through:StudentBatch})

db.sync()
    .then(() => console.log("database has been created"))
    .catch((err) => console.log(err.message))
