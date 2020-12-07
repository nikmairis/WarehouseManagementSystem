const parskatsWrapper = document.getElementById("parskatsWrapper");
const vietasContainer = document.getElementById("placeContainer");

const darbnicasRef = firebase.database().ref().child("data").child("sezonas").child(localStorage["sezona"]).child("darbnicas");
const pavadzimeRef = darbnicasRef.child("pavadzimes");
const kategorijasRef = firebase.database().ref().child("src").child("sezonas").child(localStorage["sezona"]).child("kategorijas");
const locationsRef = darbnicasRef.child("locations");

pavadzimeRef.once('value', snap=>{
    parskatsWrapper.innerHTML = null;
    const pavadzimes = snap.val();
    var pavadzimesObj = [];
    for(const pz in pavadzimes){
        if(pavadzimes[pz].tirdznVietaId === localStorage["parskataId"]){
            pavadzimesObj.push(pavadzimes[pz]);
        }
    }
    createTable(pavadzimesObj);
})


locationsRef.once('value', snap=>{
    const locations = snap.val();
    for(const loc in locations){
        const link = document.createElement("a");
        link.href = "#";
        link.className = "dropdown-item";
        link.innerText = locations[loc].nosaukums;
        link.addEventListener('click', e=>{
            localStorage["parskataId"] = loc;
            window.location.href = "parskati.html";
        })
        vietasContainer.append(link);
    }
})


function createTable(tbl){
    kategorijasRef.once('value', snap=>{
        const tabula = document.createElement("table");
        tabula.id = "dynamicTable";
        tabula.className = "table table-bordered table-primary table-hover";
        tabula.style.margin = "auto"
        const kategorijas = snap.val();
        //loops to create all the columns
        for(var i=-1; i<tbl.length; i++){
            if(i === -1){
                const theadEl = document.createElement("thead");
                theadEl.style.backgroundColor = "rgb(157, 204, 255)";
                const trElement = document.createElement("tr")
                trElement.className = "thead-dark"
                const tdCorner = document.createElement("td");
                tdCorner.id = "namePlaceholder";
                //tdCorner.style.border = "1px solid black";
                trElement.append(tdCorner);
                for(const cat in kategorijas){
                    const kategorija = kategorijas[cat].preces;
                    for(const it in kategorija){
                        const tdElement = document.createElement("td");
                        //tdElement.style.border = "1px solid black";
                        const katNosaukums = document.createElement("div");
                        katNosaukums.style.padding = "3px";
                        katNosaukums.style.fontWeight = "bold";
                        katNosaukums.innerText = kategorija[it].nosaukums;
                        tdElement.append(katNosaukums);
                        trElement.append(tdElement);
                        theadEl.append(trElement);
                    }
                }
                tabula.append(theadEl);
            }else{
                const tbodyEl = document.createElement("tbody");
                const trElement = document.createElement("tr")
                const tdCorner = document.createElement("td");
                //tdCorner.style.border = "1px solid black";
                const datumsDiv = document.createElement("div");
                datumsDiv.style.padding = "3px";
                datumsDiv.innerText = tbl[i].datums;
                tdCorner.append(datumsDiv);
                trElement.append(tdCorner);
                for(const cat in kategorijas){
                    const kategorija = kategorijas[cat].preces;
                    for(const it in kategorija){
                        const tdElement = document.createElement("td");
                        //tdElement.style.border = "1px solid black";
                        try{
                            const textDiv = document.createElement("div");
                            textDiv.className = "3px";
                            textDiv.innerText = tbl[i].preces[cat][it].skaits;
                            tdElement.append(textDiv);
                            //tdElement.innerText = tbl[i].preces[cat][it].skaits;
                        }catch(err){
                            //does not exist
                        }
                        tdElement.className = "pz" + tbl[i].pavadzimesId + " " + it.replace(" ", "_") + " " + cat.replace(" ", "_");
                        trElement.append(tdElement);
                        tbodyEl.append(trElement);
                    }
                }
                tabula.append(tbodyEl);
            }
        }
        parskatsWrapper.append(tabula);
    })
}

