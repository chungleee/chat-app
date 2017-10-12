const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000
var app = express();

app.use(express.static(publicPath));



// *****SERVER*****
app.listen(port, function() {
    console.log(`***** server started on ${port} *****`)
});