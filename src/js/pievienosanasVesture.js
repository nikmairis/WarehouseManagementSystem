const loadingBlock = document.getElementById("loadingBlock");
const historyMenu = document.getElementById("historyMenu");

const historyRef = firebase.database().ref('data').child("sezonas").child(localStorage["sezona"]).child("history");

historyRef.on('child_added', snap=>{
    loadingBlock.remove();
    const historyObj = snap.val();

    const row = document.createElement("div");
    row.className = "row";

    const col = document.createElement("div");
    col.className = "col-xl-12 my-2";

    const card = document.createElement("div");
    card.className = "card";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body text-center";

    const cardTitle = document.createElement("h5");
    cardTitle.className = "card-title m-1";
    cardTitle.innerText = historyObj.inputCategory;
    if(historyObj.inputCategory === "VIP Preces"){
        card.style.backgroundColor = "#e0f0ff";
    }else{
        card.style.backgroundColor = "#efefef";
    }

    const cardTitle2 = document.createElement("h6");
    cardTitle2.className = "card-title";
    cardTitle2.innerText = historyObj.inputTime.replace("T", " ");

    cardBody.append(cardTitle);
    cardBody.append(cardTitle2);

    for(const prece in historyObj){
        if(prece !== "inputCategory" && prece !== "inputTime"){
            const itemText = document.createElement("p");
            itemText.innerText = prece + " : " + historyObj[prece];
            cardBody.append(itemText);
        }
    }


    card.append(cardBody);
    col.append(card);
    row.append(col);
    historyMenu.prepend(row);
})