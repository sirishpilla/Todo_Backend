const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await prisma.task.findMany();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

app.post('/tasks', async (req, res) => {
    try {
      const { title, color } = req.body;
  
      // Validate required fields
      if (!title) {
        return res.status(400).json({ error: 'Title is required' });
      }
  
      // Create task in the database
      const newTask = await prisma.task.create({
        data: {
          title,
          color: color || 'blue', // Default to blue if no color is provided
          completed: false,
        },
      });
  
      // Respond with the created task
      res.status(201).json(newTask);
    } catch (error) {
      console.error('Error creating task:', error); // Log the error to backend logs
      res.status(500).json({ 
        error: 'Failed to create task',
        message: error.message,
      });
    }
  });
  

app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const { title, color, completed } = req.body;
    try {
        const updatedTask = await prisma.task.update({
            where: { id: parseInt(id) },
            data: { title, color, completed },
        });
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update task' });
    }
});

app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.task.delete({
            where: { id: parseInt(id) },
        });
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});