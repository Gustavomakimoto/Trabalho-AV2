$(function () {
    //validação dos campos usando jquery
    $(document).ready(function () {
        InseTabela();
        Cep();
        valsenha();
        CPF();
        cpfM(v);
        SomenteLetras();
        obsMaior200();
        execmascara();
        telM(v);
        mascara(o, f);
        SomenteLetras();
        Trim(str);
        maiuscula(z);
        cepM(v)
    });
});
function SomenteLetras() {
    tecla = event.keyCode;
    //BLOQUEANDO TODAS OS NUMEROS E CARACTERES ESPECIAS
    if (tecla >= 33 && tecla <= 64 || tecla >= 91 && tecla <= 93 || tecla >= 123 && tecla <= 159 || tecla >= 162 && tecla <= 191 || tecla === 95) {
        return false;
    } else {
        return true;
    }
}



function obsMaior200() {
    if (document.getElementById("obs").value.length >= 200) {
        alert('APENAS 200 CARACTERES !!');
        document.getElementById("obs").focus();
        return false;
    }

}


// PARA EVITAR O ESPACO NO CAMPO DA SENHA PASSWORD
function Trim(str) {
    return str.replace(/^\s+|\s+$/g, "");
}
// SER OBRIGATORIAMENTE MAIUSCULO O CAMPO
function maiuscula(z) {
    v = z.value.toUpperCase();
    z.value = v;
}


function mascara(o, f) {
    v_obj = o;
    v_fun = f;
    setTimeout('execmascara()', 1);
}

function checkBoxMarcando(obj) {
    var teste = document.getElementsByName(obj.name);
    var cont = 0;
    for (var i = 0; i < teste.length; i++)
    {
        if (teste[i].checked)
            cont++;
        if (cont > 1)
        {
            obj.checked = false;
            break;
        }
    }

    if (!obj.checked) {
        return;
    } else

    if (document.getElementById("simCheckBox").checked == true) {
        {
            document.getElementById("msg").innerHTML = 'A qualquer momento você podera \n\
          cancelar o recebimento dos e-mails depromoção enviando um e-mail com o assunto STOP MAIL para o endereço contato@estacio.br';
        }

    } else {

        document.getElementById("msg").innerHTML = ' ';


    }


}

function valida(erro, df) {
    erro = '#FF0000';
    df = '#FF0000';

    if (document.getElementById("simCheckBox").checked == false &&
            document.getElementById("naoCheckBox").checked == false) {
        alert("Selecione os Algum Campo da Selecção de Mensagem");
        return false;
    }

    if (document.getElementById("cpf").value.length < 14) {
        alert('Digite o CPF!!');
        document.getElementById("cpf").style.borderColor = erro;
        document.getElementById("cpf").focus();
        return false;
    }

    if (document.getElementById("nome").value.length < 3) {
        alert('Digite seu nome.');
        document.getElementById("nome").style.borderColor = erro;
        document.getElementById("nome").focus();
        return false;
    }
    if (document.getElementById("cep").value.length < 10) {
        alert('Digite o CEP!!');
        document.getElementById("cep").style.borderColor = erro;
        document.getElementById("cep").focus();
        return false;
    }
    if (document.getElementById("endereco").value.length < 3) {
        alert('Digite seu endereço');
        document.getElementById("endereco").style.borderColor = erro;
        document.getElementById("endereco").focus();
        return false;
    }

    if (document.getElementById("cidade").value.length < 3) {
        alert('Informe sua cidade.');
        document.getElementById("cidade").style.borderColor = df;
        document.getElementById("cidade").focus();
        return false;
    }

    if (document.getElementById("senha").value.length < 6) {
        alert('Digite sua senha igual ou maior que 6 caracteres');
        document.getElementById("senha").style.borderColor = erro;
        document.getElementById("senha").focus();
        return false;
    }



    if (document.label.civil.value == "") {
        window.alert("Escolha o estado civil !");
        document.label.civil.focus();
        return false;
    } else {
        return true;
    }
    if (document.label.sexo.value == "") {
        window.alert("Escolha o sexo !");
        document.label.sexo.focus();
        return false;
    } else {
        return true;
    }
}

