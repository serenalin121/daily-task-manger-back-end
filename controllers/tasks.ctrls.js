const db = require("../models");

const index = (req, res) => {
  db.Task.find({}, (err, tasks) => {
    if (err) return res.status(400).json({ err: err.message });

    return res.status(200).json(tasks);
  });
};

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
