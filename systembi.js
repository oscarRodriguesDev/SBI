//arquivo javascript
let matricula = ""

/*essa função serve para limpar o campo de texto na pagina de controle de estoque*/
function clear_all(decisão) {

 var select = document.getElementById("eqpms");
 var equipamento = select.options[select.selectedIndex].text;

 var text = document.getElementById("serial");
 var serial = text.value

 var data = document.getElementById("data");
    var StringData =data.value; 
  if( decisão=="entrada"){
  	 matricula=  prompt("Para finalizar digite sua matricula:")
	alert(equipamento +  " foi adcionado com sucesso por "+ matricula)

}else{
	 matricula=  prompt("Para finalizar digite sua matricula:")


  alert(equipamento +  " foi retirado com sucesso por "+ matricula)
 }
	
	select.selectedIndex = 0//define o painel inicial
	text.value = ""
	/*tenho a data atual caso eu desista de pegar pelo formulario*/
	const hoje = new Date();
	var dia =  hoje.getDate()
    var mes =  hoje.getMonth()+1
    var ano =  hoje.getFullYear()
	data.value = "dd/mm/aaaa"
	

}
//preciso criar uma função que analise se os campos informados estã devidamente preenchidos

function ver_event() {
alert('escutando eventos')
}

/*função para acesso ao estoque armazenado*/
function acessar_estoque(classe) {
   
   estoque = document.getElementById(classe).style;//estoque
   controle =document.querySelector('.formulario1').style;
   estoque.display = 'block'
   controle.display= 'none'
  

}

   function acessar_controle(classe) {

   controle =document.querySelector(classe).style;
   estoque = document.getElementById('estoque').style;//estoque
   controle.display='block'
   estoque.display='none'

   	
   	
  
   }


 