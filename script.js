//fonction du prof
// ------- WRITE FILE -------
function writeFile(id_form,func) { //id_form sert à retrouver le forms avec les infos, fun a définir la fonction C qu'on utiliseras

    var element = document.createElement('a'); //on crée un élément qui contiendras toutes les informations a télécharger

    let text1 = document.getElementById(id_form); //on trouve le forms (ne marche pas si ce n'est pas un forms)
    let count = text1.elements.length; //on récupère le nombre d'information a sélectionner dans le forms (les imputs, les textarea ... etc)
    let textToSave = func; //textToSave est le contenu du fichier, on y ajoute la fonction qu'on éxecuteras en C
    for(let i = 0;i<count;i++){ //pour tout les éléments du forms
        textToSave += ";" + text1[i].value; //on ajoute l'élément du forms sélectionné (10 minutes, James Cameron ...)
    }

    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(textToSave)); //on rajoute à l'élément le contenu a garder 
    element.setAttribute('download', 'request.txt');//on définis qu'au click on télécharge les informations

    element.style.display = 'none'; //on rend l'élément invisible
    document.body.appendChild(element); //on l'ajoute à l'HTML
    element.click(); //on click dessus => provoque le téléchargement
    document.body.removeChild(element); //on supprime l'élément

//    text1.submit();
}
// -------------------------


// ------- READ FILE -------
function readFileByName(fileName){//bien mettre le ".txt" pour fonctionner

    let xhr = new XMLHttpRequest(); //je ne sait pas 
    do {
        xhr.open("GET", fileName, false); //ouvre le document fileName (notre fichier que l'ont veut ouvrir)
        xhr.send(null); //envoie dans la console que le fichier n'existe pas

    }while(xhr.status === 404); //répète tant que l'ont ne trouve pas le document

    // assumes status 200
    return xhr.responseText; //rencoie le texte du document
}

function readFile(){
    var log = readFileByName("ready.txt"); //lit indéfinement le contenu de ready
    console.log(log);
    return readFileByName("results.txt"); //dès que ready existe, renvoie le contenue de result 
}
// -------------------------

function callWrite() {
    writeFile("form-findByDirector",  ) //je ne sait pas 
}


//fonction Eleve
function getTop3Podium() {
    //valeur par défaut avant que l'ont récupère ces données 

    var ensemble=["rld","wissam",12,"Julien",11,"Achille",10];

    // Récupérer les éléments des films et des réalisateurs

    var first = document.querySelectorAll("div#F1")[0]; //on récupère la zone la première occurence de "F1" soit la plus haute 
    var Rfirst = document.querySelectorAll("div#F1")[4];//on récupère la dernière occurence de "F1" soit la plus basse 
    first.innerHTML = ensemble[2]+" films"; //modifie la valeur du haut par le nombre de films trouvé plus haut
    Rfirst.innerHTML=ensemble[1]; //on modifie la dernière case en ajoutant le nom du réal correspondant 
    

    var seco = document.querySelectorAll("div#F2")[0]; //répétition du procédé pour le n°2 et 3
    var Rseco = document.querySelectorAll("div#F2")[3];
    seco.innerHTML = ensemble[4]+" films";
    Rseco.innerHTML=ensemble[3];

    var third = document.querySelectorAll("div#F3")[0];
    var Rthird = document.querySelectorAll("div#F3")[2];
    third.innerHTML = ensemble[6]+" films";
    Rthird.innerHTML=ensemble[5];
}

function getAndReplaceTime(){
    var timeIndent = document.getElementById("timeIndent"); //permet de récupérer l'endroit dans lequel on vas mettre le temps selectionné
    var timeRange = document.getElementById("range").valueAsNumber; //permet de récupérer la valeur sélectionné; 
    console.log("temps sélectionné =>", timeRange);

    timeIndent.innerHTML="Durée sélectionnée : "+timeRange + " minutes";
}

function TransformButton(){ 
    var button = document.getElementById("disconnectButton");
    var modalDebug = document.getElementsByClassName("modalBox")[0];

    if(button.style.color=="rgb(43, 45, 66)"){
        button.style.backgroundColor="#ff1404";
        button.style.color="#2B2D43";
        button.innerText="Reconnect To server";
        modalDebug.removeAttribute("id");
    }
    else{
        button.style.backgroundColor="#A3CEF1";
        button.style.color="#2B2D42";
        button.innerText="Disconnect from server";
        modalDebug.setAttribute("id","open");
    }
    
}

