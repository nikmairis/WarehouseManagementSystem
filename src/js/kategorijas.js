const categoryMenu = document.getElementById("categoryMenu");
const loadingBlock = document.getElementById("loadingBlock");
const newCategory = document.getElementById("newCategory");
const loadingText = document.getElementById("loadingText");

const dbRef = firebase.database().ref().child("src").child("sezonas").child(localStorage["sezona"]);
const kategorijasRef = dbRef.child("kategorijas");

kategorijasRef.once('value', snap => {
    if(snap.val() == null){
        loadingText.innerText = "Nav neviena elementa!";
    }
});

kategorijasRef.on('child_added', snap => {
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
    button.innerText = "Atvērt";
    button.id = "btn_" + snap.key;
    button.setAttribute("value", snap.key);
    button.addEventListener('click', e=>{
        localStorage["kategorija"] = snap.key;
    })
    button.setAttribute("href", "preces.html");

    const btnEdit = document.createElement('a');
    btnEdit.className = "btn btn-outline-warning m-1";
    btnEdit.innerText = "Labot";
    btnEdit.id = "btn_" + snap.key;
    btnEdit.setAttribute("value", snap.key);
    btnEdit.addEventListener('click', e=>{
        localStorage["kategorija"] = snap.key;
        window.open('labotKategoriju.html', '_blank', 'nodeIntegration=no, width=450, height=375, left=200, top=200')
    })
    btnEdit.setAttribute("href", "#");

    innerBlock.appendChild(h5);
    innerBlock.appendChild(button);
    innerBlock.appendChild(btnEdit);
    card.appendChild(innerBlock);
    container.appendChild(card);
    categoryMenu.appendChild(container);

    loadingBlock.setAttribute("hidden", "true");
});

kategorijasRef.on('child_removed', snap => {
    const elementRemoved = document.getElementById("Container_" + snap.key);
    elementRemoved.remove();
});

newCategory.addEventListener('click', e=>{
    window.open('pievienotKategoriju.html', '_blank', 'nodeIntegration=no, width=450, height=375, left=200, top=200')
})


