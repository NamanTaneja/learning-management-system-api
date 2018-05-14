import {Request,Router, Response} from 'express';
import {Course} from '../../db';
import batchRoute from './batches'
const route:Router=Router();

route.get('/',(req:Request,res:Response)=>{
    Course.findAll()
    .then((courses)=>{
        res.status(200).send(courses)
    })
    .catch((err)=>{
        res.status(500).send({
            error:"Could not find courses"
        })
    })
})

route.post('/',(req:Request,res:Response)=>{
    Course.create({
        name:req.body.name
    }).then((course)=>{
        res.status(201).send(course)
    }).catch((err)=>{
        res.status(501).send('failed to add course')
    })

});

route.get('/:id',(req:Request,res:Response)=>{
    Course.findOne({
        where:{
            id:req.params.id
        }
    })
    .then((courses)=>{
        res.status(200).send(courses)
    })
    .catch((err)=>{
        res.status(500).send({
            error:"Could not find courses"
        })
    })
})

route.put('/:id',(req:Request,res:Response)=>{
    Course.findOne({
        where:{
            id:req.params.id
        }
    })
    .then((course:any)=>{
        course.update({
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
    Course.destroy({
        where:({
            id:req.params.id
        })
    })
    .then((rowDeleted)=>{
       res.status(200).send(rowDeleted+" rows deleted")
    })
    .catch((err)=>{
        res.status(500).send(err.message)
    })
})

route.use('/:courseId/batches',batchRoute)

export default route;