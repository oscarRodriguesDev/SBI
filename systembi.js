//arquivo javascript
//alert('Bem vindo ao SBI!')

/*essa função serve para limpar o campo de texto na pagina de controle de estoque*/
function clear_all(decisão) {
	//alert('botão pressionado!' + decisão)
	var select = document.getElementById("eqpms");
 var equipamento = select.options[select.selectedIndex].text;

 var text = document.getElementById("serial");
 var serial = text.value

 var data = document.getElementById("data");
    var StringData =data.value; 
  if( decisão=="entrada"){
	alert(equipamento +  " foi adcionado com sucesso!")
}else{
  alert(equipamento + " foi retirado do estoque")
}
	
	select.selectedIndex = 0//define o painel inicial
	text.value = ""
	/*tenho a data atual caso eu desista de pegar pelo formulario*/
	const hoje = new Date();
	var dia =  hoje.getDate()
    var mes =  hoje.getMonth()+1
    var ano =  hoje.getFullYear()
	
	alert(dia)
	alert(mes)
	alert(ano)
	data.value = "dd/mm/aaaa"
	

}
