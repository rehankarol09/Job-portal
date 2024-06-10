const express = require('express');
const { createJob, updateJob, deleteJob, getJob } = require('../controller/job');
const { requireSignin, adminMiddleware, userMiddleware } = require('../middleware');
const { applyJob } = require('../controller/application');
const router = express.Router();


router.post('/job/create',requireSignin,adminMiddleware,createJob);
router.post('/job/update',requireSignin,adminMiddleware,updateJob);
router.post('/job/delete',requireSignin,adminMiddleware,deleteJob);
router.get('/job/',getJob);

router.post('/job/apply',requireSignin,userMiddleware,applyJob);




module.exports = router;