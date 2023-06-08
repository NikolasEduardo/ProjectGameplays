fundoPersonagem = "#ffa7a7";
document.getElementById('corFundo').value = fundoPersonagem;

custPersona = document.getElementById('corpo');
personagens = ["Cachorro", "Gato", "Coelho"];
corpoPersona = 0;
pelagem = 1;

custCabelo = document.getElementById('cabelo');
tipoCabelo = 0;
coloracaoCabelo = 1;

custChapeu = document.getElementById('chapeu');
chapeus = ['Nenhum', 'Chapéu', 'Boné',
    'Cartola', 'Astronauta', 'Deku Dark'];
tipoChapeu = 0;
//---------------------------------------------
brilho = ['10%', '20%', '30%', '40%', '50%',
    '60%', '70%', '80%', '90%', '100%'];

brilhoCabelo = 9;
brilhoChapeu = 9;
//---------------------------------------------
grayscale = ['0%', '10%', '20%', '30%', '40%', '50%',
    '60%', '70%', '80%', '90%', '100%'];

grayscaleCabelo = 0;
grayscaleChapeu = 0;
grayscaleCorpo = 0;
//---------------------------------------------
hueRotate = ['0deg', '30deg', '60deg', '120deg',
    '180deg', '210deg', '240deg', '270deg',
    '300deg', '330deg'];

hueRotateCabelo = 0;
hueRotateChapeu = 0;
hueRotateCorpo = 0;
//---------------------------------------------
invert = ['0%', '20%', '40%',
    '60%', '80%', '100%'];
invertCabelo = 0;
invertChapeu = 0;
invertCorpo = 0;
//---------------------------------------------


function trocarPersona(valor) {
    switch (valor) {
        case "proxPersonagem":
            corpoPersona++;
            if (corpoPersona == 3) {
                corpoPersona = 0;
            }
            break;
        case "antePersonagem":
            corpoPersona--;
            if (corpoPersona == -1) {
                corpoPersona = 2;
            }
            break;
        case "proxPelagem":
            pelagem++;
            if (pelagem == 6) {
                pelagem = 1;
            }
            break;
        case "antePelagem":
            pelagem--;
            if (pelagem == 0) {
                pelagem = 5;
            }
            break;
    }
    console.log(`corpo: ${personagens[corpoPersona]} cor: ${pelagem}`);
    custPersona.style.backgroundImage = `url(images/customizar/Personagens/${personagens[corpoPersona]}/${pelagem}.png)`
    document.getElementById('personagens').innerHTML = personagens[corpoPersona];
    document.getElementById('pelagem').innerHTML = `Pelagem ${pelagem}`;
}

function trocarCabelo(valor) {
    switch (valor) {
        case "proxTipo":
            tipoCabelo++;
            if (tipoCabelo == 11) {
                tipoCabelo = 0;
            }
            break;
        case "anteTipo":
            tipoCabelo--;
            if (tipoCabelo == -1) {
                tipoCabelo = 10;
            }
            break;
        case "proxColor":
            coloracaoCabelo++;
            if (coloracaoCabelo == 5) {
                coloracaoCabelo = 1;
            }
            break;
        case "anteColor":
            coloracaoCabelo--;
            if (coloracaoCabelo == 0) {
                coloracaoCabelo = 4;
            }
            break;
    }
    console.log(`cabelo: ${tipoCabelo} cor: ${coloracaoCabelo}`);
    if (tipoCabelo != 0) {
        custCabelo.style.backgroundImage = `url(images/customizar/Cabelos/Cabelo${tipoCabelo}/${coloracaoCabelo}.png)`;
        document.getElementById('tipo').innerHTML = `Estilo ${tipoCabelo}`;
    } else {
        custCabelo.style.backgroundImage = `url()`;
        document.getElementById('tipo').innerHTML = `Sem Cabelo`;
    }
    document.getElementById('color').innerHTML = `Coloração ${coloracaoCabelo}`;
}

function trocarChapeu(valor) {
    switch (valor) {
        case "prox":
            tipoChapeu++;
            if (tipoChapeu == 6) {
                tipoChapeu = 0;
            }
            break;
        case "ante":
            tipoChapeu--;
            if (tipoChapeu == -1) {
                tipoChapeu = 5;
            }
            break;
    }
    console.log(`chapéu: ${tipoChapeu}`);
    if (tipoChapeu != 0) {
        custChapeu.style.backgroundImage = `url(images/customizar/Chapéus/${tipoChapeu}.png)`;
    } else {
        custChapeu.style.backgroundImage = `url()`;
    }
    document.getElementById('chapeus').innerHTML = chapeus[tipoChapeu];
}

trocarPersona();
trocarCabelo();
trocarChapeu();

