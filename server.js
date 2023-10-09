const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000; // Change to your desired port

app.use(cors());
app.use(bodyParser.json());

// Dummy database to store diary entries (replace with a real database)
const diaryEntries = [];

// GET all diary entries
app.get("/entries", (req, res) => {
    res.json(diaryEntries);
});

// POST a new diary entry
app.post("/entries", (req, res) => {
    const { text } = req.body;
    const entry = { id: Date.now().toString(), text };
    diaryEntries.push(entry);
    res.status(201).json(entry);
});

// PUT (update) a diary entry by ID
app.put("/entries/:id", (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    const entryIndex = diaryEntries.findIndex(entry => entry.id === id);
    if (entryIndex !== -1) {
        diaryEntries[entryIndex].text = text;
        res.json(diaryEntries[entryIndex]);
    } else {
        res.status(404).json({ error: "Entry not found" });
    }
});

// DELETE a diary entry by ID
app.delete("/entries/:id", (req, res) => {
    const { id } = req.params;
    const entryIndex = diaryEntries.findIndex(entry => entry.id === id);
    if (entryIndex !== -1) {
        diaryEntries.splice(entryIndex, 1);
        res.sendStatus(204);
    } else {
        res.status(404).json({ error: "Entry not found" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
