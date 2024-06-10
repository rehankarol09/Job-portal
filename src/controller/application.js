const Application = require('../Modal/application');
const Job = require("../Modal/job");
const User = require('../Modal/user');

exports.applyJob = async (req, res) => {
  try {
    console.log("inside")
    const { jobId, resume, coverLetter } = req.body;
    console.log(req);

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const application = new Application({
      user: userId,
      job: jobId,
      resume,
      coverLetter
    });

    const savedApplication = await application.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(500).json({ error: 'Error applying for job', details: error });
  }
};
