const dynamicEl = document.getElementById("dynamicEl");
const pavadzimesNrField = document.getElementById("pavadzimesNr");
const placeField = document.getElementById("place");
const dateField = document.getElementById("date");
const sanemejsField = document.getElementById("sanemejs");
const summaBezNod = document.getElementById("summaBezNod");
const pvnField = document.getElementById("pvn");
const totalField = document.getElementById("total");
const printBtn = document.getElementById("print");

const darbnicasRef = firebase.database().ref().child("data").child("sezonas").child(localStorage["sezona"]).child("darbnicas");
const pavadzimeRef = darbnicasRef.child("pavadzimes").child(localStorage["printPavadzimeNr"]);

pavadzimeRef.once('value', snap=>{
    const pavadzime = snap.val();
    pavadzimesNrField.innerText = "PVZ_" + pavadzime.pavadzimesId;
    placeField.innerText = pavadzime.tirdznVieta;
    dateField.innerText = pavadzime.datums;
    sanemejsField.innerText = pavadzime.tirdznVieta;

    const preces = pavadzime.preces;
    for(const cat in preces){
        const kategorija = preces[cat];
        for(const it in kategorija){
            const row = dynamicEl.insertRow(dynamicEl.rows.length);
            row.className = "text-center";
            const cell0 = row.insertCell(0);
            cell0.innerText= kategorija[it].nosaukums;
            const cell1 = row.insertCell(1);
            cell1.innerText= "Gb."
            const cell2 = row.insertCell(2);
            cell2.innerText= kategorija[it].skaits;
            const cell3 = row.insertCell(3);
            cell3.innerText= kategorija[it].cena + "€"
            const cell4 = row.insertCell(4);
            cell4.innerText= parseFloat(kategorija[it].skaits) * parseFloat(kategorija[it].cena) + "€";
            cell4.className = "variable";
            console.log(kategorija[it]);
        }
        var totals = 0;
        const variables = document.querySelectorAll(".variable");
        for(var i=0; i<variables.length; i++){
            totals += parseFloat(variables[i].innerText);
        }
        //summaBezNod.innerText = roundFix(totals, 2) + "€";
        //var pvn = roundFix(totals * 0.21, 2);
        //pvnField.innerText = pvn + "€";
        //totalField.innerText = roundFix(pvn + totals, 2) + "€";
        totalField.innerText = roundFix(totals, 2) + "€";

    }
})

function roundFix(number, precision)
{
    var multi = Math.pow(10, precision);
    return Math.ceil( (number * multi).toFixed(precision + 1) ) / multi;
}

printBtn.addEventListener('click', e=>{
    window.print();
})