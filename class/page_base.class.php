<?php

class page_base
{
    protected $right_sidebar;
    protected $left_sidebar;
    protected $titre;
    protected $js = array('jquery-3.4.1.min', 'bootstrap.min');
    protected $css = array('bootstrap.min', 'perso');
    protected $page;
    protected $metadescription = "Bienvenue sur le site de promotion des sites touristiques de FRANCE";
    protected $metakeyword = array('france', 'site touristique', 'tourisme', 'géolocalisation');
    protected $path = 'http://localhost/PPE2-EPSI-2019';

    public function __construct()
    {
        $numargs = func_num_args();
        $arg_list = func_get_args();
        if ($numargs == 1) {
            $this->titre = $arg_list[0];
        }
    }

    public function __set($propriete, $valeur)
    {
        switch ($propriete) {
            case 'css' :
            {
                $this->css[count($this->css) + 1] = $valeur;
                break;
            }
            case 'js' :
            {
                $this->js[count($this->js) + 1] = $valeur;
                break;
            }
            case 'metakeyword' :
            {
                $this->metakeyword[count($this->metakeyword) + 1] = $valeur;
                break;
            }
            case 'titre' :
            {
                $this->titre = $valeur;
                break;
            }
            case 'metadescription' :
            {
                $this->metadescription = $valeur;
                break;
            }
            case 'right_sidebar' :
            {
                $this->right_sidebar = $this->right_sidebar . $valeur;
                break;
            }
            case 'left_sidebar' :
            {
                $this->left_sidebar = $this->left_sidebar . $valeur;
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

    public function __get($propriete)
    {
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
    public function affiche_fontAwesome()
    {
        echo "<script src='https://kit.fontawesome.com/474f36629d.js' crossorigin='anonymous'></script>";
    }

    /******************************Gestion du fontawesome*******************************************/
    /* Insertion de collapse */
    public function javascriptCollapse()
    {
        echo "<script src='../js/collapse.js' crossorigin='anonymous'></script>";
    }

    /******************************Gestion des styles **********************************************/
    /* Insertion des feuilles de style */
    private function affiche_style()
    {
        foreach ($this->css as $s) {
            echo "<link rel='stylesheet'  href='" . $this->path . "/css/" . $s . ".css' />\n";
        }

    }
    /******************************Gestion du javascript **********************************************/
    /* Insertion  js */
    private function affiche_javascript()
    {
        foreach ($this->js as $s) {
            echo "<script src='" . $this->path . "/js/" . $s . ".js'></script>\n";
        }
    }

    /******************************affichage metakeyword **********************************************/

    private function affiche_keyword()
    {
        echo '<meta name="keywords" content="';
        foreach ($this->metakeyword as $s) {
            echo utf8_encode($s) . ',';
        }
        echo '" />';
    }

    /****************************** Affichage de la partie entÃªte ***************************************/
    protected function affiche_entete()
    {
        echo '
           <header>
				
				<img  class="img-responsive"  width="292" height="136" src="' . $this->path . '/image/logo.jpg" alt="logo" style="float:left;padding: 0 10px 10px 0;"/>
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

    protected function affiche_menu()
    {
        echo '
				<ul class="navbar-nav">
					<li class="nav-item active"><a class="nav-link"   href="' . $this->path . '/Accueil" >Accueil </a></li>
					<li class="nav-item active"><a class="nav-link"   href="' . $this->path . '/Nature" >Nature & Environnement </a></li>
					<li class="nav-item active"><a class="nav-link"   href="' . $this->path . '/Galerie" >Galerie </a></li>
				</ul>';
    }

    protected function affiche_menu_connexion()
    {

        if (!(isset($_SESSION['id']) && isset($_SESSION['type']))) {
            echo '
					<ul class="navbar-nav ml-auto">
						<li class="nav-item"><a class="nav-link"  href="' . $this->path . '/Connexion">Connexion</a></li>
					</ul>';
        } else {
            echo '
					<ul class="navbar-nav ml-auto">
						<li class="nav-item"><a class="nav-link" href="' . $this->path . '/Deconnexion">Déconnexion</a></li>
					</ul>';
        }
    }

    public function affiche_entete_menu()
    {
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

    public function affiche_footer_menu()
    {
        echo '
						
					
				</div>
			</nav>
		</div>
';

    }

    /****************************************** remplissage affichage colonne ***************************/
    public function rempli_right_sidebar()
    {
        return '

			
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
    private function affiche_footer()
    {
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
    private function affiche_xml($lien)
    {
        $context = stream_context_create(array('https' => array('header' => 'Accept: application/xml')));
        $url = $lien;
        $xml = file_get_contents($url, false, $context);
        $xml = simplexml_load_string($xml);
        echo "<h1 style='font-size: 1.2em'>" . $xml->channel[0]->title[0] . "</h1>";
        echo "<div class='card text-white bg-dark m-2 d-flex flex-wrap flex-row'>";
        for ($i = 0; $i < 9; $i++) {
            echo "<div class='card-body p-1 m-1' style='width: 45%'>";
            echo "<h3 class='card-title'>" . $xml->channel[0]->item[$i]->title[0] . "</h3>";
            echo "<a href='" . $xml->channel[0]->item[$i]->description[0] . "'>Lien</a>";
            echo "<div class='card-text'>" . $xml->channel[0]->item[$i]->description[0] . "</div>";
            echo "<div class='d-flex justify-content-end'><img class='card-img-bottom' src='" . $xml->channel[0]->item[$i]->enclosure[0]['url'] . "' alt='image'></div></div>";
        }
        echo "</div>";
    }

    /******************************************* Images *******************************************/
    private function affiche_image()
    {
        echo "<section class='d-flex flex-row flex-wrap justify-content-center'>
        <article class='d-flex m-3' style='width: 30%'>
                <div class='position-relative d-flex w-100 h-100 align-items-center justify-content-end'>
                <img class='img-fluid w-100' src='image/france/IMAGES%20%20RES/Bassin%20arcahon.jpg' alt='Bassin d\"arcachon'>
                <div class='ImageGalerie position-absolute d-flex bg-secondary w-100 h-100 text-center justify-content-center align-items-center' style='opacity: 1%' onmouseover='this.style.opacity=\"80%\"'; onmouseleave='this.style.opacity=\"0\"''>
                    <p class='d-flex text-white'>
                        La vallée des Merveilles est une vallée du massif du Mercantour dans les Alpes où ont été découvertes plus de 40 500 gravures rupestres protohistoriques, 
                        datant du Chalcolithique et de l’âge du bronze ancien, au milieu d’autres gravures plus récentes
                        Les gravures rupestres, au nombre d’environ 100 000 dont 37 000 figuratives, concernent 
                        3 700 roches couvrant près de 1 400 ha répartis dans un ensemble plus vaste de 4 000 ha.
                    </p>
                    </div>
                    <div class=\"position-absolute w-10 h-100 d-flex flex-column justify-content-end\" style='top:0'>
                    <button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#exampleModalLong\">
                        Launch demo modal
                    </button>
                            <div class=\"modal fade\" id=\"exampleModalLong\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLongTitle\" aria-hidden=\"true\">
                              <div class=\"modal-dialog\" role=\"document\">
                                <div class=\"modal-content\">
                                  <div class=\"modal-header\">
                                    <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Modal title</h5>
                                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">
                                      <span aria-hidden=\"true\">&times;</span>
                                    </button>
                                  </div>
                                  <div class=\"modal-body\">
                                    L’architecture du Mont-Saint-Michel et sa baie en font le site touristique le plus fréquenté de Normandie1 et l'un des dix plus fréquentés en France
                                    En 1846, Édouard Le Héricher le décrivait ainsi : « Le Mont Saint-Michel apparaît 
                                    comme une montagne circulaire qui semble s’affaisser sous la pyramide monumentale qui la couronne.
                                  </div>
                                  <div class=\"modal-footer\">
                                    <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>
                                  </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </article>
        
        <article class='d-flex m-3' style='width: 30%'>
            <div class='position-relative d-flex w-100 h-100 align-items-center justify-content-end'>
            <img class='img-fluid w-100' src='image/france/IMAGES%20%20RES/Bassin-dArcachon.jpg' alt='Bassin d\"arcachon'>
                <div class='ImageGalerie position-absolute d-flex bg-secondary w-100 h-100 text-center justify-content-center align-items-center' style='opacity: 1%' onmouseover='this.style.opacity=\"80%\"'; onmouseleave='this.style.opacity=\"0\"''>
                    <p class='d-flex text-white'>
                        L’architecture du Mont-Saint-Michel et sa baie en font le site touristique le plus fréquenté de Normandie1 et l'un des dix plus fréquentés en France
                        En 1846, Édouard Le Héricher le décrivait ainsi : « Le Mont Saint-Michel apparaît 
                        comme une montagne circulaire qui semble s’affaisser sous la pyramide monumentale qui la couronne.
                    </p>
                </div>
                <div class=\"position-absolute w-10 h-100 d-flex flex-column justify-content-end\" style='top:0'>
                    <button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#exampleModalLong\">
                        Launch demo modal
                    </button>
                            <div class=\"modal fade\" id=\"exampleModalLong\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLongTitle\" aria-hidden=\"true\">
                              <div class=\"modal-dialog\" role=\"document\">
                                <div class=\"modal-content\">
                                  <div class=\"modal-header\">
                                    <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Modal title</h5>
                                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">
                                      <span aria-hidden=\"true\">&times;</span>
                                    </button>
                                  </div>
                                  <div class=\"modal-body\">
                                    L’architecture du Mont-Saint-Michel et sa baie en font le site touristique le plus fréquenté de Normandie1 et l'un des dix plus fréquentés en France
                                    En 1846, Édouard Le Héricher le décrivait ainsi : « Le Mont Saint-Michel apparaît 
                                    comme une montagne circulaire qui semble s’affaisser sous la pyramide monumentale qui la couronne.
                                  </div>
                                  <div class=\"modal-footer\">
                                    <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>
                                  </div>
                            </div>
                        </div>
                    </div>
            </div>
        </article>
        
        <article class='d-flex m-3' style='width: 30%'>
            <div class='position-relative d-flex w-100 h-100 align-items-center justify-content-end'>
            <img class='img-fluid w-100' src='image/france/IMAGES%20%20RES/Bonifacio.jpg' alt='Bonifacio'>
                <div class='ImageGalerie position-absolute d-flex bg-secondary w-100 h-100 text-center justify-content-center align-items-center' style='opacity: 1%' onmouseover='this.style.opacity=\"80%\"'; onmouseleave='this.style.opacity=\"0\"''>
                    <p class='d-flex text-white'>
                        La citadelle de Bonifacio est un ouvrage militaire bâti progressivement à partir du xiie siècle pour permettre la protection de 
                        Bonifacio qui est une place importante de la République de Gênes pour la sécurité de son commerce entre Gênes, la Ligurie, et la Sardaigne et pour permettre le contrôle des Bouches de Bonifacio.
                    </p>
                </div>
                <div class=\"position-absolute w-10 h-100 d-flex flex-column justify-content-end\" style='top:0'>
                    <button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#exampleModalLong\">
                        Launch demo modal
                    </button>
                            <div class=\"modal fade\" id=\"exampleModalLong\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLongTitle\" aria-hidden=\"true\">
                              <div class=\"modal-dialog\" role=\"document\">
                                <div class=\"modal-content\">
                                  <div class=\"modal-header\">
                                    <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Modal title</h5>
                                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">
                                      <span aria-hidden=\"true\">&times;</span>
                                    </button>
                                  </div>
                                  <div class=\"modal-body\">
                                    L’architecture du Mont-Saint-Michel et sa baie en font le site touristique le plus fréquenté de Normandie1 et l'un des dix plus fréquentés en France
                                    En 1846, Édouard Le Héricher le décrivait ainsi : « Le Mont Saint-Michel apparaît 
                                    comme une montagne circulaire qui semble s’affaisser sous la pyramide monumentale qui la couronne.
                                  </div>
                                  <div class=\"modal-footer\">
                                    <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>
                                  </div>
                            </div>
                        </div>
                    </div>
            </div>
        </article>
        
        <article class='d-flex m-3' style='width: 30%'>
            <div class='position-relative d-flex w-100 h-100 align-items-center justify-content-end'>
            <img class='img-fluid w-100' src='image/france/IMAGES%20%20RES/camargue.jpg' alt='camargue'>
                <div class='ImageGalerie position-absolute d-flex bg-secondary w-100 h-100 text-center justify-content-center align-items-center' style='opacity: 1%' onmouseover='this.style.opacity=\"80%\"'; onmouseleave='this.style.opacity=\"0\"''>
                    <p class='d-flex text-white'>
                        L’un des paysages les plus spectaculaires de France
                        Né au Mont Lozère, le Tarn descend les Cévennes d’un jet torrentueux qui a creusé un canyon très profond dans la dalle des Grands Causses. Falaises atteignant 500 m de haut, brèches, corniches et rochers … les gorges du Tarn offrent leur plus beau spectacle entre Quézac (Lozère) et Le Rozier (Aveyron), sur environ 50 km.
                    </p>
                </div>
                <div class=\"position-absolute w-10 h-100 d-flex flex-column justify-content-end\" style='top:0'>
                    <button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#exampleModalLong\">
                        Launch demo modal
                    </button>
                            <div class=\"modal fade\" id=\"exampleModalLong\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLongTitle\" aria-hidden=\"true\">
                              <div class=\"modal-dialog\" role=\"document\">
                                <div class=\"modal-content\">
                                  <div class=\"modal-header\">
                                    <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Modal title</h5>
                                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">
                                      <span aria-hidden=\"true\">&times;</span>
                                    </button>
                                  </div>
                                  <div class=\"modal-body\">
                                    L’architecture du Mont-Saint-Michel et sa baie en font le site touristique le plus fréquenté de Normandie1 et l'un des dix plus fréquentés en France
                                    En 1846, Édouard Le Héricher le décrivait ainsi : « Le Mont Saint-Michel apparaît 
                                    comme une montagne circulaire qui semble s’affaisser sous la pyramide monumentale qui la couronne.
                                  </div>
                                  <div class=\"modal-footer\">
                                    <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>
                                  </div>
                            </div>
                        </div>
                    </div>
            </div>
        </article>
        
        <article class='d-flex m-3' style='width: 30%'>
            <div class='position-relative d-flex w-100 h-100 align-items-center justify-content-end'>
            <img class='img-fluid w-100' src='image/france/IMAGES%20%20RES/camargue1.jpg' alt='camargue1'>
                <div class='ImageGalerie position-absolute d-flex bg-secondary w-100 h-100 text-center justify-content-center align-items-center' style='opacity: 1%' onmouseover='this.style.opacity=\"80% \"'; onmouseleave='this.style.opacity=\"0\"''>
                    <p class='d-flex text-white'>
                        L’un des paysages les plus spectaculaires de France
                        Né au Mont Lozère, le Tarn descend les Cévennes d’un jet torrentueux qui a creusé un canyon très profond dans la dalle des Grands Causses. 
                        Falaises atteignant 500 m de haut, brèches, corniches et rochers … les gorges du Tarn offrent leur plus beau spectacle entre Quézac (Lozère) et Le Rozier (Aveyron), sur environ 50 km.
                    </p>
                </div>
                <div class=\"position-absolute w-10 h-100 d-flex flex-column justify-content-end\" style='top:0'>
                    <button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#exampleModalLong\">
                        Launch demo modal
                    </button>
                            <div class=\"modal fade\" id=\"exampleModalLong\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLongTitle\" aria-hidden=\"true\">
                              <div class=\"modal-dialog\" role=\"document\">
                                <div class=\"modal-content\">
                                  <div class=\"modal-header\">
                                    <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Modal title</h5>
                                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">
                                      <span aria-hidden=\"true\">&times;</span>
                                    </button>
                                  </div>
                                  <div class=\"modal-body\">
                                    L’architecture du Mont-Saint-Michel et sa baie en font le site touristique le plus fréquenté de Normandie1 et l'un des dix plus fréquentés en France
                                    En 1846, Édouard Le Héricher le décrivait ainsi : « Le Mont Saint-Michel apparaît 
                                    comme une montagne circulaire qui semble s’affaisser sous la pyramide monumentale qui la couronne.
                                  </div>
                                  <div class=\"modal-footer\">
                                    <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>
                                  </div>
                            </div>
                        </div>
                    </div>
            </div>
        </article>
        
        <article class='d-flex m-3' style='width: 30%'>
            <div class='position-relative d-flex w-100 h-100 align-items-center justify-content-end'>
            <img class='img-fluid w-100' src='image/france/IMAGES%20%20RES/carcassonne.jpg' alt='camargue1'>
                <div class='ImageGalerie position-absolute d-flex bg-secondary w-100 h-100 text-center justify-content-center align-items-center' style='opacity: 1%' onmouseover='this.style.opacity=\"80% \"'; onmouseleave='this.style.opacity=\"0\"''>
                    <p class='d-flex text-white'>
                        Le château de Chenonceau est un château de la Loire situé en Touraine, sur la commune de Chenonceaux, dans le département d'Indre-et-Loire en région Centre-Val de Loire.
                    Chenonceau avec sa célèbre galerie à deux étages qui domine le Cher est l'un des fleurons de l'architecture du Val de Loire. Ses emprunts à l'Italie et ses caractéristiques françaises sont clairement perceptibles.
                    </p>
                </div>
                <div class=\"position-absolute w-10 h-100 d-flex flex-column justify-content-end\" style='top:0'>
                    <button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#exampleModalLong\">
                        Launch demo modal
                    </button>
                            <div class=\"modal fade\" id=\"exampleModalLong\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLongTitle\" aria-hidden=\"true\">
                              <div class=\"modal-dialog\" role=\"document\">
                                <div class=\"modal-content\">
                                  <div class=\"modal-header\">
                                    <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Modal title</h5>
                                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">
                                      <span aria-hidden=\"true\">&times;</span>
                                    </button>
                                  </div>
                                  <div class=\"modal-body\">
                                    L’architecture du Mont-Saint-Michel et sa baie en font le site touristique le plus fréquenté de Normandie1 et l'un des dix plus fréquentés en France
                                    En 1846, Édouard Le Héricher le décrivait ainsi : « Le Mont Saint-Michel apparaît 
                                    comme une montagne circulaire qui semble s’affaisser sous la pyramide monumentale qui la couronne.
                                  </div>
                                  <div class=\"modal-footer\">
                                    <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>
                                  </div>
                            </div>
                        </div>
                    </div>
            </div>
        </article>
        

        
        <article class='d-flex m-3' style='width: 30%'>
            <div class='position-relative d-flex w-100 h-100 align-items-center justify-content-end'>
            <img class='img-fluid w-100' src='image/france/IMAGES%20%20RES/chateau-de-chambord.jpg' alt='chateau de chambord'>
                <div class='ImageGalerie position-absolute d-flex bg-secondary w-100 h-100 text-center justify-content-center align-items-center' style='opacity: 1%' onmouseover='this.style.opacity=\"80%\"'; onmouseleave='this.style.opacity=\"0\"''>
                    <p class='d-flex text-white'>
                        La Camargue sur une carte forme un triangle coiffé au sommet par Arles et dont la base s’étire le long du littoral entre Le Grau-du-Roi et Salin-de-Giraud, en passant par Les Saintes-Maries-de-la-Mer. Lové dans le delta du Rhône, le parc naturel régional de Camargue offre ses paysages uniques aux amoureux des grands espaces entre marais, étangs, salins, dunes et prairies. 
                    </p>
                </div>
                <div class=\"position-absolute w-10 h-100 d-flex flex-column justify-content-end\" style='top:0'>
                    <button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#exampleModalLong\">
                        Launch demo modal
                    </button>
                            <div class=\"modal fade\" id=\"exampleModalLong\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLongTitle\" aria-hidden=\"true\">
                              <div class=\"modal-dialog\" role=\"document\">
                                <div class=\"modal-content\">
                                  <div class=\"modal-header\">
                                    <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Modal title</h5>
                                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">
                                      <span aria-hidden=\"true\">&times;</span>
                                    </button>
                                  </div>
                                  <div class=\"modal-body\">
                                    L’architecture du Mont-Saint-Michel et sa baie en font le site touristique le plus fréquenté de Normandie1 et l'un des dix plus fréquentés en France
                                    En 1846, Édouard Le Héricher le décrivait ainsi : « Le Mont Saint-Michel apparaît 
                                    comme une montagne circulaire qui semble s’affaisser sous la pyramide monumentale qui la couronne.
                                  </div>
                                  <div class=\"modal-footer\">
                                    <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>
                                  </div>
                            </div>
                        </div>
                    </div>
            </div>
        </article>
        
        <article class='d-flex m-3' style='width: 30%'>
            <div class='position-relative d-flex w-100 h-100 align-items-center justify-content-end'>
                <img class='img-fluid w-100' src='image/france/IMAGES%20%20RES/chateau-de-chenonceau.jpg' alt='chateau de chenonceau'>
                <div class='ImageGalerie position-absolute d-flex bg-secondary w-100 h-100 text-center justify-content-center align-items-center' style='opacity: 1%' onmouseover='this.style.opacity=\"80%\"'; onmouseleave='this.style.opacity=\"0\"''>
                    <p class='d-flex text-white'>
                        Les Orgues d'Ille-sur-Têt sont des cheminées de fée situées sur un site géologique et touristique de la commune d'Ille-sur-Têt, 
                        dans le département français des Pyrénées-Orientales. Elles résultent de l'érosion de roches sédimentaires vieilles de quatre millions d'années.
                        e site des Orgues est un lieu unique en France, un paysage de cheminées de fées à la beauté fragile, éphémère.
                    </p>
                </div>
                <div class=\"position-absolute w-10 h-100 d-flex flex-column justify-content-end\" style='top:0'>
                    <button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#exampleModalLong\">
                        Launch demo modal
                    </button>
                            <div class=\"modal fade\" id=\"exampleModalLong\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLongTitle\" aria-hidden=\"true\">
                              <div class=\"modal-dialog\" role=\"document\">
                                <div class=\"modal-content\">
                                  <div class=\"modal-header\">
                                    <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Modal title</h5>
                                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">
                                      <span aria-hidden=\"true\">&times;</span>
                                    </button>
                                  </div>
                                  <div class=\"modal-body\">
                                    L’architecture du Mont-Saint-Michel et sa baie en font le site touristique le plus fréquenté de Normandie1 et l'un des dix plus fréquentés en France
                                    En 1846, Édouard Le Héricher le décrivait ainsi : « Le Mont Saint-Michel apparaît 
                                    comme une montagne circulaire qui semble s’affaisser sous la pyramide monumentale qui la couronne.
                                  </div>
                                  <div class=\"modal-footer\">
                                    <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>
                                  </div>
                            </div>
                        </div>
                    </div>
            </div>
        </article>
        
        <article class='d-flex m-3' style='width: 30%'>
            <div class='position-relative d-flex w-100 h-100 align-items-center justify-content-end'>
            <img class='img-fluid w-100' src='image/france/IMAGES%20%20RES/Cirque-de-gavarnie.jpg' alt='cirque de gavarnie'>
                <div class='ImageGalerie position-absolute d-flex bg-secondary w-100 h-100 text-center justify-content-center align-items-center' style='opacity: 1%' onmouseover='this.style.opacity=\"80% \"'; onmouseleave='this.style.opacity=\"0\"''>
                    <p class='d-flex text-white'>
                        Grandiose ! Comment qualifier autrement le cirque de Gavarnie ? Les grands cirques calcaires pyrénéens doivent leur existence au travail d'immenses glaciers aujourd'hui disparus. 
                        Gavarnie, dans les Hautes-Pyrénées, est le plus célèbre d'entre eux.
                        Il y a cinquante millions d’années, érosions fluviales et glaciaires ont creusé dans les Pyrénées un ensemble de cirques naturels d’une rare perfection. 
                    </p>
                </div>
                <div class=\"position-absolute w-10 h-100 d-flex flex-column justify-content-end\" style='top:0'>
                    <button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#exampleModalLong\">
                        Launch demo modal
                    </button>
                            <div class=\"modal fade\" id=\"exampleModalLong\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLongTitle\" aria-hidden=\"true\">
                              <div class=\"modal-dialog\" role=\"document\">
                                <div class=\"modal-content\">
                                  <div class=\"modal-header\">
                                    <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Modal title</h5>
                                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">
                                      <span aria-hidden=\"true\">&times;</span>
                                    </button>
                                  </div>
                                  <div class=\"modal-body\">
                                    L’architecture du Mont-Saint-Michel et sa baie en font le site touristique le plus fréquenté de Normandie1 et l'un des dix plus fréquentés en France
                                    En 1846, Édouard Le Héricher le décrivait ainsi : « Le Mont Saint-Michel apparaît 
                                    comme une montagne circulaire qui semble s’affaisser sous la pyramide monumentale qui la couronne.
                                  </div>
                                  <div class=\"modal-footer\">
                                    <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>
                                  </div>
                            </div>
                        </div>
                    </div>
            </div>
        </article>
        
        <article class='d-flex m-3' style='width: 30%'>
            <div class='position-relative d-flex w-100 h-100 align-items-center justify-content-end'>
            <img class='img-fluid w-100' src='image/france/IMAGES%20%20RES/Gorges-du-Tarn.jpg' alt='gorge du tarn'>
                <div class='ImageGalerie position-absolute d-flex bg-secondary w-100 h-100 text-center justify-content-center align-items-center' style='opacity: 1%' onmouseover='this.style.opacity=\"80%\"'; onmouseleave='this.style.opacity=\"0\"''>
                    <p class='d-flex text-white'>
                        La vallée des Merveilles est une vallée du massif du Mercantour dans les Alpes où ont été découvertes plus de 40 500 gravures rupestres protohistoriques, 
                        datant du Chalcolithique et de l’âge du bronze ancien, au milieu d’autres gravures plus récentes
                        Les gravures rupestres, au nombre d’environ 100 000 dont 37 000 figuratives, 
                        concernent 3 700 roches couvrant près de 1 400 ha répartis dans un ensemble plus vaste de 4 000 ha.
                    </p>
                </div>
                <div class=\"position-absolute w-10 h-100 d-flex flex-column justify-content-end\" style='top:0'>
                    <button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#exampleModalLong\">
                        Launch demo modal
                    </button>
                            <div class=\"modal fade\" id=\"exampleModalLong\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLongTitle\" aria-hidden=\"true\">
                              <div class=\"modal-dialog\" role=\"document\">
                                <div class=\"modal-content\">
                                  <div class=\"modal-header\">
                                    <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Modal title</h5>
                                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">
                                      <span aria-hidden=\"true\">&times;</span>
                                    </button>
                                  </div>
                                  <div class=\"modal-body\">
                                    L’architecture du Mont-Saint-Michel et sa baie en font le site touristique le plus fréquenté de Normandie1 et l'un des dix plus fréquentés en France
                                    En 1846, Édouard Le Héricher le décrivait ainsi : « Le Mont Saint-Michel apparaît 
                                    comme une montagne circulaire qui semble s’affaisser sous la pyramide monumentale qui la couronne.
                                  </div>
                                  <div class=\"modal-footer\">
                                    <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>
                                  </div>
                            </div>
                        </div>
                    </div>
            </div>
        </article>
        
        <article class='d-flex m-3' style='width: 30%'>
            <div class='position-relative d-flex w-100 h-100 align-items-center justify-content-end'>
            <img class='img-fluid w-100' src='image/france/IMAGES%20%20RES/gravures-rupestres-vallee-des-merveilles-region-mont-bego.jpg' alt='gravures rupestres vallee des merveilles region mont bego'>
                <div class='ImageGalerie position-absolute d-flex bg-secondary w-100 h-100 text-center justify-content-center align-items-center' style='opacity: 1%' onmouseover='this.style.opacity=\"80%\"'; onmouseleave='this.style.opacity=\"0\"''>
                    <p class='d-flex text-white'>
                        La cité médiévale de Carcassonne est l’une des plus belles cités médiévales du monde, classée aux Monuments Historiques et inscrite au Patrimoine mondial de l’Unesco.
                        Un monument grandiose !
                    </p>
                </div>
                <div class=\"position-absolute w-10 h-100 d-flex flex-column justify-content-end\" style='top:0'>
                    <button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#exampleModalLong\">
                        Launch demo modal
                    </button>
                            <div class=\"modal fade\" id=\"exampleModalLong\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLongTitle\" aria-hidden=\"true\">
                              <div class=\"modal-dialog\" role=\"document\">
                                <div class=\"modal-content\">
                                  <div class=\"modal-header\">
                                    <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Modal title</h5>
                                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">
                                      <span aria-hidden=\"true\">&times;</span>
                                    </button>
                                  </div>
                                  <div class=\"modal-body\">
                                    L’architecture du Mont-Saint-Michel et sa baie en font le site touristique le plus fréquenté de Normandie1 et l'un des dix plus fréquentés en France
                                    En 1846, Édouard Le Héricher le décrivait ainsi : « Le Mont Saint-Michel apparaît 
                                    comme une montagne circulaire qui semble s’affaisser sous la pyramide monumentale qui la couronne.
                                  </div>
                                  <div class=\"modal-footer\">
                                    <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>
                                  </div>
                            </div>
                        </div>
                    </div>
            </div>
        </article>
        
        <article class='d-flex m-3' style='width: 30%'>
            <div class='position-relative d-flex w-100 h-100 align-items-center justify-content-end'>
                <img class='img-fluid w-100' src='image/france/IMAGES%20%20RES/Mont-saint-michel.jpg' alt='mont saint michel'>
                    <div class='ImageGalerie position-absolute d-flex bg-secondary w-100 h-100 text-center justify-content-center align-items-center' style='opacity: 1%' onmouseover='this.style.opacity=\"80%\"'; onmouseleave='this.style.opacity=\"0\"''>
                    <p class='d-flex text-white'>
                        La Cité est un ensemble fortifié unique en Europe et très complet : 3 km de remparts, 52 tours, un château, véritable forteresse dans la forteresse, une basilique, et un village toujours habité.
                        Carcassonne existe depuis près de 2500 ans, successivement villa romaine, vicomté médiévale sous la dynastie des Trencavels, victime d’une terrible croisade, détruite, reconstruite, agrandie et renforcée, abandonnée au cours des siècles, puis sauvée de la destruction et enfin restaurée par l’œuvre majeure de Viollet-le-Duc au 19e siècle
                    </p>
                </div>
                <div class=\"position-absolute w-10 h-100 d-flex flex-column justify-content-end\" style='top:0'>
                    <button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#exampleModalLong\">
                        Launch demo modal
                    </button>
                            <div class=\"modal fade\" id=\"exampleModalLong\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLongTitle\" aria-hidden=\"true\">
                              <div class=\"modal-dialog\" role=\"document\">
                                <div class=\"modal-content\">
                                  <div class=\"modal-header\">
                                    <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Modal title</h5>
                                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">
                                      <span aria-hidden=\"true\">&times;</span>
                                    </button>
                                  </div>
                                  <div class=\"modal-body\">
                                    L’architecture du Mont-Saint-Michel et sa baie en font le site touristique le plus fréquenté de Normandie1 et l'un des dix plus fréquentés en France
                                    En 1846, Édouard Le Héricher le décrivait ainsi : « Le Mont Saint-Michel apparaît 
                                    comme une montagne circulaire qui semble s’affaisser sous la pyramide monumentale qui la couronne.
                                  </div>
                                  <div class=\"modal-footer\">
                                    <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>
                                  </div>
                            </div>
                        </div>
                    </div>
            </div>
        </article>
        
        <article class='d-flex m-3' style='width: 30%'>
            <div class='position-relative d-flex w-100 h-100 align-items-center justify-content-end'>
            <img class='img-fluid w-100' src='image/france/IMAGES%20%20RES/Mont-Saint-Michel_vu_du_ciel.jpg' alt='mont saint michel vu du ciel'>
                <div class='ImageGalerie position-absolute d-flex bg-secondary w-100 h-100 text-center justify-content-center align-items-center' style='opacity: 1%' onmouseover='this.style.opacity=\"80%\"'; onmouseleave='this.style.opacity=\"0\"''>
                    <p class='d-flex text-white'>
                        La vallée des Merveilles est une vallée du massif du Mercantour dans les Alpes où ont été découvertes plus de 40 500 gravures rupestres protohistoriques, 
                        datant du Chalcolithique et de l’âge du bronze ancien, au milieu d’autres gravures plus récentes
                        Les gravures rupestres, au nombre d’environ 100 000 dont 37 000 figuratives, concernent 
                        3 700 roches couvrant près de 1 400 ha répartis dans un ensemble plus vaste de 4 000 ha.
                    </p>
                </div>
                <div class=\"position-absolute w-10 h-100 d-flex flex-column justify-content-end\" style='top:0'>
                    <button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#exampleModalLong\">
                        Launch demo modal
                    </button>
                            <div class=\"modal fade\" id=\"exampleModalLong\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLongTitle\" aria-hidden=\"true\">
                              <div class=\"modal-dialog\" role=\"document\">
                                <div class=\"modal-content\">
                                  <div class=\"modal-header\">
                                    <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Modal title</h5>
                                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">
                                      <span aria-hidden=\"true\">&times;</span>
                                    </button>
                                  </div>
                                  <div class=\"modal-body\">
                                    L’architecture du Mont-Saint-Michel et sa baie en font le site touristique le plus fréquenté de Normandie1 et l'un des dix plus fréquentés en France
                                    En 1846, Édouard Le Héricher le décrivait ainsi : « Le Mont Saint-Michel apparaît 
                                    comme une montagne circulaire qui semble s’affaisser sous la pyramide monumentale qui la couronne.
                                  </div>
                                  <div class=\"modal-footer\">
                                    <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>
                                  </div>
                            </div>
                        </div>
                    </div>
            </div>
        </article>
        
        <article class='d-flex m-3' style='width: 30%'>
            <div class='position-relative d-flex w-100 h-100 align-items-center justify-content-end'>
            <img class='img-fluid w-100' src='image/france/IMAGES%20%20RES/Orgues_ille_sur_tet.jpg' alt='orgues ille sur tet'>
                <div class='ImageGalerie position-absolute d-flex bg-secondary w-100 h-100 text-center justify-content-center align-items-center' style='opacity: 1%' onmouseover='this.style.opacity=\"80%\"'; onmouseleave='this.style.opacity=\"0\"''>
                    <p class='d-flex text-white'>
                        La vallée des Merveilles est une vallée du massif du Mercantour dans les Alpes où ont été découvertes plus de 40 500 gravures rupestres protohistoriques, 
                        datant du Chalcolithique et de l’âge du bronze ancien, au milieu d’autres gravures plus récentes
                        Les gravures rupestres, au nombre d’environ 100 000 dont 37 000 figuratives, concernent 
                        3 700 roches couvrant près de 1 400 ha répartis dans un ensemble plus vaste de 4 000 ha.
                    </p>
                </div>
                <div class=\"position-absolute w-10 h-100 d-flex flex-column justify-content-end\" style='top:0'>
                    <button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#exampleModalLong\">
                        Launch demo modal
                    </button>
                            <div class=\"modal fade\" id=\"exampleModalLong\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLongTitle\" aria-hidden=\"true\">
                              <div class=\"modal-dialog\" role=\"document\">
                                <div class=\"modal-content\">
                                  <div class=\"modal-header\">
                                    <h5 class=\"modal-title\" id=\"exampleModalLongTitle\">Modal title</h5>
                                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">
                                      <span aria-hidden=\"true\">&times;</span>
                                    </button>
                                  </div>
                                  <div class=\"modal-body\">
                                    L’architecture du Mont-Saint-Michel et sa baie en font le site touristique le plus fréquenté de Normandie1 et l'un des dix plus fréquentés en France
                                    En 1846, Édouard Le Héricher le décrivait ainsi : « Le Mont Saint-Michel apparaît 
                                    comme une montagne circulaire qui semble s’affaisser sous la pyramide monumentale qui la couronne.
                                  </div>
                                  <div class=\"modal-footer\">
                                    <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Close</button>
                                  </div>
                            </div>
                        </div>
                    </div>
            </div>
        </article>
        
        </section>
        ";
    }

    /********************************************* Fonction permettant l'affichage de la page ****************/

    public function affiche()
    {


        ?>
        <!DOCCTYPE html>
        <html lang='fr'>
        <head>
            <a href=""></a>
            <title><?php echo $this->titre; ?></title>
            <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
            <meta name="description" content="<?php echo $this->metadescription; ?>"/>
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
                    <?php echo $this->right_sidebar; ?>
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

    public function afficheNature()
    {


        ?>
        <!DOCCTYPE html>
        <html lang='fr'>
        <head>
            <title><?php echo $this->titre; ?></title>
            <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
            <meta name="description" content="<?php echo $this->metadescription; ?>"/>
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

    public function afficheGalerie()
    {
        ?>
        <!DOCCTYPE html>
        <html lang='fr'>
        <head>
            <title><?php echo $this->titre; ?></title>
            <meta http-equiv="content-type" content="text/html; charset=utf-8"/>
            <meta name="description" content="<?php echo $this->metadescription; ?>"/>
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
