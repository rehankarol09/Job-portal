const Job = require("../Modal/job");

exports.createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      company,
      location,
      salary,
      jobType,
      requirements,
      responsibilities,
    } = req.body;
    const _job = new Job({
      title,
      description,
      company,
      location,
      salary,
      jobType,
      requirements,
      responsibilities,
    });
    const savedJob = await _job.save({});
    if(savedJob) return res.status(200).json({message:"Job saved"})
      return res.status(400).json({
        message: "Something went wrong",
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.body.id, req.body, { new: true, runValidators: true });
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: 'Error updating job', details: error });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.body.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.status(200).json({message:"Job deleted"});
  } catch (error) {
    res.status(500).json({ error: 'Error updating job', details: error });
  }
};

exports.getJob = async (req, res) => {
  try {
    const { id } = req.body;
    if (id) {
      const job = await Job.findById(id);
      if (!job) {
        return res.status(404).json({ error: 'Job not found' });
      }
      return res.status(200).json(job);
    }
    const jobs = await Job.find();
    return res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching job(s)', details: error });
  }
};
