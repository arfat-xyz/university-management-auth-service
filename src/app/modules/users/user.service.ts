import mongoose from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/ApiErrors';
import { IAcademcSemisterInterface } from '../academicSemister/academicSemister.interface';
import { AcademicSemister } from '../academicSemister/academicSemister.schema';
import { IStudent } from '../student/student.interface';
import { IUser } from './user.interface';
import { User } from './user.schema';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import { studentModel } from '../student/student.model';
import httpStatus from 'http-status';
import { IAdmin } from '../admin/admin.interface';
import { adminModel } from '../admin/admin.model';
import { IFacultyUser } from '../FacultyUser/facultyUser.interface';
import { facultyUserModel } from '../FacultyUser/facultyUser.model';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // auto incremental userID
  // const academicSemister = {
  //   code: '02',
  //   year: '2025',
  // };

  // SET STUDENT ID
  // const id = await generateFacultyId();
  // user.id = id;

  let newUserAllData = null;
  // console.log(student, user);
  // set default password
  if (!user.password) {
    user.password = config.university_default_student_password as string;
  }

  // SET STUDENT ROLE
  user.role = 'student';

  // GETTING ACADEMIC SEMISTER
  const academicSemister = await AcademicSemister.findById(
    student.academicSemister
  );

  // GENERATE STUDENT ID  ALSO CREATE USER & STUDENT IN DATABASE

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // GENERATE STUDENT ID
    const id = await generateStudentId(
      academicSemister as IAcademcSemisterInterface
    );
    student.id = id;
    user.id = id;

    // CREATE STUDENT
    const createdStudent = await studentModel.create([student], {
      session,
    });
    if (!createdStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to created student');
    }
    user.student = createdStudent[0]._id;

    // CREATE USER
    const createdUser = await User.create([user], { session });
    if (!createdUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to created user');
    }
    newUserAllData = createdUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemister',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;

  // const result = await User.create(user);
  // if (!result) {
  //   throw new ApiError(400, 'User not created');
  // }
  // return result;
};
const createAdmin = async (admin: IAdmin, user: IUser) => {
  let newUserAllData = null;
  // console.log(student, user);
  // set default password
  if (!user.password) {
    user.password = config.university_default_admin_password as string;
  }

  // SET STUDENT ROLE
  user.role = 'admin';

  // GENERATE STUDENT ID  ALSO CREATE USER & STUDENT IN DATABASE

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // GENERATE ADMIN ID
    const id = await generateAdminId();
    admin.id = id;
    user.id = id;

    // CREATE STUDENT
    const createAdmin = await adminModel.create([admin], {
      session,
    });
    if (!createAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to created student');
    }
    user.admin = createAdmin[0]._id;

    // CREATE USER
    const createdUser = await User.create([user], { session });
    if (!createdUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to created user');
    }
    newUserAllData = createdUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'department',
        },
      ],
    });
  }

  return newUserAllData;
};

const createFaculty = async (faculty: IFacultyUser, user: IUser) => {
  let newUserAllData = null;
  // console.log(student, user);
  // set default password
  if (!user.password) {
    user.password = config.university_default_admin_password as string;
  }

  // SET STUDENT ROLE
  user.role = 'faculty';

  // GENERATE STUDENT ID  ALSO CREATE USER & STUDENT IN DATABASE
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // GENERATE FACULTY ID
    const id = await generateFacultyId();
    faculty.id = id;
    user.id = id;

    // CREATE STUDENT
    const createFaculty = await facultyUserModel.create([faculty], {
      session,
    });
    if (!createFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to created faculty');
    }
    user.faculty = createFaculty[0]._id;

    // CREATE USER
    const createdUser = await User.create([user], { session });
    if (!createdUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to created user');
    }
    newUserAllData = createdUser[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }

  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicDepartment',
        },
      ],
    });
  }

  return newUserAllData;
};

export const UserService = {
  createStudent,
  createAdmin,
  createFaculty,
};
