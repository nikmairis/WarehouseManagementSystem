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

const norekinaVeids = document.getElementById("norekinuVeids");
const pasutijumaSumma = document.getElementById("pasutijumaSumma");
const celaIzdevumi = document.getElementById("celaIzdevumi");
const atlaide = document.getElementById("atlaide");
const summaApmaksai = document.getElementById("summaApmaksai");
const apmaksasStatuss = document.getElementById("apmaksasStatuss");

const deleteOrderBtn = document.getElementById("deleteOrder");

const buss = document.getElementById("buss");
const info = document.getElementById("info");

const editOrder = document.getElementById("editOrder");

//DB DATA
const dataRef = firebase.database().ref().child("data").child("sezonas").child(localStorage["sezona"]).child("ofiss");

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
        norekinaVeids.value = saturs.norekinaVeids;
        pasutijumaSumma.value = saturs.pasutijumaSumma;
        celaIzdevumi.value = saturs.celaIzdevumi;
        atlaide.value = saturs.atlaide;
        summaApmaksai.value = saturs.summaApmaksai;
        apmaksasStatuss.value = saturs.apmaksasStatuss;
        buss.value = saturs.buss;
        info.value = saturs.info;
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

        // Adds the old order item numbers to the warehouse stock
        const orderRef = dataRef.child(localStorage["kalendars_menesis"]).child(localStorage["pasutijumaID"]);
        orderRef.once('value', snap => {

            var parsedLaiks = timeParserForDb(laiks.value.replace(":", "-"));
            var parsedzIzpildesLaiks = timeParserForDb(izpildesLaiks.value.replace(":", "-"));

            orderRef.set({
                    demontaza: true,
                    pasutitajs: pasutitajs.value,
                    kontaktpersona: kontaktpersona.value,
                    adrese: adrese.value,
                    telefons: telefons.value,
                    epasts: epasts.value,
                    datums: datums.value,
                    laiks: parsedLaiks,
                    ilgums: parsedzIzpildesLaiks,
                    norekinaVeids: norekinaVeids.value,
                    pasutijumaSumma: pasutijumaSumma.value,
                    celaIzdevumi: celaIzdevumi.value,
                    atlaide: atlaide.value,
                    summaApmaksai: summaApmaksai.value,
                    apmaksasStatuss: apmaksasStatuss.value,
                    buss: buss.value,
                    info: info.value
                });
            $("#BodyText").text("Pasūtījums izlabots");
            $('#ErrorModal').modal();

        })
    }else{
        $("#BodyText").text("Nav aizpildīts kāds no laukiem! (Pasūtītājs / mēnesis / datums / laiks / buss");
        $('#ErrorModal').modal();
     }
});

deleteOrderBtn.addEventListener('click', e=>{
    const orderRef = dataRef.child(localStorage["kalendars_menesis"]).child(localStorage["pasutijumaID"]);
    orderRef.once('value', snap => {
        orderRef.set(null);
    })
    mainContainer.innerHTML = null;
    mainContainer.innerHTML = "<div class='text-center'><h4> Pasūtījums dzēsts. Varat aizvērt šo logu!</h4></div>";
})