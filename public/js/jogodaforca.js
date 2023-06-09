try {
    var nome = JSON.parse(localStorage.getItem('nomeUsuario'))[0]
    var fotoperfil = JSON.parse(localStorage.getItem('nomeUsuario'))[2]
    if (fotoperfil == "null") {
        fotoperfil = "images/user.jpg";
    }
    var cor = JSON.parse(localStorage.getItem('nomeUsuario'))[3]
} catch (error) {
    alert('Esse jogo oferece ganho de XP, recomendo que conecte-se em uma Conta')
}

//Matriz com a palavra e o tema
var sPerguntas = [
    ["CARAMBOLA", "FRUTA"],
    ["JABOTICABA", "FRUTA"],
    ["JAMBO", "FRUTA"],
    ["CUPUAÇU", "FRUTA"],
    ["PITOMBA", "FRUTA"],
    ["FORTALEZA", "CIDADE"],
    ["TERESÓPOLIS", "CIDADE"],
    ["HOLAMBRA", "CIDADE"],
    ["HORTOLÂNDIA", "CIDADE"],
    ["CARAPICUIBA", "CIDADE"],
    ["ALICATE", "FERRAMENTA"],
    ["MARTELO", "FERRAMENTA"],
    ["SERRA TICO-TICO", "FERRAMENTA"],
    ["FORMÃO", "FERRAMENTA"],
    ["ALMOFADA", "OBJETO"],
    ["CHAVE DE FENDA", "FERRAMENTA"],
    ["JORNAL", "OBJETO"],
    ["BOLSA", "OBJETO"],
    ["PALITO DE DENTE", "OBJETO"],
    ["CHURRASQUEIRA", "OBJETO"],
    ["STROGONOFF", "COMIDA"],
    ["LASANHA", "COMIDA"],
    ["MACARRONADA", "COMIDA"],
    ["FRANGO XADREZ", "COMIDA"],
    ["CANELONE", "COMIDA"],
    ["AEROWILLYS", "CARRO"],
    ["SANTANA", "CARRO"],
    ["VARIANT", "CARRO"],
    ["RENEGATE", "CARRO"],
    ["VIRTUS", "CARRO"],
    ["ROSA", "FLOR"],
    ["GERBERA", "FLOR"],
    ["CALANCHUE", "FLOR"],
    ["ORQUÍDEA", "FLOR"],
    ["LIRIO", "FLOR"],
    ["VIOLÃO", "INSTRUMENTO MUSICAL"],
    ["SAXOFONE", "INSTRUMENTO MUSICAL"],
    ["UKULELE", "INSTRUMENTO MUSICAL"],
    ["ESCALETA", "INSTRUMENTO MUSICAL"],
    ["TROMBONE", "INSTRUMENTO MUSICAL"],
    ["ADAM SANDLER", "ATOR"],
    ["WILL SMITH", "ATOR"],
    ["JOHNNY DEPP", "ATOR"],
    ["BRAD PITT", "ATOR"],
    ["DWAYNE JOHNSON", "ATOR"],
    ["JULIA ROBERTS", "ATRIZ"],
    ["MERYL STREEP", "ATRIZ"],
    ["BRIE LARSON", "ATRIZ"],
    ["SCARLETT JOHANSSON", "ATRIZ"],
    ["ZOE SALDANA", "ATRIZ"],
    ["PATO DONALD", "PERSONAGEM"],
    ["HOMEM DE FERRO", "PERSONAGEM"],
    ["CAPITÃO AMÉRICA", "PERSONAGEM"],
    ["CORINGA", "PERSONAGEM"],
    ["AQUAMAN", "PERSONAGEM"],
    ["SPACE INVADERS", "JOGOS"],
    ["PAC-MAN", "JOGOS"],
    ["HALF-LIFE", "JOGOS"],
    ["CALL OF DUTY", "JOGOS"],
    ["MINECRAFT", "JOGOS"]
];
//Matriz para fazer o shuffle
var iSorteados = [];
//Conta a quantidade de jogadas feitas para buscar no vetor de Sorteados
var iJogada = 0;
//Armazena a palavra de vez
var sPalavraSorteada;
//Conta as letras certas
var iAcertos = 0;
//Conta as letras erradas
var iErro = 0;
//Guarda a letra clicada para poder desabilitá-la
var cLetraClicada = "";
//Vetor com as letras do teclado para facilitar a busca do ID
var sLetras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
    'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '-'];
