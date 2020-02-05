<?php
class controleur {

	private $vpdo;
	private $db;
	public function __construct() {
		$this->vpdo = new mypdo ();
		$this->db = $this->vpdo->connexion;
	}
	public function __get($propriete) {
		switch ($propriete) {
			case 'vpdo' :
			{
				return $this->vpdo;
				break;
			}
			case 'db' :
			{

				return $this->db;
				break;
			}
		}
	}
	public function retourne_article($title)
	{
		$i=0;
		$retour='<section>';
		$result = $this->vpdo->liste_article($title);
		if ($result != false) {
			while ( $row = $result->fetch ( PDO::FETCH_OBJ ) )
				// parcourir chaque ligne sélectionnée
			{
				if($row->date_deb != null && $row->date_fin != null){
					$dateTimeDeb=new DateTime($row->date_deb);
					$dateTimeFin=new DateTime($row->date_fin);
					$dateTimeNow=new DateTime("now");
					if($row->publie == 1){
						if($dateTimeDeb<=$dateTimeNow && $dateTimeFin>=$dateTimeNow){
							$retour = $retour . '<div class="card text-white bg-dark m-2 ArticleNombre" >
						<div class="StyleArticle card-body">
							<article>
								<h1 style="font-size: 0.8em">titre : '.$row->h1.'</h1>
								<aside style="font-size: 0.8em">Nom : '.$row->nom.' / Prenom : '.$row->prenom.' / Date redaction : '.$row->date_redaction.'</aside>
								<h3 class="card-title">'.$row->h3.'</h3>
								<p class="card-text">'.$row->corps.'</p>
							</article>
						</div>
					<div class="BarBoutton"><button onclick="collapse('.$i.')"><i class="fas fa-plus"></i> Read More</button></div>
				</div>';
							$i++;
						}
					}
				}
			}
			$retour = $retour .'</section>';
			return $retour;
		}
	}


	public function genererMDP ($longueur = 8){
		// initialiser la variable $mdp
		$mdp = "";

		// Définir tout les caractères possibles dans le mot de passe,
		// Il est possible de rajouter des voyelles ou bien des caractères spéciaux
		$possible = "2346789bcdfghjkmnpqrtvwxyzBCDFGHJKLMNPQRTVWXYZ&#@$*!";

		// obtenir le nombre de caractères dans la chaîne précédente
		// cette valeur sera utilisé plus tard
		$longueurMax = strlen($possible);

		if ($longueur > $longueurMax) {
			$longueur = $longueurMax;
		}

		// initialiser le compteur
		$i = 0;

		// ajouter un caractère aléatoire à $mdp jusqu'à ce que $longueur soit atteint
		while ($i < $longueur) {
			// prendre un caractère aléatoire
			$caractere = substr($possible, mt_rand(0, $longueurMax-1), 1);

			// vérifier si le caractère est déjà utilisé dans $mdp
			if (!strstr($mdp, $caractere)) {
				// Si non, ajouter le caractère à $mdp et augmenter le compteur
				$mdp .= $caractere;
				$i++;
			}
		}

		// retourner le résultat final
		return $mdp;
	}
	public function retourne_formulaire_login() {
		$retour = '
		<div class="modal fade" id="myModal" role="dialog" style="color:#000;">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
        				<h4 class="modal-title"><span class="fas fa-lock"></span> Formulaire de connexion</h4>
        				<button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="hd();">
          					<span aria-hidden="true">&times;</span>
        				</button>
      				</div>
					<div class="modal-body">
						<form role="form" id="login" method="post">
							<div class="form-group">
								<label for="id"><span class="fas fa-user"></span> Identifiant</label>
								<input type="text" class="form-control" id="id" name="id" placeholder="Identifiant">
							</div>
							<div class="form-group">
								<label for="mp"><span class="fas fa-eye"></span> Mot de passe</label>
								<input type="password" class="form-control" id="mp" name="mp" placeholder="Mot de passe">
							</div>
							<div class="form-group">
								<label class="radio-inline"><input type="radio" name="rblogin" id="rbj" value="rbj">Journaliste</label>
								<label class="radio-inline"><input type="radio" name="rblogin" id="rbr" value="rbr">Rédacteur en chef</label>
								<label class="radio-inline"><input type="radio" name="rblogin" id="rba" value="rba">Administrateur</label>
							</div>
							<button type="submit" class="btn btn-success btn-block" class="submit"><span class="fas fa-power-off"></span> Login</button>
						</form>
					</div>
					<div class="modal-footer">
						<button type="button"  class="btn btn-danger btn-default pull-left" data-dismiss="modal" onclick="hd();"><span class="fas fa-times"></span> Cancel</button>
					</div>
				</div>
			</div>
		</div>';

		return $retour;
	}

