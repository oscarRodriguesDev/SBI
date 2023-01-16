



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

/*banco de opções de equipamento no firebase*/
var bank_equipamentos = firebase.database()
   .ref('Equipamentos');
/*Fim das configurações do firebase*/

//de inicio vamos ter uma lista que será adcionada de forma dinamica ao select da pagina
function criar_novo_equipamento() {
   let novo = document.getElementById('text_input')
   var newMessageRef = bank_equipamentos.push();
   if (novo.value == "") {
      alert('Você precisa digitar um valor valido para o equipamento!')
   }else{
      newMessageRef.set(
         novo.value
      );
      alert(novo.value + ' salvo com sucesso')
      novo.value = ''
   }
  
}
   function add_device() {
      let novo = document.getElementById('text_input').value
      let equipamentos = read_to_select()
      valor =  equipamentos.includes(novo)
      if(valor==false){
         criar_novo_equipamento()

      }else{
         alert('O equipamento informado ja esta cadastrado no sistema!')
         novo.value = ''
      }
      }
      

   


document.addEventListener('keypress', function(e){
   if(e.which == 13){
     criar_novo_equipamento()
   }
}, false);

//função para ler os queipamentos gravados no banco
function read_to_select(){
   let lista=[]
   bank_equipamentos.on('child_added', function (snapshot) {
      lista.push(snapshot.val());
   });
   return lista 
}
