const express = require("express");
const { Pool } = require("pg");
const app = express();

app.use(express.json());
app.use(express.static(__dirname + "/frontend"));

// Configuration de la connexion à PostgreSQL
const pool = new Pool({
    user: process.env.DB_USER || "todoapp",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "tododb",
    password: process.env.DB_PASSWORD || "todopass",
    port: process.env.DB_PORT || 5432,
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/frontend/index.html");
});

app.get("/tasks", async (req, res) => {
    try {
        const { completed } = req.query;
        let query = "SELECT * FROM tasks";

        if (completed !== undefined) {
            query += " WHERE completed = $1";
            const result = await pool.query(query, [completed === "true"]);
            res.json(result.rows);
        } else {
            const result = await pool.query(query);
            res.json(result.rows);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur lors de la récupération des tâches",
        });
    }
});

app.post("/tasks", async (req, res) => {
    try {
        const { name, completed } = req.body;
        const result = await pool.query(
            "INSERT INTO tasks (name, completed) VALUES ($1, $2) RETURNING *",
            [name, completed]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur lors de la création de la tâche",
        });
    }
});

app.put("/tasks/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { name, completed } = req.body;
        const result = await pool.query(
            "UPDATE tasks SET name = $1, completed = $2 WHERE id = $3 RETURNING *",
            [name, completed, id]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ message: "Tâche non trouvée" });
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur lors de la mise à jour de la tâche",
        });
    }
});

app.patch("/tasks/:id/completed", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await pool.query(
            "UPDATE tasks SET completed = NOT completed WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ message: "Tâche non trouvée" });
        } else {
            res.json(result.rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur lors de la mise à jour de la tâche",
        });
    }
});

app.delete("/tasks/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await pool.query(
            "DELETE FROM tasks WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            res.status(404).json({ message: "Tâche non trouvée" });
        } else {
            res.json({ message: "Tâche supprimée avec succès" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Erreur lors de la suppression de la tâche",
        });
    }
});

app.listen(8001, () => {
    console.log(`Server is listening at http://localhost:8001`);
});
