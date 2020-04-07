<?php

class controleur
{

    private $vpdo;
    private $db;

    public function __construct()
    {
        $this->vpdo = new mypdo ();
        $this->db = $this->vpdo->connexion;
    }

    public function __get($propriete)
    {
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
        $i = 0;
        $retour = '<section>';
        $result = $this->vpdo->liste_article($title);
        if ($result != false) {
            while ($row = $result->fetch(PDO::FETCH_OBJ)) {
                if ($row->date_deb != null && $row->date_fin != null) {
                    $dateTimeDeb = new DateTime($row->date_deb);
                    $dateTimeFin = new DateTime($row->date_fin);
                    $dateTimeNow = new DateTime("now");
                    if ($row->publie == 1) {
                        if ($dateTimeDeb <= $dateTimeNow && $dateTimeFin >= $dateTimeNow) {
                            $retour = $retour . '<div class="card text-white bg-dark m-2 ArticleNombre" >
						<div class="StyleArticle card-body">
							<article>
								<h1 style="font-size: 0.8em">titre : ' . $row->h1 . '</h1>
								<aside style="font-size: 0.8em">Nom : ' . $row->nom . ' / Prenom : ' . $row->prenom . ' / Date redaction : ' . $row->date_redaction . '</aside>
								<h3 class="card-title">' . $row->h3 . '</h3>
								<p class="card-text">' . $row->corps . '</p>
							</article>
						</div>
					<div class="BarBoutton"><button onclick="collapse(' . $i . ')"><i class="fas fa-plus"></i> Read More</button></div>
				</div>';
                            $i++;
                        }
                    }
                }
            }
            $retour = $retour . '</section>';
            return $retour;
        }
    }


    public function genererMDP($longueur = 8)
    {
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
            $caractere = substr($possible, mt_rand(0, $longueurMax - 1), 1);

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

    public function retourne_formulaire_login()
    {
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
        $retour = '
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
    public function retourne_image()
    {

        $result = $this->vpdo->liste_image_highlight();
        $i = 0;
        $retour = "<section class='d-flex flex-row flex-wrap justify-content-center'>";
        if ($result != false) {
//            while ( $row = $result->fetch ( PDO::FETCH_OBJ ) )
//                // parcourir chaque ligne sélectionnée
//            {
//                $retour = $retour . '
//    <div class="image" onclick="ModalAjax('.$row->id.')">
//    <div class="hovereffect d-flex flex-column">
//    <img src="'.$path.'/image/france/IMAGES  RES/'.$row->image.'" class="img-fluid">
//    <div class="overlay">
//    <div class="text d-flex justify-content-center"><h5>
//    '.$row->titre.'</h5>
//    </div>
//    </div>
//    </div>
//    </div>
//    ;';
//            }

            while ($row = $result->fetch(PDO::FETCH_OBJ)) {
                $image[$i] = $row->image;
                $id[$i] = $row->id;
                $titre[$i] = $row->titre;
                $text[$i] = $row->texte;
                $latitude[$i] = $row->latitude;
                $longitude[$i] = $row->longitude;
                $retour .= "<article class='d-flex m-3' style='width: 30%' onclick='ModalAjax($row->id);'>
						<div class='position-relative d-flex w-100 h-100 align-items-center justify-content-end' >
							<img class='img-fluid w-100' src='image/france/IMAGES%20%20RES/" . $image[$i] . "' alt='" . $image[$i] . "'>
							<div class='ImageGalerie position-absolute d-flex bg-secondary w-100 h-100 text-center justify-content-center align-items-center' style='opacity: 1%' onmouseover='this.style.opacity=\"80%\"'; onmouseleave='this.style.opacity=\"0\"''>
								<p class='d-flex text-white'>
									" . $text[$i] . "
								</p>
								</div>
								<div class=\"position-absolute w-10 h-100 d-flex flex-column justify-content-end\" style='top:0'>
								<button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#exampleModalLong" . $id[$i] . "\" id='Bouton" . $i . "'>
									Voir plus <i class=\"fas fa-caret-right\"></i>
								</button>
							</div>
						</div>
            		</article>
        ";
                $i++;
            }
        }

        $retour .= "</section>";
        return $retour;
    }

    /****************************************************************** Fonction ajax *************************************************************/

    public function retourne_modal_hl($path)
    {
        $retour='
        <div id="ModalHl" class="modal " tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">
        <div class="modal-content text-white bg-dark m-2">
        <div class="modal-header">
        <h5 id="ModalHl_titre" class="modal-title"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
        <img id="ModalHl_image" src1="'.$path.'/image/france/IMAGES  RES/" class="img-fluid rounded mx-auto d-block" alt=""/>

 

                <p></p>
                        <div id="map" class="map"></div>
        </div>
        </div>
        </div>
        </div>
        ';
        return $retour;
    }


    /******************************************* Affichage  ***************************************/

    public function retourne_xml($lien)
    {
        $retour = "";
        $context = stream_context_create(array('https' => array('header' => 'Accept: application/xml')));
        $xml = file_get_contents($lien, false, $context);
        $xml = simplexml_load_string($xml);
        $retour .= "<h1 style='font-size: 1.2em'>" . $xml->channel[0]->title[0] . "</h1>";
        $retour .= "<div class='card text-white bg-dark m-2 d-flex flex-wrap flex-row'>";
        for ($i = 0; $i < 9; $i++) {
            $retour .= "<div class='card-body p-1 m-1' style='width: 45%'>";
            $retour .= "<h3 class='card-title'>" . $xml->channel[0]->item[$i]->title[0] . "</h3>";
            $retour .= "<a href='" . $xml->channel[0]->item[$i]->link[0] . "' target='_blank'>Lien</a>";
            $retour .= "<div class='card-text'>" . $xml->channel[0]->item[$i]->description[0] . "</div>";
            $retour .= "<div class='d-flex justify-content-end'><img class='card-img-bottom' src='" . $xml->channel[0]->item[$i]->enclosure[0]['url'] . "' alt='image'></div></div>";
        }
        $retour .= "</div>";
        return $retour;
    }

    public function retourne_caroussel()
    {
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

    public function retourne_tableau()
    {
        $retour = '<table class="table table-striped table-dark" id="tableauDep">
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
            foreach ($result as $ligne) {
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

