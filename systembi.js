/*função para bloqueio dos recursos ainda não disponibilizados*/

function default_event() {
   alert('Este recurso ainda não está disponivel!')
}
/*fim da função de teste de eventos*/



var message = []
var lista_banco = [] //lista no estoque

//lista de equipamentos no banco de dados
lista_devices = []

/*Elementos necessarios para apresentação de dados do banco*/
var span_geral = document.getElementById('conteudo_estoque').style
span_geral.display = 'none'

var span_saida = document.getElementById('conteudo_saida').style
span_saida.display = 'none'

var span_entrada = document.getElementById('conteudo_entrada').style
span_entrada.display = 'none'

var span_totais = document.getElementById('totais').style
span_totais.display = 'none'


/*variaveis que representam elementos na pagina*/
var span_estoque = document.getElementById('conteudo_estoque')

var span_exit = document.getElementById('conteudo_saida')

var span_enter = document.getElementById('conteudo_entrada')

var span_all = document.getElementById('totais')




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
/*Fim das configurações do firebase*/

/*banco de opções de equipamento no firebase*/
var bank_equipamentos = firebase.database()
   .ref('Equipamentos');

/*banco de estoque no firebase*/
var bank_enter = firebase.database()
   .ref('Estoque Bilhetagem Serramar');
/*Fim das configurações do firebase*/

/*vamos fazer a leitura do que tem no banco de dados logo aqui mesmo*/

function read_to_select(){
   //lista_banco = []
   bank_equipamentos.on('child_added', function (snapshot) {
      lista_devices.push(snapshot.val());
   }); 
}



function contador(classe) {
   span_saida.display = 'none'

   /*separando os itens do banco*/
   lista_banco = []
   leitura_data()
   let all = []
   let total = [['Equipamento', 'Quantidade']]
   lista_banco.forEach(eqp => {
      if (eqp[4] == 'Entrada') {
         all.push(eqp[0])
      }
   });

   //conta e coloca em um objeto com nome e quantidade


   var counts = {};
   all.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });

   for (const key in counts) {
      if (counts.hasOwnProperty.call(counts, key)) {
         const valor = counts[key];
         total.push([key, counts[key]])

      }
   }
   /*mudando o layout para apresentação dos totais*/
   let table_total = criarTabela(total);
   let tablettl_style = table_total.style
   tablettl_style.textAlign = 'center'
   span_all.appendChild(table_total)
   let span_geral = document.getElementById('conteudo_estoque').style
   span_geral.display = 'none'
   estoque = document.getElementById(classe).style;//estoque
   controle = document.querySelector('.formulario1').style;
   estoque.display = 'block'
   controle.display = 'none'
   span_totais.display = 'block'
   span_entrada.display = 'none'
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
   matricula = prompt("Para finalizar digite seu nome:")

   if (matricula == '') {
      permissão = 4
   }
   if (matricula == null) {
      permissão = 5
   }


   switch (permissão) {
      case 0:
         save_equipamento(maq, ser, dat, matricula, rotina)

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







/*a função abaixo vai verificar se o item que estamos tentando inserir ja esta no banco de dados
caso positivo, o sistema não deve permitir que o usuario insira-o no estoque*/
function verifica_duplicata(lista, serial, tipo) {
   let obs = false
   let existe = false
   for (let index = 0; index < lista.length; index++) {
      let numero = lista[index][1];
      let transação = lista[index][4]

      if (numero == serial && transação == tipo) {
         obs = true
      }
   }
   if (obs) {
      existe = true
   }
   return existe
}






/*Função para salvar os dados no Firebase */
function save_equipamento(maq, ser, dat, reg, tipo) {

   span_geral.display = 'none'
   leitura_data()
   let status = lista_banco.length
   var newMessageRef = bank_enter.push();
   var eqm = [maq, ser, dat, reg, tipo]
   let exists = verifica_duplicata(lista_banco, ser, tipo)
   /*ação caso exista ou não*/
   if (exists) {
      alert('informação duplicada, verifique o numero serial e tente novamente!')
   } else {
      if (status > 0) {
         newMessageRef.set(
            eqm
         );
      } else {
         head_generator(['equipamento', 'Serial', 'Data', 'Responsavel', 'Transação'], maq, ser, dat, reg, tipo)
      }
      clear_all(tipo)
      informa_atualização()
   }
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
}
/*fim da função que cria o cabeçalho da tabela no banco de dados*/





/*Função para leitura de dados no firebase*/
function leitura_data() {

   span_geral.display = 'block'
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






/*função faz com que a tabela fique vazia*/
function desfazer_tabela(tabela) {

   criarTabela([])

}



/*Função que permite  a apresentação dos dados na tela do usuario*/
function acessar_estoque(classe) {
  
   span_entrada.display = 'none'
   span_geral.display = 'block'
   span_saida.display = 'none'
   span_totais.display = 'none'
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
  
   span_entrada.display = 'none'
   span_geral.display = 'none'
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






/*responsavel por apresentar as saidas recentes, devo armazenar em um local onde 
posso controlar a quantidade de saidas armazenadas*/
function apresenta_saidas(classe) {
   span_entrada.display = 'none'
   span_totais.display = 'none'
   tabela_saida = criarTabela(apenas_saidas())
   span_geral.display = 'none'
   span_exit.appendChild(tabela_saida)
   estoque = document.getElementById(classe).style;//estoque
   controle = document.querySelector('.formulario1').style;
   estoque.display = 'block'
   controle.display = 'none'
   span_saida.display = 'block'
}





/*função utilizada para recolher apenas as entradas de equipamentos*/
function apenas_entradas() {
   leitura_data()
   let lista_entrada = []
   lista_entrada = [['Data', 'Equipamento', 'Serial']]
   lista_banco.forEach(element => {
      if (element[4] == 'Entrada') {
         lista_entrada.push([element[2], element[0], element[1]])
      }
   });

   return lista_entrada
}




/*responsavel por apresentar todas entradas*/
function apresenta_entradas(classe) {
   span_totais.display = 'none'
   span_saida.display = 'none'
   span_totais.display = 'none'
   tabela_entrada = criarTabela(apenas_entradas())
   span_geral.display = 'none'
   span_enter.appendChild(tabela_entrada)
   estoque = document.getElementById(classe).style;//estoque
   controle = document.querySelector('.formulario1').style;
   estoque.display = 'block'
   controle.display = 'none'
   span_entrada.display = 'block'
}


/**faz as leituras iniciais para o sistema funcionar corretamente */
function init_read() {
   leitura_data()
   read_to_select()
   
  
}


/*função para listar as opções do select de equipamentos*/
 function listar_options(){
  var cp =  document.querySelector('.campos')
  let select =  document.createElement('select')
  select.setAttribute('id', 'eqpms')
  //criando os options
  
 lista_devices.forEach(element => {
   let option =document.createElement('option')
   option.text =  element
   select.appendChild(option)
 });
  cp.append(select)
  
 
 }

//rotina de verificação de novos equipamentos no banco
function informa_atualização() {
   alert('Atualize a pagina e veja as alterações mais recentes')
}

