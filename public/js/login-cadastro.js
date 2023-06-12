//apagar o storage local
localStorage.removeItem("nomeUsuario");

var jsonuser = "api/usuarios";
var username;
var senhauser;
var confirma;

function preencherForms() {
    username = document.getElementById('username').value;
    senhauser = document.getElementById('senha').value;
    if (document.querySelector('button').innerHTML == "Cadastrar") {
        confirma = document.getElementById('confirmar').value;
    }
    return [username, senhauser];
}

//LOGIN

document.querySelector('form').addEventListener('submit', evento => {
    evento.preventDefault();
    preencherForms();

    if (document.querySelector('button').innerHTML == "Cadastrar") {
        //CADASTRO
        if (senhauser === confirma) {
            fetch(`${jsonuser}?nome=${username}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.length < 1) {
                        console.log("deu certo");
                        if (username.length < 3 ||
                            senhauser.length < 8) {
                            alert("o nome de usuário deve conter pelo menos 3 caracteres, e a senha pelo menos 8 caracteres")
                            //Previne o envio padrão do formulário para não atualizar a página
                        } else {
                            alert("permitido")
                            enviarDados()
                            window.location.replace("index.html");
                        }
                    } else {
                        evento.preventDefault();
                        console.log("não pode");
                    }
                })
        } else {
            alert("As senhas devem estar iguais");
        }
    } else {
        //LOGIN
        fetch(`${jsonuser}?nome=${username}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    if (data[0].senha == senhauser) {
                        //inserir um dado local
                        localStorage.setItem("nomeUsuario", JSON.stringify([data[0].nome, data[0].senha, data[0].fotoperfil, data[0].cor, data[0].xp]));
                        console.log("funcionou");
                        window.location.replace("index.html");
                    } else {
                        alert("Senha Incorreta")
                    }
                } else {
                    alert("Username Inexistente")
                }
            })
    }
})

// var nome = localStorage.getItem("nomeUsuario");

// if (nome != null) {
//     document.getElementById("username").value = nome;
// }

function enviarDados() {
    preencherForms();
    fetch(`${jsonuser}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: username,
            senha: senhauser,
            fotoperfil: "\n<div id=\"foto\" style='background-color: #ffa7a7;'>\n                \n            <div id=\"corpo\" style=\"background-image: url(&quot;images/customizar/Personagens/Cachorro/1.png&quot;); filter: grayscale(0%) hue-rotate(0deg) invert(0%);\"></div>\n            <div id=\"cabelo\" style=\"background-image: url(&quot;&quot;); filter: brightness(100%) grayscale(0%) hue-rotate(0deg) invert(0%);\"></div>\n            <div id=\"chapeu\" style=\"background-image: url(&quot;&quot;); filter: brightness(100%) grayscale(0%) hue-rotate(0deg) invert(0%);\"></div>\n        \n\n               </div>",
            cor: "white",
            xp: 0,
            fundoPersonagem: "#ffa7a7",
            corpoPersona: 0,
            pelagem: 1,
            tipoCabelo: 0,
            coloracaoCabelo: 1,
            tipoChapeu: 0,
            brilhoCabelo: 9,
            brilhoChapeu: 9,
            grayscaleCabelo: 0,
            grayscaleChapeu: 0,
            grayscaleCorpo: 0,
            hueRotateCabelo: 0,
            hueRotateChapeu: 0,
            hueRotateCorpo: 0,
            invertCabelo: 0,
            invertChapeu: 0,
            invertCorpo: 0
        })
    })
        .then(response => response.json())
            //inserir um dado local
            localStorage.setItem("nomeUsuario", JSON.stringify([
                nome: username,
                senha: senhauser,
                fotoperfil: "\n<div id=\"foto\" style='background-color: #ffa7a7;'>\n                \n            <div id=\"corpo\" style=\"background-image: url(&quot;images/customizar/Personagens/Cachorro/1.png&quot;); filter: grayscale(0%) hue-rotate(0deg) invert(0%);\"></div>\n            <div id=\"cabelo\" style=\"background-image: url(&quot;&quot;); filter: brightness(100%) grayscale(0%) hue-rotate(0deg) invert(0%);\"></div>\n            <div id=\"chapeu\" style=\"background-image: url(&quot;&quot;); filter: brightness(100%) grayscale(0%) hue-rotate(0deg) invert(0%);\"></div>\n        \n\n               </div>",
                cor: "white",
                xp: 0,
                fundoPersonagem: "#ffa7a7",
                corpoPersona: 0,
                pelagem: 1,
                tipoCabelo: 0,
                coloracaoCabelo: 1,
                tipoChapeu: 0,
                brilhoCabelo: 9,
                brilhoChapeu: 9,
                grayscaleCabelo: 0,
                grayscaleChapeu: 0,
                grayscaleCorpo: 0,
                hueRotateCabelo: 0,
                hueRotateChapeu: 0,
                hueRotateCorpo: 0,
                invertCabelo: 0,
                invertChapeu: 0,
                invertCorpo: 0
            ]));
            console.log("funcionou");
}