	public function retourne_modal_message()
	{
		$retour='
		<div class="modal fade" id="ModalRetour" role="dialog" style="color:#000;">
			<div class="modal-dialog">
				<div class="modal-content">
				<div class="modal-header">
        				<h4 class="modal-title"><span class="fas fa-info-circle"></span> INFORMATIONS</h4>
        				<button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="hd();">
          					<span aria-hidden="true">&times;</span>
        				</button>
      				</div>
		       		<div class="modal-body">
						<div class="alert alert-info">
							<p></p>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" onclick="hdModalRetour();">Close</button>
					</div>
				</div>
			</div>
		</div>
		';
		return $retour;
	}


	/******************************************* Images *******************************************/
	public function retourne_image(){
		$image[0]='src=\'image/france/IMAGES%20%20RES/Bassin%20arcahon.jpg\' alt=\'Bassin d"arcachon\'';
		$text[0]='La vallée des Merveilles est une vallée du massif du Mercantour dans les Alpes où ont été découvertes plus de 40 500 gravures rupestres protohistoriques, 
                            datant du Chalcolithique et de l’âge du bronze ancien, au milieu d’autres gravures plus récentes
                            Les gravures rupestres, au nombre d’environ 100 000 dont 37 000 figuratives, concernent 
                            3 700 roches couvrant près de 1 400 ha répartis dans un ensemble plus vaste de 4 000 ha.';

		$image[1]='src=\'image/france/IMAGES%20%20RES/Bonifacio.jpg\' alt=\'Bonifacio\'';
		$text[1]='La citadelle de Bonifacio est un ouvrage militaire bâti progressivement à partir du xiie siècle pour permettre la protection de 
                        Bonifacio qui est une place importante de la République de Gênes pour la sécurité de son commerce entre Gênes, la Ligurie, et la Sardaigne et pour permettre le contrôle des Bouches de Bonifacio.';

		$image[2]='src=\'image/france/IMAGES%20%20RES/camargue.jpg\' alt=\'camargue\'';
		$text[2]='L’un des paysages les plus spectaculaires de France
                        Né au Mont Lozère, le Tarn descend les Cévennes d’un jet torrentueux qui a creusé un canyon très profond dans la dalle des Grands Causses. Falaises atteignant 500 m de haut, brèches, corniches et rochers … les gorges du Tarn offrent leur plus beau spectacle entre Quézac (Lozère) et Le Rozier (Aveyron), sur environ 50 km.';

		$image[3]='src=\'image/france/IMAGES%20%20RES/camargue1.jpg\' alt=\'camargue1\'';
		$text[3]='L’un des paysages les plus spectaculaires de France
                        Né au Mont Lozère, le Tarn descend les Cévennes d’un jet torrentueux qui a creusé un canyon très profond dans la dalle des Grands Causses. 
                        Falaises atteignant 500 m de haut, brèches, corniches et rochers … les gorges du Tarn offrent leur plus beau spectacle entre Quézac (Lozère) et Le Rozier (Aveyron), sur environ 50 km.';

		$image[4]='src=\'image/france/IMAGES%20%20RES/carcassonne.jpg\' alt=\'Bassin d"arcachon\'';
		$text[4]='La vallée des Merveilles est une vallée du massif du Mercantour dans les Alpes où ont été découvertes plus de 40 500 gravures rupestres protohistoriques, 
                            datant du Chalcolithique et de l’âge du bronze ancien, au milieu d’autres gravures plus récentes
                            Les gravures rupestres, au nombre d’environ 100 000 dont 37 000 figuratives, concernent 
                            3 700 roches couvrant près de 1 400 ha répartis dans un ensemble plus vaste de 4 000 ha.';

		$image[5]='src=\'image/france/IMAGES%20%20RES/chateau-de-chambord.jpg\' alt=\'chateau de chambord\'';
		$text[5]='La Camargue sur une carte forme un triangle coiffé au sommet par Arles et dont la base s’étire le long du littoral entre Le Grau-du-Roi et Salin-de-Giraud, 
		en passant par Les Saintes-Maries-de-la-Mer. Lové dans le delta du Rhône, le parc naturel régional de Camargue offre ses paysages 
		uniques aux amoureux des grands espaces entre marais, étangs, salins, dunes et prairies. ';

		$image[6]='src=\'image/france/IMAGES%20%20RES/chateau-de-chenonceau.jpg\' alt=\'chateau de chenonceau\'';
		$text[6]='Les Orgues d\'Ille-sur-Têt sont des cheminées de fée situées sur un site géologique et touristique de la commune d\'Ille-sur-Têt, 
                        dans le département français des Pyrénées-Orientales. Elles résultent de l\'érosion de roches sédimentaires vieilles de quatre millions d\'années.
                        e site des Orgues est un lieu unique en France, un paysage de cheminées de fées à la beauté fragile, éphémère.';

		$image[7]='src=\'image/france/IMAGES%20%20RES/Cirque-de-gavarnie.jpg\' alt=\'cirque de gavarnie\'';
		$text[7]='Grandiose ! Comment qualifier autrement le cirque de Gavarnie ? Les grands cirques calcaires pyrénéens doivent leur existence au travail d\'immenses glaciers aujourd\'hui disparus. 
                        Gavarnie, dans les Hautes-Pyrénées, est le plus célèbre d\'entre eux.
                        Il y a cinquante millions d’années, érosions fluviales et glaciaires ont creusé dans les Pyrénées un ensemble de cirques naturels d’une rare perfection. ';

		$image[8]='src=\'image/france/IMAGES%20%20RES/Gorges-du-Tarn.jpg\' alt=\'gorge du tarn\'';
		$text[8]='La vallée des Merveilles est une vallée du massif du Mercantour dans les Alpes où ont été découvertes plus de 40 500 gravures rupestres protohistoriques, 
                        datant du Chalcolithique et de l’âge du bronze ancien, au milieu d’autres gravures plus récentes
                        Les gravures rupestres, au nombre d’environ 100 000 dont 37 000 figuratives, 
                        concernent 3 700 roches couvrant près de 1 400 ha répartis dans un ensemble plus vaste de 4 000 ha.';

		$image[9]='src=\'image/france/IMAGES%20%20RES/gravures-rupestres-vallee-des-merveilles-region-mont-bego.jpg\' alt=\'gravures rupestres vallee des merveilles region mont bego\'';
		$text[9]='La cité médiévale de Carcassonne est l’une des plus belles cités médiévales du monde, classée aux Monuments Historiques et inscrite au Patrimoine mondial de l’Unesco.
                        Un monument grandiose !';

		$image[10]='src=\'image/france/IMAGES%20%20RES/Mont-saint-michel.jpg\' alt=\'mont saint michel\'';
		$text[10]='La Cité est un ensemble fortifié unique en Europe et très complet : 3 km de remparts, 52 tours, un château, véritable forteresse dans la forteresse, une basilique, et un village toujours habité.
                        Carcassonne existe depuis près de 2500 ans, successivement villa romaine, vicomté médiévale sous la dynastie des Trencavels, victime d’une terrible croisade, détruite, reconstruite, agrandie et renforcée, 
                        abandonnée au cours des siècles, puis sauvée de la destruction et enfin restaurée par l’œuvre majeure de Viollet-le-Duc au 19e siècle';

		$image[11]='src=\'image/france/IMAGES%20%20RES/Mont-Saint-Michel_vu_du_ciel.jpg\' alt=\'mont saint michel vu du ciel\'';
		$text[11]='La vallée des Merveilles est une vallée du massif du Mercantour dans les Alpes où ont été découvertes plus de 40 500 gravures rupestres protohistoriques, 
                        datant du Chalcolithique et de l’âge du bronze ancien, au milieu d’autres gravures plus récentes
                        Les gravures rupestres, au nombre d’environ 100 000 dont 37 000 figuratives, concernent 
                        3 700 roches couvrant près de 1 400 ha répartis dans un ensemble plus vaste de 4 000 ha.';

		$image[12]='src=\'image/france/IMAGES%20%20RES/Orgues_ille_sur_tet.jpg\' alt=\'orgues ille sur tet\'';
		$text[12]='La vallée des Merveilles est une vallée du massif du Mercantour dans les Alpes où ont été découvertes plus de 40 500 gravures rupestres protohistoriques, 
                            datant du Chalcolithique et de l’âge du bronze ancien, au milieu d’autres gravures plus récentes
                            Les gravures rupestres, au nombre d’environ 100 000 dont 37 000 figuratives, concernent 
                            3 700 roches couvrant près de 1 400 ha répartis dans un ensemble plus vaste de 4 000 ha.';

		$image[13]='src=\'image/france/IMAGES%20%20RES/Bassin%20arcahon.jpg\' alt=\'Bassin d"arcachon\'';
		$text[13]='La vallée des Merveilles est une vallée du massif du Mercantour dans les Alpes où ont été découvertes plus de 40 500 gravures rupestres protohistoriques, 
                            datant du Chalcolithique et de l’âge du bronze ancien, au milieu d’autres gravures plus récentes
                            Les gravures rupestres, au nombre d’environ 100 000 dont 37 000 figuratives, concernent 
                            3 700 roches couvrant près de 1 400 ha répartis dans un ensemble plus vaste de 4 000 ha.';


		$retour="<section class='d-flex flex-row flex-wrap justify-content-center'>";
		for ($z=0;$z<14;$z++) {
			$retour.="<article class='d-flex m-3' style='width: 30%'>
						<div class='position-relative d-flex w-100 h-100 align-items-center justify-content-end'>
							<img class='img-fluid w-100'".$image[$z].">
							<div class='ImageGalerie position-absolute d-flex bg-secondary w-100 h-100 text-center justify-content-center align-items-center' style='opacity: 1%' onmouseover='this.style.opacity=\"80%\"'; onmouseleave='this.style.opacity=\"0\"''>
								<p class='d-flex text-white'>
									".$text[$z]."
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
												".$text[$z]."
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
        ";
		}
		$retour.="</section>";
		return $retour;
	}
  
