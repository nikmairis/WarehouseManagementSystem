const itemMenu = document.getElementById("itemMenu");
const loadingBlock = document.getElementById("loadingBlock");
const newItem = document.getElementById("newItem");
const loadingText = document.getElementById("loadingText");

const dbRef = firebase.database().ref().child("src").child("sezonas").child(localStorage["sezona"])
                .child("kategorijas").child(localStorage["kategorija"]);
const precesRef = dbRef.child("preces");

precesRef.once('value', snap => {
    if(snap.val() == null){
        loadingText.innerText = "Nav neviena elementa!";
    }
});

precesRef.on('child_added', snap => {
    const container = document.createElement('div');
    container.className = "col-lg-2 my-2";
    container.id = "Container_" + snap.key;

    const card = document.createElement('div');
    card.className = "card";
    card.setAttribute("style", "width: 100%;");

    const innerBlock = document.createElement('div');
    innerBlock.className = "card-body text-center";

    const h5 = document.createElement('h6');
    h5.className = "card-title";
    h5.innerText = snap.val().nosaukums;

    const button = document.createElement('a');
    button.className = "btn btn-primary";
    button.innerText = "Labot";
    button.id = "btn_" + snap.key;
    button.setAttribute("value", snap.key);
    button.addEventListener('click', e=>{
        localStorage["prece"] = snap.key;
        window.open('labotPreci.html', '_blank', 'nodeIntegration=no, width=450, height=500, left=200, top=200')
    })
    button.setAttribute("href", "#");

    innerBlock.appendChild(h5);
    innerBlock.appendChild(button);
    card.appendChild(innerBlock);
    container.appendChild(card);
    itemMenu.appendChild(container);

    loadingBlock.setAttribute("hidden", "true");
});

precesRef.on('child_removed', snap => {
    const elementRemoved = document.getElementById("Container_" + snap.key);
    elementRemoved.remove();
});

newItem.addEventListener('click', e=>{
    window.open('pievienotPreci.html', '_blank', 'nodeIntegration=no, width=450, height=460, left=200, top=200')
})


