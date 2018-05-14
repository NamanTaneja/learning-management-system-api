import {Request,Router, Response} from 'express';
import {Batch,Course,Lecture, StudentBatch} from '../../db';
import { error } from 'util';
import lectureRoute from './lectures';
const route:Router=Router({mergeParams:true});

route.get('/',(req:Request,res:Response)=>{
    if(typeof(req.params.studentId)!="undefined"){
        StudentBatch.findAll({
            where:{
                studentId:req.params.studentId
            }
        })
        .then((students:any)=>{
            let batchIds:number[]=[];
            for(let student of students){
                batchIds.push(student.batchId);
            }
            Batch.findAll({
                where:{
                    id:{$in:batchIds}
                }
            })
            .then((batches)=>{
                res.status(200).send(batches);
            })
            .catch((err)=>{
                res.status(500).send(err.message);
            })
        })
        .catch((err)=>{
            res.status(500).send(err.message);
        })
    }
    else if(typeof(req.params.courseId)!="undefined"){
        Course.findOne({
            include:[{
                model:Batch
            }],
            where:{
                id:req.params.courseId
            }
        }).then((course:any)=>{
            res.status(201).send(course.batches)
        }).catch((Error:any)=>{
            res.status(501).send(Error.message)
        })
    }
    else if(typeof(req.params.teacherId)!="undefined"){
        Lecture.findAll({
            where:{
                teacherId:req.params.teacherId
            }
        })
        .then((lectures:any)=>{
            let batchIds:number[]=[];
            for(let lecture of lectures){
                batchIds.push(lecture.batchId);
            }
            Batch.findAll({
                where:{
                    id:{$in:batchIds}
                }
            })
            .then((batches)=>{
                res.status(200).send(batches);
            })
            .catch((err)=>{
                res.status(500).send(err.message);
            })
        })
        .catch((err)=>{
            res.status(500).send(err.message);
        })
    }
})

route.post('/',(req:Request,res:Response)=>{
    Batch.create({
        name:req.body.name,
        courseId:req.params.courseId
    }).then((batches)=>{
        res.status(201).send(batches)
    }).catch((err)=>{
        res.status(501).send('failed to add course')
    })
})

route.get('/:id',(req:Request,res:Response)=>{
    Batch.findOne({
        where:{
            id:req.params.id,
            courseId:req.params.courseId
        }
    }).then((batch:any)=>{
        res.status(201).send(batch)
    }).catch((Error:any)=>{
        res.status(501).send(Error.message)
    })
})

route.put('/:id',(req:Request,res:Response)=>{
    Batch.findOne({
        where:{
            id:req.params.id,
            courseId:req.params.courseId
        }
    })
    .then((batch:any)=>{
        batch.update({
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
    Batch.destroy({
        where:{
            id:req.params.id,
            courseId:req.params.courseId
        }
    })
    .then((rowsDeleted)=>{
        res.status(200).send(rowsDeleted+" rows deleted")
    })
    .catch((error:any)=>{
        res.status(500).send(error.message)
    })
})



route.use('/:batchId/lectures',lectureRoute)
export default route