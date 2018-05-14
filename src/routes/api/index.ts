import {Request,Router} from 'express';
import coursesRoute from './courses';
import studentsRoute from './students';
import subjectsRoute from './subjects';
import teachersRoute from './teachers';
import lectureRoute from './lectures';

const route:Router=Router();

route.use('/courses',coursesRoute);
route.use('/students',studentsRoute);
route.use('/subjects',subjectsRoute);
route.use('/teachers',teachersRoute);
route.use('/lectures',lectureRoute);

export default route;