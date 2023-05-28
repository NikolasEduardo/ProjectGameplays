var jsonuser = "api/usuarios";
var nome = JSON.parse(localStorage.getItem('nomeUsuario'))[0]
var senha = JSON.parse(localStorage.getItem('nomeUsuario'))[1]
var fotoperfil = JSON.parse(localStorage.getItem('nomeUsuario'))[2]
if (fotoperfil == "null") {
    fotoperfil = "images/user.jpg";
}
var cor = JSON.parse(localStorage.getItem('nomeUsuario'))[3]
var xp = JSON.parse(localStorage.getItem('nomeUsuario'))[4]
level = (`${xp / 1000}`).split(".")[0];
xp = ((xp % 1000) / 10);

document.getElementById('foto').style.backgroundImage = `url(${fotoperfil})`;
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

//Função para reduzir a qualidade da imagem e redimensionar para w:100px h:100px
function reduceImageQuality(base64, quality) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.src = base64;
    return new Promise((resolve, reject) => {
        img.onload = function () {
            //Definir o tamanho do canvas para 100px por 100px
            canvas.width = 100;
            canvas.height = 100;
            //Desenhar a imagem no canvas com a largura e altura originais
            ctx.drawImage(img, 0, 0, 100, 100);
            //Retornar a imagem em base64 com a qualidade reduzida
            resolve(canvas.toDataURL("image/jpeg", quality));
        };
        img.onerror = reject;
    });
}

//Função atualizar imagem
document.getElementById("escolherimg").addEventListener("change", function () {
    const file = this.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", function () {
        reduceImageQuality(reader.result, 1).then(function (result) {
            document.getElementById("foto").style.backgroundImage = `url(${result})`;
            lerImagem(result);
        });
    });
    reader.readAsDataURL(file);
});

function lerImagem(imagem) {
    fotoperfil = imagem;
    console.log(fotoperfil);
}

console.log(fotoperfil);

function deslogar() {
    localStorage.removeItem("nomeUsuario");
    window.location.replace("index.html");
}

function voltar() {
    window.location.replace("index.html");
}