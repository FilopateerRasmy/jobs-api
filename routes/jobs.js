const express = require('express');
const router = express.Router();
const jobs = require('../controllers/jobs');

router.route('/').get(jobs.getAllJobs).post(jobs.addJob)
router.route('/:id').get(jobs.getJop).delete(jobs.deleteJob).patch(jobs.updateJob)


module.exports = router;