	/******************************************* Affichage  ***************************************/
	
  public function retourne_xml($lien)
	{
		$retour="";
		$context = stream_context_create(array('https' => array('header' => 'Accept: application/xml')));
		$url = $lien;
		$xml = file_get_contents($url, false, $context);
		$xml = simplexml_load_string($xml);
		$retour.="<h1 style='font-size: 1.2em'>".$xml->channel[0]->title[0]."</h1>";
		$retour.="<div class='card text-white bg-dark m-2 d-flex flex-wrap flex-row'>";
		for ($i = 0; $i < 9; $i++) {
			$retour.="<div class='card-body p-1 m-1' style='width: 45%'>";
			$retour.="<h3 class='card-title'>" . $xml->channel[0]->item[$i]->title[0] . "</h3>";
			$retour.="<a href='" . $xml->channel[0]->item[$i]->description[0] . "'>Lien</a>";
			$retour.="<div class='card-text'>" . $xml->channel[0]->item[$i]->description[0] . "</div>";
			$retour.="<div class='d-flex justify-content-end'><img class='card-img-bottom' src='" . $xml->channel[0]->item[$i]->enclosure[0]['url'] . "' alt='image'></div></div>";
		}
		$retour.="</div>";
		return $retour;
	}



	public function retourne_caroussel() {
            $retour = '<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block" src="./image/france/IMAGES%20CAROUSSEL%20RES/chateau-de-chenonceau.jpg" alt="First slide">
    </div>
    <div class="carousel-item">
      <img class="d-block" src="./image/france/IMAGES%20CAROUSSEL%20RES/notre-dame-de-paris-la-nuit.jpg" alt="Second slide">
    </div>
    <div class="carousel-item">
      <img class="d-block" src="./image/france/IMAGES%20CAROUSSEL%20RES/Massif-des-Ecrins.jpg" alt="Third slide">
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>';
            return $retour;
		}

		public function retourne_tableau() {
			$retour='<table class="table table-striped table-dark" id="tableauDep">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Département</th>
      <th scope="col">Région</th>
     </tr>
  </thead>';
$result = $this->vpdo->liste_dep();

if ($result != false) {
	$retour .= '<tbody>';
	foreach	($result as $ligne){
			$retour .= "<tr>
	<th scope=\"row\">$ligne[0]</th>
	<td>$ligne[1]</td>
	<td>$ligne[2]</td>
	</tr>";
			}
	$retour .= '</tbody>';
		}
	$retour .= '</table>';
return $retour;
	}

}
?>