function main(){
    getTop3Podium();

    //pour retirer la modal au rechargement 
    var ModalPos=document.getElementsByClassName("modalBox")[0];
    var verificateur = ModalPos.children[0].children[1];
    if(verificateur.innerText=="Type de sélection"){
        ModalPos.style.display="none";
    }
}

main();

function addFilm(){

    var verifButton = document.getElementById("disconnectButton");
    if(verifButton.innerText=="Reconnect To server"){
        alert("déconnecté du serveur");
    }
    else{
        var filmName = document.getElementById("addTitle"); //on récupère le nom du film a ajouter
        var filmDuration = document.getElementById("addDuration"); // on récupère la durée du film sélectionnée
        var filmRéal = document.getElementById("addProductor"); //on récupère le nom du producteur 
        var filmType =document.getElementById("addType"); //on récupère le type sélectionné 
        
        if(filmName.value=="" || filmDuration.valueAsNumber=="0" || filmRéal.value=="" || filmType.value==""){
            if(filmName.value==""){ //si le titre est vide 
                console.log("Titre vide"); 
                filmName.setAttribute("class","tremblement Blue"); //on ajoute la class pour faire le tremblement
                setTimeout(() => {
                    filmName.setAttribute("class","Blue"); //on retire cette class pour le réutiliser plus tard
                },1000);
            }
            
            if(filmDuration.valueAsNumber=="0"){ //pareil
                console.log("duration vide");
                filmDuration.setAttribute("class","tremblement Blue");
                setTimeout(() => {
                    filmDuration.setAttribute("class","Blue");
                },1000);
            }
            
            if(filmRéal.value==""){
                console.log("Réalisateur vide");
                filmRéal.setAttribute("class","tremblement Blue");
                setTimeout(() => {
                    filmRéal.setAttribute("class","Blue");
                },1000);
            }
            
            if(filmType.value==""){
                console.log("Type vide");
                filmType.setAttribute("class","tremblement Blue");
                setTimeout(() => {
                    filmType.setAttribute("class","Blue");
                },1000);
            }
        }
        else{
            writeFile("FilmToAdd","addFilm"); //on crée le fichier avec la fonction qui  permetteras d'ajouter un film
            
            var locationToAdd = document.getElementById("locationAddFilm"); //on récupère la zone dans laquelle on vas rajouter le titre 
            
            var box = document.createElement("div"); //on crée une div pour contenir tout les éléments 
            box.setAttribute("class","Blue");
            
            var Titre = document.createElement("p"); //on ajoute le titre
            Titre.innerText=filmName.value;
            
            var Duree = document.createElement("p"); //on ajoute la durée
            Duree.innerText=filmDuration.value;
            
            var Prod = document.createElement("p"); //on ajoute le nom du réal 
            Prod.innerText=filmRéal.value;
            
            var Type = document.createElement("p"); //on ajoute le type 
            Type.innerText=filmType.value;
            
            box.appendChild(Titre);
            box.appendChild(Duree);
            box.appendChild(Prod);
            box.appendChild(Type);
            
            locationToAdd.appendChild(box); //o ajoute la box
            
        }
    }
    
}


