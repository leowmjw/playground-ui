/**
 * Created by leow on 12/9/15.
 */

var app = document.createElement('div');

document.body.appendChild(app);

app.id = 'app';
app.textContent = '{{ message }}';

require('./component');

