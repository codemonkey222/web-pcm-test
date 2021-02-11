const https = require('https');
const fs = require('fs');
const { parse } = require('querystring');
var url_module = require('url');

const options = {
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('certificate.pem')
};

https.createServer(options, function (request, response) {


const path = url_module.parse(request.url).pathname;
const { method, url, headers } = request;

console.log(request.headers);

if(path == '/') {
	fs.readFile(__dirname + '/search.html', function(error, data) {
		if (error) {
		} else {
			response.writeHead(200, {
			'Content-Type': 'text/html'
			});
			response.write(data);
			response.end();
		}
	});
} else if(method == 'POST') {
	let body = '';
    request.on('data', chunk => {
        body += chunk.toString();
    });
    request.on('end', () => {
        console.log(
            parse(body)
        );
    });
} else if(path == '/redirect') {
	response.writeHead(301,{Location: 'https://search.example/.well-known/private-click-measurement/10'});
  	response.end();
} else if (path.startsWith('/.well-known')) {
	console.log(path);
	response.write("10");
	response.end();
}
else {
	fs.readFile(__dirname + path, function(error, data) {
		if (error) {
		} else {
			response.writeHead(200, {
			'Content-Type': 'text/html'
			});
			response.write(data);
			response.end();
		}
	});
}
}).listen(443);