conta = document.getElementById("conta");
var jsonuser = "api/usuarios";
var nome = JSON.parse(localStorage.getItem('nomeUsuario'))[0]
var senha = JSON.parse(localStorage.getItem('nomeUsuario'))[1]
var imagem = JSON.parse(localStorage.getItem('perfilPersonagem'))[0]
var cor = JSON.parse(localStorage.getItem('nomeUsuario'))[3]
var xp = JSON.parse(localStorage.getItem('nomeUsuario'))[4]
level = (`${xp / 1000}`).split(".")[0];
xp = ((xp % 1000) / 10);

if (localStorage.getItem('nomeUsuario') != null) {
    conta.innerHTML = `
    <a href="conta.html">
        <div id="perfiluser" style="border: 5px solid ${cor};">
            <div id="foto">
                ${imagem}
            </div>
                <div>
                    <div>
                         <div id="nomeperfil">${nome}<br>Level ${level}:</div>
                        <div id="level">
                            <div id="xp" style="background-color: ${cor}; width: ${xp}%;"></div>
                        </div>
                    </div>
                </div>
        </div>
    </a>
    `
    try {
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
                        fotoperfil: imagem,
                        cor: cor,
                        xp: JSON.parse(localStorage.getItem('nomeUsuario'))[4],
                        fundoPersonagem: JSON.parse(localStorage.getItem('perfilPersonagem'))[1],
                        corpoPersona: JSON.parse(localStorage.getItem('perfilPersonagem'))[2],
                        pelagem: JSON.parse(localStorage.getItem('perfilPersonagem'))[3],
                        tipoCabelo: JSON.parse(localStorage.getItem('perfilPersonagem'))[4],
                        coloracaoCabelo: JSON.parse(localStorage.getItem('perfilPersonagem'))[5],
                        tipoChapeu: JSON.parse(localStorage.getItem('perfilPersonagem'))[6],
                        brilhoCabelo: JSON.parse(localStorage.getItem('perfilPersonagem'))[7],
                        brilhoChapeu: JSON.parse(localStorage.getItem('perfilPersonagem'))[8],
                        grayscaleCabelo: JSON.parse(localStorage.getItem('perfilPersonagem'))[9],
                        grayscaleChapeu: JSON.parse(localStorage.getItem('perfilPersonagem'))[10],
                        grayscaleCorpo: JSON.parse(localStorage.getItem('perfilPersonagem'))[11],
                        hueRotateCabelo: JSON.parse(localStorage.getItem('perfilPersonagem'))[12],
                        hueRotateChapeu: JSON.parse(localStorage.getItem('perfilPersonagem'))[13],
                        hueRotateCorpo: JSON.parse(localStorage.getItem('perfilPersonagem'))[14],
                        invertCabelo: JSON.parse(localStorage.getItem('perfilPersonagem'))[15],
                        invertChapeu: JSON.parse(localStorage.getItem('perfilPersonagem'))[16],
                        invertCorpo: JSON.parse(localStorage.getItem('perfilPersonagem'))[17]
                    })
                })
                    .then(response => response.json())
            })
    }catch (error) {
        console.log('sem dados ainda');
        fetch(`${jsonuser}`)
            .then(response => response.json())
            .then(data => {
                console.log(data[0].id);
                idUser = data[0].id;
                fetch(`${jsonuser}/${data[0].id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        nome: nome,
                        senha: senha,
                        fotoperfil: imagem,
                        cor: cor,
                        xp: JSON.parse(localStorage.getItem('nomeUsuario'))[4],
                        fundoPersonagem: JSON.parse(localStorage.getItem('perfilPersonagem'))[1],
                        corpoPersona: JSON.parse(localStorage.getItem('perfilPersonagem'))[2],
                        pelagem: JSON.parse(localStorage.getItem('perfilPersonagem'))[3],
                        tipoCabelo: JSON.parse(localStorage.getItem('perfilPersonagem'))[4],
                        coloracaoCabelo: JSON.parse(localStorage.getItem('perfilPersonagem'))[5],
                        tipoChapeu: JSON.parse(localStorage.getItem('perfilPersonagem'))[6],
                        brilhoCabelo: JSON.parse(localStorage.getItem('perfilPersonagem'))[7],
                        brilhoChapeu: JSON.parse(localStorage.getItem('perfilPersonagem'))[8],
                        grayscaleCabelo: JSON.parse(localStorage.getItem('perfilPersonagem'))[9],
                        grayscaleChapeu: JSON.parse(localStorage.getItem('perfilPersonagem'))[10],
                        grayscaleCorpo: JSON.parse(localStorage.getItem('perfilPersonagem'))[11],
                        hueRotateCabelo: JSON.parse(localStorage.getItem('perfilPersonagem'))[12],
                        hueRotateChapeu: JSON.parse(localStorage.getItem('perfilPersonagem'))[13],
                        hueRotateCorpo: JSON.parse(localStorage.getItem('perfilPersonagem'))[14],
                        invertCabelo: JSON.parse(localStorage.getItem('perfilPersonagem'))[15],
                        invertChapeu: JSON.parse(localStorage.getItem('perfilPersonagem'))[16],
                        invertCorpo: JSON.parse(localStorage.getItem('perfilPersonagem'))[17]
                    })
                })
                    .then(response => response.json())
            })
    }
    
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
} else {
    console.log("não tem login");
}
