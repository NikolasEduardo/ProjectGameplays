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
                            localStorage.setItem("nomeUsuario", JSON.stringify([username, senhauser, "images/user.jpg", "white", 0]));
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
            fotoperfil: "null",
            cor: "white",
            xp: 0
        })
    })
        .then(response => response.json())
}
