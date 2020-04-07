function ModalAjax($id){

    $.ajax({
        type: "POST",
        url: "ajax/recherche_info_hl.php",
        dataType: "json",
        encode          : true,
        data: "id_hl="+$id, // on envoie via post
        success: function(json) {
            console.log(json);
            $("#ModalHl_titre").html(json["hl_titre"]);
            $vsrc=$("#ModalHl_image").attr('src1');
            $vsrc=$vsrc+json["hl_image"];
            $("#ModalHl_image").attr('src',$vsrc);
            $("#ModalHl").find("p").html(json["hl_texte"]);
            $("#ModalHl").modal();
            $("#map").html("");
            setTimeout(() => {
                init(Number(json["hl_longitude"]),Number(json["hl_latitude"]));
            }, 100);

        },
        error: function(jqXHR, textStatus)
        {
            if (jqXHR.status === 0){alert("Not connect.n Verify Network.");}
            else if (jqXHR.status == 404){alert("Requested page not found. [404]");}
            else if (jqXHR.status == 500){alert("Internal Server Error [500].");}
            else if (textStatus === "parsererror"){alert("Requested JSON parse failed.");}
            else if (textStatus === "timeout"){alert("Time out error.");}
            else if (textStatus === "abort"){alert("Ajax request aborted.");}
            else{alert("Uncaught Error.n" + jqXHR.responseText);}
        }
    });
}

function init(longi,latti) {
    var posi= [ longi,latti];
    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat(posi),
            zoom: 14
        })
    });
}