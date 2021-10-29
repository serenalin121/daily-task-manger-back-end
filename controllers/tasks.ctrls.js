const db = require("../models");

const index = async (req, res) => {
  try {
    if (req.session.currentUser === undefined) {
      res.json({
        status: 401,
        message: 'Log in to see Tasks'
      })
    } else {
      const foundUser = await db.User.find(req.session.currentUser).
      populate({
        path: 'tasks',
        populate: {path: 'users'}
      })
      return res.status(200).json(foundUser.tasks)
    }
  }
  catch(error){
    console.log(error)
    res.json({
      status: 400,
      error: error
    })
  }
  // db.Task.find({}, (err, tasks) => {
  //   if (err) return res.status(400).json({ err: err.message });
  //
  //   return res.status(200).json(tasks);
  // });
}

const create = (req, res) => {
  db.Task.create(req.body, (err, createdTask) => {
    if (err) return res.status(400).json({ err: err.message });

    return res.status(200).json(createdTask);
  });
};

const update = (req, res) => {
  db.Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    },
    (err, updatedTask) => {
      if (err) return res.status(400).json({ err: err.message });

      return res.status(200).json(updatedTask);
    }
  );
};

const destroy = (req, res) => {
  db.Task.findByIdAndDelete(req.params.id, (err, deletedTask) => {
    if (err) return res.status(400).json({ err: err.message });

    return res.status(200).json({
      message: `Task ${deletedTask.name} deleted successfully`,
    });
  });
};

module.exports = {
  index,
  create,
  update,
  destroy,
};
