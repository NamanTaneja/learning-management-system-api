import { Request, Router, Response } from 'express';
import { Student, Batch, StudentBatch } from '../../db';
import batchRoute from './batches';
const route: Router = Router({ mergeParams: true });

route.get('/', (req: Request, res: Response) => {
    
        Student.findAll()
            .then((students) => {
                res.status(200).send(students)
            })
            .catch((err) => {
                res.status(500).send(err.message)
            })
    
})

route.post('/', (req: Request, res: Response) => {
    if (typeof (req.body.batchId) == 'undefined') {
        res.status(500).send("batchId not present")
        return
    }
    Batch.findOne({ where: { id: req.body.batchId } })
        .then((batchFound) => {
            if (!batchFound) {
                res.status(500).send("batchId not correct")
                return
            }
        })
    Student.create({
        name: req.body.name,
    })
        .then((student) => {
            StudentBatch.create({
                studentId: student.id,
                batchId: req.body.batchId
            })
                .then((studentBatch: any) => {
                    res.status(200).send(student)
                })

        })
        .catch((err) => {
            res.status(501).send('failed to add student')
        })
})

route.get('/:id', (req: Request, res: Response) => {
    Student.findOne({
        where: {
            id: req.params.id
        }
    })
        .then((student) => {
            res.status(200).send(student)
        })
        .catch((err) => {
            res.status(500).send(err.message)
        })
})

route.put('/:id', (req: Request, res: Response) => {

    Student.findOne({
        where: {
            id: req.params.id
        }
    })
        .then((student: any) => {
            student.update({
                name: req.body.name
            })
        })
        .then((updated: any) => {
            res.status(200).send(updated);

        })
        .catch((error: any) => {
            res.status(500).send(error.message)
        })

})

route.delete('/:id', (req: Request, res: Response) => {
    StudentBatch.destroy({
        where: {
            studentId: req.params.id
        }
    }).then(() => {
        Student.destroy({
            where: {
                id: req.params.id
            }
        }).then((rowsDeleted) => {
            res.status(200).send(rowsDeleted + " rows deleted")
        }).catch((error) => {
            res.status(500).send(error.message)
        })
    }).catch((error) => {
        res.status(500).send(error.message)
    })
})


route.use('/:studentId/batches', batchRoute);
export default route;

