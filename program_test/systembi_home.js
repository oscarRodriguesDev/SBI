/*função para bloqueio dos recursos ainda não disponibilizados*/

function default_event() {
   alert('Este recurso ainda não está disponivel!')
}
/*fim da função de teste de eventos*/
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

/*vamos precisar verificar se usuario esta logado
 para dar acesso a outras funcionalidades do sistema ou não*/

var cli_key =1
//função para mostrar texto do paragrafo 1
function open_text_p1() {
   cli_key+=1
   let item1 = document.getElementById('pragrafo_sbi1').style
   let item2 = document.getElementById('pragrafo_sbi2').style
   let item3 = document.getElementById('pragrafo_sbi3').style
   if(cli_key%2==0){
      item1.display = "block"
      item2.display = "none"
      item3.display = "none"
   }else{
      item1.display = "none"
   }


}

//paragrafo 2

//função para mostrar texto do paragrafo 2
var cli_key2 =1
function open_text_p2() {
   cli_key2+=1
   let item1 = document.getElementById('pragrafo_sbi1').style
   let item2 = document.getElementById('pragrafo_sbi2').style
   let item3 = document.getElementById('pragrafo_sbi3').style
   if(cli_key2%2==0){
      item1.display = "none"
      item2.display = "block"
      item3.display = "none"
   }else{
      item2.display = "none"
   }


}


//função para mostrar texto do paragrafo 3
var cli_key3=1
function open_text_p3() {
   cli_key3+=1
   let item1 = document.getElementById('pragrafo_sbi1').style
   let item2 = document.getElementById('pragrafo_sbi2').style
   let item3 = document.getElementById('pragrafo_sbi3').style
   if(cli_key3%2==0){
      item1.display = "none"
      item2.display = "none"
      item3.display = "block"
   }else{
      item3.display = "none"
   }


}