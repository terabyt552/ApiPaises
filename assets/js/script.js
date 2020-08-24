const paragrafo = document.querySelector('#p');
const buttonPesquisar = document.querySelector('#buttonPesquisar')
var inputPrincipal = document.querySelector('#inputPrincipal');
const navMenuPrincipal = document.querySelector('#navMenuPrincipal');
const navbar = document.querySelector('.navbar i');
const campoVazio = document.querySelector('.vazio');
const Letreiro = document.querySelector('#textoMovel');
const logo = document.querySelector('#logoGlobo');
const caixaMenssagem = document.querySelector('.caixaMenssagem');
const pCaixaMenssagem = document.querySelector('.pCaixaMenssagem');
const imgBandeira = document.querySelector('#imgBandeira');
const main = document.querySelector("main");
const sectionEntrada = document.querySelector('#sectionEntrada');
const Referencias = document.querySelector('#Referencias');

const paragrafoNome = document.querySelector('#name');
const paragrafoLingFalada = document.querySelector('#lingFalada');
const paragrafoRegiao = document.querySelector('#regiao');
const paragrafoCapital = document.querySelector('#capital');
const paragrafoPopulaçao = document.querySelector('#populaçao');
const paragrafoTerritorio = document.querySelector('#territorio');
const paragrafoFronteiras = document.querySelector('#fronteiras');
const paragrafoSimbolo = document.querySelector('#simbolo');
const paragrafoCodigo = document.querySelector('#codigo');
const paragrafoNomeMoeda = document.querySelector('#nameMoeda');
const paragrafoGini = document.querySelector('#gini');
const paragrafoFuso = document.querySelector('#fuso');
const paragrafoBloco = document.querySelector('#blocos');


var nome;
var codeAlpha;
var nomePais = 0;



inputPrincipal.value = localStorage.getItem('ultimaPesquisa');

var opçoes = {
    method: 'GET',
    mode: 'cors',
    cache: 'default'
}

function RespostaAPI() {
    composiçaoLinkAcesso = "https://restcountries.eu/rest/v2/name/" + nomePais;

    fetch(composiçaoLinkAcesso, opçoes)
    .then(Response => {Response.json()
    .then(data => {implementandoRespostaAPI(data)
    })
    .catch(error => {`requisiçao em json negada:${error}`})
    }).catch(error => {"requisiçao negada" + error})
    }



    function implementandoRespostaAPI(Informaçoes) {

        informaçoesPrincipais = Informaçoes[0]

        for(var campo in informaçoesPrincipais) {

           switch (campo) {

               case 'name':
                nome = informaçoesPrincipais[campo]
                retornoFrasesMenssagem(2)
                break;

                case 'region':
                var regiao = informaçoesPrincipais[campo]
                break;

                case 'population':
                var populaçao = informaçoesPrincipais[campo]
                break;

                case 'capital':
                var capital = informaçoesPrincipais[campo]
                break;

                case 'area':
                var territorio = informaçoesPrincipais[campo]
                break;

                case 'languages':
                var lingua = informaçoesPrincipais[campo]
                lingua = lingua[0];
                for(var linguagem in lingua) {
                    switch (linguagem) {
                        case 'name':
                           var LinguaFalada = lingua[linguagem];
                            break;
                    }
                }
                break;

                case 'alpha3Code' :
                    codeAlpha = informaçoesPrincipais[campo];

                break;

                case 'flag' :
                   var linkImgBandeira = informaçoesPrincipais[campo];

                break;

                case 'borders':
                    let bordas = informaçoesPrincipais[campo];

                     var resultadoBordas = "";
                    for(let x in bordas) {
                    resultadoBordas += bordas[x] + ", "
                    }
                break;

                case 'currencies': 
                    let moeda = informaçoesPrincipais[campo];
                    moeda = moeda[0];

                    var codigoMoeda = "";
                    var nomeMoeda = "";
                    var simboloMoeda = "";
                   
                for (let x in moeda) {
                  
                    switch (x) {

                       case 'code':
                           codigoMoeda = moeda[x];
                        break;
                   
                        case 'name':
                           nomeMoeda = moeda[x];
                        break;

                        case 'symbol':
                            simboloMoeda = moeda[x];
                        break;

                   }  

                }  
                break;

                case 'gini':
                var gini = informaçoesPrincipais[campo];
                break;

                case 'timezones':
                let fusoArray = informaçoesPrincipais[campo];

                var fuso ="";
                for(let x in fusoArray) {
                    fuso += fusoArray[x] + ", "
                }
                break;

                case 'regionalBlocs' :
                    var regionalBlocsArray = informaçoesPrincipais[campo];

                    regionalBlocsArray = regionalBlocsArray[0];

                    for (let x in regionalBlocsArray) {
                    switch(x) {
                        case 'acronym': 
                           var regionalBlocosAcronym = regionalBlocsArray[x];
                        break;
                        case 'name' :
                            var regionalBlocosName = regionalBlocsArray[x];
                    }
                    

                    var regionalBlocos = regionalBlocosAcronym + ",  " + regionalBlocosName;
             
                   }break;
           }

           paragrafoNome.textContent = nome;
           paragrafoRegiao.textContent = regiao;
           paragrafoCapital.textContent = capital;
           paragrafoPopulaçao.textContent = populaçao + " Pessoas";
           paragrafoTerritorio.textContent = territorio + "km2";
           paragrafoLingFalada.textContent = LinguaFalada;
           paragrafoFronteiras.textContent = resultadoBordas;
           paragrafoCodigo.textContent = codigoMoeda;
           paragrafoSimbolo.textContent = simboloMoeda;
           paragrafoNomeMoeda.textContent = nomeMoeda;
           paragrafoGini.textContent = gini;
           paragrafoFuso.textContent = fuso;
           paragrafoBloco.textContent = regionalBlocos;
           imgBandeira.setAttribute('src', linkImgBandeira);

        }


        

        
     }
