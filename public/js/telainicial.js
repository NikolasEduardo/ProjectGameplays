conta = document.getElementById("conta");

var nome = JSON.parse(localStorage.getItem('nomeUsuario'))[0]
var imagem = JSON.parse(localStorage.getItem('nomeUsuario'))[2]
if (imagem == "null") {
    imagem = "images/user.jpg";
}
var cor = JSON.parse(localStorage.getItem('nomeUsuario'))[3]
var xp = JSON.parse(localStorage.getItem('nomeUsuario'))[4]
level = (`${xp/1000}`).split(".")[0];
xp = ((xp%1000)/10);

if (localStorage.getItem('nomeUsuario') != null) {
    conta.innerHTML = `<a href="conta.html">
    <div id="perfiluser" style="border: 5px solid ${cor};">
        <img src="${imagem}" id="foto">
        <div>
            <div id="nomeperfil">${nome}<br>Level ${level}:</div>
            <div id="level">
                <div id="xp" style="background-color: ${cor}; width: ${xp}%;"></div>
            </div>
        </div>
    </div>
</a>`
} else {
    console.log("não tem login");
}