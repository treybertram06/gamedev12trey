const express = require('express');
const path = require('path');
const app = express();
const hostname = '0.0.0.0'
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});

app.listen(port, hostname, () => {
    console.log(`Server is running at http://localhost:${port}`);
});