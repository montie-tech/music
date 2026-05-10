const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
    res.send("Music backend is running");
});

app.get("/stream/:id", async(req, res) => {
    try {

        const fileId = req.params.id;

        const driveUrl =
            `https://drive.google.com/uc?export=download&id=1fzFmmQcpjgpIQ3EpcfahDt0DnodjysVO`;

        console.log("Streaming:", driveUrl);

        const response = await axios({
            method: "GET",
            url: driveUrl,
            responseType: "stream",
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        });

        res.setHeader("Content-Type", "audio/mpeg");
        res.setHeader("Accept-Ranges", "bytes");

        response.data.pipe(res);

    } catch (error) {

        console.log("STREAM ERROR");
        console.log(error.message);

        res.status(500).send("Streaming failed");
    }
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});