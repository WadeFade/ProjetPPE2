<?php
session_start();
include_once('../class/autoload.php');
$data = array();
$mypdo = new mypdo();
if(isset($_POST['id_hl']))
{
    $resultat = $mypdo->liste_hl_via_id($_POST['id_hl']);
    if(isset($resultat))
    {
        // résultats
        $donnees = $resultat->fetch(PDO::FETCH_OBJ);
        //$data[$donnees->ville_id][] = ($donnees->ville_nom_reel);
        $data["hl_titre"][] = ($donnees->titre);
        $data["hl_image"][] = ($donnees->image);
        $data["hl_texte"][] = ($donnees->texte);
        $data["hl_latitude"][] = ($donnees->latitude);
        $data["hl_longitude"][] = ($donnees->longitude);
    }
}
// renvoit un tableau dynamique encodé en json
echo json_encode($data);
?>