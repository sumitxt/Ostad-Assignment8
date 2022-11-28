const express = require('express');
const router = express.Router();
// const profileController=require('../controllers/profileController')
const { signup, login, profile, update } = require('../controllers/profileController')
const { toDoer, view, updater, status, deleter, statusFilter, dateFilter } = require('../controllers/listController')
const authVerifyMiddleware = require('../middleware/authVerifyMiddleware')

// router.post("/signup",profileController.signup)
// router.post("/login",profileController.login)
// router.get("/profile",authVerifyMiddleware,profileController.profile)
// router.patch("/profile/update",authVerifyMiddleware,profileController.update)


router.post("/signup", signup)
router.post("/login", login)
router.get("/profile", authVerifyMiddleware, profile)
router.patch("/profile/update", authVerifyMiddleware, update)
router.post("/todo", authVerifyMiddleware, toDoer)
router.post("/todo/view", authVerifyMiddleware, view)
router.patch("/todo/update", authVerifyMiddleware, updater)
router.patch("/todo/status", authVerifyMiddleware, status)
router.post("/todo/delete", authVerifyMiddleware, deleter)
router.post("/todo/statusFilter", authVerifyMiddleware, statusFilter)
router.post("/todo/dateFilter", authVerifyMiddleware, dateFilter)

module.exports = router;