const menesisField = document.getElementById("menesis");
const datumsField = document.getElementById("datums");
const generateButton = document.getElementById("generate");

const dynamicDiv = document.getElementById("dynamicDiv");
const srcRef = firebase.database().ref().child("src").child("sezonas").child(localStorage["sezona"])
                    .child("kategorijas");
const catObj = {};

srcRef.once('value', snap=>{
    const kategorijas = snap.val();
    for(const kategorija in kategorijas){
        catObj[kategorija] = kategorijas[kategorija].nosaukums;
    }
})

generateButton.addEventListener('click', e=>{
    if(datumsField.value !== ""){
    dynamicDiv.innerHTML = null;
    const menesis = menesisField.value;
    const datums = datumsField.value;
    const dataRef = firebase.database().ref().child("data").child("sezonas").child(localStorage["sezona"])
                    .child("ofiss").child(menesis);
    var thisDaysObject = {};
    dataRef.once('value', snap => {
        const wholeMonth = snap.val();
        for (const pasutijums in wholeMonth){
            //Remove comment, If need to exclude the non-delivery items
            //if(wholeMonth[pasutijums].piegade === "true"){
                if(wholeMonth[pasutijums].datums === datumsField.value || wholeMonth[pasutijums].datums === "0" + datumsField.value){
                    if(thisDaysObject["buss" + wholeMonth[pasutijums].buss] === undefined){
                        thisDaysObject["buss" + wholeMonth[pasutijums].buss] = [];
                    }
                    thisDaysObject["buss" + wholeMonth[pasutijums].buss].push(wholeMonth[pasutijums]);
                    console.log(wholeMonth[pasutijums]);
                }
            //}
        }

    const printBtn = document.createElement("button");
    printBtn.className = "btn btn-info no-print text-center mb-2";
    printBtn.innerText = "Printēt!";
    printBtn.style.width = "100%";
    printBtn.addEventListener('click', e=>{
        window.print();
    })
    dynamicDiv.appendChild(printBtn);
    for (const busNr in thisDaysObject){
        const deliveryList = thisDaysObject[busNr];

        const busH1 = document.createElement("h1");
        busH1.className = "text-center";
        var busaNosaukums = "";
        switch(busNr){
            case "buss1":
            busaNosaukums = "Buss 1";
            break;
            case "buss2":
            busaNosaukums = "Buss 2";
            break;
            case "buss3":
            busaNosaukums = "Buss 3";
            break;
        }
        busH1.innerText = busaNosaukums;
        dynamicDiv.append(busH1);
        for(var i = 0; i<deliveryList.length; i++){
            const currentDelivery = deliveryList[i]
            const tabula = document.createElement("table");
            tabula.className = "table table-light pad";
            tabula.style.width = "100%";

            const thead = tabula.createTHead();
            if(currentDelivery.demontaza !== undefined){
                const piegadeTr = document.createElement("tr");

                const piegadeTd = document.createElement("td");
                piegadeTd.colSpan = 12;
                piegadeTd.className = "text-center print-danger-fade";
                piegadeTd.innerHTML = "<b>DEMONTĀŽA!</b>";

                piegadeTr.appendChild(piegadeTd);
                thead.appendChild(piegadeTr);
            }else{
                if(currentDelivery.piegade === "false"){
                    const piegadeTr = document.createElement("tr");

                    const piegadeTd = document.createElement("td");
                    piegadeTd.colSpan = 12;
                    piegadeTd.className = "text-center";
                    piegadeTd.innerHTML = "<b>PIEGĀDE NAV NEPIECIEŠAMA!</b>";

                    piegadeTr.appendChild(piegadeTd);
                    thead.appendChild(piegadeTr);
                }
            }

            const firstTr = document.createElement("tr");

            const datumsTd = document.createElement("td");
            datumsTd.colSpan = 8;
            datumsTd.innerHTML = "<b>Datums:</b> " + currentDelivery.datums + ". " + menesis;

            const laiksTd = document.createElement("td");
            laiksTd.colSpan = 4;
            laiksTd.innerHTML = "<b>Laiks:</b> " + currentDelivery.laiks.replace("-", ":");
            if(currentDelivery.korigejamsLaiks === "false"){
                laiksTd.className = "print-danger-fade";
            }

            firstTr.append(datumsTd);
            firstTr.append(laiksTd);

            thead.appendChild(firstTr);
            if(currentDelivery.demontaza === undefined){
            const pasutijumKategorijas = currentDelivery.pasutijumi;
            for(const kategorija in pasutijumKategorijas){
                const kategorijasTr = document.createElement("tr");

                const kategorijasTd = document.createElement("td");
                kategorijasTd.colSpan = 12;
                kategorijasTd.style.lineHeight = "25px";
                kategorijasTd.innerHTML = "<b>" + catObj[kategorija] + ":</b> "
                const singleKategorija = pasutijumKategorijas[kategorija];
                for(const prece in singleKategorija){
                    kategorijasTd.innerHTML += " <item>" + singleKategorija[prece].nosaukums + " [" + singleKategorija[prece].skaits + "gb.]</item>,"
                }
                kategorijasTr.append(kategorijasTd);
                thead.innerHTML += kategorijasTr.innerHTML;
            }


            const uzstadisanaTr = document.createElement("tr");

            const uzstadisanaTd = document.createElement("td");
            uzstadisanaTd.colSpan = 12;
            var uzstadisanaText = "";
            if(currentDelivery.uzstadisana === "true"){
                uzstadisanaText = "Jā";
                uzstadisanaTd.className = "print-danger-fade";
            }else{
                uzstadisanaText = "Nē";
            }
            uzstadisanaTd.innerHTML = "<b>Uzstādīšana: </b> " + uzstadisanaText;
            uzstadisanaTr.append(uzstadisanaTd);
            thead.appendChild(uzstadisanaTr);
            }

            const kontaktiApmaksaTr = document.createElement("tr");
            const kontaktiTd = document.createElement("td");
            kontaktiTd.colSpan = 8;
            kontaktiTd.innerHTML = "<b>Kontakti: </b> " + currentDelivery.kontaktpersona + ", " + currentDelivery.telefons;
            const apmaksaTd = document.createElement("td");
            apmaksaTd.colSpan = 4;
            var apmaksasTeksts = "";
            if(currentDelivery.apmaksasStatuss === "false" && currentDelivery.norekinaVeids === "skaidrs"){
                apmaksasTeksts = "Maksās skaidrā naudā: " + currentDelivery.summaApmaksai + "€";
                apmaksaTd.className = "print-danger-fade";
            }else if(currentDelivery.apmaksasStatuss === "false" && currentDelivery.norekinaVeids === "davanuKarte"){
                apmaksasTeksts = "Maksās ar dāvanu Karti: " + currentDelivery.summaApmaksai + "€";
                apmaksaTd.className = "print-danger-fade";
            }else if(currentDelivery.apmaksasStatuss === "false"){
                apmaksasTeksts = "Neapmaksāts";
                apmaksaTd.className = "print-danger-fade";
            }else{
                apmaksasTeksts = "Apmaksāts";
            }
            apmaksaTd.innerHTML = "<b>Apmaksa: </b> " + apmaksasTeksts;
            kontaktiApmaksaTr.append(kontaktiTd);
            kontaktiApmaksaTr.append(apmaksaTd);
            thead.appendChild(kontaktiApmaksaTr);

            const adreseTr = document.createElement("tr");
            const pasutitajsTd = document.createElement("td");
            pasutitajsTd.colSpan = 4;
            pasutitajsTd.innerHTML = "<b>Pasūtītājs: </b> " + currentDelivery.pasutitajs;
            const adreseTd = document.createElement("td");
            adreseTd.colSpan = 8;
            adreseTd.innerHTML = "<b>Adrese: </b> " + currentDelivery.adrese;
            adreseTr.append(adreseTd);
            adreseTr.append(pasutitajsTd);
            thead.appendChild(adreseTr);

            const infoTr = document.createElement("tr");
            const infoTd = document.createElement("td");
            infoTd.colSpan = 12;
            infoTd.innerHTML = "<b>Informācija: </b> " + currentDelivery.info;
            infoTr.append(infoTd);
            thead.appendChild(infoTr);

            dynamicDiv.append(tabula);
            //const adrese = document.createElement("p");
            //adrese.innerText = deliveryList[i].adrese;
            //adrese.className = "text-center";
            //busDiv.append(adrese);
        }
    }

    });
    }else{
        $("#BodyText").text("Lūdzu aizpildiet datuma lauku!");
        $('#ErrorModal').modal();
    }
})



