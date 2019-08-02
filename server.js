const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('src/assets'));
app.use(express.static('./'));

app.get('/', (req, res) => {
    res.sendFile(path.resolve('./index.html'));
});

app.listen(3000, () => console.log(`Tower Defense listening on port 3000!`));