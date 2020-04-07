<?php

class page_base_journaliste extends page_base {

    public function __construct() {
        parent::__construct();
    }
    public function affiche() {
        if(!isset($_SESSION['id']) || !isset($_SESSION['type']))
        {
            echo '<script>document.location.href="Accueil"; </script>';

        }
        else
        {
            if($_SESSION['type']!='3')
            {
                echo '<script>document.location.href="Accueil"; </script>';
            }
            else
            {
                parent::affiche();
            }
        }
    }
    public function affiche_menu() {



        parent::affiche_menu();
        echo '
        <ul class="navbar-nav">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Gestion des articles
                </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                          <a class="dropdown-item" href="'.$this->path.'/Ajout-article">Proposer un article</a>
                          <a class="dropdown-item" href="'.$this->path.'/Modif_article">Modifier un article</a>
                      </div>
              </li>
          </ul>';




    }
}