import express from 'express'
import userController from '../controllers/userController.js'

const router = express.Router()


router.post('/register', userController.register)
router.post('/refresh_token', userController.refreshToken)
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.post('/userinfo', userController.userinfo)
router.post('/findUser', userController.findUser)

export default router