require('./main.css');

var component = require('./component');
var app = document.createElement('div');
app.id = "app";

document.body.appendChild(app);

app.appendChild(component());
