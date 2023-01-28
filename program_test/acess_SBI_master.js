
/*Todas a configuração necessario para que o firebase funcione*/
var noerror = true;
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

//instancia para autentificação
const provider = new firebase.auth.GoogleAuthProvider();

//preciso de uma banco de dados para associar o email com usuarios
var bd_associate_user = firebase.database().ref('SBI/User_Emails');


//preciso criar o novo usuario e ja associar no banco de dados o usuario e emais cadastrado
function create_user() {
    //rotinas
    //verificar se o usuario usuario que estou criando é unico
    //verificar se o email utilizado é unico
    //capturar as informações da pagina
    let email = document.getElementById('email_creator').value
    let usuario = document.getElementById('user_creator').value
    let senha_bis = document.getElementById('replaypass').value
    let senha = document.getElementById('senha_creator').value
    //criação do loguin:

    criar_loguin2(email, senha)
    if (!noerror) {
        console.log('Não foi possivel criar loguin, pois houve um problema ao criar o usuario informado')

    } else {

        if (email != null || usuario != null||senha==senha_bis ) {
            
            var newMessageRef = bd_associate_user.push();
            dict = { email,usuario }
            newMessageRef.set(
                dict
            );
            
            alert('Novo usuário adcionado com sucesso!')
            //location.reload()
        } else {
            alert('Algo não saiu como esperado, revise os campos antes de continuar!')
        }
    }
}

function cancel_create() {
    alert('rotina de cancelamento de criaçãod e novos usuarios')
}


//criação do loguin para o usuario sem registro de data e hora
function criar_loguin(email, senha) {
    firebase.auth().createUserWithEmailAndPassword(email, senha)
        .catch(error => {

            noerror = false
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error)

        });
      
}

//criação do loguin para o usuario com regitro de data e hora 
function criar_loguin2(email, senha) {
    firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then(function(userCredential) {
      var user = userCredential.user;
      var date = new Date();
      user.updateProfile({
        metadata: {
          creationTime: date.getTime()
        }
      });
    })
    .catch(function(error) {
      // handle error
    });
   
      
}