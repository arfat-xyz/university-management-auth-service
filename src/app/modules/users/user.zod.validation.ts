import { z } from 'zod';
import { bloodGroupContant, genderConstant } from '../student/student.constant';
const createStudentZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is required',
    }),
    student: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        middleName: z
          .string({
            required_error: 'Middle name is required',
          })
          .optional(),
        lastName: z.string({
          required_error: 'last name is required',
        }),
      }),
      gender: z.enum([...genderConstant] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      contactNo: z.string({ required_error: 'Contact no is required' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email({ message: 'Email is required' }),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'parmanent Address is required',
      }),
      bloodGroup: z
        .enum([...bloodGroupContant] as [string, ...string[]])
        .optional(),
      guardian: z.object({
        fatherName: z.string({
          required_error: 'Father name is required',
        }),
        fatherOccopation: z.string({
          required_error: 'Father occopation is required',
        }),
        fatherContactNo: z.string({
          required_error: 'Father Contact No is required',
        }),
        motherName: z.string({
          required_error: 'Mother Name is required',
        }),
        motherOccopation: z.string({
          required_error: 'Mother occopation is required',
        }),
        motherContactNo: z.string({
          required_error: 'Mother contact no is required',
        }),
        address: z.string({
          required_error: 'Address is required',
        }),
      }),
      localGuardian: z.object({
        name: z.string({
          required_error: 'Local guardian name is required',
        }),
        occopation: z.string({
          required_error: 'Local guardian occopation is required',
        }),
        contactNo: z.string({
          required_error: 'Local guardian contact no is required',
        }),
        address: z.string({
          required_error: 'Local guardian address is required',
        }),
      }),
      profileImage: z
        .string({
          required_error: 'Profile Image is required',
        })
        .optional(),
      academicSemister: z.string({
        required_error: 'Academic semister is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic department is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic faculty is required',
      }),
    }),
  }),
});
const createAdminZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is required',
    }),
    admin: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        middleName: z
          .string({
            required_error: 'Middle name is required',
          })
          .optional(),
        lastName: z.string({
          required_error: 'last name is required',
        }),
      }),
      gender: z.enum([...genderConstant] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      contactNo: z.string({ required_error: 'Contact no is required' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email({ message: 'Email is required' }),
      department: z.string({
        required_error: 'Department is required',
      }),
      designation: z.string({
        required_error: 'Designation is required',
      }),
    }),
  }),
});
const createFacultyZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is required',
    }),
    faculty: z.object({
      name: z.object({
        firstName: z.string({
          required_error: 'First name is required',
        }),
        middleName: z
          .string({
            required_error: 'Middle name is required',
          })
          .optional(),
        lastName: z.string({
          required_error: 'last name is required',
        }),
      }),
      gender: z.enum([...genderConstant] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      dateOfBirth: z.string({
        required_error: 'Date of birth is required',
      }),
      contactNo: z.string({ required_error: 'Contact no is required' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact is required',
      }),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email({ message: 'Email is required' }),
      presentAddress: z.string({
        required_error: 'Present address no is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent address no is required',
      }),
      bloodGroup: z.string({
        required_error: 'Blood group no is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic Department no is required',
      }),
      academicFaculty: z.string({
        required_error: 'Academic Faculty no is required',
      }),
      designation: z.string({
        required_error: 'Designation is required',
      }),
    }),
  }),
});

export const UserZodValidation = {
  createStudentZodSchema,
  createAdminZodSchema,
  createFacultyZodSchema,
};
