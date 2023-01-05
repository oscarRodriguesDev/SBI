/*função para bloqueio dos recursos ainda não disponibilizados*/

function default_event() {
   alert('Este recurso ainda não está disponivel!')
}
/*fim da função de teste de eventos*/



var message = []
var lista_banco = [] //lista no estoque



/*Elementos necessarios para apresentação de dados do banco*/
var span = document.getElementById('conteudo_estoque').style
span.display = 'none'

var span_saida = document.getElementById('conteudo_saida').style
span_saida.display = 'none'

var span_entrada = document.getElementById('conteudo_entrada').style
span_entrada.display = 'none'

var span_totais = document.getElementById('totais').style
span_totais.display = 'none'



var span_estoque = document.getElementById('conteudo_estoque')

var span_exit = document.getElementById('conteudo_saida')

var span_all = document.getElementById('totais')



/*Eementos necessarios para apresentação dos dados do banco*/


/*Todas a configuração necessario para que o firebase funcione*/
const firebaseConfig = {
   apiKey: "AIzaSyDcZJiJTmCSrvr9INI9Z9Zg5n1eSnjcSsw",
   authDomain: "sbi-db.firebaseapp.com",
   databaseURL: "https://sbi-db-default-rtdb.firebaseio.com",
   projectId: "sbi-db",
   storageBucket: "sbi-db.appspot.com",
   messagingSenderId: "421227812598",
   appId: "1:421227812598:web:102d334076b7ace764fed7"
};
firebase.initializeApp(firebaseConfig);
var bank_enter = firebase.database()
   .ref('Estoque Bilhetagem Serramar');
/*Fim das configurações do firebase*/


function contador(classe) {
   /*separando os itens do banco*/
  let all = []
  let total = [['Equipamento','Quantidade']]
 lista_banco.forEach(eqp => {
   if(eqp[4]=='Entrada'){
   all.push(eqp[0])
   }
 });

   //conta e coloca em um objeto com nome e quantidade
   
   
   var counts = {};
   all.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
 
  for (const key in counts) {
   if (counts.hasOwnProperty.call(counts, key)) {
      const valor = counts[key];
      total.push([key,counts[key]])
      
   }
  }
    console.log(total)

   

   /*mudando o layout para apresentação dos totais*/
   span_all.appendChild(criarTabela(total))
   span.display = 'none'
   estoque = document.getElementById(classe).style;//estoque
   controle = document.querySelector('.formulario1').style;
   estoque.display = 'block'
   controle.display = 'none'
   span_totais.display = 'block'



}




/*Função para pegar os dados informados pelo usuario*/
function pega_data(rotina) { //se é entrada ou saida
   var permissão = 0;
   // alert(permissão)
   //equipamento
   var select = document.getElementById("eqpms");
   var maq = select.options[select.selectedIndex].text;
   if (maq == '') {
      permissão = 1
   }


   //serial
   var text = document.getElementById("serial");
   var ser = text.value
   if (ser == '') {
      permissão = 2
   }

   //data
   var data = document.getElementById("data");
   var dat = data.value;
   if (dat == '') {
      permissão = 3
   }


   //matricula
   matricula = prompt("Para finalizar digite sua matricula:")

   if (matricula == '') {
      permissão = 4
   }
   if (matricula == null) {
      permissão = 5
   }


   switch (permissão) {
      case 0:
         save_equipamento(maq, ser, dat, matricula, rotina)
         clear_all(rotina)
         break
      case 1:
         alert('Escolha uma opção de equipamento!')
         break
      case 2:
         alert('Você não informou o numero serial!')
         break
      case 3:
         alert('Selecione uma data corretamente!')
         break
      case 4:
         alert('Para finalizar, você precisa informar seu nome!')
         break
      case 5:
         alert('Registro cancelado com sucesso!')
         break
      default:
         alert('Ocorreu um erro desconhecido, tente novamente!')
         break
   }



}
/*fim dos dados que serão gravados*/






/*Função para salvar os dados no Firebase */
function save_equipamento(maq, ser, dat, reg, tipo) {

   span.display = 'none'
   leitura_data()
   let status = lista_banco.length

   var newMessageRef = bank_enter.push();
   var eqm = [maq, ser, dat, reg, tipo]

   if (status > 0) {

      newMessageRef.set(
         eqm
      );
   } else {

      head_generator(['equipamento', 'Serial', 'Data', 'Responsavel', 'Transação'], maq, ser, dat, reg, tipo)

   }
   if (tipo == 'Entrada') {

      //mostrar mensagem de entrada de equipamento
      alert(maq + ' foi adcionado ao estoque com sucesso por ' + reg)
      clear_all(tipo)
      leitura_data()
   } else {
      //mostrar mensagem de saida de equipamento
      alert(maq + ' foi retirado do estoque com sucesso por ' + reg)
      clear_all(tipo)
      leitura_data()
   }
   informa_atualização()
}

