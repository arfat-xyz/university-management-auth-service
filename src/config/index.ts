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
};
