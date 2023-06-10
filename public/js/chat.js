const servidor = window.location.hash.substring(1);
window.onhashchange = function () {
    // Recarregar a página
    window.location.reload();
};

document.getElementById('nomeserver').innerHTML = `Chat ${servidor}`;

console.log(servidor);
try {
    var nome = JSON.parse(localStorage.getItem('nomeUsuario'))[0]
    var fotoperfil = JSON.parse(localStorage.getItem('nomeUsuario'))[2]
    var cor = JSON.parse(localStorage.getItem('nomeUsuario'))[3]
} catch (error) {
    document.getElementById('mensagens').innerHTML = "<br><br><br><h2>VOCE ESTA SEM UMA CONTA!</h2><br><div align='center' style='justify-content: center'><a href='cadastro.html'>cadastre-se para mandar mensagem</a></div>"
}




fetch(`api/mensagens?server=${servidor}`)
    .then(response => response.json())
    .then(data => {
        for (let imprimir = 0; imprimir < data.length; imprimir++) {
            console.log(imprimir + 1);
            //Cria um elemento de lista para exibir a mensagem
            const lista = document.createElement('div');
            lista.setAttribute('class', 'message');
            //Atribuir uma ID de acordo com o seu nome de usuário
            if (data[imprimir].nome === nomeInput) {
                lista.setAttribute('id', 'usuario')
            } else {
                lista.setAttribute('id', 'outro')
            }
            //Cria um elemento span para exibir o nome com uma fonte diferente
            const divname = document.createElement('div');
            divname.setAttribute('class', 'name');
            //Define o texto do span com o nome usando innerHTML
            divname.innerHTML = data[imprimir].nome;
            divname.style.color = `${data[imprimir].cor}`
            console.log(lista);
            //Define o texto da mensagem com uma quebra de linha após o nome
            if (data[imprimir].nome === nomeInput) {
                lista.innerHTML = `
            <div style="border: solid 2px ${data[imprimir].cor};">
                ${divname.outerHTML}
                <div class="text">${escapeHTML(data[imprimir].mensagem)}</div>
            </div>
            ${data[imprimir].imagem}`;
            } else {
                lista.innerHTML = `
        ${data[imprimir].imagem}
            <div style="border: solid 2px ${data[imprimir].cor};">
                ${divname.outerHTML}
                <div class="text">${escapeHTML(data[imprimir].mensagem)}</div>
            </div>`;
            }
            //Adiciona o elemento de mensagens
            mensagens.style
            mensagens.appendChild(lista);

            mensagens.scrollTop = mensagens.scrollHeight - mensagens.clientHeight;
        }
    })



//Cria uma instância do Socket.IO
const socket = io()

var imagem = JSON.parse(localStorage.getItem('nomeUsuario'))[2]
if (imagem == "null") {
    imagem = "images/user.jpg";
}
var cor = JSON.parse(localStorage.getItem('nomeUsuario'))[3]
//Seleciona o input do nome do usuário
var nomeInput = JSON.parse(localStorage.getItem('nomeUsuario'))[0]
//Seleciona o input da mensagem
const mensagemInput = document.getElementById('mensagem');
//Seleciona a lista de mensagens
const mensagens = document.getElementById('mensagens');

//Cria uma função para escapar os caracteres especiais do HTML
function escapeHTML(text) {
    return text.replace(/[&<>"']/g, function (match) {
        switch (match) {
            case "&":
                return "&amp;";
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case "\"":
                return "&quot;";
            case "'":
                return "&#039;";
        }
    });
}

document.getElementById('mensagem').addEventListener('keyup', evento => {
    if (evento.key == "Enter") {
        enviarMensagem(evento);
    }
})

//Adiciona um evento para o envio do formulário
function enviarMensagem(evento) {
    //Previne o envio padrão do formulário para não atualizar a página
    evento.preventDefault();
    //Obptem o valor do input do nome do usuário
    const nome = nomeInput;
    //Obtém o valor do input da mensagem
    const mensagem = mensagemInput.value;

    const corUser = cor;

    const imagemUser = fotoperfil;

    const servidorUser = servidor;

    //Método JAVASCRIPT que verifica os valores válido (Não está em branco os campos)
    //EMIT envia um evento chamado "chat message" com um objeto contendo os valores
    //TRIM() é um método que remove os espaços em branco do inicio ao fim de uma string
    nome.trim() && mensagem.trim() && socket.emit('chat message', { nome, mensagem, corUser, imagemUser, servidorUser });
    //Limpa o input da mensagem
    mensagemInput.value = '';

    if (mensagem != "") {
        fetch(`api/usuarios?nome=${nomeInput}`)
            .then(response => response.json())
            .then(data => {
                console.log(data[0].id);
                idUser = data[0].id;
                fetch(`api/usuarios/${data[0].id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: nomeInput,
                        senha: JSON.parse(localStorage.getItem('nomeUsuario'))[1],
                        fotoperfil: fotoperfil,
                        cor: cor,
                        xp: JSON.parse(localStorage.getItem('nomeUsuario'))[4] + 5
                    })
                })
                    .then(response => response.json())
            })

        fetch(`api/mensagens`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                mensagem: mensagem,
                imagem: imagemUser,
                cor: corUser,
                server: servidor
            })
        })
            .then(response => response.json())
    }
};

function atualizarJson() {
    setTimeout(function () {
        fetch(`api/usuarios?nome=${nomeInput}`)
            .then(response => response.json())
            .then(data => {
                //inserir um dado local
                localStorage.setItem("nomeUsuario", JSON.stringify([data[0].nome, data[0].senha, data[0].fotoperfil, data[0].cor, data[0].xp]));
                console.log("funcionou");
            })
    }, 1000)
}

//Adiciona um evento de mensagem recebido para o servidor
socket.on('chat message', dados => {
    if (dados.servidorUser == servidor) {
        //Cria um elemento de lista para exibir a mensagem
        const lista = document.createElement('div');
        lista.setAttribute('class', 'message');
        //Atribuir uma ID de acordo com o seu nome de usuário
        if (dados.nome === nomeInput) {
            lista.setAttribute('id', 'usuario')
        } else {
            lista.setAttribute('id', 'outro')
        }
        //Cria um elemento span para exibir o nome com uma fonte diferente
        const divname = document.createElement('div');
        divname.setAttribute('class', 'name');
        //Define o texto do span com o nome usando innerHTML
        divname.innerHTML = dados.nome;
        divname.style.color = `${dados.corUser}`
        console.log(lista);
        //Define o texto da mensagem com uma quebra de linha após o nome
        if (dados.nome === nomeInput) {
            lista.innerHTML = `
            <div style="border: solid 2px ${dados.corUser};">
                ${divname.outerHTML}
                <div class="text">${escapeHTML(dados.mensagem)}</div>
            </div>
            ${dados.imagemUser}`;
        } else {
            lista.innerHTML = `
        ${dados.imagemUser}
            <div style="border: solid 2px ${dados.corUser};">
                ${divname.outerHTML}
                <div class="text">${escapeHTML(dados.mensagem)}</div>
            </div>`;
        }
        //Adiciona o elemento de mensagens
        mensagens.style
        mensagens.appendChild(lista);

        mensagens.scrollTop = mensagens.scrollHeight - mensagens.clientHeight;
    }

    atualizarJson();
})