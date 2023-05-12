// Servidor
const http = require('http');
const express = require('express');
const jsonServer = require('json-server');
const socketio = require('socket.io');

// Criar um app Express
const app = express();

// Criar um servidor HTTP usando o app Express
const server = http.createServer(app);

// Criar um servidor Socket.io usando o servidor HTTP
const io = socketio(server);

// Criar um roteador JSON Server para simular uma API REST
const router = jsonServer.router('private/db.json');

// Usar o middleware JSON Server para tratar as requisições
app.use('/api', router);

// Definir uma rota estática para servir os arquivos do cliente
app.use(express.static('public'));

//Evento para o usuário conectar ao servidor
io.on('connection', (socket) => {
    console.log("Um novo Usuário foi conectado")
    //Evento para quando o usuario enviar uma mensagem via socket.io
    socket.on('chat message', (dados) => io.emit('chat message', dados));

    //Evento para quando o usuário se desconectar
    socket.on('disconnect', () => console.log("Um Usuário foi desconectado"));

    socket.on("newuser", function (username) {
        socket.broadcast.emit("update", username + " entrou na conversa.");
    });

    socket.on("exituser", function (username) {
        socket.broadcast.emit("update", username + " saiu da conversa.");
    });
})

// Iniciar o servidor na porta 3000
server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});

//CÓDIGO ANTIGO SEM JSON-SERVER

// //Importar o módulo express
// const express = require('express')();

// //Importar o módulo HTTP e atribuindo a constante do express e criando um servidor
// const http = require('http').createServer(express);

// //Importar o socket.io e colocando o http como parâmetro
// const io = require('socket.io')(http);

// //Rota para página inicial
// express.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

// //Evento para o usuário conectar ao servidor
// io.on('connection', (socket) => {
//     console.log("Um novo Usuário foi conectado")
//     //Evento para quando o usuario enviar uma mensagem via socket.io
//     socket.on('chat message', (dados) => io.emit('chat message', dados));

//     //Evento para quando o usuário se desconectar
//     socket.on('disconnect', () => console.log("Um Usuário foi desconectado"));
// })

// //Iniciar o servidor na porta 3000
// http.listen(3000, () => {
//     console.log("Servidor iniciado: http://localhost:3000");
// })

// Servidor
// Definir um evento de conexão para o servidor Socket.io


//SERVIDORES SEPARADOS!!!
// io.on('connection', (socket) => {
//     console.log('Um usuário se conectou');

//     // Definir um evento de join para o socket
//     socket.on('join', (room) => {
//         console.log('Um usuário entrou na sala ' + room);

//         // Entrar na sala
//         socket.join(room);
//     });

//     // Definir um evento de message para o socket
//     socket.on('message', (data) => {
//         console.log('Mensagem recebida: ' + data.message + ' da sala ' + data.room);

//         // Enviar a mensagem para a sala específica
//         io.to(data.room).emit('message', data.message);
//     });

//     // Definir um evento de disconnect para o socket
//     socket.on('disconnect', () => {
//         console.log('Um usuário se desconectou');
//     });
// });
