/**********************************************************************************
 * Objetivo: Calcular IMC e Formulário de Cadastro.
 * Autor(a): Pâmela Xisto Dos Santos
 * Data: 30/04/2025
 * GitHub:
 */


// Calculando o IMC
const calcularImc = ( ) => {

    const pesoIMC   = document.getElementById("peso")
    const alturaIMC = document.getElementById("altura")

        // teste
    //console.log(peso);
    //console.log(altura);


    // Validação para campos em brancos
    pesoIMC.style.backgroundColor = '#ffffff'
    alturaIMC.style.backgroundColor = '#ffffff'

    // Validação dos dados
    if(pesoIMC.value === ''){
        alert('O campo peso não pode ser em branco')
        // Marcação vermelha no bloco do nome não preenchido
        pesoIMC.style.backgroundColor = '#ed766d'
        return;
    }

    if(alturaIMC.value === ''){
        alert('O campo altura não pode ser em branco')
        // Marcação vermelha no bloco do nome não preenchido
        alturaIMC.style.backgroundColor = '#ed766d'
        return;
    }

    // Substitui a vírgula pelo ponto para o resultado do IMC
    const alturaPonto = alturaIMC.value.replace(',', '.');

    const imc = pesoIMC.value / Math.pow (alturaPonto, 2)

    return imc
}

// Função para impedir a digitação de letras/caracteres
const blockLettersAndSpecialChars = function(tecla) {
    if(tecla.charCode >= 48 && tecla.charCode <= 57){
        return true;
    }

    if (tecla.charCode === 44 || tecla.charCode === 46){
        return true;
    }

    return false;
}


const classificarImc = (imc) => {
    // Valores retornados em cada campo separado
    const spanValorIMC  = document.getElementById("valor_imc")
    const spanStatusIMC = document.getElementById("status_imc")


    // toFixed(2) retorna apenas duas casas decimais no resultado do imc
    spanValorIMC.textContent = imc.toFixed(2)

    if (imc < 18.5) {

        spanStatusIMC.textContent = "Abaixo do peso"


    } else if (imc > 18.5 && imc < 24.99) {

        spanStatusIMC.textContent = "Normal"


    } else if (imc > 25 && imc < 29.99) {

        spanStatusIMC.textContent = "Sobrepeso"


    } else if (imc > 30 && imc < 34.99) {

        spanStatusIMC.textContent = "Obesidade I"


    } else if (imc > 35 && imc < 39.99) {

        spanStatusIMC.textContent = "Obesidade II"


    } else {

        spanStatusIMC.textContent = "Obesidade III"
    }
}


// Funcionamento do botão de "Calcular"
const buttonCalcular = document.getElementById("calcular")

buttonCalcular.addEventListener('click', () => {

    const imcCalculado = calcularImc()

    classificarImc(imcCalculado)
})


peso.addEventListener('keypress', function(event){
    if(blockLettersAndSpecialChars(event) == false){
        event.preventDefault()
    }
})

altura.addEventListener('keypress', function (event){
    if(blockLettersAndSpecialChars(event) == false){
        event.preventDefault()
    }
})


//--------------------------------------------------------------------------------------//


// Preenchimento da Matrícula
const nome        = document.querySelector("#nome")
const cep         = document.querySelector("#input-cep") 
const logradouro  = document.querySelector("#logradouro")
const numero      = document.querySelector("#numero")
const complemento = document.querySelector("#complemento")
const bairro      = document.querySelector("#bairro")
const cidade      = document.querySelector("#cidade")
const estado      = document.querySelector("#estado")
const pais        = document.querySelector("#pais")
const botaoConsultar = document.querySelector("#pesquisar")


const validaCep = function (e){
    // Substitui o traço - por um espaço
    e.target.value = e.target.value.replace(/[^0-9]/g, "")
}

const buscarCep = async function (e) {
    let cepPesquisado = e.target.value

    if(!cepPesquisado) {
        return
    }

    const url = `https://viacep.com.br/ws/${cepPesquisado}/json/`
    
    const response = await fetch(url)

    const data = await response.json()

    if(data.erro){
        throw new Error("Cep não encontrado, verifique e tente novamente");
    }

    preencherDados (data)
}

function preencherDados (dados){
    cep.value           = dados.cep
    logradouro.value    = dados.logradouro
    complemento.value   = dados.complemento
    bairro.value        = dados.bairro
    cidade.value        = dados.localidade
    estado.value        = dados.uf
    pais.value          = "Brasil"
}


cep.addEventListener("input", validaCep)
//cep.addEventListener("blur", buscarCep)

if (botaoConsultar) {
    botaoConsultar.addEventListener('click', async function(event){
        event.preventDefault();

        // Retorna as cores normais ao concertar o erro vazio
        nome.style.backgroundColor = '#2b2b2a'
        cep.style.backgroundColor  = '#2b2b2a'

        if (nome.value === ""){
            alert("O campo NOME é obrigatório!")
            nome.style.backgroundColor = '#ed766d'
            return;
        }

        if (cep.value === ""){
            alert("O campo CEP é obrigatório!")
            cep.style.backgroundColor = '#ed766d'
            return;
        }

        await buscarCep({target: cep});
        alert("Cadastro realizado com sucesso!")
    });
}



// Botão limpar todos os campos/formulários, sendo o IMC e CONTATOS
const botaoLimpar = document.getElementById("limpar");

function limparForm() {
    document.getElementById('peso').value = "";
    document.getElementById('altura').value = "";
    document.querySelector('#nome').value = "";
    document.querySelector('#input-cep').value = "";
    document.querySelector('#logradouro').value = "";
    document.querySelector('#numero').value = "";
    document.querySelector('#complemento').value = "";
    document.querySelector('#bairro').value = "";
    document.querySelector('#cidade').value = "";
    document.querySelector('#estado').value = "";
    document.querySelector('#pais').value = "";
    document.getElementById('valor_imc').textContent = ""; 
    document.getElementById('status_imc').textContent = ""; 
}

if (botaoLimpar) {
    botaoLimpar.addEventListener('click', limparForm);
}