function calculateSum(){
        kategorijasRef.once('value', snap=>{
        const kategorijas = snap.val();
        const tabula = document.getElementById("dynamicTable");
        /////////// THE SUM ROW //////////////
        const theadEl = document.createElement("thead");
        theadEl.style.backgroundColor = "rgb(157, 204, 255)";
        const trElement = document.createElement("tr")
        trElement.className = "thead-dark"
        const tdCorner = document.createElement("td");
        tdCorner.innerText = "Kopā:"
        //tdCorner.style.border = "1px solid black";
        trElement.append(tdCorner);
        for(const cat in kategorijas){
            const kategorija = kategorijas[cat].preces;
            for(const it in kategorija){
                const tdElement = document.createElement("td");
                //tdElement.style.border = "1px solid black";
                const katNosaukums = document.createElement("div");
                katNosaukums.style.padding = "3px";
                katNosaukums.style.fontWeight = "bold";
                const visasPreces = document.querySelectorAll("." + it.replace(" ", "_") + "." + cat.replace(" ", "_") + " div");
                var summa = 0;
                for(var p = 0; p<visasPreces.length; p++){
                    try{
                        summa += parseInt(visasPreces[p].innerText);
                    }catch(e){
                        //nothing happens
                    }
                }
                katNosaukums.innerText = summa;
                tdElement.append(katNosaukums);
                trElement.append(tdElement);
                theadEl.append(trElement);
            }
        }
        tabula.append(theadEl);
        setQuota();
        /////////// THE SUM ROW //////////////
        })
}

window.addEventListener('load', function () {
  calculateSum();
})

function setQuota(){
        kategorijasRef.once('value', snap=>{
        const kategorijas = snap.val();
        const tabula = document.getElementById("dynamicTable");
        /////////// THE SUM ROW //////////////
        const theadEl = document.createElement("thead");
        theadEl.style.backgroundColor = "rgb(157, 204, 255)";
        const trElement = document.createElement("tr")
        trElement.className = "thead-dark"
        const tdCorner = document.createElement("td");
        const uploadQuotaBtn = document.createElement("button");
        uploadQuotaBtn.className = "btn btn-primary";
        uploadQuotaBtn.innerText = "Saglabāt";
        uploadQuotaBtn.addEventListener('click', e=>{
            uploadQuota();
        })
        tdCorner.append(uploadQuotaBtn);
        //tdCorner.style.border = "1px solid black";
        trElement.append(tdCorner);
        for(const cat in kategorijas){
            const kategorija = kategorijas[cat].preces;
            for(const it in kategorija){
                const tdElement = document.createElement("td");
                tdElement.className = "text-center";
                //tdElement.style.border = "1px solid black";
                const katQuota = document.createElement("input");
                katQuota.style.width = "60px";
                katQuota.className = "form-control " + cat + " " + it + " quotaField";
                katQuota.dataset.kategorija = cat;
                katQuota.dataset.prece = it;
                katQuota.style.margin = "auto";
                fillQuotaField(katQuota);
                tdElement.append(katQuota);
                trElement.append(tdElement);
                theadEl.append(trElement);
            }
        }
        tabula.append(theadEl);
        /////////// THE SUM ROW //////////////
        })
}

function uploadQuota(){
    const kvotaRef = darbnicasRef.child("locations").child(localStorage["parskataId"]).child("kvota");
    kvotaRef.once('value', snap=>{
        kvotaRef.set(getItems())
    })
    $("#BodyText").text("Sezonas kvotas saglabātas!");
    $('#ErrorModal').modal();
}

function getItems(){
    var elementi = document.querySelectorAll(".quotaField");
    var pasutijumuObjekts = {};

    for(var i = 0; i < elementi.length; i++){
        const kategorija = elementi[i].dataset.kategorija;
        const prece = elementi[i].dataset.prece;
        const precesDaudzums = elementi[i].value;
        if(!isNaN(parseInt(precesDaudzums))){
            if(pasutijumuObjekts[kategorija] === undefined){
                pasutijumuObjekts[kategorija] = {};
            }
            if(pasutijumuObjekts[kategorija][prece] === undefined){
                pasutijumuObjekts[kategorija][prece] = {};
                pasutijumuObjekts[kategorija][prece]["skaits"] = parseInt(precesDaudzums, 10);
            }else{
                pasutijumuObjekts[kategorija][prece]["skaits"] += parseInt(precesDaudzums, 10);
            }
        }
    }
    return pasutijumuObjekts;
}

function fillQuotaField(el){
    const kvotaRef = darbnicasRef.child("locations").child(localStorage["parskataId"]).child("kvota").child(el.dataset.kategorija).child(el.dataset.prece);
    kvotaRef.once('value', snap=>{
        if(snap.val() != null){
          el.value =  snap.val().skaits;
        }
    })
    const namePlaceholder = document.getElementById("namePlaceholder");
    const placeRef = darbnicasRef.child("locations").child(localStorage["parskataId"]);
    placeRef.once('value', snap=>{
        namePlaceholder.innerHTML = "<h4>" + snap.val().nosaukums + "</h4>";
        namePlaceholder.style.paddingTop = "20px"
    })
}