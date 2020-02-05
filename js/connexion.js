$( document ).ready(function() {
	$("#myModal").modal();

	$("#login").validate({
		rules: {
			id: {required: true, minlength: 2},
			mp: {required: true, minlength: 2},
			rblogin: {required: true},

		},
		messages: {
			id: {
				required: "Vous devez saisir un identifiant valide !"
			},
			mp: {
				required: "Vous devez saisir un mot de passe valide"
			},
			rblogin: {
				required: "Vous devez choisir une option"
			}
		}
	});

	$("#login").submit(function( e ) {
		e.preventDefault();
		alert("submit");
		if ($("#login").valid()) {
			alert("ok");
		}
		else {
			alert("ko");
		}
	});




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








