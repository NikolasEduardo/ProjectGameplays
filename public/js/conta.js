var jsonuser = "api/usuarios";
var nome = JSON.parse(localStorage.getItem('nomeUsuario'))[0]
var senha = JSON.parse(localStorage.getItem('nomeUsuario'))[1]
var fotoperfil = JSON.parse(localStorage.getItem('nomeUsuario'))[2];
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
                    xp: JSON.parse(localStorage.getItem('nomeUsuario'))[4],
                    fundoPersonagem: JSON.parse(localStorage.getItem('nomeUsuario'))[5],
                    corpoPersona: JSON.parse(localStorage.getItem('nomeUsuario'))[6],
                    pelagem: JSON.parse(localStorage.getItem('nomeUsuario'))[7],
                    tipoCabelo: JSON.parse(localStorage.getItem('nomeUsuario'))[8],
                    coloracaoCabelo: JSON.parse(localStorage.getItem('nomeUsuario'))[9],
                    tipoChapeu: JSON.parse(localStorage.getItem('nomeUsuario'))[10],
                    brilhoCabelo: JSON.parse(localStorage.getItem('nomeUsuario'))[11],
                    brilhoChapeu: JSON.parse(localStorage.getItem('nomeUsuario'))[12],
                    grayscaleCabelo: JSON.parse(localStorage.getItem('nomeUsuario'))[13],
                    grayscaleChapeu: JSON.parse(localStorage.getItem('nomeUsuario'))[14],
                    grayscaleCorpo: JSON.parse(localStorage.getItem('nomeUsuario'))[15],
                    hueRotateCabelo: JSON.parse(localStorage.getItem('nomeUsuario'))[16],
                    hueRotateChapeu: JSON.parse(localStorage.getItem('nomeUsuario'))[17],
                    hueRotateCorpo: JSON.parse(localStorage.getItem('nomeUsuario'))[18],
                    invertCabelo: JSON.parse(localStorage.getItem('nomeUsuario'))[19],
                    invertChapeu: JSON.parse(localStorage.getItem('nomeUsuario'))[20],
                    invertCorpo: JSON.parse(localStorage.getItem('nomeUsuario'))[21]
                })
            })
                .then(response => response.json())
        })
    setTimeout(function () {
        fetch(`${jsonuser}?nome=${nome}`)
            .then(response => response.json())
            .then(data => {
                //inserir um dado local
                localStorage.setItem("nomeUsuario", JSON.stringify([
                    data[0].nome,
                    data[0].senha,
                    data[0].fotoperfil,
                    data[0].cor,
                    data[0].xp,
                    data[0].fundoPersonagem,
                    data[0].corpoPersona,
                    data[0].pelagem,
                    data[0].tipoCabelo,
                    data[0].coloracaoCabelo,
                    data[0].tipoChapeu,
                    data[0].brilhoCabelo,
                    data[0].brilhoChapeu,
                    data[0].grayscaleCabelo,
                    data[0].grayscaleChapeu,
                    data[0].grayscaleCorpo,
                    data[0].hueRotateCabelo,
                    data[0].hueRotateChapeu,
                    data[0].hueRotateCorpo,
                    data[0].invertCabelo,
                    data[0].invertChapeu,
                    data[0].invertCorpo
                ]));
                console.log("funcionou");
            })
    }, 1000)
}

console.log(fotoperfil);

function deslogar() {
    localStorage.removeItem("nomeUsuario");
    localStorage.removeItem("perfilPersonagem");
    window.location.replace("index.html");
}

function voltar() {
    window.location.replace("index.html");
}