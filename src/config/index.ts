import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });
export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  university_default_student_password:
    process.env.UNIVERSITY_DEFAULT_STUDENT_PASSWORD,
  university_default_admin_password:
    process.env.UNIVERSITY_DEFAULT_ADMIN_PASSWORD,
  university_default_faculty_password:
    process.env.UNIVERSITY_DEFAULT_FACULTY_PASSWORD,
  bycrypt_saltrounds: process.env.BYCRYPT_SALTROUNDS,
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    jwt_secret_expires_in: process.env.JWT_SECRET_EXPIRES_IN,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_refresh_secret_expires_in: process.env.JWT_REFRESH_SECRET_EXPIRES_IN,
  },
};
