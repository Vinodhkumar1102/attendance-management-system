import express from 'express'
import authMiddleaware from '../middleware/authMiddleware.js'
import { addLeave,getLeave , getLeaves, getLeaveDetail, updateLeave} from '../controllers/leaveController.js'

const router = express.Router()

router.post('/add',authMiddleaware,addLeave)
router.get('/detail/:id',authMiddleaware,getLeaveDetail)
router.get('/:id/:role',authMiddleaware,getLeave)
router.get('/',authMiddleaware,getLeaves)
router.put('/:id',authMiddleaware,updateLeave)

export default router