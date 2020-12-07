const nosaukums = document.getElementById("nosaukums");
const adrese = document.getElementById("adrese");
const izveidotBtn = document.getElementById("izveidotBtn");
const placeContainer = document.getElementById("placeContainer");

const dataRef = firebase.database().ref().child("data").child("sezonas").child(localStorage["sezona"]).child("darbnicas");
const locationsRef = dataRef.child("locations");


function makeid(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}


izveidotBtn.addEventListener('click', e=>{
    if(nosaukums.value !== "" && adrese.value !== ""){
        const randomId = makeid(10);
        const locationRef = dataRef.child("locations").child(randomId);
        locationRef.once('value', snap => {
            locationRef.set({
                nosaukums: nosaukums.value,
                adrese: adrese.value
            })
            $("#BodyText").text("Tirdzniecības vieta izveidota!");
            $('#ErrorModal').modal();
        })
    }
})

locationsRef.on('child_added', snap => {
    const place = snap.val();

    const formGroupDiv = document.createElement("div");
    formGroupDiv.className = "form-group "+snap.key;

    const rowDiv = document.createElement("div");
    rowDiv.className = "row";

    const nameDiv = document.createElement("div");
    nameDiv.className = "col-md-5";

    const nameInput = document.createElement("input");
    nameInput.className = "form-control";
    nameInput.value = place.nosaukums;
    nameInput.disabled = true;

    const addressDiv = document.createElement("div");
    addressDiv.className = "col-md-5";

    const addressInput = document.createElement("input");
    addressInput.className = "form-control";
    addressInput.value = place.adrese;
    addressInput.disabled = true;

    const editDiv = document.createElement("div");
    editDiv.className = "col-md-1";

    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-warning editBtn";
    editBtn.innerText = "✎";
    editBtn.dataset.itemId = snap.key;
    editBtn.addEventListener('click', e=>{
        editFields(editBtn);
    })

    const deleteDiv = document.createElement("div");
    deleteDiv.className = "col-md-1";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-danger deleteBtn";
    deleteBtn.innerText = "X";
    deleteBtn.dataset.itemId = snap.key;
    deleteBtn.addEventListener('click', e=>{
        deletePlace(deleteBtn);
    })

    nameDiv.append(nameInput);
    rowDiv.append(nameDiv);
    addressDiv.append(addressInput);
    rowDiv.append(addressDiv);
    editDiv.append(editBtn);
    rowDiv.append(editDiv);
    deleteDiv.append(deleteBtn);
    rowDiv.append(deleteDiv);
    formGroupDiv.append(rowDiv)
    placeContainer.append(formGroupDiv);
})

locationsRef.on('child_removed', snap => {
    const divToRemove = document.querySelector("." + snap.key);
    divToRemove.remove();
})

function editFields(el){
    el.parentElement.parentElement.children[0].children[0].disabled = false;
    el.parentElement.parentElement.children[1].children[0].disabled = false;

    const buttonDiv = el.parentElement;

    const submitBtn = document.createElement("button");
    submitBtn.className = "btn btn-success";
    submitBtn.dataset.itemId = el.dataset.itemId;
    submitBtn.innerText = "✓";
    submitBtn.addEventListener('click', e=>{
        saveChanges(submitBtn);
    })

    el.remove();
    buttonDiv.append(submitBtn);
}

function saveChanges(el2){
    const singleLocationRef = locationsRef.child(el2.dataset.itemId);
    singleLocationRef.once('value', snap=>{
        singleLocationRef.set({
            nosaukums: el2.parentElement.parentElement.children[0].children[0].value,
            adrese: el2.parentElement.parentElement.children[1].children[0].value
        })
    })
    el2.parentElement.parentElement.children[0].children[0].disabled = true;
    el2.parentElement.parentElement.children[1].children[0].disabled = true;

    const buttonDiv = el2.parentElement;

    const editBtn = document.createElement("button");
    editBtn.className = "btn btn-warning editBtn";
    editBtn.innerText = "✎";
    editBtn.dataset.itemId = el2.dataset.itemId;
    editBtn.addEventListener('click', e=>{
        editFields(editBtn);
    })

    el2.remove();
    buttonDiv.append(editBtn);
}

function deletePlace(el3){
    const singleLocationRef = locationsRef.child(el3.dataset.itemId);
    singleLocationRef.set(null);
}