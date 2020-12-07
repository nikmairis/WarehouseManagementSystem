const atlikumsMenu = document.getElementById("atlikumsMenu");
const loadingBlock = document.getElementById("loadingBlock");

const dbRef = firebase.database().ref().child("src").child("sezonas").child(localStorage["sezona"]);
const kategorijasRef = dbRef.child("kategorijas");
const testVar = dbRef.child("kategorijas");

var categorieList = "";

kategorijasRef.on('value', snap => {
    if(snap.val() == null){
        loadingText.innerText = "Nav neviena elementa!";
    }else{
        atlikumsMenu.innerHTML = null;
        loadingBlock.setAttribute("hidden", "true");
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
                    colElement.className = "col-md-2";
                    colElement.id = "col" + category + "-" + prece;

                    const tableElement = document.createElement('table');
                    tableElement.className = "table table-bordered table-dark atlikums-table";
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

                    const priceElement = document.createElement('td');
                    priceElement.id = "price" + category + "-" + prece;
                    priceElement.innerText = categorieList[category].preces[prece].cena + "€";
                    priceElement.className = "text-center";

                    const quantityElement = document.createElement('td');
                    quantityElement.id = "quantity" + category + "-" + prece;
                    quantityElement.innerText = categorieList[category].preces[prece].atlikums;
                    quantityElement.dataset.test = "testvalue";
                    quantityElement.className = "text-center";

                    trMainigieElement.append(priceElement);
                    trMainigieElement.append(quantityElement);
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
    }
});
