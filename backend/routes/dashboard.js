import express from 'express'
const router = express.Router()
import authMiddleware from '../middleware/authMiddleware.js'
import { getSummary } from '../controllers/dashboardController.js'

router.get('/summary',authMiddleware,getSummary)

export default router