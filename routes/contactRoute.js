import express from 'express'
import contactController from '../controllers/contactController.js'

const router = express.Router()

router.post('/get' , contactController.getContacts )
router.post('/add' , contactController.postContact )

export default router