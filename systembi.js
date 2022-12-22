/*Função de teste para ver se os elementos estão respondendo a eventos*/
function ver_event() {
   alert('escutando eventos')
}
/*fim da função de teste de eventos*/ 




var message = []

lista_banco =[]


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
   .ref('inventary');
/*Fim das configurações do firebase*/





/*Função para pegar os dados informados pelo usuario*/
function pega_data(rotina) { //se é entrada ou saida
   //equipamento
   var select = document.getElementById("eqpms");
   var maq = select.options[select.selectedIndex].text;
   //serial
   var text = document.getElementById("serial");
   var ser = text.value
   //data
   var data = document.getElementById("data");
   var dat = data.value;
   //matricula
   matricula = prompt("Para finalizar digite sua matricula:")
   save_equipamento(maq, ser, dat, matricula, rotina)
   clear_all(rotina)
}
/*fim dos dados que serão gravados*/






/*Função para salvar os dados no Firebase */
function save_equipamento(maq, ser, dat, reg, tipo) {
  leitura_data()
  let status =lista_banco.length
 

   var newMessageRef = bank_enter.push();
   var eqm =  [maq,ser,dat,reg,tipo]
   
 
  if(status>0){
      newMessageRef.set(
         eqm
        ); 
      }else{
       
       head_generator(['equipamento','Serial','Data','Responsavel','Transação'],maq,ser,dat,reg,tipo)
      
      }
      if(tipo=='Entrada'){

         //mostrar mensagem de entrada de equipamento
         alert(maq +' foi adcionado ao estoque com sucesso por ' + reg)
         clear_all(tipo)
      }else{
         //mostrar mensagem de saida de equipamento
         alert(maq +' foi retirado do estoque com sucesso por ' + reg)
         clear_all(tipo)
      }
     
   } 

/*Fim da função para salvar dados no firebase*/




/*Função para salvar o cabeçalho da tabela no banco de dados*/
function head_generator(heads,maq,ser,dat,reg,tipo) {
   var eqm =  [maq,ser,dat,reg,tipo]
   alert('Seu espaço de estoque ainda não foi criado, mas não se preocupe estaremos criando para você agora!')
   var newMessageRef = bank_enter.push();
      newMessageRef.set(
         heads
         ); 
        alert('seu espaço de estoque foi criado com sucesso! A seguir vamos adcionar seus primeiros equipamentos!')
       save_equipamento(maq,ser,dat,reg,tipo)
       
}
/*fim da função que cria o cabeçalho da tabela no banco de dados*/





/*Função para leitura de dados no firebase*/
function leitura_data() {

   lista_banco = []
   bank_enter.on('child_added', function (snapshot) { 
   lista_banco.push(snapshot.val());
  
   });
 
}
/*Fim da função para leitura de dados no firebase*/






/*Funçaõ que cria uma tabela para apresentação de dados na tela do usuario*/
function apresentarData(dados) {

  var sp = document.getElementById('conteudo_estoque')
  tabela =  criarTabela(dados)
  sp.appendChild(tabela)
}
/*Fim da função para apresentação de dados*/



setTimeout(acessar_estoque, 1000);


/*Função que permite  a apresentação dos dados na tela do usuario*/
function acessar_estoque(classe) {
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
   data.value = "dd/mm/aaaa"
}
/*Fim da função que limpa os campos do formulario para novas inserções*/




function criarTabela(conteudo) {
  var tabela = document.createElement("table");
  var thead = document.createElement("thead");
  var tbody=document.createElement("tbody");
  var thd=function(i){return (i==0)?"th":"td";};
  for (var i=0;i<conteudo.length;i++) {
    var tr = document.createElement("tr");
    for(var o=0;o<conteudo[i].length;o++){
      var t = document.createElement(thd(i));
      var texto=document.createTextNode(conteudo[i][o]);
      t.appendChild(texto);
      tr.appendChild(t);
    }
    (i==0)?thead.appendChild(tr):tbody.appendChild(tr);
  }
  tabela.appendChild(thead);
  tabela.appendChild(tbody);
  tabela.setAttribute('id','tabela_estoque')

  
  return tabela;
}