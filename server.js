const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'dist/fuse')));
app.use(cors());
app.get('/hello',function (req,res) {
    res.send('hello');
});
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/fuse/index.html'));
});

app.listen(port,() => {
    console.log('Server started at ' + port );
});
