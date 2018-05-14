import {Request,Router, Response} from 'express';
import {Subject,Teacher} from '../../db'
import teacherRoute from './teachers'
const route:Router=Router();

route.get('/',(req:Request,res:Response)=>{
    Subject.findAll()
    .then((subjects)=>{
        res.status(200).send(subjects)
    })
    .catch((err)=>{
        res.status(500).send(err.message)
    })
})

route.post('/',(req:Request,res:Response)=>{
    Subject.create({
        name:req.body.name,
        courseId:req.body.courseId
    }).then((subject)=>{
        res.status(201).send(subject)
    }).catch((err)=>{
        res.status(501).send(err.message)
    })

});

route.get('/:id',(req:Request,res:Response)=>{
    Subject.findOne({
        where:{
            id:req.params.id
        }
    })
    .then((subject)=>{
        res.status(200).send(subject)
    })
    .catch((err)=>{
        res.status(500).send(err.message)
    })
})

route.put('/:id',(req:Request,res:Response)=>{
    Subject.findOne({
        where:{
            id:req.params.id
        }
    })
    .then((subject:any)=>{
        subject.update({
            name:req.body.name,
            courseId:req.body.courseId
        })
    })
    .then((updated:any)=>{
        res.status(200).send(updated);
        
    })
    .catch((error:any)=>{
        res.status(500).send(error.message)
    })

})

route.delete('/:id',(req:Request,res:Response)=>{
    Subject.destroy({
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


route.use('/:subjectId/teachers',teacherRoute)
export default route