function trocarEstilo(valor, estilo, alterar) {
    switch (estilo) {
        case "luminosidade":
            switch (alterar) {
                case "cabelo":
                    if (valor == "prox") {
                        brilhoCabelo++;
                        if (brilhoCabelo == 10) {
                            brilhoCabelo = 0
                        }
                    } else {
                        brilhoCabelo--;
                        if (brilhoCabelo == -1) {
                            brilhoCabelo = 9
                        }
                    }
                    break;
                case "chapeu":
                    if (valor == "prox") {
                        brilhoChapeu++;
                        if (brilhoChapeu == 10) {
                            brilhoChapeu = 0
                        }
                    } else {
                        brilhoChapeu--;
                        if (brilhoChapeu == -1) {
                            brilhoChapeu = 9
                        }
                    }
                    break;
            }
            break;
        case "escalacinza":
            switch (alterar) {
                case "corpo":
                    if (valor == "prox") {
                        grayscaleCorpo++;
                        if (grayscaleCorpo == 11) {
                            grayscaleCorpo = 0;
                        }
                    } else {
                        grayscaleCorpo--;
                        if (grayscaleCorpo == -1) {
                            grayscaleCorpo = 10;
                        }
                    }
                    break;
                case "cabelo":
                    if (valor == "prox") {
                        grayscaleCabelo++;
                        if (grayscaleCabelo == 11) {
                            grayscaleCabelo = 0;
                        }
                    } else {
                        grayscaleCabelo--;
                        if (grayscaleCabelo == -1) {
                            grayscaleCabelo = 10;
                        }
                    }
                    break;
                case "chapeu":
                    if (valor == "prox") {
                        grayscaleChapeu++;
                        if (grayscaleChapeu == 11) {
                            grayscaleChapeu = 0;
                        }
                    } else {
                        grayscaleChapeu--;
                        if (grayscaleChapeu == -1) {
                            grayscaleChapeu = 10;
                        }
                    }
                    break;
            }
            break;
        case "cor":
            switch (alterar) {
                case "corpo":
                    if (valor == "prox") {
                        hueRotateCorpo++;
                        if (hueRotateCorpo == 10) {
                            hueRotateCorpo = 0;
                        }
                    } else {
                        hueRotateCorpo--;
                        if (hueRotateCorpo == -1) {
                            hueRotateCorpo = 9;
                        }
                    }
                    break;
                case "cabelo":
                    if (valor == "prox") {
                        hueRotateCabelo++;
                        if (hueRotateCabelo == 10) {
                            hueRotateCabelo = 0;
                        }
                    } else {
                        hueRotateCabelo--;
                        if (hueRotateCabelo == -1) {
                            hueRotateCabelo = 9;
                        }
                    }
                    break;
                case "chapeu":
                    if (valor == "prox") {
                        hueRotateChapeu++;
                        if (hueRotateChapeu == 10) {
                            hueRotateChapeu = 0;
                        }
                    } else {
                        hueRotateChapeu--;
                        if (hueRotateChapeu == -1) {
                            hueRotateChapeu = 9;
                        }
                    }
                    break;
            }
            break;
        case "inverter":
            switch (alterar) {
                case "corpo":
                    if (valor == "prox") {
                        invertCorpo++;
                        if (invertCorpo == 6) {
                            invertCorpo = 0;
                        }
                    } else {
                        invertCorpo--;
                        if (invertCorpo == -1) {
                            invertCorpo = 5;
                        }
                    }
                    break;
                case "cabelo":
                    if (valor == "prox") {
                        invertCabelo++;
                        if (invertCabelo == 6) {
                            invertCabelo = 0;
                        }
                    } else {
                        invertCabelo--;
                        if (invertCabelo == -1) {
                            invertCabelo = 5;
                        }
                    }
                    break;
                case "chapeu":
                    if (valor == "prox") {
                        invertChapeu++;
                        if (invertChapeu == 6) {
                            invertChapeu = 0;
                        }
                    } else {
                        invertChapeu--;
                        if (invertChapeu == -1) {
                            invertChapeu = 5;
                        }
                    }
                    break;
            }
            break;
    }
    custPersona.style.filter = `
    grayscale(${grayscale[grayscaleCorpo]})
    hue-rotate(${hueRotate[hueRotateCorpo]})
    invert(${invert[invertCorpo]})`

    custCabelo.style.filter = `
    brightness(${brilho[brilhoCabelo]})
    grayscale(${grayscale[grayscaleCabelo]})
    hue-rotate(${hueRotate[hueRotateCabelo]})
    invert(${invert[invertCabelo]})`

    custChapeu.style.filter = `
    brightness(${brilho[brilhoChapeu]})
    grayscale(${grayscale[grayscaleChapeu]})
    hue-rotate(${hueRotate[hueRotateChapeu]})
    invert(${invert[invertChapeu]})`

    document.getElementById('lumi2').innerHTML = `Luminosidade(${brilho[brilhoCabelo]})`;
    document.getElementById('lumi3').innerHTML = `Luminosidade(${brilho[brilhoChapeu]})`;

    document.getElementById('cinza1').innerHTML = `Escala Cinza(${grayscale[grayscaleCorpo]})`;
    document.getElementById('cinza2').innerHTML = `Escala Cinza(${grayscale[grayscaleCabelo]})`;
    document.getElementById('cinza3').innerHTML = `Escala Cinza(${grayscale[grayscaleChapeu]})`;

    document.getElementById('cor1').innerHTML = `Cor(${hueRotate[hueRotateCorpo]})`;
    document.getElementById('cor2').innerHTML = `Cor(${hueRotate[hueRotateCabelo]})`;
    document.getElementById('cor3').innerHTML = `Cor(${hueRotate[hueRotateChapeu]})`;

    document.getElementById('invert1').innerHTML = `Inverter(${invert[invertCorpo]})`;
    document.getElementById('invert2').innerHTML = `Inverter(${invert[invertCabelo]})`;
    document.getElementById('invert3').innerHTML = `Inverter(${invert[invertChapeu]})`;
}

trocarEstilo();

function mudarFundo() {
    fundoPersonagem = document.getElementById('corFundo').value;

    document.getElementById('personagem').style.backgroundColor =
        fundoPersonagem;
}

mudarFundo();