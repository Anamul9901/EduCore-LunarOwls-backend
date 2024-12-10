import express from 'express';
import { GradeController } from './grade.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.post('/', auth(UserRole.admin, UserRole.faculty), GradeController.createCourse);


router.get('/:courseId', auth(UserRole.admin, UserRole.faculty), GradeController.getAllGradeByCourseId)

router.get('/:studentId/:courseId', auth(UserRole.admin, UserRole.faculty, UserRole.student), GradeController.getOneGradeByStudentId);

router.delete('/:studentId/:courseId', auth(UserRole.admin, UserRole.faculty), GradeController.deleteGrade);

export const GradeRoutes = router;