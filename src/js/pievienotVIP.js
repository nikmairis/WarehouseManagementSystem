const atlikumsMenu = document.getElementById("atlikumsMenu");
const loadingBlock = document.getElementById("loadingBlock");
const pievienotBtn = document.getElementById("addItems");

const dbRef = firebase.database().ref().child("src").child("sezonas").child(localStorage["sezona"]);
const kategorijasRef = dbRef.child("kategorijas");

var categorieList = "";

kategorijasRef.once('value', snap => {
    if(snap.val() == null){
        loadingText.innerText = "Nav neviena elementa!";
    }else{
        loadingBlock.setAttribute("hidden", "true");
    }
    categorieList = snap.val();
    for (const category in categorieList) {

        const wrapperDiv = document.createElement('div');
        wrapperDiv.className = "atlikums-wrapper mt-2";

        const categoryTitle = document.createElement('h2');
        categoryTitle.innerText = categorieList[category].nosaukums;
        categoryTitle.className = "text-center";

        const rowElement = document.createElement('div');
        rowElement.className = "row mt-4";
        rowElement.id = "row" + category;

            for(const prece in categorieList[category].preces){

                const colElement = document.createElement('div');
                colElement.className = "col-xl-2";
                colElement.id = "col" + category + "-" + prece;

                const tableElement = document.createElement('table');
                tableElement.className = "table table-bordered table-dark pievienot-table";
                tableElement.id = "table" + category + "-" + prece;

                const tableHeadElement = document.createElement('thead');

                const trNosaukumsElement = document.createElement('tr');
                trNosaukumsElement.className = "table-primary";

                const tdNosaukumsElement = document.createElement('td');
                tdNosaukumsElement.innerText = categorieList[category].preces[prece].nosaukums;
                tdNosaukumsElement.className = "text-center";
                tdNosaukumsElement.colSpan = 2;

                const tableBodyElement = document.createElement('tbody');

                const trMainigieElement = document.createElement('tr');
                trMainigieElement.className = "table-primary";

                const inputElementContainer = document.createElement('td');
                inputElementContainer.id = "quantity" + category + "-" + prece;
                inputElementContainer.className = "text-center";

                const inputField = document.createElement("input");
                inputField.className = "quantityInput";
                inputField.dataset.kategorija = category;
                inputField.type = "number";
                inputField.dataset.prece = prece;

                inputElementContainer.append(inputField);
                trMainigieElement.append(inputElementContainer);
                tableBodyElement.append(trMainigieElement);
                trNosaukumsElement.append(tdNosaukumsElement);
                tableHeadElement.append(trNosaukumsElement);
                tableElement.append(tableHeadElement);
                tableElement.append(tableBodyElement);
                colElement.append(tableElement);
                rowElement.append(colElement);
            }
        wrapperDiv.append(categoryTitle);
        wrapperDiv.append(rowElement);
        atlikumsMenu.append(wrapperDiv);
    }
});


pievienotBtn.addEventListener('click', e=>{
    const inputi = document.getElementsByClassName("quantityInput");
    var addObject = {}
    for (var i=0, max=inputi.length; i < max; i++) {
       if(inputi[i].value === ""){

       }else{
        addObject[inputi[i].dataset.prece] = inputi[i].value;
        firebase.database()
            .ref('src')
            .child("sezonas")
            .child(localStorage["sezona"])
            .child("kategorijas")
            .child(inputi[i].dataset.kategorija)
            .child("preces")
            .child(inputi[i].dataset.prece)
            .child("atlikumsVIP")
            .set(firebase.database.ServerValue.increment(parseInt(inputi[i].value)));
       }
       inputi[i].value = "";
    }
    // Adds the object to history backlog if at least 1 item was added
    if(Object.keys(addObject).length !== 0){
        addObject["inputTime"] = new Date().toISOString().substr(0,16);
        addObject["inputCategory"] = "VIP Preces";
        const historyRef = firebase.database().ref('data').child("sezonas").child(localStorage["sezona"]).child("history");
        historyRef.once('value', snap=>{
            historyRef.push(addObject);
        })
    }
    $("#BodyText").text("Preces Pievienotas");
    $('#ErrorModal').modal();
})







