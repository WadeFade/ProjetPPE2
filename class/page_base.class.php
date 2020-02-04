<?php

class page_base {
	protected $right_sidebar;
	protected $left_sidebar;
	protected $titre;
	protected $js=array('jquery-3.4.1.min','bootstrap.min');
	protected $css=array('bootstrap.min','perso');
	protected $page;
	protected $metadescription="Bienvenue sur le site de promotion des sites touristiques de FRANCE";
	protected $metakeyword=array('france','site touristique','tourisme','géolocalisation' );
	protected $path='http://localhost/PPE2-EPSI-2019';

	public function __construct() {
		$numargs = func_num_args();
		$arg_list = func_get_args();
        if ($numargs == 1) {
			$this->titre=$arg_list[0];
		}
	}

	public function __set($propriete, $valeur) {
		switch ($propriete) {
			case 'css' : {
				$this->css[count($this->css)+1] = $valeur;
				break;
			}
			case 'js' : {
				$this->js[count($this->js)+1] = $valeur;
				break;
			}
			case 'metakeyword' : {
				$this->metakeyword[count($this->metakeyword)+1] = $valeur;
				break;
			}
			case 'titre' : {
				$this->titre = $valeur;
				break;
			}
			case 'metadescription' : {
				$this->metadescription = $valeur;
				break;
			}
			case 'right_sidebar' : {
				$this->right_sidebar = $this->right_sidebar.$valeur;
				break;
			}
			case 'left_sidebar' : {
				$this->left_sidebar = $this->left_sidebar.$valeur;
				break;
			}
			default:
			{
				$trace = debug_backtrace();
				trigger_error(
            'Propriété non-accessible via __set() : ' . $propriete .
            ' dans ' . $trace[0]['file'] .
            ' à la ligne ' . $trace[0]['line'],
            E_USER_NOTICE);

				break;
			}

		}
	}
	public function __get($propriete) {
		switch ($propriete) {
			case 'titre' :
				{
					return $this->titre;
					break;
				}
				case 'path' :
				{
					return $this->path;
					break;
				}
				default:
			{
				$trace = debug_backtrace();
        trigger_error(
            'Propriété non-accessible via __get() : ' . $propriete .
            ' dans ' . $trace[0]['file'] .
            ' à la ligne ' . $trace[0]['line'],
            E_USER_NOTICE);

				break;
			}
				
		}
	}
	/******************************Gestion du fontawesome*******************************************/
	/* Insertion de fontawesome */
    public function affiche_fontAwesome(){
        echo "<script src='https://kit.fontawesome.com/474f36629d.js' crossorigin='anonymous'></script>";
    }

    /******************************Gestion du fontawesome*******************************************/
    /* Insertion de collapse */
    public function javascriptCollapse(){
        echo "<script src='../js/collapse.js' crossorigin='anonymous'></script>";
    }

	/******************************Gestion des styles **********************************************/
	/* Insertion des feuilles de style */
	private function affiche_style() {
		foreach ($this->css as $s) {
			echo "<link rel='stylesheet'  href='".$this->path."/css/".$s.".css' />\n";
		}

	}
	/******************************Gestion du javascript **********************************************/
	/* Insertion  js */
	private function affiche_javascript() {
		foreach ($this->js as $s) {
			echo "<script src='".$this->path."/js/".$s.".js'></script>\n";
		}
	}
	/******************************affichage metakeyword **********************************************/

	private function affiche_keyword() {
		echo '<meta name="keywords" content="';
		foreach ($this->metakeyword as $s) {
			echo utf8_encode($s).',';
		}
		echo '" />';
	}	
	/****************************** Affichage de la partie entÃªte ***************************************/	
	protected function affiche_entete() {
		echo'
           <header>
				
				<img  class="img-responsive"  width="292" height="136" src="'.$this->path.'/image/logo.jpg" alt="logo" style="float:left;padding: 0 10px 10px 0;"/>
				<h1>
					Sites de france
				</h1>
				<h3>
					<strong>Bienvenue</strong> sur le site de promotion des sites touristiques de FRANCE
				</h3>
             </header>
		';
	}
	/****************************** Affichage du menu ***************************************/	
	
