import express from 'express';
import { UserRouter } from '../modules/users/user.route';
import { AcademicSemisterRoutes } from '../modules/academicSemister/academicSemister.route';
import { facultyRoutes } from '../modules/faculty/faculty.route';
import { departmentRouter } from '../modules/department/detpartment.route';

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/academic-semisters',
    route: AcademicSemisterRoutes,
  },
  {
    path: '/faculty',
    route: facultyRoutes,
  },
  {
    path: '/department',
    route: departmentRouter,
  },
];

const router = express.Router();

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