function execmascara() {
    v_obj.value = v_fun(v_obj.value);
}


function cepM(v) {

    //Remove tudo o que não é dígito
    v = v.replace(/\D/g, "");

    if (v.length <= 14) { //CEP



        v = v.replace(/(\d)(\d{3})$/, "$1-$2");

    }

    return v;

}
function cpfM(v) {

    //Remove tudo o que não é dígito
    v = v.replace(/\D/g, "");

    if (v.length <= 14) { //CPF

        //Coloca um ponto entre o terceiro e o quarto dígitos
        v = v.replace(/(\d{3})(\d)/, "$1.$2");

        //Coloca um ponto entre o terceiro e o quarto dígitos
        //de novo (para o segundo bloco de números)
        v = v.replace(/(\d{3})(\d)/, "$1.$2");

        //Coloca um hífen entre o terceiro e o quarto dígitos
        v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    }

    return v;

}

function telM(v) {

    //Remove tudo o que não é dígito
    v = v.replace(/\D/g, "");

    if (v.length <= 14) {


        v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
        v = v.replace(/(\d)(\d{4})$/, "$1-$2");    //Coloca hífen entre o quarto e o quinto dígitos


    }

    return v;

}
function Cep() {

        $("#cep").blur(function () {
            var cep_code = $(this).val();
            $.get("http://apps.widenet.com.br/busca-cep/api/cep.json", {code: cep_code},
            function (result) {
                if (result.status != 1) {

                    alert(result.message || "Houve um erro desconhecido");

                    return;
                }
                $("input#cep").val(result.code);
                $("input#endereco").val(result.address);
                $("input#bairro").val(result.district);
                $("input#estado").val(result.state);
                $("input#cidade").val(result.city);



            });
        });
    }
      function InseTabela() {
        var operacao = "ADD";
        var posicao = -1;
        var tabela = localStorage.getItem("dados");
        tabela = JSON.parse(tabela);
        if (tabela == null)
            tabela = [];
        $("#cadastro").on("submit", function () {
            if (operacao == "ADD")
                adicionarElemento();
            else
                editarElemento();
        });

        function GetPessoa(propriedade, valor) {
            var x = null;
            for (var item in tabela) {
                var i = JSON.parse(tabela[item]);
                if (i[propriedade] == valor)
                    x = i;
            }
            return x;
        }

        function adicionarElemento() {
            var x = GetPessoa("cpf", $("#cpf").val());
            if (x !== null) {
                window.alert("CPF inválido ja existente.");
                $("#cpf").val("");
                $("#cpf").focus();
                return false;
            } else {
                var pessoa = JSON.stringify({
                    cpf: $("#cpf").val(),
                    nome: $("#nome").val(),
                    estadoCivil: $("#estadoCivil").val(),
                    sexo: $("#sexo").val(),
                    telefone: $("#telefone").val(),
                    cep: $("#cep").val(),
                    endereco: $("#endereco").val(),
                    bairro: $("#bairro").val(),
                    estado: $("#estado").val(),
                    cidade: $("#cidade").val(),
                    email: $("#email").val(),
                    senha: $("#senha").val(),
                    obs: $("#obs").val(),
                    promocao: $("#promocao").is(":checked")
                });
                tabela.push(pessoa);
                localStorage.setItem("dados", JSON.stringify(tabela));
                alert("Dados foram adicionados");
                return true;
            }
        }


        function editarElemento() {
            tabela[posicao] = JSON.stringify({
                cpf: $("#cpf").val(),
                nome: $("#nome").val(),
                estadoCivil: $("#estadoCivil").val(),
                sexo: $("#sexo").val(),
                telefone: $("#telefone").val(),
                cep: $("#cep").val(),
                endereco: $("#endereco").val(),
                bairro: $("#bairro").val(),
                estado: $("#estado").val(),
                cidade: $("#cidade").val(),
                email: $("#email").val(),
                senha: $("#senha").val(),
                obs: $("#obs").val(),
                promocao: $("#promocao").is(":checked")
            });
            localStorage.setItem("dados", JSON.stringify(tabela));
            alert("Dados Atualizados");
            operacao = "DEL";
            listar();
            return true;
        }
        function excluir() {
            tabela.splice(posicao, 1);
            localStorage.setItem("dados", JSON.stringify(tabela));
        }

        function listar() {
            $("#dados").html("");
            for (var i in tabela) {
                var x = JSON.parse(tabela[i]);
                $('#tabela').find('tbody').append('<tr>' +
                        '<td>' + x.cpf + '</td>' +
                        '<td>' + x.nome + '</td>' +
                        '<td><img src="editar.png"  alt = " ' + i + ' " id="btEditar" class="btEditar" title="Editar dados" />   ' +
                        '<img src="excluir.png"  alt = " ' + i + ' " id="btExcluir" class="btExcluir" title="Excluir dados" />' +
                        '</tr>');
                destacarLinha();
                limpar();
            }
        }


        $("#tabela").on("click", "#btnEditar", function () {
            operacao = "DEL";
            posicao = parseInt($(this).attr("alt"));

            var x = JSON.parse(tabela[posicao]);
            $("#cpf").val(x.cpf);
            $("#nome").val(x.nome);
            $("#cep").val(x.cep);
            $("#endereco").val(x.endereco);
            $("#bairro").val(x.bairro);
            $("#estado").val(x.estado);
            $("#cidade").val(x.cidade);
            $("#estadoCivil").val(x.estadoCivil);
            $("#sexo").val(x.sexo);
            $("#telefone").val(x.telefone);
            $("#email").val(x.email);
            $("#senha").val(x.senha);
            $("#obs").val(x.obs);
            $('#promocao').attr('checked', x.promocao);
            $("#nome").focus();
            verificaCheck();

        });

        $("#tabela").on("click", "#btnExcluir", function () {
            posicao = parseInt($(this).attr("alt"));
            if (window.confirm(' Deseja realmente excluir? ')) {
                excluir();
                listar();
            }
            else {
                return false;
            }
        });


        
        $("#cancelar").click(function () {
            
            if ($("#promocao").is(":checked")) {
                $("#mensagem").hide();
                $('#promocao').attr('checked', false);
            } else {
                $("#mensagem").hide();
                $('#promocao').attr('checked', false);
            }
            limpar();
            operacao = "ADD";
        });
        listar();
    }
    function limpar() {
        //limpando os campos
        $('#cpf').val('');
        $('#nome').val('');
        $('#cep').val('');
        $('#endereco').val('');
        $('#bairro').val('');
        $('#estado').val('');
        $('#cidade').val('');
        $('#civil').val('');
        $('#sexo').val('');
        $('#telefone').val('');
        $('#email').val('');
        $('#senha').val('');
        $('#obs').val('');


    }
