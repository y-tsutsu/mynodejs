const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const qs = require('querystring');
const settings = require('./settings');
const server = http.createServer();
const template = fs.readFileSync(__dirname + '/public_html/bbs.ejs', 'utf-8');
const posts = [];
renderForm = (posts, res) => {
    var data = ejs.render(template, { posts: posts });
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    res.end();
}
server.on('request', (req, res) => {
    if (req.url === '/favicon.ico') { return; }

    if (req.method === 'POST') {
        req.data = "";
        req.on("data", (chunk) => {
            req.data += chunk;
        });
        req.on("end", () => {
            var query = qs.parse(req.data);
            posts.push(query.name);
            renderForm(posts, res);
        });
    } else {
        renderForm(posts, res);
    }
});
server.listen(settings.port, settings.host);
console.log('server listening ...');
