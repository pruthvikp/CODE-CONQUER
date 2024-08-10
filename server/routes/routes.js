import express from 'express';
import { createProblem, createProblemDetails } from '../controllers/problemController.js';
import { ProblemsTable } from './ProblemsTable.js';
import { problemDetails } from './ProblemDetails.js';

const router = express.Router();

// Route to get all problems
router.get('/problems', ProblemsTable);

// Route to get details of a specific problem
router.get('/problem-details/:id', problemDetails);

// Route to create a new problem summary
router.post('/problems', createProblem);

// Route to create a new problem with full details
router.post('/problem-details', createProblemDetails);

export default router;