function CPF() {

    StringCpf = $("#cpf").val();
    StringCpf = StringCpf.replace(/[^\d]+/g, '');
    var Soma;
    var Resto;
    var valor = true;
    Soma = 0;

    if (StringCpf.length != 11 || StringCpf == "00000000000" ||
            StringCpf == "11111111111" ||
            StringCpf == "22222222222" ||
            StringCpf == "33333333333" ||
            StringCpf == "44444444444" ||
            StringCpf == "55555555555" ||
            StringCpf == "66666666666" ||
            StringCpf == "77777777777" ||
            StringCpf == "88888888888" ||
            StringCpf == "99999999999") 
        valor = false;



    for (i = 1; i <= 9; i++)
        Soma = Soma + parseInt(StringCpf.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))
        Resto = 0;
    if (Resto != parseInt(StringCpf.substring(9, 10)))
        valor = false;

    Soma = 0;
    for (i = 1; i <= 10; i++)
        Soma = Soma + parseInt(StringCpf.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))
        Resto = 0;
    if (Resto != parseInt(StringCpf.substring(10, 11)))
        valor = false;

    if (!valor) {
        $('#cpf').css('background-color', '#df1616');
        $('#cpf').focus();
    } else {
        $('#cpf').css('background-color', 'white');
        return valor;
    }
    }
    

  




