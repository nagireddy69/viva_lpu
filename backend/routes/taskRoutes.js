const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const protect = require('../middleware/auth');

router.use(protect);

// CRUD
router.get('/', async (req, res) => {
    const tasks = await Task.find({ userId: req.user });
    res.json(tasks);
});

router.post('/', async (req, res) => {
    const task = new Task({ ...req.body, userId: req.user });
    await task.save();
    res.status(201).json(task);
});

router.put('/:id', async (req, res) => {
    const task = await Task.findOneAndUpdate(
        { _id: req.params.id, userId: req.user },
        req.body,
        { new: true }
    );
    res.json(task);
});

router.delete('/:id', async (req, res) => {
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.user });
    res.json({ message: "Deleted" });
});

module.exports = router;
