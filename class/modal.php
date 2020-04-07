<?php
header('Content-type: application/json');

$posted_id=1;
$posted_id = filter_input(INPUT_POST,"id");
$posted_image = filter_input(INPUT_POST,"image");
$posted_titre = filter_input(INPUT_POST,"titre");
$posted_texte = filter_input(INPUT_POST,"texte");
$posted_latitude = filter_input(INPUT_POST,"latitude");
$posted_longitude = filter_input(INPUT_POST,"longitude");

$this->connexion = new PDO('mysql:host='.$this->PARAM_hote.';dbname='.$this->PARAM_nom_bd, $this->PARAM_utilisateur, $this->PARAM_mot_passe,array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
$requete='select id,image,titre,texte,latitude,longitude from highlight where id="'.$posted_id.'"';

$result=$this->connexion ->query($requete);


echo json_encode($result);

return;