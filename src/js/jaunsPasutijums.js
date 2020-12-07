const newWindow = document.getElementById("newWindow");
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

const buss = document.getElementById("buss");
const info = document.getElementById("info");

const demontaza = document.getElementById("demontaza");
const demontazaMenesis = document.getElementById("demontazaMenesis");
const demontazasDatums = document.getElementById("demontazasDatums");
const demontazasLaiks = document.getElementById("demontazasLaiks");
const demontazasIzpildesLaiks = document.getElementById("demontazasIzpildesLaiks");

const demontazaMenesisWrapper = document.getElementById("demontazaMenesisWrapper");
const demontazasLaiksWrapper = document.getElementById("demontazasLaiksWrapper");

const createOrderBtn = document.getElementById("createOrder");

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

newWindow.addEventListener('click', e=>{
    window.open('jaunsPasutijumsPopin.html', "w1", '_blank', 'nodeIntegration=no, width=650, height=800, left=100, top=100')
})

function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

createOrderBtn.addEventListener('click', e=>{
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
        //random ID for order and reference to db
        const randomId = makeid(10);
        const pasutijumsRef = dataRef.child(menesis.value);
        const demontazaRef = dataRef.child(demontazaMenesis.value);

        var parsedLaiks = timeParser(laiks.value.replace(":", "-"));
        var parsedzIzpildesLaiks = timeParser(izpildesLaiks.value.replace(":", "-"));

        const pasObj = getItems().pasutijumi;

        pasutijumsRef.once('value', snap => {
                pasutijumsRef.push({
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
                if(demontaza.options[demontaza.selectedIndex].value == "true"){
                var parsedLaiksDemontaza = timeParser(demontazasLaiks.value.replace(":", "-"));
                var parsedzIzpildesLaiksDemontaza = timeParser(demontazasIzpildesLaiks.value.replace(":", "-"));
                    demontazaRef.push({
                        demontaza: true,
                        pasutitajs: pasutitajs.value,
                        kontaktpersona: kontaktpersona.value,
                        adrese: adrese.value,
                        telefons: telefons.value,
                        epasts: epasts.value,
                        buss: buss.value,
                        datums: demontazasDatums.value,
                        laiks: parsedLaiksDemontaza,
                        ilgums: parsedzIzpildesLaiksDemontaza,
                        norekinaVeids: norekinaVeids.value,
                        pasutijumaSumma: "",
                        celaIzdevumi: "",
                        atlaide: "",
                        summaApmaksai: "",
                        apmaksasStatuss: apmaksasStatuss.value,
                        info: info.value
                    })
                }
                const inputElements = document.querySelectorAll("input");
                for(var i = 0; i<inputElements.length; i++){
                    inputElements[i].value = "";
                }
                for (const kat in pasObj) {
                    for (const it in pasObj[kat]){
                        const srcRef = firebase.database().ref().child("src").child("sezonas").child(localStorage["sezona"]).child("kategorijas");
                        const itemsVipRef = srcRef.child(kat).child("preces").child(it).child("atlikumsVIP");
                        itemsVipRef.set(firebase.database.ServerValue.increment(pasObj[kat][it].skaits * (-1)));
                    }
                }
                $("#BodyText").text("Pasūtījums izveidots!");
                $('#ErrorModal').modal();
        });

    }else{
        $("#BodyText").text("Nav aizpildīts kāds no laukiem! (Pasūtītājs / mēnesis / datums / laiks / buss");
        $('#ErrorModal').modal();
    }
})

function timeParser(t) {
var timeToParse = t;
  if(timeToParse.charAt(0) === "0"){
        return timeToParse.substring(1);
    }else{
        return timeToParse;
    }
}

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

demontaza.addEventListener('change', e=>{
    if(demontaza.options[demontaza.selectedIndex].value == "true"){
        demontazaMenesisWrapper.style.display = "block";
        demontazasLaiksWrapper.style.display = "block";
    }else{
        demontazaMenesisWrapper.style.display = "none";
        demontazasLaiksWrapper.style.display = "none";
    }
})