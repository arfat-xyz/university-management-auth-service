import express from 'express';
import { UserRouter } from '../modules/users/user.route';
import { AcademicSemisterRoutes } from '../modules/academicSemister/academicSemister.route';
import { facultyRoutes } from '../modules/faculty/faculty.route';
import { departmentRouter } from '../modules/department/detpartment.route';
import { StudentsRoutes } from '../modules/student/student.route';
import { FacultyUsers } from '../modules/FacultyUser/facultyUser.route';

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
    path: '/academic-faculty',
    route: facultyRoutes,
  },
  {
    path: '/academic-department',
    route: departmentRouter,
  },
  {
    path: '/student',
    route: StudentsRoutes,
  },
  {
    path: '/faculty',
    route: FacultyUsers,
  },
];

const router = express.Router();

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
