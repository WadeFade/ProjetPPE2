<?php
	session_start();
	include_once('class/autoload.php');
	$site = connexsecurise();
	$controleur=new controleur();
	$request = strtolower($_SERVER['REQUEST_URI']);
	$params = explode('/', trim($request, '/'));
    $params = array_filter($params);
	if (!isset($params[1]))
	{
		$params[1]='accueil';
	}
	switch ($params[1]) {
		case 'accueil' :
			$site->titre='Accueil';
			$site->js='collapse';
			$site->global=$controleur->retourne_caroussel();

			$site-> right_sidebar=$site->rempli_right_sidebar();
			$site-> left_sidebar=$controleur->retourne_article($site->titre);
			$site->affiche();
			break;
		case 'connexion' :
			$site->titre='Connexion';
			$site->js='jquery.validate.min';
			$site->js='messages_fr';
			$site->js='tooltipster.bundle.min';
			$site->js='connexion';
			$site->js='all';
			$site->css='tooltipster.bundle.min';
			$site->css='all';
			$site->css='tooltipster-sideTip-light.min';
			$site-> right_sidebar=$site->rempli_right_sidebar();
			$site-> left_sidebar=$controleur->retourne_formulaire_login();
			$site-> left_sidebar=$controleur->retourne_modal_message();
			$site->affiche();
			break;
        case 'nature':
            $site->titre='Nature';
            $site->global=$controleur->retourne_xml('https://www.sciencesetavenir.fr/nature-environnement/rss.xml');
            $site->global=$controleur->retourne_xml('https://www.lemonde.fr/planete/rss_full.xml');
            $site->affiche();
            break;
        case 'galerie':
            $site->titre='Galerie';
            $site->global=$controleur->retourne_image();
            $site->affiche();
            break;
		case 'deconnexion' :
			$_SESSION=array();
			session_destroy();
			echo '<script>document.location.href="Accueil"; </script>';
			break;
        case 'departement' :
            $site->titre='Département';
            $site->js='jquery.dataTables.min';
            $site->js='dataTables.bootstrap4.min';
            $site->js='departement';
            $site->css='dataTables.bootstrap4.min';
            $site->global=$controleur->retourne_tableau();
            $site->affiche();
            break;
		default: 
			$site->titre='Accueil';
			$site-> right_sidebar=$site->rempli_right_sidebar();
			$site-> left_sidebar='<img src="'.$site->path.'/image/erreur-404.png" alt="Erreur de liens">';
			$site->affiche();
			break;
	}
	function connexsecurise(){
	    if(isset($_SESSION["id"])&& isset($_SESSION["type"])){
	        if ($_SESSION["type"]==3){
	            $x = new page_base_journaliste();

            } else {
	            $x = new page_base();
            }

        } else {
            $x = new page_base();
        }

	    return $x;
    }
?>