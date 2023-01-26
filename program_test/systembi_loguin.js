/*Função responsavel por logar o usuario no sistema e dar acesso as funcionalidades privadas*/

/*verifica se o usuario está logado*/

verifica_loguin()
function verifica_loguin() {
  
  firebase.auth().onAuthStateChanged(function(user) {
    let bloqueio = document.querySelector(".loguin_routine").style
    let style_log =  document.getElementById('sugest_loguin').style
    let logon =  document.getElementById('sugest_loguin')
    
    if (user) {
      bloqueio.display ='none'
      pegar_usuario()
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
  let user_list
  let status_loguin =  document.getElementById('sugest_loguin')
  let userName = firebase.database().ref('User_Emails');
  if (user !== null) {
    email = user.email
    userName.on('child_added', function (snapshot){
      user_list = snapshot.val()
      if(user_list['email']==email){
      status_loguin.innerText  = 'Ola '+ user_list['usuario']
      status_loguin.setAttribute('onclick',null)
      }else{
       //console.log('conectando')
      }
    });
  }
}

function logar(){
    let bloqueio = document.querySelector(".loguin_routine").style
    var loguin = document.getElementById('user').value
    var senha = document.getElementById('senha').value
    firebase.auth().signInWithEmailAndPassword(loguin, senha)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    bloqueio.display ='none'
    alert('Conectado com sucesso!')
    window.location.reload()
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    document.getElementById('user').value = ''
    document.getElementById('senha').value =''
    console.log(error)
    alert('Não foi possivel efetuar o Loguin, usuario ou senha incorretos, tente novamente!')
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



//função para deslogar do sistema
function logout(){
  let escolha = confirm('Deseja mesmo sair?')
  if(escolha){
  firebase.auth().signOut().then(() => {
    alert('Até a proxima!')
    let bt_out=  document.getElementById('sugest_logout').style
    bt_out.display =  'none'
    let status_loguin =  document.getElementById('sugest_loguin')
    status_loguin.innerText  = 'Logar Para ter total acesso?'
    window.location.reload()
  }).catch((error) => {
    alert('Ocorreu um erro ao tentar sair!')
  });  
 
}else{
  alert('Usuário ainda está logado!')
}
}


document.addEventListener('keypress', function(e){
  if(e.which == 13){
    logar()
  }
}, false);