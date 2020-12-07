const categoryContainer = document.getElementById("categoryContainer");
const placeContainer = document.getElementById("placeContainer");
const createPavadzime = document.getElementById("createPavadzime");
const datumsField = document.getElementById("datumsField");

const kategorijasRef = firebase.database().ref().child("src").child("sezonas").child(localStorage["sezona"]).child("kategorijas");
const darbnicasRef = firebase.database().ref().child("data").child("sezonas").child(localStorage["sezona"]).child("darbnicas");
const vietasRef = darbnicasRef.child("locations");

vietasRef.once('value', snap=>{
    const lokacijas = snap.val();

    const select = document.createElement("select");
    select.className = "form-control";
    select.id = "place";

    for(const lokacija in lokacijas){
        const option = document.createElement("option");
        option.value = lokacija;
        option.innerText = lokacijas[lokacija].nosaukums;
        select.append(option);
    }

    placeContainer.append(select);
    createPavadzime.disabled = false;
})

kategorijasRef.on('child_added', snap => {
    const h5El = document.createElement("h5");
    h5El.innerText = snap.val().nosaukums;
    h5El.className = "text-center";

    const addItemBtn = document.createElement("button");
    addItemBtn.className = "btn btn-outline-primary mb-2";
    addItemBtn.innerText = "Pievienot vēl vienu preci"
    addItemBtn.style.width = "100%";
    addItemBtn.addEventListener('click', e =>{
        addCategoryItem(snap.key);
    })

    const categoryDiv = document.createElement("div");
    categoryDiv.id = snap.key;

    categoryDiv.append(h5El);
    categoryDiv.append(addItemBtn);
    categoryContainer.append(categoryDiv);
})

function addCategoryItem(cat) {
    const targetDiv = document.getElementById(cat);

    const singleItemDiv = document.createElement("div");
    singleItemDiv.className = "row added-item";
    singleItemDiv.style.width = "100%";
    singleItemDiv.dataset.categoryName = cat;

    const itemSelectorCol = document.createElement("div");
    itemSelectorCol.className = "col-sm-7"

    const selectElement = document.createElement("select");
    selectElement.className = "form-control mb-1 selectItem";
    selectElement.dataset.categoryName = cat;

    const quantityCol = document.createElement("div");
    quantityCol.className = "col-sm-2";

    const quantityField = document.createElement("input");
    quantityField.className = "form-control quantityField";
    quantityField.type = "number"
    quantityField.addEventListener('input', e=>{
        calculateValue(quantityField);
    })

    const quantityLabel = document.createElement("small");
    quantityLabel.innerText = "Gb.";

    const sumCol = document.createElement("div");
    sumCol.className = "col-sm-2"

    const sumField = document.createElement("input");
    sumField.className = "form-control quantityField text-center";
    sumField.style.fontSize = "small";
    sumField.style.paddingLeft = "2px";
    sumField.style.paddingRight = "2px";
    sumField.disabled = true;
    sumField.value = "-€"


    const deleteCol = document.createElement("div");
    deleteCol.className = "col-sm-1";

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    deleteBtn.className = "btn btn-outline-danger";
    deleteBtn.addEventListener('click', e =>{
            deleteItem(deleteBtn);
        })

    const singleCategoryRef = kategorijasRef.child(cat);
    singleCategoryRef.on('child_added', snap => {
        if(snap.key === "nosaukums"){

        }else{
            const singleCat = snap.val();
            for (const item in singleCat) {
               const optionElement = document.createElement("option");
               optionElement.innerText = singleCat[item].nosaukums + ", " + singleCat[item].cena + "€";
               optionElement.value = item;
               optionElement.dataset.price = singleCat[item].cena;
               selectElement.append(optionElement);
            }
        }
    });
    itemSelectorCol.append(selectElement);
    quantityCol.append(quantityField);
    quantityCol.append(quantityLabel);
    sumCol.append(sumField);
    deleteCol.append(deleteBtn);
    singleItemDiv.append(itemSelectorCol);
    singleItemDiv.append(quantityCol);
    singleItemDiv.append(sumCol);
    singleItemDiv.append(deleteCol);
    targetDiv.append(singleItemDiv);
}

function deleteItem(btnEl) {
    btnEl.parentElement.parentElement.remove();
}

