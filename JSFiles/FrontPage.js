//Fonction qui creer la liste deroulante au chargement de la page
function initListAliments(){

    var div = document.getElementById("Selection_aliments");

    var sel = document.createElement("select");
    sel.id = "selectAliment_1";
    sel.setAttribute("onchange","choisirAliments(value,this)");
    //Creation d'une option vide pour retourner a l'ensemble de toutes les recettes
    optEmpty = document.createElement("option");
    optEmpty.value = "Aliment";
    optEmpty.text = "Tout";
    sel.append(optEmpty);
    //Creation des options qui sont les sous categorie direct de Aliment
    for(alim of hierarchie["Aliment"]["sous-categorie"]){
        var opt = document.createElement("option");
        opt.value = alim;
        opt.text = alim;
        sel.append(opt);
    }

    div.append(sel);
}

//Fonction qui gere le fonctionnement de la liste deroulante (en creer de nouvelles, en supprimer ...)
function choisirAliments(aliment,liste){

            var div = document.getElementById("Selection_aliments");
            var tablSelect = div.getElementsByTagName("select");
            var numListe = parseInt(liste.id.split("_")[1]); //On recupere l'id du select qui appelle la fonction

            //On enleve les listes deroulantes "filles" du select qui appelle la fonction
            while(tablSelect.length > numListe){
                tablSelect[numListe].remove();
                }

            //Bloc de code qui creer la nouvelle liste deroulante
            if(aliment != "Aliment"){
            for(var [key, categorie] of Object.entries(hierarchie)){

                    if(key == aliment){

                        for(var [categ, tablElem] of Object.entries(categorie)){

                         if(categ === "sous-categorie"){
                            //On creer la liste deroulante avec comme options les sous-categories de l'aliment selectionnee
                            var sel = document.createElement("select");
                            sel.id = "selectAliment_" + (numListe + 1);
                            sel.setAttribute("onchange","choisirAliments(value,this)");

                            //Creation d'une option vide pour des raisons esthetiques
                            var optEmpty = document.createElement("option");
                            optEmpty.value = "";
                            optEmpty.text = "";
                            sel.append(optEmpty);
                            //On ajoute dans la nouvelle liste deroulante toutes les sous-categorie de l'aliment
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
            updateTable(aliment); // On met a jour le tableau de boissons
}

//Fonction qui met a jour le tableau de boissons
function updateTable(aliment){
       var tabl = document.getElementById("Tableau_recettes");
       tabl.innerHTML = "<tr> <th> Boisson </th> <th> Ingredients </th> <th> Preparation </th> <th> Photo </th></tr>";
       //Parcours de toutes les boissons
        for(var boissonInfos of Object.values(recettes)){
            var appartient = false;
            //On regarde si un ingredient de la boisson est de la famille de l'aliment qui est selectionne
            for(var boissonAliment of Object.values(boissonInfos["index"])){
                if(estDeLaFamilleDe(boissonAliment,aliment)){
                    var appartient = true;
                 }
            }
            //Bloc de code qui permet d'afficher la boisson dans le tableau, si elle doit etre affichee
            if(appartient){
                 var tr = document.createElement("tr");
                 var boi = document.createElement("td");
                 var ing = document.createElement("td");
                 var prep = document.createElement("td");
                 var photo = document.createElement("td");

                var img = document.createElement("img");
                img.setAttribute('onerror','this.style.display="none"');
                imgPath = boissonInfos["titre"];
                imgPath = imgPath.charAt(0) + imgPath.slice(1).toLowerCase(); //Modification de la casse pour correspondre au format de nom des images
                var imgPath = "/Photos/" + imgPath + ".jpg";
                imgPath = replaceSpecialChar(imgPath); //Necessaire pour les boissons comme la Pina Collada avec la egne
                img.setAttribute("src", imgPath);


                boi.innerHTML = boissonInfos["titre"];
                ing.innerHTML = boissonInfos["ingredients"].replace(/\|/g,"<br>");
                prep.innerHTML = boissonInfos["preparation"];
                photo.append(img);
                tr.append(boi);
                tr.append(ing);
                tr.append(prep);
                tr.append(photo);
                tabl.append(tr);
             }
        }
}
//Fonction qui verifie si un aliment est une sous_categorie, direct ou indirect, d'un autre aliment
function estDeLaFamilleDe(ss_cat,famille){
    if (ss_cat == famille){
        return true;
    }

    //Sous categorie est donc different de la famille

    if(famille == "Aliment"){
        return true;
    }

    //famille n'est donc pas l'ensemble des aliments

    if(ss_cat == "Aliment"){
        return false
    }

    //Fin de la recherche, "ss_cat" n'est donc pas de la famille de "famille"

    //On rapelle la fonction sur les super categorie de l'aliment
   var tab = hierarchie[ss_cat]["super-categorie"];
   var res = false
   for(var [ind , sup] of Object.entries(tab)) {
        res = res || estDeLaFamilleDe(sup,famille);
    }
    return res;
}

//Fonction qui transform un string pour qu'il ne possede pas de caracteres speciaux
function replaceSpecialChar(text){
    text = text.replace(/ñ/g,"n");
    text = text.replace(/é/g,"e");
    text = text.replace(/è/g,"e");
    text = text.replace(/ê/g,"e");
    text = text.replace(/à/g,"a");
    text = text.replace(/î/g,"i");
    text = text.replace(/ï/g,"i");
    text = text.replace(/ /g,"_");
    text = text.replace(/'/g,"");
    return text;
}