/*Fim da função para salvar dados no firebase*/




/*Função para salvar o cabeçalho da tabela no banco de dados*/
function head_generator(heads, maq, ser, dat, reg, tipo) {
   var eqm = [maq, ser, dat, reg, tipo]
   alert('Seu espaço de estoque ainda não foi criado, mas não se preocupe estaremos criando para você agora!')
   var newMessageRef = bank_enter.push();
   newMessageRef.set(
      heads
   );
   alert('seu espaço de estoque foi criado com sucesso! A seguir vamos adcionar seus primeiros equipamentos!')
   save_equipamento(maq, ser, dat, reg, tipo)

}
/*fim da função que cria o cabeçalho da tabela no banco de dados*/





/*Função para leitura de dados no firebase*/
function leitura_data() {
   span.display = 'block'
   lista_banco = []
   bank_enter.on('child_added', function (snapshot) {
      lista_banco.push(snapshot.val());

   });

}
/*Fim da função para leitura de dados no firebase*/



/*Funçaõ que cria uma tabela para apresentação de dados na tela do usuario*/
function apresentarData(dados) {
   tabela = criarTabela(dados)
   var sp = document.getElementById('conteudo_estoque')
   sp.appendChild(tabela)
   desfazer_tabela(tabela)

}



function desfazer_tabela(tabela) {

   criarTabela([])

}



/*Função que permite  a apresentação dos dados na tela do usuario*/
function acessar_estoque(classe) {

   span.display = 'block'
   span_saida.display = 'none'
   apresentarData(lista_banco)
   lista_banco = []
   estoque = document.getElementById(classe).style;//estoque
   controle = document.querySelector('.formulario1').style;
   estoque.display = 'block'
   controle.display = 'none'
}
/*Fim da função que mostra a apresentação de dados na tela*/






/*Função que estilçiza a tela do formulario para o usuario*/
function acessar_controle(classe) {

   span.display = 'none'
   span_saida.display = 'none'
   controle = document.querySelector(classe).style;
   estoque = document.getElementById('estoque').style;//estoque
   controle.display = 'block'
   estoque.display = 'none'
}
/*Fim da funçaõ que permite apresentação da tela de formaulario*/



/*Função para limpar os dados do formulario para novas inserções*/
function clear_all(decisão) {
   var select = document.getElementById("eqpms");
   var equipamento = select.options[select.selectedIndex].text;
   var text = document.getElementById("serial");
   var serial = text.value
   var data = document.getElementById("data");
   var StringData = data.value;
   select.selectedIndex = 0//define o painel inicial
   text.value = ""
   /*tenho a data atual caso eu desista de pegar pelo formulario*/
   const hoje = new Date();
   var dia = hoje.getDate()
   var mes = hoje.getMonth() + 1
   var ano = hoje.getFullYear()
   data.value = "dd/mm/yyyy"
}
/*Fim da função que limpa os campos do formulario para novas inserções*/




function criarTabela(conteudo) {
   var tabela = document.createElement("table");
   var thead = document.createElement("thead");
   var tbody = document.createElement("tbody");
   var thd = function (i) { return (i == 0) ? "th" : "td"; };
   for (var i = 0; i < conteudo.length; i++) {
      var tr = document.createElement("tr");
      for (var o = 0; o < conteudo[i].length; o++) {
         var t = document.createElement(thd(i));
         var texto = document.createTextNode(conteudo[i][o]);
         t.appendChild(texto);
         tr.appendChild(t);
      }
      (i < lista_banco.length) ? thead.appendChild(tr) : tbody.appendChild(tr);

   }
   tabela.appendChild(thead);
   tabela.appendChild(tbody);
   tabela.setAttribute('id', 'tabela_estoque')
   return tabela;
}


/*função utilizada para recolher apenas as saidas de equipamentos*/
function apenas_saidas() {
   leitura_data()
   let lista_saida = []
   lista_saida = [['Data', 'Equipamento', 'Serial']]
   lista_banco.forEach(element => {
      if (element[4] == 'Saida') {
         lista_saida.push([element[2], element[0], element[1]])
      }
   });

   return lista_saida
}




function apresenta_saidas(classe) {

   tabela_saida = criarTabela(apenas_saidas())
   span.display = 'none'
   span_exit.appendChild(tabela_saida)
   estoque = document.getElementById(classe).style;//estoque
   controle = document.querySelector('.formulario1').style;
   estoque.display = 'block'
   controle.display = 'none'
   span_saida.display = 'block'
}



//rotina de verificação de novos equipamentos no banco
function informa_atualização() {
   alert('Atualize a pagina e veja as alterações mais recentes')
}

//setInterval(leitura_auto, 1000);