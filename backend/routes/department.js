import express from 'express'
const router = express.Router()
import authMiddleware from '../middleware/authMiddleware.js'
import { addDepartment ,getDepartments ,getDepartment,updateDepartment,deleteDepartment} from '../controllers/departmentController.js'

router.post('/add',authMiddleware,addDepartment)
router.get('/',authMiddleware,getDepartments)
router.get('/:id',authMiddleware,getDepartment)
router.put('/:id',authMiddleware,updateDepartment)
router.delete('/:id',authMiddleware,deleteDepartment)
export default router;