import { Request, Router, Response } from 'express';
import { Lecture, Batch, Course, Teacher, Subject } from '../../db';
import lectureRoute from './batches'
const route: Router = Router({ mergeParams: true });

route.get('/', (req: Request, res: Response) => {
    if (typeof (req.params.batchId) == 'undefined') {
        Lecture.findAll()
            .then((lectures) => {
                res.status(200).send(lectures)
            })
            .catch((err) => {
                res.status(500).send(err.message)
            })
    }
    else {
        Batch.findOne({
            include: [{
                model: Lecture
            }],
            where: {
                id: req.params.batchId
            }
        }).then((batch: any) => {
            res.status(201).send(batch.lectures)
        }).catch((Error: any) => {
            res.status(501).send(Error.message)
        })
    }
})

route.post('/', (req: Request, res: Response) => {
    Course.findOne({
        where: {
            id: req.params.courseId
        }
    })
        .then((courseExists) => {
            if (!courseExists) {
                res.status(500).send("invalid course id");
                return
            }
        })
    Batch.findOne({
        where: {
            id: req.params.batchId
        }
    })
        .then((batchExists) => {
            if (!batchExists) {
                res.status(500).send("Invalid batch Id")
                return
            }
            Teacher.findOne({
                where: {
                    id: req.body.teacherId
                }
            }).then((teacher) => {
                console.log("teacher" + teacher)
                if (!teacher) {
                    res.status(500).send("Invalid teacher id")
                    return
                }
                Subject.findOne({
                    where: {
                        id: teacher.subjectId
                    }
                }).then((subject) => {
                    if (!subject) {
                        res.status(500).send("Invalid subject id")
                        return
                    } Lecture.create({
                        name: req.body.name,
                        batchId: req.params.batchId,
                        subjectId: teacher.subjectId,
                        teacherId: req.body.teacherId
                    }).then((lecture) => {
                        res.status(201).send(lecture)
                    }).catch((error) => {
                        res.status(500).send(error.message)
                    })
                }).catch((error) => {
                    res.status(500).send(error.message)
                })
            }).catch((error) => {
                res.status(500).send(error.message)
            })
        }).catch((error) => {
            res.status(500).send(error.message)
        })
})

route.get('/:id',(req:Request,res:Response)=>{
    
    Lecture.findOne({
        where:{
            batchId:req.params.batchId,
            id:req.params.id
        }
    }).then((lecture:any)=>{

        res.status(201).send(lecture)
    }).catch((Error:any)=>{
        res.status(501).send(Error.message)
    })
})

route.put('/:id',(req:Request,res:Response)=>{
    Lecture.findOne({
        where:{
            batchId:req.params.batchId,
            id:req.params.id
        }
    })
    .then((lecture:any)=>{
        lecture.update({
        name:req.body.name
    })
    .then((updated:any)=>{
        res.status(200).send(updated);
        
    })
    .catch((error:any)=>{
        res.status(500).send(error.message)
    })
})
})

route.delete('/:id',(req:Request,res:Response)=>{
    Lecture.destroy({
        where:{
            batchId:req.params.batchId,
            id:req.params.id
        }
    })
    .then((rowsDeleted)=>{
        res.status(200).send(rowsDeleted+" rows deleted")
    })
    .catch((error:any)=>{
        res.status(500).send(error.message)
    })
})


export default route