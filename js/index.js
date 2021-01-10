let total = 0;
let totelMes = 0;

var form = document.querySelector("form");
var fieldset = document.querySelectorAll("fieldset");
var adicionarDivida = document.querySelector("button");
var escondeOpcao = document.querySelector("#porcentPag");

var dividas = document.querySelector("#tabela");
var totalDividas = document.querySelector("#total");
var totalMensal = document.querySelector("#valorPago");
var saldoRestante = document.querySelector("#saldoRestante");
var saldo = document.querySelector("#saldo");

adicionarDivida.addEventListener("click", function (event) {
    event.preventDefault();
    if (validaDados() == false) {
        return;
    }
    document.querySelector("#mostrarDivida").classList.remove("quinto");
    dividas.appendChild(crieTr());
    saldoScore();
    totalDividas.textContent = valorTotal(obterInfoForm().valor);
    totalMensal.textContent = valorTotalMes(calculaPorcentagem());
    form.reset();
    form.rendaMensal.value = parseInt(saldo.textContent);
    adicionarDivida.classList.add("treis");
});
function obterInfoForm() {

    return {
        renda: form.rendaMensal.value,
        titulo: form.tituloDivida.value,
        valor: form.valorDivida.value,
        marcado: form.contaMes.checked,
        porcentagem: form.porcentagemPag.value
    };
}
function proximoPasso() {
    if (obterInfoForm().renda != "") {
        fieldset[1].classList.remove("dois");
        fieldset[2].classList.remove("dois");
        fieldset[0].classList.add("um");
        document.querySelector("#rendaMensal1").classList.remove("quatro");
        if (saldo.textContent == "") {
            (obterInfoForm().renda.length != "") ? saldo.textContent = parseInt(obterInfoForm().renda) : saldo.textContent = 0;
        }
    } else {
        if (validaDados() == false) {
            return;
        }
    }

}

function proximoPassoDois() {
    if (obterInfoForm().titulo.length > 1 && obterInfoForm.valor != "") {
        fieldset[3].classList.remove("treis");
        adicionarDivida.classList.remove("treis");
    } else {
        if (validaDados() == false) {
            return;
        }
    }
}

if (obterInfoForm().renda.length == 0) {
    fieldset[0].classList.remove("um");
} else {
    let passoQuatro = document.querySelector(".quatro");
    passoQuatro.classList.remove("quatro");
    if (saldo.textContent == "") {
        (obterInfoForm().renda.length != "") ? saldo.textContent = parseInt(obterInfoForm().renda) : saldo.textContent = 0;
    }
    if (obterInfoForm().titulo.length > 0 && obterInfoForm().valor.length > 0) {
        fieldset[3].classList.remove("treis");
    }
}


var restanteConta = (obterInfoForm().valor - calculaPorcentagem());
function crieTr() {
    var tr = document.createElement("tr");
    var descricao = (obterInfoForm().titulo + " " + obterInfoForm().valor);
    var restanteConta = (obterInfoForm().valor - calculaPorcentagem())
    tr.appendChild(crieTd(descricao));
    tr.appendChild(crieTd(restanteConta));
    tr.appendChild(crieTd(qtdParcelas()));
    tr.appendChild(crieTd(calculaPorcentagem()));
    tr.appendChild(crieTd(calculaSaldoRestante()));
    return tr;
}


function crieTd(dados) {
    var td = document.createElement("td");
    td.textContent = dados;
    return td;
}

function qtdParcelas() {
    var valor = obterInfoForm().valor;
    var porcentagem = calculaPorcentagem();

    if (porcentagem == valor) {
        valor = "a vista."
    } else {
        valor = valor / calculaPorcentagem();
        valor = valor - 1;
        var tempo = document.querySelector("#meses").textContent;
        if (valor > tempo || tempo == "") {
            var data = new Date();
            var mes = data.getMonth() + valor;

        }
        document.querySelector("#meses").textContent = valor;
    }
    return valor;
}

function valorTotal(valor) {
    total = (total + (parseInt(valor) - calculaPorcentagem()));
    return total;
}

function valorTotalMes(valor) {
    totelMes = (totelMes + parseInt(valor))
    return totelMes;
}

function validaDados() {
    var valor = obterInfoForm().valor;
    var titulo = obterInfoForm().titulo;
    var renda = obterInfoForm().renda;
    var marcado = obterInfoForm().marcado;
    if (valor.length == 0) {
        document.querySelector("#vdivida").textContent = "Digite valor Divida"
        valor = false;
    } else {
        document.querySelector("#vdivida").innerHTML = "";
        valor = true;
    }

    if (renda.length == 0 && saldo.textContent == "") {
        document.querySelector("#vrenda").textContent = "Digite valor da renda"
        valor = false;
    } else {
        valor = true;
    }

    if (titulo.length == 0) {
        document.querySelector("#tdivida").textContent = "Digite Titulo Divida"
        titulo = false;
    } else {
        document.querySelector("#tdivida").innerHTML = "";
        titulo = true;
    }

    if (saldo.textContent == "") {
        (renda.length != "") ? saldo.textContent = parseInt(obterInfoForm().renda) : saldo.textContent = 0;
    }

    if (marcado == 1) {
        contasDoMes();
    }
    if (valor && titulo && renda) {
        return true;
    } else
        return false;
}

function calculaPorcentagem() {
    var valor = obterInfoForm().valor;
    var porcentagem = obterInfoForm().porcentagem;
    return valor * (porcentagem / 100);
}

function marcaCheckParcelado() {
    parseInt(obterInfoForm().porcentagem) != 100 ? document.querySelector("#parceladoSim").checked = true : document.querySelector("#parcelado").checked = false;
}

function marcaCheckAVista() {
    parseInt(obterInfoForm().porcentagem) == 100 ? document.querySelector("#aVistaSim").checked = true : document.querySelector("#aVistaSim").checked = false;
    escondeOpcao.classList.add("esconde");
}

function marcaEsconde() {
    escondeOpcao.classList.remove("esconde");
    document.querySelector("#aVistaNao").checked = true;
}



function contasDoMes() {
    var saldoMes = parseInt(saldo.textContent) - calculaPorcentagem();
    return saldo.textContent = saldoMes;
}

function saldoScore(){
    let tabela = ['#tabelaDividas', 'tr', 'th', 'td'];
    tabela.map(el =>{
        let tipo = document.querySelectorAll(el);
            tipo.forEach(item => {
            let elemento = item;
                if(parseInt(saldo.textContent) < 1){
                    elemento.classList.add("contaNegativa");
                    elemento.classList.remove("contaPositiva");
                }else{
                    elemento.classList.remove("contaNegativa");
                    elemento.classList.add("contaPositiva") 
                }
            })
        })
}

function calculaSaldoRestante(){
    return document.querySelector("#saldo").textContent = parseInt(saldo.textContent) - calculaPorcentagem();
}

function abrirPagina() {
    let newWindow = open('dividas.html', 'example', 'width=300,height=300');

    newWindow.onload = function () {
        let html = document.querySelector("#tabelaDividas");
        newWindow.console.log(html.outerHTML)
        newWindow.document.body.insertAdjacentHTML('afterbegin', html.outerHTML);
        newWindow.window.print();
    };
}