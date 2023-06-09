var jsonuser = "api/usuarios";
var nome = JSON.parse(localStorage.getItem('nomeUsuario'))[0]
var senha = JSON.parse(localStorage.getItem('nomeUsuario'))[1]
var fotoperfil = `
<div id="foto" style='background-color: ${JSON.parse(localStorage.getItem('perfilPersonagem'))[1]}'>
            ${JSON.parse(localStorage.getItem('nomeUsuario'))[2]}
        </div>
`;
var cor = JSON.parse(localStorage.getItem('nomeUsuario'))[3]
var xp = JSON.parse(localStorage.getItem('nomeUsuario'))[4]
level = (`${xp / 1000}`).split(".")[0];
xp = ((xp % 1000) / 10);

document.getElementById('foto').innerHTML = fotoperfil;
document.getElementById('nomeperfil').innerHTML += `${nome}<br>Level ${level}`;
document.getElementById('xp').style.width = `${xp}%`;

function mudarCor() {
    cor = document.getElementById('cores').value
    document.getElementById('foto').style.border = `5px solid ${cor}`;
    document.getElementById('perfiluser').style.border = `5px solid ${cor}`;
    document.getElementById('xp').style.backgroundColor = `${cor}`;
    document.querySelector('button').style.color = `${cor}`
    document.querySelector('button').style.border = `solid 3px ${cor}`
    document.getElementById('sair').style.color = `${cor}`
    document.getElementById('sair').style.border = `solid 3px ${cor}`
    document.getElementById('voltar').style.color = `${cor}`
    document.getElementById('voltar').style.border = `solid 3px ${cor}`
    document.getElementById('cores').style.color = `${cor}`;
    document.getElementById('cores').style.border = `solid 2px ${cor}`;
    document.getElementById('nomeperfil').style.color = `${cor}`;
}

document.getElementById('cores').querySelector(`option[value="${cor}"]`).selected = true;
mudarCor();

function atualizarDados() {
    fetch(`${jsonuser}?nome=${nome}`)
        .then(response => response.json())
        .then(data => {
            console.log(data[0].id);
            idUser = data[0].id;
            fetch(`${jsonuser}/${data[0].id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: nome,
                    senha: senha,
                    fotoperfil: fotoperfil,
                    cor: cor,
                    xp: JSON.parse(localStorage.getItem('nomeUsuario'))[4]
                })
            })
                .then(response => response.json())
        })
    fetch(`${jsonuser}?nome=${nome}`)
        .then(response => response.json())
        .then(data => {
            //inserir um dado local
            localStorage.setItem("nomeUsuario", JSON.stringify([data[0].nome, data[0].senha, data[0].fotoperfil, data[0].cor, data[0].xp]));
            console.log("funcionou");
        })
}

console.log(fotoperfil);

function deslogar() {
    localStorage.removeItem("nomeUsuario");
    window.location.replace("index.html");
}

function voltar() {
    window.location.replace("index.html");
}