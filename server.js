const express = require('express');
const path = require('path');

const port = process.env.Port || 8080;
const app = express();
app.use(express.static("dist"));
//app.use(express.static(__dirname));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist','index.html'))
});

app.listen(port);

console.log(__dirname);
console.log(`Server started on port ${port}`);
