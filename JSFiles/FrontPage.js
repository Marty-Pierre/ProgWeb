function initListAliments(){

    var div = document.getElementById("Selection_aliments");

    var sel = document.createElement("select");
    sel.id = "selectAliment_1";
    sel.setAttribute("onchange","choisirAliments(value,this)");
    optEmpty = document.createElement("option");
    optEmpty.value = "";
    optEmpty.text = "";
    sel.append(optEmpty);
    for(alim of hierarchie["Aliment"]["sous-categorie"]){
        var opt = document.createElement("option");
        opt.value = alim;
        opt.text = alim;
        sel.append(opt);
    }

    div.append(sel);
}

function choisirAliments(aliment,liste){

            var div = document.getElementById("Selection_aliments");
            var tablSelect = div.getElementsByTagName("select");
            var numListe = parseInt(liste.id.split("_")[1]);

            while(tablSelect.length > numListe){
                tablSelect[numListe].remove();
                }


            if(aliment != ""){
            for(var [key, categorie] of Object.entries(hierarchie)){

                    if(key ==aliment){

                        for(var [categ, tablElem] of Object.entries(categorie)){

                         if(categ === "sous-categorie"){

                            var sel = document.createElement("select");
                            sel.id = "selectAliment_" + (numListe + 1);
                            sel.setAttribute("onchange","choisirAliments(value,this)");

                            var optEmpty = document.createElement("option");
                            optEmpty.value = "";
                            optEmpty.text = "";
                            sel.append(optEmpty);
                            for(var elem of Object.values(tablElem)){

                                var opt = document.createElement("option");
                                opt.value = elem
                                opt.text = elem
                                sel.append(opt);

                                }
                             div.append(sel);
                         }
                        }


                    }
                }
            }

}


function updateTable(aliment){
        var tabl = document.getElementById("Tableau_recettes");
       tabl.innerHTML = "<tr> <th> Boisson </th> <th> Ingredients </th> <th> Preparation </th> </tr>";
        for(var boissonInfos of Object.values(recettes)){

            for(var boissonAliment of Object.values(boissonInfos["index"])){
                if(estDeLaFamilleDe(boissonAliment,aliment)){
                    var tr = document.createElement("tr");
                    var boi = document.createElement("td");
                    var ing = document.createElement("td");
                    var prep = document.createElement("td");
                    boi.innerHTML = "oui";
                    ing.innerHTML = "oui";
                    prep.innerHTML = "oui";
                    tr.append(boi);
                    tr.append(ing);
                    tr.append(prep);
                    tabl.append(tr);
                 }

            }
        }
}

function estDeLaFamilleDe(ss_cat,famille){
    if (ss_cat == famille){
        return true;
    }
    //Sous categorie different de la famille

    if(famille == "Aliment"){
        return true;
    }
    //famille n'est pas l'ensemble des aliments

    if(ss_cat.length == 1){
        return false;
    }
    //La sous_categorie n'est pas une feuille ou l'ensemble des aliments

    var tab = hierarchie[ss_cat]["super-categorie"];
    document.write(tab[0]);
   for(var [ind , sup] of Object.entries(tab)) {
        return estDeLaFamilleDe(sup,famille);
    }
}