//Importar o módulo express
const express = require('express')();

//Importar o módulo HTTP e atribuindo a constante do express e criando um servidor
const http = require('http').createServer(express);

//Importar o socket.io e colocando o http como parâmetro
const io = require('socket.io')(http);

//Rota para página inicial
express.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

//Evento para o usuário conectar ao servidor
io.on('connection', (socket) => {
    console.log("Um novo Usuário foi conectado")
    //Evento para quando o usuario enviar uma mensagem via socket.io
    socket.on('chat message', (dados) => io.emit('chat message', dados));

    //Evento para quando o usuário se desconectar
    socket.on('disconnect', () => console.log("Um Usuário foi desconectado"));
})

//Iniciar o servidor na porta 3000
http.listen(3000, () => {
    console.log("Servidor iniciado: http://localhost:3000");
})