function openModal(subBtn) {
    //le subBtn sert a savoir a partir de quels information se fait la recherche

    var verifButton = document.getElementById("disconnectButton");
    if(verifButton.innerText=="Reconnect To server"){
        alert("déconnecté du serveur");
    }
    else{
        var modal=document.getElementsByClassName("modalBox")[0];

        //on cherche a partir du nom du producteur
        if(subBtn == "director"){
            var director = document.getElementsByTagName("textarea")[0].value; //on récupère le directeur recherché 
            console.log("on cherche la liste de films ayant ",director," en réalisateur");
    
            var Titre = modal.children[0].children[1]; //on change le titre
            Titre.innerText="Recherche par le nom du réalisateur : '" +director+"'";
    
            writeFile("selct2","FindByRealisator"); //on crée le fichier contenant les information des réalisateurs
    
        }
    
        //on cherche a partir de la durée du film 
        if(subBtn == "duration"){
            var range = document.getElementById("range").valueAsNumber; //on récupère la durée de film recherchée
            console.log("on cherche la liste de films ayant ",range," minutes");
    
            var Titre = modal.children[0].children[1]; //on change le titre
            Titre.innerText="Recherche par la durée de film : '" +range+"' minutes"; 
    
            writeFile("selct1","FindByDuration");//on crée un fichier contenant les informations des minutes
    
        }
    
        //on cherche a partir du type de film
        if(subBtn =='type'){
            var Type = document.getElementById("TypeSelect").value; //on récupère la durée de film recherchée
            console.log("on cherche la liste de films ayant "+Type);
    
            var Titre = modal.children[0].children[1]; //on change le titre
            Titre.innerText="Recherche par le type de film : '" +Type+"'";
    
            var WriteFileWillFind = document.createElement('form'); //on crée un élément form que la fonction writeFile vas trouver 
            WriteFileWillFind.setAttribute("style","none"); //on le rend invisible 
            WriteFileWillFind.setAttribute("id","selct3") //on lui ajoute l'id qui vas permettre a writefile de le trouver
            var element = document.createElement('input'); //on crée notre élément dans le forms qui vas contenir la valeur 
            element.value=Type; //on lui attribut la valeur 
            WriteFileWillFind.appendChild(element); //on l'ajoute au form
            document.body.appendChild(WriteFileWillFind); //on ajoute le forms au document
    
            writeFile("selct3","FindByType");//on crée un fichier contenant les informations du type et sa fonction associée 
    
            document.body.removeChild(WriteFileWillFind); //retire le forms et ses éléments 
        }
    
        //on recherche par le titre 
        if(subBtn=='title'){
            var Title = document.getElementById("TitleSelect").value; //on récupère la durée de film recherchée
            console.log("on cherche la liste de films ayant "+Type);
    
            var Titre = modal.children[0].children[1]; //on change le titre
            Titre.innerText="Recherche par le titre du film : '" +Title+"'"; 
    
            writeFile("selct4","FindByTiles");//on crée un fichier contenant les informations du titre
        }
        
        // var ToAdd  = readFile(); //on récupère le contenu du fichier result;
        var ToAdd= readFile();
    
    
            var tBody = document.getElementsByTagName("tbody")[0]; //pour poser les informations récupérées
    
            //je suppose que le séparateur entre les information d'un film est "," et des films eux même est "\n" avec cette forme : "titre F1, durée F1, réalisateur F1, type F1\n titre F2, ..."
    
            ToAdd= ToAdd.split('\r'); //on sépare à chaques '\n' donc chaques films

            for(let i=0; i<ToAdd.length; i++){ //répéter pour chaques films 
                var FilmTable = ToAdd[i].split(",");
        
    
                var film = document.createElement('tr'); //permet de créer la ligne du film
                
                var Titre = document.createElement('td'); //crée un élément de la ligne pour le titre
                Titre.setAttribute("class","Blue"); //on rajoute la classe Blue pour attribuer un style a l'élément 
                Titre.textContent=FilmTable[0]; //on écrit dans l'élément le titre du film
                console.log(Titre);
                if(Titre[0]=='\n'){
                    Titre[0] =Titre.substr(2);
                    console.log(Titre[0]);
                }

                film.appendChild(Titre); //on ajoute l'élément dans la ligne
    
                var duree = document.createElement('td'); //même fonctionnement pour les durées
                duree.setAttribute("class","Blue");
                duree.innerText=FilmTable[1]; 
                film.appendChild(duree);
    
                var Prod= document.createElement('td'); //même fonctionnement pour le nom des producteurs
                Prod.setAttribute("class","Blue"); 
                Prod.innerText=FilmTable[2]; 
                film.appendChild(Prod); 
    
                var Type= document.createElement('td'); //même fonctionnement pour le nom des producteurs
                Type.setAttribute("class","Blue"); 
                Type.innerText=FilmTable[3]; 
                film.appendChild(Type);
    
                tBody.appendChild(film); //on ajoute le film au tableau
            }
            
        modal.style.display = 'block';
    }
}