	protected function affiche_menu() {
		echo '
				<ul class="navbar-nav">
					<li class="nav-item active"><a class="nav-link"   href="'.$this->path.'/Accueil" >Accueil </a></li>
					<li class="nav-item active"><a class="nav-link"   href="'.$this->path.'/Nature" >Nature & Environnement </a></li>
					<li class="nav-item active"><a class="nav-link"   href="'.$this->path.'/Galerie" >Galerie </a></li>
				</ul>';
	}
	protected function affiche_menu_connexion() {
		
		if(!(isset($_SESSION['id']) && isset($_SESSION['type'])))
		{	
			echo '
					<ul class="navbar-nav ml-auto">
						<li class="nav-item"><a class="nav-link"  href="'.$this->path.'/Connexion">Connexion</a></li>
					</ul>';
		} 
		else
		{
			echo '
					<ul class="navbar-nav ml-auto">
						<li class="nav-item"><a class="nav-link" href="'.$this->path.'/Deconnexion">Déconnexion</a></li>
					</ul>';
		}
	}
	public function affiche_entete_menu() {
		echo '
		<div style="clear:both;">
			<nav class="navbar navbar-expand-lg bg-dark navbar-dark">
				<!-- Brand -->
				<a class="navbar-brand d-lg-none" href="#">Menu</a>

				<!-- Toggler/collapsibe Button -->
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
					<span class="navbar-toggler-icon"></span>
				</button>

				<!-- Navbar links -->
				<div class="collapse navbar-collapse" id="collapsibleNavbar">

				';
						
	}
	public function affiche_footer_menu(){
		echo '
						
					
				</div>
			</nav>
		</div>
';

	}

		/****************************************** remplissage affichage colonne ***************************/
	public function rempli_right_sidebar() {
		return'

			
				<article>
					<h3>Association de la valorisation des sites touristiques de FRANCE</h3>
										<p>12 rue des gones</br>
										44000 NANTES</br>
										Tel : 02.40.27.11.71</br>
										Mail : avst44@gmai.com</p>
										
											<a  href="Contact" class="button">Contact</a>
                </article>
				';
							
	}
	
	/****************************************** Affichage du pied de la page ***************************/
	private function affiche_footer() {
		echo '
		<!-- Footer -->
			<footer>
				<p>Site de travail EPSI 2019-2020 - PPE2 servant de base à  l\'apprentissage PHP objet - jquery - Ajax  - Bootstrap</p>
				<p id="copyright">
				Mise en page PFR &copy; 2019
				<a href="http://www.epsi.fr/campus/campus-de-nantes/">EPSI NANTES</a> 
				</p>
            </footer>
		';
	}

	/******************************************* Affichage  ***************************************/
    private function affiche_xml($lien){
        $context  = stream_context_create(array('https' => array('header' => 'Accept: application/xml')));
        $url = $lien;
        $xml = file_get_contents($url, false, $context);
        $xml = simplexml_load_string($xml);
        echo "<h1 style='font-size: 1.2em'>".$xml->channel[0]->title[0]."</h1>";
        echo "<div class='card text-white bg-dark m-2 d-flex flex-wrap flex-row'>";
        for($i=0;$i<9;$i++){
            echo "<div class='card-body p-1 m-1' style='width: 45%'>";
            echo "<h3 class='card-title'>".$xml->channel[0]->item[$i]->title[0]."</h3>";
            echo "<a href='".$xml->channel[0]->item[$i]->description[0]."'>Lien</a>";
            echo "<div class='card-text'>".$xml->channel[0]->item[$i]->description[0]. "</div>";
            echo "<div class='d-flex justify-content-end'><img class='card-img-bottom' src='".$xml->channel[0]->item[$i]->enclosure[0]['url']."' alt='image'></div></div>";
        }
        echo "</div>";
    }

    /******************************************* Images *******************************************/
    private function affiche_image(){
        echo "<section class='d-flex flex-row flex-wrap justify-content-center'>
<article class='d-flex m-3' style='width: 30%'><div class='w-100 h-100 bg-secondary align-items-center justify-content-center'>Description</div></article>
<article class='d-flex m-3' style='width: 30%'><img class='w-100' src='image/france/IMAGES%20%20RES/Bassin-dArcachon.jpg' alt='Bassin d\"arcachon'></article>
<article class='d-flex m-3' style='width: 30%'><img class='w-100' src='image/france/IMAGES%20%20RES/Bonifacio.jpg' alt='Bonifacio'></article>
<article class='d-flex m-3' style='width: 30%'><img class='w-100' src='image/france/IMAGES%20%20RES/camargue.jpg' alt='camargue'></article>
<article class='d-flex m-3' style='width: 30%'><img class='w-100' src='image/france/IMAGES%20%20RES/camargue1.jpg' alt='camargue1'></article>
<article class='d-flex m-3' style='width: 30%'><img class='w-100' src='image/france/IMAGES%20%20RES/carcassonne.jpg' alt='carcassonne'></article>
<article class='d-flex m-3' style='width: 30%'><img class='w-100' src='image/france/IMAGES%20%20RES/chateau-de-chambord.jpg' alt='chateau de chambord'></article>
<article class='d-flex m-3' style='width: 30%'><img class='w-100' src='image/france/IMAGES%20%20RES/chateau-de-chenonceau.jpg' alt='chateau de chenonceau'></article>
<article class='d-flex m-3' style='width: 30%'><img class='w-100' src='image/france/IMAGES%20%20RES/Cirque-de-gavarnie.jpg' alt='cirque de gavarnie'></article>
<article class='d-flex m-3' style='width: 30%'><img class='w-100' src='image/france/IMAGES%20%20RES/Gorges-du-Tarn.jpg' alt='gorge du tarn'></article>
<article class='d-flex m-3' style='width: 30%'><img class='w-100' src='image/france/IMAGES%20%20RES/gravures-rupestres-vallee-des-merveilles-region-mont-bego.jpg' alt='gravures rupestres vallee des merveilles region mont bego'></article>
<article class='d-flex m-3' style='width: 30%'><img class='w-100' src='image/france/IMAGES%20%20RES/Mont-saint-michel.jpg' alt='mont saint michel'></article>
<article class='d-flex m-3' style='width: 30%'><img class='w-100' src='image/france/IMAGES%20%20RES/Mont-Saint-Michel_vu_du_ciel.jpg' alt='mont saint michel vu du ciel'></article>
<article class='d-flex m-3' style='width: 30%'><img class='w-100' src='image/france/IMAGES%20%20RES/Orgues_ille_sur_tet.jpg' alt='orgues ille sur tet'></article>
</section>
";
    }
	/********************************************* Fonction permettant l'affichage de la page ****************/

