const mainContainer = document.getElementById("mainContainer");
const pasutitajs = document.getElementById("pasutitajs");
const kontaktpersona = document.getElementById("kontaktpersona");
const adrese = document.getElementById("adrese");
const telefons = document.getElementById("telefons");
const epasts = document.getElementById("epasts");

const menesis = document.getElementById("menesis");
const datums = document.getElementById("datums");
const laiks = document.getElementById("laiks");
const izpildesLaiks = document.getElementById("izpildesLaiks");
const korigejamsLaiks = document.getElementById("korigejamsLaiks");
const piegade = document.getElementById("piegadeBoolean");
const uzstadisana = document.getElementById("uzstadisana");

const norekinaVeids = document.getElementById("norekinuVeids");
const pasutijumaSumma = document.getElementById("pasutijumaSumma");
const celaIzdevumi = document.getElementById("celaIzdevumi");
const atlaide = document.getElementById("atlaide");
const summaApmaksai = document.getElementById("summaApmaksai");
const apmaksasStatuss = document.getElementById("apmaksasStatuss");

const categoryContainer = document.getElementById("categoryContainer");
const deleteOrderBtn = document.getElementById("deleteOrder");

const buss = document.getElementById("buss");
const info = document.getElementById("info");

const editOrder = document.getElementById("editOrder");

//DB DATA
const dataRef = firebase.database().ref().child("data").child("sezonas").child(localStorage["sezona"]).child("ofiss");
const kategorijasRef = firebase.database().ref().child("src").child("sezonas").child(localStorage["sezona"]).child("kategorijas");

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
    itemSelectorCol.className = "col-sm-9"

    const selectElement = document.createElement("select");
    selectElement.className = "form-control mb-1 selectItem";
    selectElement.dataset.categoryName = cat;

    const quantityCol = document.createElement("div");
    quantityCol.className = "col-sm-2";

    const quantityField = document.createElement("input");
    quantityField.className = "form-control quantityField";
    quantityField.type = "number"

    const quantityLabel = document.createElement("small");
    quantityLabel.innerText = "Gb.";

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
               optionElement.innerText = singleCat[item].nosaukums;
               optionElement.value = item;
               selectElement.append(optionElement);
            }
        }
    });
    itemSelectorCol.append(selectElement);
    quantityCol.append(quantityField);
    quantityCol.append(quantityLabel);
    deleteCol.append(deleteBtn);
    singleItemDiv.append(itemSelectorCol);
    singleItemDiv.append(quantityCol);
    singleItemDiv.append(deleteCol);
    targetDiv.append(singleItemDiv);
    return singleItemDiv;
}

function deleteItem(btnEl) {
    btnEl.parentElement.parentElement.remove();
}

function fillFields(){
    const pasutijumsRef = dataRef.child(localStorage["kalendars_menesis"]).child(localStorage["pasutijumaID"]);
    pasutijumsRef.once('value', snap => {
        const saturs = snap.val();
        pasutitajs.value = saturs.pasutitajs;
        kontaktpersona.value = saturs.kontaktpersona;
        adrese.value = saturs.adrese;
        telefons.value = saturs.telefons;
        epasts.value = saturs.epasts;
        menesis.value = localStorage["kalendars_menesis"];
        datums.value = saturs.datums;
        laiks.value = saturs.laiks.replace("-", ":");
        izpildesLaiks.value = timeParser(saturs.ilgums);
        korigejamsLaiks.value = saturs.korigejamsLaiks;
        piegade.value = saturs.piegade;
        uzstadisana.value = saturs.uzstadisana;
        norekinaVeids.value = saturs.norekinaVeids;
        pasutijumaSumma.value = saturs.pasutijumaSumma;
        celaIzdevumi.value = saturs.celaIzdevumi;
        atlaide.value = saturs.atlaide;
        summaApmaksai.value = saturs.summaApmaksai;
        apmaksasStatuss.value = saturs.apmaksasStatuss;
        buss.value = saturs.buss;
        info.value = saturs.info;

        const pasutijumi = saturs.pasutijumi;
        for(const cat in pasutijumi){
            const preces = pasutijumi[cat];
            for(const prece in preces){
                const addItem = addCategoryItem(cat);
                addItem.children[0].firstElementChild.value = prece;
                addItem.children[1].firstElementChild.value = preces[prece].skaits;
            }
        }
        editOrder.disabled = false;
    });
}

function timeParser(t) {
var timeToParse = t;
    var onlyHours = timeToParse.substring(0, timeToParse.indexOf("-"));
    if(onlyHours.length === 1){
        return "0" + timeToParse.replace("-", ":");
    }else{
        return timeToParse.replace("-", ":");
    }
}

function timeParserForDb(t) {
var timeToParse = t;
  if(timeToParse.charAt(0) === "0"){
        return timeToParse.substring(1);
    }else{
        return timeToParse;
    }
}

fillFields();

