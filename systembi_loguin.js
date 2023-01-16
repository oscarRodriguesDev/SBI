/*Função responsavel por logar o usuario no sistema e dar acesso as funcionalidades privadas*/

/*verifica se o usuario está logado*/
verifica_loguin()
function verifica_loguin() {
  
  firebase.auth().onAuthStateChanged(function(user) {
    let bloqueio = document.querySelector(".loguin_routine").style
    let style_log =  document.getElementById('sugest_loguin').style
    
    if (user) {
     let status_loguin =  document.getElementById('sugest_loguin')
      status_loguin.innerText  = pegar_usuario() +' conectado'
      bloqueio.display ='none'

    } else {
      let lnk_add_new_device = document.getElementById('lnk_devices')
      let bt_out=  document.getElementById('sugest_logout').style
       bt_out.display =  'none'
        bloqueio.display =  'block'
        style_log.left =  '85%'
        lnk_add_new_device.href = '#'
    }
  });
}


//função para verificar link para criação de novos equipamentos
function verificando_lnk(){
  let lnk_add_new_device = document.getElementById('lnk_devices')
  if(lnk_add_new_device.href=='#'){
    alert('Faça loguin para acessar essa funcionalidade do sistema')
  }

}



function pegar_usuario(){
  const user = firebase.auth().currentUser;
  let email
if (user !== null) {

  email = user.email;
 
  
}
return email
}

function logar() {
 
  
    let bloqueio = document.querySelector(".loguin_routine").style
    var loguin = document.getElementById('user').value
    var senha = document.getElementById('senha').value
    alert("loguin: "+loguin+ " senha: "+senha)
    firebase.auth().signInWithEmailAndPassword(loguin, senha)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    bloqueio.display ='none'
    
    
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(error)
  });
  
}


/*Função responsavel pela rotina de recuperação de senha*/
function memory_pass() {
    alert('realizando rotina de lembrança de senha')
}




/*Função responsavel por iniciar a rotina de loguin quando o usuario desejar */
function chamar_loguin() {
    let bloqueio = document.querySelector(".loguin_routine").style
    bloqueio.display = 'block'
}




/**Função responsavel por cancelar a rotina de loguin iniciada na função chamar loguin */
function cancelar_loguin() {
    let bloqueio = document.querySelector(".loguin_routine").style
    bloqueio.display = 'none'
} 


function logout(){

  firebase.auth().signOut().then(() => {
    alert('Usuario saiu')
    let bt_out=  document.getElementById('sugest_logout').style
    bt_out.display =  'none'
    let status_loguin =  document.getElementById('sugest_loguin')
    status_loguin.innerText  = 'Logar Para ter total acesso?'


  }).catch((error) => {
    // An error happened.
  });
  
}


