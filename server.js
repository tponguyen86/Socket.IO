/**
* Created by TPOGroup
* Date: 6/1/2014 DD/MM/YYYY
* Time: 8:00 PM
*/

var   http        = require('http')
    , fs          = require('fs')
    , socketIO    = require('socket.io')
    , port        = process.env.PORT || 8085
    , ip          = process.env.IP || '127.0.0.1';

var serverConfig  = function(req, res){
    if(req.url == '/'){
        fs.readFile('./public/index.html',function(error,data){
            if(error) {
                throw error;
            } else {
                res.writeHead(200,{'Content-Type':'text/html'});
                res.end(data);
            }
        })
    }
    if(req.url == '/ChatClient.js'){
        fs.readFile('./public/ChatClient.js',function(error,data){
            if(error){
                throw error;
            } else {
                res.writeHead(200,{'Content-Type':'text/javscript'});
                res.end(data);
            }
        })
    }
}
var server      = http.createServer(serverConfig).listen(port, ip, function(){console.log('Server running at %s:%s', ip, port)})
var io          = socketIO.listen(server);

var run = function(socket){
    console.log('New Client Connected');
    socket.emit('greeting', 'Welcome to Socket.IO');
    socket.on('send', function(data){
        io.sockets.emit('new_message', data);
        console.log('Forward message');
    })
}

io.set('match origin protocol', true);
io.set('origins', '*:*');
//io.set('log level', 1);

io.sockets.on('connection', run);
