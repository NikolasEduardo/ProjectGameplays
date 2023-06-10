var divVoce = document.getElementById('voce');
divVoce.style.backgroundColor = `${JSON.parse(localStorage.getItem('nomeUsuario'))[3]}`
divVoce.innerHTML = JSON.parse(localStorage.getItem('nomeUsuario'))[2]

// função que recebe um nome de cor e retorna um código RGB
function nomeParaRgb(nome) {
    // cria um elemento div e aplica o nome da cor como estilo
    var div = document.createElement("div");
    div.style.color = nome;
    // adiciona o elemento ao documento para obter o valor computado
    document.body.appendChild(div);
    // obtém o valor computado do estilo de cor
    var cor = window.getComputedStyle(div).color;
    // remove o elemento do documento
    document.body.removeChild(div);
    // retorna o valor RGB da cor
    return cor;
  }

// função que recebe um nome de cor e uma opacidade e retorna um código RGBA
function nomeParaRgba(nome, opacidade) {
    // converte o nome para RGB usando a função nomeParaRgb
    var rgb = nomeParaRgb(nome);
    // extrai os valores numéricos do RGB usando uma expressão regular
    var numeros = rgb.match(/\d+/g);
    // adiciona a opacidade ao final do array de números
    numeros.push(opacidade);
    // retorna o código RGBA juntando os números com vírgulas e parênteses
    return 'rgba(' + numeros.join(',') + ')';
}

// exemplos de uso
console.log(nomeParaRgba("red", 0.5)); // rgba(255,0,0,0.5)
console.log(nomeParaRgba("green", 0.8)); // rgba(0,128,0,0.8)
console.log(nomeParaRgba("rebeccapurple", 0.3)); // rgba(102,51,153,0.3)

document.getElementById('clicar').style.backgroundColor = nomeParaRgba(JSON.parse(localStorage.getItem('nomeUsuario'))[3], 0.5);
document.getElementById('compras').style.backgroundColor = nomeParaRgba(JSON.parse(localStorage.getItem('nomeUsuario'))[3], 0.5);
document.getElementById('lista').style.backgroundColor = nomeParaRgba(JSON.parse(localStorage.getItem('nomeUsuario'))[3], 0.5);
document.getElementById('upgrades').style.backgroundColor = nomeParaRgba(JSON.parse(localStorage.getItem('nomeUsuario'))[3], 0.5);

var nome = JSON.parse(localStorage.getItem('nomeUsuario'))[0];
document.querySelector('h1').innerHTML = `${nome} Clicker`

var quantidadeVoce = 0;
var vocePorClique = 1;
var vocePorSegundo = 0;

var multiplo = 1.05;

var click = 1;
var voce = 10;

function atualizarVoce() {
    document.getElementById('quantia').innerHTML = `${quantidadeVoce} ${nome}'s`;
    document.getElementById('portempo').innerHTML = `${vocePorSegundo} ${nome}'s p/seg`;
}

atualizarVoce();
disponivelAjuda();

function clickEmVoce() {
    divVoce.style.width = '220px';
    divVoce.style.height = '220px';
    divVoce.style.padding = '10px';

    quantidadeVoce += vocePorClique;
    atualizarVoce();
    disponivelAjuda();

    setTimeout(() => {
        divVoce.style.width = '';
        divVoce.style.height = '';
        divVoce.style.padding = '';
    }, 100);
}

function comprar(ajuda) {
    switch (ajuda) {
        case "click":
            quantidadeVoce -= parseFloat(document.getElementById('precoClick').innerHTML);
            document.getElementById('precoClick').innerHTML = Math.round(parseFloat(document.getElementById('precoClick').innerHTML) * multiplo);
            document.getElementById('quantClick').innerHTML = parseInt(document.getElementById('quantClick').innerHTML) + 1;
            break;
        case "voce":
            quantidadeVoce -= parseFloat(document.getElementById('precoVoce').innerHTML);
            document.getElementById('precoVoce').innerHTML = Math.round(parseFloat(document.getElementById('precoVoce').innerHTML) * multiplo);
            document.getElementById('quantVoce').innerHTML = parseInt(document.getElementById('quantVoce').innerHTML) + 1;
            break;
    }
    vocePorSegundo = (parseInt(document.getElementById('quantClick').innerHTML) * click) +
        (parseInt(document.getElementById('quantVoce').innerHTML) * voce);
    atualizarVoce();
    disponivelAjuda()
}

function melhoria(melhoras) {
    switch (melhoras) {
        case "mouse":
            vocePorClique *= 2;
            quantidadeVoce -= parseFloat(document.getElementById('melhorMouse').innerHTML);
            document.getElementById('melhorMouse').innerHTML *= 5
            break;
        case "click":
            click *= 2;
            quantidadeVoce -= parseFloat(document.getElementById('melhorClick').innerHTML);
            document.getElementById('melhorClick').innerHTML *= 2
            break;
        case "voce":
            voce *= 2;
            quantidadeVoce -= parseFloat(document.getElementById('melhorVoce').innerHTML);
            document.getElementById('melhorVoce').innerHTML *= 2
            break;
    }
    vocePorSegundo = (parseInt(document.getElementById('quantClick').innerHTML) * click) +
        (parseInt(document.getElementById('quantVoce').innerHTML) * voce);
    atualizarVoce();
    disponivelAjuda()
}

function disponivelAjuda() {
    document.getElementById('ajudaClick').disabled = true;
    document.getElementById('ajudaVoce').disabled = true;
    document.getElementById('melhoraMouse').disabled = true;
    document.getElementById('melhoraClick').disabled = true;
    document.getElementById('melhoraVoce').disabled = true;
    if (quantidadeVoce >= document.getElementById('precoClick').innerHTML) {
        document.getElementById('ajudaClick').disabled = false;
    }
    if (quantidadeVoce >= document.getElementById('precoVoce').innerHTML) {
        document.getElementById('ajudaVoce').disabled = false;
    }

    if (quantidadeVoce >= document.getElementById('melhorMouse').innerHTML) {
        document.getElementById('melhoraMouse').disabled = false;
    }
    if (quantidadeVoce >= document.getElementById('melhorClick').innerHTML) {
        document.getElementById('melhoraClick').disabled = false;
    }
    if (quantidadeVoce >= document.getElementById('melhorVoce').innerHTML) {
        document.getElementById('melhoraVoce').disabled = false;
    }
}

setInterval(() => {
    quantidadeVoce += vocePorSegundo;
    disponivelAjuda();
    atualizarVoce();
}, 1000);