function getItems(){
    var elementi = document.querySelectorAll(".added-item");
    var keyname = "pasutijumi";
    var pasutijumuObjekts = {};
    pasutijumuObjekts[keyname] = {};

    for(var i = 0; i < elementi.length; i++){
        const kategorija = elementi[i].dataset.categoryName;
        const prece = elementi[i].children[0].firstElementChild.value;
        const elementaObjekts = elementi[i].children[0].firstElementChild
        const precesNosaukums = elementaObjekts.options[elementaObjekts.selectedIndex].text;
        const precesCena = elementaObjekts.options[elementaObjekts.selectedIndex].dataset.price;
        console.log(prece);
        const precesDaudzums = elementi[i].children[1].firstElementChild.value;
        if(pasutijumuObjekts[keyname][kategorija] === undefined){
            pasutijumuObjekts[keyname][kategorija] = {};
        }
        if(pasutijumuObjekts[keyname][kategorija][prece] === undefined){
            pasutijumuObjekts[keyname][kategorija][prece] = {};
            pasutijumuObjekts[keyname][kategorija][prece]["nosaukums"] = precesNosaukums;
            pasutijumuObjekts[keyname][kategorija][prece]["cena"] = parseFloat(precesCena);
            pasutijumuObjekts[keyname][kategorija][prece]["skaits"] = parseInt(precesDaudzums, 10);
        }else{
            pasutijumuObjekts[keyname][kategorija][prece]["skaits"] += parseInt(precesDaudzums, 10);
        }
    }
    return pasutijumuObjekts;
}

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

createPavadzime.addEventListener('click', e=>{
        //Checks if all quantity fields were filled
        const quantityfields = document.querySelectorAll(".quantityField");
        for(var j = 0; j < quantityfields.length; j++){
            if(quantityfields[j].value === ""){
                $("#BodyText").text("Aizpildiet pasūtīto preču skaita laukus vai izdzēsiet liekos laukus!");
                $('#ErrorModal').modal();
                return;
            }
        }
        const placeSelect = document.getElementById("place");
        const pavadzimesRef = darbnicasRef.child("pavadzimes");
        const randomId = makeid(10);
        pavadzimesRef.once('value', snap=>{
            //Handles 1st paper of the season.
            if(snap.val() == null){
                pavadzimesRef.child("currentId").set(1);
                $("#BodyText").text("Kļūda, mēģiniet vēlreiz!");
                $('#ErrorModal').modal();
            }else if(snap.val().currentId === undefined){
                pavadzimesRef.child("currentId").set(1);
                $("#BodyText").text("Kļūda, mēģiniet vēlreiz!");
                $('#ErrorModal').modal();
            }else{
            const ID = snap.val().currentId;
            const pasObj = getItems().pasutijumi;
            var d = new Date();
            const dateString = datumsField.value.replace("T", " ");
            const pavadzObj = {};
            pavadzObj["preces"] = pasObj;
            pavadzObj["pavadzimesId"] = ID;
            pavadzObj["tirdznVieta"] = place.options[place.selectedIndex].text;
            pavadzObj["tirdznVietaId"] = place.value;
            pavadzObj["datums"] = dateString;
            pavadzimesRef.push(pavadzObj);
            pavadzimesRef.child("currentId").set(firebase.database.ServerValue.increment(1));

            for (const kat in pasObj) {
                for (const it in pasObj[kat]){
                    const srcRef = firebase.database().ref().child("src").child("sezonas").child(localStorage["sezona"]).child("kategorijas");
                    const itemsRef = srcRef.child(kat).child("preces").child(it).child("atlikums");
                    itemsRef.set(firebase.database.ServerValue.increment(pasObj[kat][it].skaits * (-1)));
                }
            }

            $("#BodyText").text("Pavadzīme nr " + ID + " ir izveidota!");
            $('#ErrorModal').modal();
            }
        })
})

function ddParser(num){
    var pEl = num.toString();
    if(pEl.length <2){
        return "0" + pEl;
    }else{
        return pEl;
    }
}

function calculateValue(el){
    const selectEl = el.parentElement.parentElement.children[0].firstElementChild;
    const cena = parseFloat(selectEl.options[selectEl.selectedIndex].dataset.price);
    const daudzums = parseFloat(el.parentElement.parentElement.children[1].firstElementChild.value)
    const summa = el.parentElement.parentElement.children[2].firstElementChild;
    if(isNaN(cena) || isNaN(daudzums)){
        summa.value = "-€";
    }else{
        summa.value = cena * daudzums + "€";
    }
}

$(document).ready( function() {
    $('#datumsField').val(new Date().toISOString().substr(0,16));
});