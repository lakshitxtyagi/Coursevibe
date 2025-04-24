const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000; // Your backend will run on port 5000

app.use(cors()); // Allows frontend to communicate with backend
app.use(express.json()); // Middleware to parse JSON requests

// Route to interact with Ollama
app.post("/api/generate", async (req, res) => {
    try {
        const { prompt } = req.body;

        // Sending request to Ollama API
        const response = await axios.post("http://localhost:11434/api/generate", {
            model: "mistral",
            prompt: prompt,
            stream: false
        });

        res.json({ response: response.data.response }); // Send back the response to frontend
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Failed to generate response from Ollama" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
