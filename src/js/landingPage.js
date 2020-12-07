const seasonMenu = document.getElementById("seasonMenu");
const loadingBlock = document.getElementById("loadingBlock");
const loadingText = document.getElementById("loadingText");

const dbRef = firebase.database().ref().child("src");
const sezonasRef = dbRef.child("sezonas");

sezonasRef.once('value', snap => {
    if(snap.val() == null){
        loadingText.innerText = "Nav neviena elementa!";
    }
});

sezonasRef.on('child_added', snap => {
    const container = document.createElement('div');
    container.className = "col-lg-2 my-2";
    container.id = "Container_" + snap.key;

    const card = document.createElement('div');
    card.className = "card";
    card.setAttribute("style", "width: 100%;");

    const innerBlock = document.createElement('div');
    innerBlock.className = "card-body text-center";

    const h5 = document.createElement('h5');
    h5.className = "card-title";
    h5.innerText = snap.val().nosaukums;

    const button = document.createElement('a');
    button.className = "btn btn-primary";
    button.innerText = "Atvērt";
    button.id = "btn_" + snap.key;
    button.setAttribute("value", snap.key);
    button.addEventListener('click', e=>{
        localStorage["sezona"] = snap.key;
    })
    button.setAttribute("href", "emptyPage.html");

    innerBlock.appendChild(h5);
    innerBlock.appendChild(button);
    card.appendChild(innerBlock);
    container.appendChild(card);
    seasonMenu.appendChild(container);

    loadingBlock.setAttribute("hidden", "true");
});

sezonasRef.on('child_removed', snap => {
    const elementRemoved = document.getElementById("Container_" + snap.key);
    elementRemoved.remove();
});

