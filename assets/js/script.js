const paragrafo = document.querySelector('#p');
const buttonPesquisar = document.querySelector('#buttonPesquisar')
var inputPrincipal = document.querySelector('#inputPrincipal');
const navMenuPrincipal = document.querySelector('#navMenuPrincipal');
const navbar = document.querySelector('.navbar i');
const campoVazio = document.querySelector('.vazio');

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


var nomePais = 0;

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
                var nome = informaçoesPrincipais[campo]
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
           paragrafoPopulaçao.textContent = populaçao;
           paragrafoTerritorio.textContent = territorio;
           paragrafoLingFalada.textContent = LinguaFalada;
           paragrafoFronteiras.textContent = resultadoBordas;
           paragrafoCodigo.textContent = codigoMoeda;
           paragrafoSimbolo.textContent = simboloMoeda;
           paragrafoNomeMoeda.textContent = nomeMoeda;
           paragrafoGini.textContent = gini;
           paragrafoFuso.textContent = fuso;
           paragrafoBloco.textContent = regionalBlocos;

        }


        

        
     }


var MensagemVazio = 0;


buttonPesquisar.onclick = function () {

    nomePais = inputPrincipal.value;
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
    campoVazio.classList.remove('mostrarVazio');
    campoVazio.classList.remove('animaçaoVibraçao');
  }


navbar.addEventListener('click', () => {
    navMenuPrincipal.classList.toggle('mostrar')
})