editOrder.addEventListener('click', e =>{
    if(pasutitajs.value != "" && menesis.value != "" && datums.value != "" && laiks.value != "" && buss.value != ""){

        //Checks if all quantity fields were filled
        const quantityfields = document.querySelectorAll(".quantityField");
        for(var j = 0; j < quantityfields.length; j++){
            if(quantityfields[j].value === ""){
                $("#BodyText").text("Aizpildiet pasūtīto preču skaita laukus vai izdzēsiet liekos laukus!");
                $('#ErrorModal').modal();
                return;
            }
        }

        // Adds the old order item numbers to the warehouse stock
        const orderRef = dataRef.child(localStorage["kalendars_menesis"]).child(localStorage["pasutijumaID"]);
        const srcRef = firebase.database().ref().child("src").child("sezonas").child(localStorage["sezona"]).child("kategorijas");
        orderRef.once('value', snap => {
            const orders = snap.val().pasutijumi;
            for(const category in orders){
                const singleCategory = orders[category];
                for(const singleItem in singleCategory){
                    const itemsVipRef = srcRef.child(category).child("preces").child(singleItem).child("atlikumsVIP");
                    itemsVipRef.set(firebase.database.ServerValue.increment(singleCategory[singleItem].skaits));
                }
            }

            var parsedLaiks = timeParserForDb(laiks.value.replace(":", "-"));
            var parsedzIzpildesLaiks = timeParserForDb(izpildesLaiks.value.replace(":", "-"));

            const pasObj = getItems().pasutijumi;

            orderRef.set({
                        pasutitajs: pasutitajs.value,
                        kontaktpersona: kontaktpersona.value,
                        adrese: adrese.value,
                        telefons: telefons.value,
                        epasts: epasts.value,
                        datums: datums.value,
                        laiks: parsedLaiks,
                        ilgums: parsedzIzpildesLaiks,
                        pasutijumi: pasObj,
                        korigejamsLaiks: korigejamsLaiks.value,
                        piegade: piegade.value,
                        uzstadisana: uzstadisana.value,
                        norekinaVeids: norekinaVeids.value,
                        pasutijumaSumma: pasutijumaSumma.value,
                        celaIzdevumi: celaIzdevumi.value,
                        atlaide: atlaide.value,
                        summaApmaksai: summaApmaksai.value,
                        apmaksasStatuss: apmaksasStatuss.value,
                        buss: buss.value,
                        info: info.value
                    });
            for (const kt in pasObj) {
                for (const itm in pasObj[kt]){
                    const srcRef = firebase.database().ref().child("src").child("sezonas").child(localStorage["sezona"]).child("kategorijas");
                    const itemsVipRef = srcRef.child(kt).child("preces").child(itm).child("atlikumsVIP");
                    itemsVipRef.set(firebase.database.ServerValue.increment(pasObj[kt][itm].skaits * (-1)));
                }
            }
            $("#BodyText").text("Pasūtījums izlabots");
            $('#ErrorModal').modal();

        })



    }else{
        $("#BodyText").text("Nav aizpildīts kāds no laukiem! (Pasūtītājs / mēnesis / datums / laiks / buss");
        $('#ErrorModal').modal();
     }
});

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
        const precesDaudzums = elementi[i].children[1].firstElementChild.value;
        if(pasutijumuObjekts[keyname][kategorija] === undefined){
            pasutijumuObjekts[keyname][kategorija] = {};
        }
        if(pasutijumuObjekts[keyname][kategorija][prece] === undefined){
            pasutijumuObjekts[keyname][kategorija][prece] = {};
            pasutijumuObjekts[keyname][kategorija][prece]["nosaukums"] = precesNosaukums;
            pasutijumuObjekts[keyname][kategorija][prece]["skaits"] = parseInt(precesDaudzums, 10);
        }else{
            pasutijumuObjekts[keyname][kategorija][prece]["skaits"] += parseInt(precesDaudzums, 10);
        }
    }
    return pasutijumuObjekts;
}

deleteOrderBtn.addEventListener('click', e=>{
    const orderRef = dataRef.child(localStorage["kalendars_menesis"]).child(localStorage["pasutijumaID"]);
    const srcRef = firebase.database().ref().child("src").child("sezonas").child(localStorage["sezona"]).child("kategorijas");
    orderRef.once('value', snap => {
        const orders = snap.val().pasutijumi;
        for(const category in orders){
            const singleCategory = orders[category];
            for(const singleItem in singleCategory){
                const itemsVipRef = srcRef.child(category).child("preces").child(singleItem).child("atlikumsVIP");
                itemsVipRef.set(firebase.database.ServerValue.increment(singleCategory[singleItem].skaits));
            }
        }
        orderRef.set(null);
    })
    mainContainer.innerHTML = null;
    mainContainer.innerHTML = "<div class='text-center'><h4> Pasūtījums dzēsts. Varat aizvērt šo logu!</h4></div>";
})