//Variaveis que contam os acertos e erros
var iCertas = 0, iErradas = 0;
//***************************************************************************/
//Função para criar os espaços das letras
function criaLetras(sPalavra) {
    //Busca o formulario
    var formula = document.getElementById("tenta");
    var j = 0;
    console.log('PALAVRA: ' + sPalavra);
    //for do tamanho da palavra
    for (var i = 0; i < sPalavra.length; i++) {
        if (sPalavra[i].charCodeAt(0) != 32) {
            //Cria um INPUT
            var letra = document.createElement('input');
            //Define os atributos para o INPUT
            //Tipo
            letra.setAttribute("type", "text");
            //Name
            letra.setAttribute("name", "tenta" + j);
            //id
            letra.setAttribute("id", "tenta" + j);
            //Tamanho máximo
            letra.setAttribute("maxlength", 1);
            //Tamanho de exibição
            letra.setAttribute("size", 1);
            //Desabilita a edição
            letra.setAttribute("disabled", true);
            //Adicionar Classe
            letra.setAttribute("class", "tentativa");
            //Adiciona o INPUT no FORMULARIO
            formula.appendChild(letra);
            j++;
        } else {
            //Quando for espaço, ele separa 20px a esquerda
            //e 1px a direita do input anterior
            document.getElementById("tenta" + (j - 1)).style.margin = "0px 20px 0px 1px";
        }
    }
    //Remove todos os espaços e acentos
    sPalavraSorteada = limpa(sPalavra);
    //Exibe o tema e a quantidade de letras
    document.getElementById('tema').innerHTML = sPerguntas[iSorteados[iJogada]][1] +
        " - " + sPalavraSorteada.length + " letras";
}
//****************************************************************************/
document.addEventListener('keydown', function (event) {
    for (let x = 0; x < sLetras.length; x++) {
        if (event.key == sLetras[x].toLowerCase()) {
            if (!(document.getElementById(sLetras[x]).disabled || event.key == "-")) {
                console.log("clicou a tecla " + event.key);
                Confere(sLetras[x])
                acabou()
            }
        }
    }
    if (event.key == "-") {
        if (!document.getElementById("-").disabled) {
            console.log("clicou a tecla " + event.key);
            Confere("-")
            acabou()
        }
    }
});
document.addEventListener('keyup', function (event) {
    for (let x = 0; x < sLetras.length; x++) {
        if (event.key == sLetras[x].toLowerCase()) {
            acabou()
        }
    }
    if (event.key == "-") {
        acabou()
    }
});
//****************************************************************************/
//Função que confere a letra clicada
function sorteia() {
    //Insere os números dentro do vetor conforme a quantidade de itens da matriz
    for (var m = 1; m < sPerguntas.length; m++) {
        iSorteados.push(m);
    }
    console.log(iSorteados);
    console.log(iJogada);
    //Faz a mistura
    iSorteados = shuffleArray(iSorteados);
    //Chama a função que separa as letras das palavras
    criaLetras(sPerguntas[iSorteados[iJogada]][0]);
}
//*****************************************************************************/
//Função que confere a letra clicada
function Confere(cLetra) {
    //Atribui a letra a uma variavel global
    cLetraClicada = cLetra;
    //Cria variavel que definirá se a letra foi encontrada na palavra
    var lAchou = false;
    //Percorre as letras da palavra sorteada
    for (var i = 0; i < sPalavraSorteada.length; i++) {
        //Se a letra clicada, existir na palavra
        if (cLetra == sPalavraSorteada.charAt(i)) {
            //Insere a exibição da letra
            document.getElementById("tenta" + i).value = cLetra;
            //Conta Acertos
            iAcertos++;
            //Exibe Acertos
            document.getElementById('acerto').innerHTML = "ACERTOS: " + iAcertos;
            //Indica que achou a letra na palavra
            lAchou = true;
        }
    }
    //Se não achou a letra
    if (lAchou == false) {
        //Conta o erro
        iErro++;
        //Insere a imagem conforme a quantidade de erro
        document.getElementById('imagem').src = "images/forca" + (iErro + 1) + ".png";
    }
}
//*****************************************************************************/
//Função que verifica se o jogo acabou
function acabou() {
    //Cria variavel que indicarpa se o jogo acabou
    var lAcabou = false;
    //Se a quantidade de acertos for igual ao tamanho da palavra
    if (iAcertos == sPalavraSorteada.length) {
        //O jogo acabou
        lAcabou = true;
        //Exibe a mensagem
        alert("PARABENS! TU GANHO KASKDJAWIOFJAWODJFOIAW");
        if (localStorage.getItem('nomeUsuario') != null) {
            //Incrementar XP
            fetch(`api/usuarios?nome=${nome}`)
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
                            nome: nome,
                            senha: JSON.parse(localStorage.getItem('nomeUsuario'))[1],
                            fotoperfil: fotoperfil,
                            cor: cor,
                            xp: JSON.parse(localStorage.getItem('nomeUsuario'))[4] + 50
                        })
                    })
                        .then(response => response.json())
                })
            atualizarJson();
        }
        iCertas++;
        //Se a quantidade de letras erradas chegou a 6
    } else if (iErro == 6) {
        //O jogo acabou
        lAcabou = true;
        //Exibe a mensagem
        alert("morreu KKKKKKK");
        iErradas++;
    }
    //Desabilita a letra clicada
    document.getElementById(cLetraClicada).disabled = true;
    //Se o Jogo Acabou
    if (lAcabou) {
        //Remove todos os INPUTS
        for (var i = 0; i < sPalavraSorteada.length; i++) {
            document.getElementById(`tenta${i}`).remove();
        }
        //Incrementa Jogadas para ir para a próxima palavra
        iJogada++;
        //Exibe quantidade de palavras jogadas CERTAS e ERRADAS
        document.getElementById('palcerta').innerHTML =
            "PALAVRAS CERTAS: " + iCertas + "<br>PALAVRAS ERRADAS: " + iErradas;
        //Chama função que criará novo jogo
        criaLetras(sPerguntas[iSorteados[iJogada]][0]);
        //Inicializa variáveis
        iAcertos = 0;
        iErro = 0;
        document.getElementById('acerto').innerHTML = "ACERTOS: " + iAcertos
        //Volta imagem da forca
        document.getElementById('imagem').src = "images/forca" + (iErro + 1) + ".png";
        //Habilita todas as letras
        for (var i = 0; i < sLetras.length; i++) {
            document.getElementById(sLetras[i]).disabled = false;
        }
    }
}
//******************************************************************************/
//Função que mistura os valores do Array
function shuffleArray(d) {
    for (var c = d.length - 1; c > 0; c--) {
        var b = Math.floor(Math.random() * (c + 1));
        var a = d[c];
        d[c] = d[b];
        d[b] = a;
    }
    return d;
}
//******************************************************************************/
//Função para tirar espaços e acentos
function limpa(sItem) {
    var sResultado = sItem;
    //Retira todos os espaços
    sResultado = sResultado.replaceAll(" ", "")  //(sResultado, " ", "");
    //Retira todos os acentos e cedilhas
    //O método normalize do Javascript, serve para converter uma string
    //em seu formato Unicode normalizado. Neste caso utilizamos o parametro
    //NFD que é capaz de separar os acentos das letras e retornar seus
    //códigos Unicode.
    //Em seguida o método replace substitui todas as ocorrências de
    //caracteres diacríticos, combinando-os na sequencia Unicode \u0300 - \u036F.
    //VEJA: https://metring.com.br/javascript-substituir-caracteres-especiais
    sResultado = sResultado.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    return sResultado;
}
//******************************************************************************/
function shake(e, oncomplete, distance, time) {
    var time = 500;
    var distance = 5;

    var start = (new Date()).getTime();
    animate();

    function animate() {
        var now = (new Date()).getTime();
        //Pega a hora atual
        var elapsed = now - start;
        //Quanto tempo desde que começou
        var fraction = elapsed / time;
        //What fraction of total time?
        if (fraction < 1) {
            var x = distance * Math.sin(fraction * 4 * Math.PI);
            e.style.left = x + "px";
            //We're aiming for a smooth 40 frames/second animation.
            setTimeout(animate, Math.min(25, time - elapsed));
        } else {
            //Otherwise, the animation is complete
            if (oncomplete) oncomplete(e);
            //invoke completion callback
        }
    }
}

function shakeme(event1) {
    shake(event1.target);
}

function atualizarJson() {
    setTimeout(function () {
        fetch(`api/usuarios?nome=${nome}`)
            .then(response => response.json())
            .then(data => {
                //inserir um dado local
                localStorage.setItem("nomeUsuario", JSON.stringify([data[0].nome, data[0].senha, data[0].fotoperfil, data[0].cor, data[0].xp]));
                console.log("funcionou");
            })
    }, 1000)
}