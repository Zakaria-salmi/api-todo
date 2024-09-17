const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static(__dirname + "/frontend"));

const tasks = [];

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/frontend/index.html");
});

app.get("/tasks", (req, res) => {
    try {
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur lors de la récupération des tâches",
        });
    }
});

app.post("/tasks", (req, res) => {
    try {
        const data = req.body;
        const newTask = {
            id: tasks.length + 1,
            name: data.name,
            completed: data.completed,
        };
        tasks.push(newTask);
        res.json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur lors de la création de la tâche",
        });
    }
});

app.put("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find((task) => task.id === id);
    if (!task) {
        res.status(404).json({ message: "Tâche non trouvée" });
    } else {
        try {
            task.name = req.body.name;
            task.completed = req.body.completed;
            res.json(task);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Erreur lors de la mise à jour de la tâche",
            });
        }
    }
});

app.delete("/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) {
        res.status(404).json({ message: "Tâche non trouvée" });
    } else {
        try {
            tasks.splice(index, 1);
            res.json({ message: "Tâche supprimée avec succès" });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: "Erreur lors de la suppression de la tâche",
            });
        }
    }
});

app.listen(8001, () => {
    console.log(`Server is listening at http://localhost:8001`);
});