var MensagemVazio = 0;




buttonPesquisar.onclick = function () {

    sectionEntrada.style.display = "none";
    main.style.display = "flex";
    nomePais = inputPrincipal.value;
    localStorage.setItem('ultimaPesquisa', nomePais);
    if(nomePais == 0){
        campoVazio.classList.add('mostrarVazio');
        campoVazio.classList.add('animaçaoVibraçao');
        if(MensagemVazio == 0) {
            MensagemVazio = 1;
        }else {
            alert("Campo Vazio!")
        }
    }else{ 
        campoVazio.classList.remove('mostrarVazio');
        RespostaAPI();
    }
}




inputPrincipal.onclick = function () {
    retornoFrasesMenssagem(1);
    campoVazio.classList.remove('mostrarVazio');
    campoVazio.classList.remove('animaçaoVibraçao');
    
  }




navbar.addEventListener('click', () => {
    navMenuPrincipal.classList.toggle('mostrar');
    retornoFrasesMenssagem(4);
})




logo.onmouseover = function () {
    retornoFrasesMenssagem(3);
}



Referencias.onclick = function () {
    main.style.display = "none";
    sectionEntrada.style.display = "none";


  }




function retornoFrasesMenssagem(numeroFrase) {
    if(numeroFrase == 1) {
        caixaMenssagem.classList.add('mostrarCaixaMensagem');
        pCaixaMenssagem.classList.add('mostrarPCaixaMenssagem');
        pCaixaMenssagem.innerHTML = "Que país quer pesquisar?";  
    }

    if(numeroFrase == 2) {
        let randow = Math.random();
        randow = randow.toFixed(1);
        pCaixaMenssagem.classList.add('mostrarPCaixaMenssagem');
        caixaMenssagem.classList.add('mostrarCaixaMensagem');

        switch (randow) {
            case '0.1':
                pCaixaMenssagem.innerHTML = codeAlpha + " é tudo de bom!";
                break;
        
            case '0.2':
                pCaixaMenssagem.innerHTML = codeAlpha;
                break;
            
            case '0.3':
                pCaixaMenssagem.innerHTML = codeAlpha + ",boas lembranças!";
            break;

            case '0.4':
                pCaixaMenssagem.innerHTML = codeAlpha + "? Onde é que eu to?";
                break;

            case '0.5':
                pCaixaMenssagem.innerHTML = "Fica na America?";
                break;

            case '0.5':
                pCaixaMenssagem.innerHTML = "Esse país é demais!";
                break;
            
            case '0.6':
                pCaixaMenssagem.innerHTML = codeAlpha + ",gostaria de conhecer";
            break;

            case '0.7':
                pCaixaMenssagem.innerHTML = "\__<1_1>__/";
            break;

            case '0.8':
                pCaixaMenssagem.innerHTML = codeAlpha + "<=Esse ai é o 7x1?";
            break;

            case '0.9':
                pCaixaMenssagem.innerHTML = codeAlpha + "!!";
            break;
        }
    }

    if(numeroFrase == 3) {
        pCaixaMenssagem.classList.add('mostrarPCaixaMenssagem');
        caixaMenssagem.classList.add('mostrarCaixaMensagem');
        pCaixaMenssagem.innerHTML = "ISSO FAZ COSSEGAS!";
    }

    if(numeroFrase == 4) {
        pCaixaMenssagem.classList.add('mostrarPCaixaMenssagem');
        caixaMenssagem.classList.add('mostrarCaixaMensagem');
        pCaixaMenssagem.innerHTML = "Ei! Cuidado com o que aperta! ";
    }

   
    setTimeout(() => {
       
        caixaMenssagem.classList.remove('mostrarCaixaMensagem');
        pCaixaMenssagem.classList.remove('mostrarPCaixaMenssagem');
    },3000);
  
}




