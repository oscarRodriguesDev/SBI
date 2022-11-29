//arquivo javascript
//alert('Bem vindo ao SBI!')

/*essa função serve para limpar o campo de texto na pagina de controle de estoque*/
function clear_all(decisão) {
	//alert('botão pressionado!' + decisão)
	var select = document.getElementById("eqpms");
 var equipamento = select.options[select.selectedIndex].text;

 var text = document.getElementById("serial");
 var serial = text.value

 var teste = document.getElementById("data");
    var StringData =teste.value; 
  if( decisão=="entrada"){
	alert(equipamento +  " foi adcionado com sucesso!")
}else{
  alert(equipamento + " foi retirado do estoque")
}
	document.location.reload(true);
}
