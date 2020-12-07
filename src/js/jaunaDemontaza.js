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

const norekinaVeids = document.getElementById("norekinuVeids");
const pasutijumaSumma = document.getElementById("pasutijumaSumma");
const celaIzdevumi = document.getElementById("celaIzdevumi");
const atlaide = document.getElementById("atlaide");
const summaApmaksai = document.getElementById("summaApmaksai");
const apmaksasStatuss = document.getElementById("apmaksasStatuss");

const buss = document.getElementById("buss");
const info = document.getElementById("info");

const createOrderBtn = document.getElementById("createOrder");

//DB DATA
const dataRef = firebase.database().ref().child("data").child("sezonas").child(localStorage["sezona"]).child("ofiss");
const kategorijasRef = firebase.database().ref().child("src").child("sezonas").child(localStorage["sezona"]).child("kategorijas");


newWindow.addEventListener('click', e=>{
    window.open('jaunaDemontazaPopin.html', "w1", '_blank', 'nodeIntegration=no, width=650, height=800, left=100, top=100')
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

        //random ID for order and reference to db
        const randomId = makeid(10);
        const demontazaRef = dataRef.child(menesis.value);

        var parsedLaiks = timeParser(laiks.value.replace(":", "-"));
        var parsedzIzpildesLaiks = timeParser(izpildesLaiks.value.replace(":", "-"));

        demontazaRef.once('value', snap => {
            var parsedLaiksDemontaza = timeParser(laiks.value.replace(":", "-"));
            var parsedzIzpildesLaiksDemontaza = timeParser(izpildesLaiks.value.replace(":", "-"));
                demontazaRef.push({
                    demontaza: true,
                    pasutitajs: pasutitajs.value,
                    kontaktpersona: kontaktpersona.value,
                    adrese: adrese.value,
                    telefons: telefons.value,
                    epasts: epasts.value,
                    buss: buss.value,
                    datums: datums.value,
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
                const inputElements = document.querySelectorAll("input");
                for(var i = 0; i<inputElements.length; i++){
                    inputElements[i].value = "";
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
