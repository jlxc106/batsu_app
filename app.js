const express = require('express');
const path = require('path');

const app = express();
const PORT = 3030;

app.use(express.static("dist"));
app.get("*", (req ,res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
    console.log("Chef Jay cooking up something hot on PORT ", PORT);
});