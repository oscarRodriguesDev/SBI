
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

var messagesRef = firebase.database()
   .ref('inventary');


/*preciso pegar os datdos que vou gravar*/
//numero do painel
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

   save_equipamento(maq,ser,dat,matricula)
   clear_all(rotina)
   
  
}

/*fim dos dados que serão gravados*/

// Salavando o estoque no firebase
function save_equipamento(maq, ser, dat, reg) {
   var newMessageRef = messagesRef.push();
   newMessageRef.set({
      Equipamento: maq,
      Serial: ser,
      Data: dat,
      Responsavel: reg
   });
}
/*essa função serve para limpar o campo de texto na pagina de controle de estoque*/
function clear_all(decisão) {

   var select = document.getElementById("eqpms");
   var equipamento = select.options[select.selectedIndex].text;

   var text = document.getElementById("serial");
   var serial = text.value



   var data = document.getElementById("data");
   var StringData = data.value;
   if (decisão == "entrada") {
      
      alert(equipamento + " foi adcionado com sucesso por " + matricula)

   } else {
      matricula = prompt("Para finalizar digite sua matricula:")


      alert(equipamento + " foi retirado com sucesso por " + matricula)
   }

   select.selectedIndex = 0//define o painel inicial
   text.value = ""
   /*tenho a data atual caso eu desista de pegar pelo formulario*/
   const hoje = new Date();
   var dia = hoje.getDate()
   var mes = hoje.getMonth() + 1
   var ano = hoje.getFullYear()
   data.value = "dd/mm/aaaa"


}
//preciso criar uma função que analise se os campos informados estã devidamente preenchidos

function ver_event() {
   alert('escutando eventos')
}

/*função para acesso ao estoque armazenado*/
function acessar_estoque(classe) {

   estoque = document.getElementById(classe).style;//estoque
   controle = document.querySelector('.formulario1').style;
   estoque.display = 'block'
   controle.display = 'none'


}

function acessar_controle(classe) {

   controle = document.querySelector(classe).style;
   estoque = document.getElementById('estoque').style;//estoque
   controle.display = 'block'
   estoque.display = 'none'




}


