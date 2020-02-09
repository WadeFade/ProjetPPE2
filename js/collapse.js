function collapse(i) {
    var Page = {};
    Page['num'+i] = document.getElementsByClassName("ArticleNombre")[i];
    Page['num'+i].children[0].classList.toggle("StyleArticle");
    Page['num'+i].children[1].innerHTML="<button onclick=\"collapsed('"+i+"')\"><i class=\"fas fa-minus\"></i> Read Less</button>";
}
function collapsed(i) {
    var Page = {};
    Page['num'+i] = document.getElementsByClassName("ArticleNombre")[i];
    Page['num'+i].children[0].classList.toggle("StyleArticle");
    Page['num'+i].children[1].innerHTML="<button onclick=\"collapse('"+i+"')\"><i class=\"fas fa-plus\"></i> Read More</button>";
}

function init(longi,latti,id) {
    var posi= [longi,latti];
    var map = new ol.Map({
        target: 'map'+id,
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