	public function affiche() {
		
		
		?>
			<!DOCCTYPE html>
			<html lang='fr'>
				<head>
                    <a href=""></a>
					<title><?php echo $this->titre; ?></title>
					<meta http-equiv="content-type" content="text/html; charset=utf-8" />
					<meta name="description" content="<?php echo $this->metadescription; ?>" />
					<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
					
					<?php $this->affiche_keyword(); ?>
					<?php $this->affiche_javascript(); ?>
					<?php $this->affiche_style(); ?>
                    <?php $this->affiche_fontAwesome(); ?>
                    <?php $this->javascriptCollapse(); ?>
				</head>
				<body>
				<div class="global">

						<?php $this->affiche_entete(); ?>
						<?php $this->affiche_entete_menu(); ?>
						<?php $this->affiche_menu(); ?>
						<?php $this->affiche_menu_connexion(); ?>
						<?php $this->affiche_footer_menu(); ?>

  						<div style="clear:both;">
    						<div style="float:left;width:75%;">
     							<?php echo $this->left_sidebar; ?>
    						</div>
    						<div style="float:left;width:25%;">
								<?php echo $this->right_sidebar;?>
    						</div>
  						</div>
						<div style="clear:both;">
							<?php $this->affiche_footer(); ?>
						</div>
					</div>
				</body>
			</html>
		<?php
	}
    public function afficheNature() {


        ?>
        <!DOCCTYPE html>
        <html lang='fr'>
        <head>
            <title><?php echo $this->titre; ?></title>
            <meta http-equiv="content-type" content="text/html; charset=utf-8" />
            <meta name="description" content="<?php echo $this->metadescription; ?>" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

            <?php $this->affiche_keyword(); ?>
            <?php $this->affiche_javascript(); ?>
            <?php $this->affiche_style(); ?>
            <?php $this->affiche_fontAwesome(); ?>
        </head>
        <body>
        <div class="global">

            <?php $this->affiche_entete(); ?>
            <?php $this->affiche_entete_menu(); ?>
            <?php $this->affiche_menu(); ?>
            <?php $this->affiche_menu_connexion(); ?>
            <?php $this->affiche_footer_menu(); ?>

            <?php $this->affiche_xml('https://www.sciencesetavenir.fr/nature-environnement/rss.xml'); ?>
            <?php $this->affiche_xml('https://www.lemonde.fr/planete/rss_full.xml'); ?>
            <div style="clear:both;">
                <?php $this->affiche_footer(); ?>
            </div>
        </div>
        </body>
        </html>
        <?php
    }
    public function afficheGalerie() {
        ?>
        <!DOCCTYPE html>
        <html lang='fr'>
        <head>
            <title><?php echo $this->titre; ?></title>
            <meta http-equiv="content-type" content="text/html; charset=utf-8" />
            <meta name="description" content="<?php echo $this->metadescription; ?>" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

            <?php $this->affiche_keyword(); ?>
            <?php $this->affiche_javascript(); ?>
            <?php $this->affiche_style(); ?>
            <?php $this->affiche_fontAwesome(); ?>
            <?php $this->affiche_ ?>
        </head>
        <body>
        <div class="global">

            <?php $this->affiche_entete(); ?>
            <?php $this->affiche_entete_menu(); ?>
            <?php $this->affiche_menu(); ?>
            <?php $this->affiche_menu_connexion(); ?>
            <?php $this->affiche_footer_menu(); ?>

            <?php $this->affiche_image(); ?>

            <div style="clear:both;">
                <?php $this->affiche_footer(); ?>
            </div>
        </div>
        </body>
        </html>
        <?php
    }
}

?>
