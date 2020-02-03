$( document ).ready(function() {
$("#myModal").modal();
});

function hdModalRetour(){
	$("#ModalRetour").modal("hide");
	document.location.href="Accueil";
}
function hd(){
	document.location.href="Accueil";
	$("#myModal").modal("hide");
	 var instances = $.tooltipster.instances();
	 $.each(instances, function(i, instance){
	     instance.close();
	 });
	 
}





