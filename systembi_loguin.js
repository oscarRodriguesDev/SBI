/*Função responsavel por logar o usuario no sistema e dar acesso as funcionalidades privadas*/

function logar() {
 
  
    let bloqueio = document.querySelector(".loguin_routine").style
    var loguin = document.getElementById('user').value
    var senha = document.getElementById('senha').value
    alert("loguin: "+loguin+ " senha: "+senha)
    firebase.auth().signInWithEmailAndPassword(loguin, senha)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log('permissed')
    
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
