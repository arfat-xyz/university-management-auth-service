import express from 'express';
import { UserRouter } from '../modules/users/user.route';
import { AcademicSemisterRoutes } from '../modules/academicSemister/academicSemister.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';

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
    route: FacultyRoutes,
  },
];

const router = express.Router();

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
