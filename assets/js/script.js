const paragrafo = document.querySelector('#p');
const buttonPesquisar = document.querySelector('#buttonPesquisar')
var inputPrincipal = document.querySelector('#inputPrincipal');
const navMenuPrincipal = document.querySelector('#navMenuPrincipal');
const navbar = document.querySelector('.navbar i');
const campoVazio = document.querySelector('.vazio');
const ButtonUltimaPesquisa = document.querySelector('#ultimaPesquisa');
var RespostaLocalStorage;
var statusStorage;

const paragrafoNome = document.querySelector('#name');
const paragrafoLingFalada = document.querySelector('#lingFalada');
const paragrafoRegiao = document.querySelector('#regiao');
const paragrafoCapital = document.querySelector('#capital');
const paragrafoPopulaçao = document.querySelector('#populaçao');
const paragrafoTerritorio = document.querySelector('#territorio');

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

           }

           paragrafoNome.textContent = nome;
           paragrafoRegiao.textContent = regiao;
           paragrafoCapital.textContent = capital;
           paragrafoPopulaçao.textContent = populaçao;
           paragrafoTerritorio.textContent = territorio;
           paragrafoLingFalada.textContent = LinguaFalada;
        }


        

        
     }


var MensagemVazio = 0;

buttonPesquisar.onclick = function () {

    nomePais = inputPrincipal.value;
    if(nomePais == 0){
        campoVazio.classList.add('mostrarVazio');
        if(MensagemVazio == 0) {
            MensagemVazio = 1;
        }else {
            alert("Campo Vazio!")
        }
    }else{ 
        localStorage.setItem('ultimaPesquisa', JSON.stringify(nomePais));
        campoVazio.classList.remove('mostrarVazio');
    RespostaAPI();
    }
}

inputPrincipal.onclick = function () {
    ButtonUltimaPesquisa.textContent = localStorage.getItem('ultimaPesquisa');
}

navbar.addEventListener('click', () => {
    navMenuPrincipal.classList.toggle('mostrar')
})







