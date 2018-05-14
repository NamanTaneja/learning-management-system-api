import {Request,Router, Response} from 'express';
import {Teacher,Subject} from '../../db'
import batchRoute from './batches';
const route:Router=Router({mergeParams:true});

route.get('/',(req:Request,res:Response)=>{
    if(typeof(req.params.subjectId)!='undefined'){
        Teacher.findAll({
            where:{
                subjectId:req.params.subjectId
            }
        })
        .then((teachers)=>{
            res.status(200).send(teachers)
        })
        .catch((err)=>{
            res.status(500).send({
                error:"Could not find teachers"
            })
        })
    }
    else{
        Teacher.findAll()
        .then((teachers)=>{
            res.status(200).send(teachers)
            // console.log("hi")
        })
        .catch((err)=>{
            res.status(500).send({
                error:"Could not find teachers"
            })
        })
    }
})

route.post('/',(req:Request,res:Response)=>{
    Teacher.create({
        name:req.body.name,
        subjectId:req.body.subjectId
    }).then((teachers)=>{
        res.status(201).send(teachers)
    }).catch((err)=>{
        res.status(501).send(err.message)
    })

});

route.get('/:id',(req:Request,res:Response)=>{
    if(typeof(req.params.subjectId)!='undefined'){
        res.status(500).send("wrong request")
        return
    }
    Teacher.findOne({
        where:{
            id:req.params.id
        }
    })
    .then((teacher)=>{
        res.status(200).send(teacher)
    })
    .catch((err)=>{
        res.status(500).send({
            error:"Could not find teacher"
        })
    })
})

route.put('/:id',(req:Request,res:Response)=>{
    if(typeof(req.params.subjectId)!='undefined'){
        res.status(500).send("wrong request")
        return
    }
    Teacher.findOne({
        where:{
            id:req.params.id
        }
    })
    .then((teacher:any)=>{
        teacher.update({
            name:req.body.name,
            subjectId:req.body.subjectId
        })
        .then((updated:any)=>{
            res.status(200).send(updated);
            
        })
        .catch((error:any)=>{
            res.status(500).send(error.message)
        })
    })
    
    .catch((error:any)=>{
        res.status(500).send(error.message)
    })
})

route.delete('/:id',(req:Request,res:Response)=>{
    if(typeof(req.params.subjectId)!='undefined'){
        res.status(500).send("wrong request")
        return
    }
    Teacher.destroy({
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

route.use('/:teacherId/batches',batchRoute);
export default route;