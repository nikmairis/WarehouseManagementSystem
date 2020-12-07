var labotKategoriju = document.getElementById("labotKategoriju");
var nosaukumsTextField = document.getElementById("nosaukumsTextfield");

const dbRef = firebase.database().ref().child("src").child("sezonas").child(localStorage["sezona"])
            .child("kategorijas").child(localStorage["kategorija"]);

dbRef.once('value', snap=>{
    nosaukumsTextField.value = snap.val().nosaukums;
})

labotKategoriju.addEventListener('click', e=>{
    //Nosaukuma lauka front-end validācija
    if(nosaukumsTextField.value == ""){
        $("#BodyText").text("Nosaukuma lauks nav aizpildīts!");
        $('#ErrorModal').modal();
        nosaukumsTextField.className = "form-control is-invalid";
    }else{
        labotKategoriju.innerText= "Pārbauda...";
        nosaukumsTextField.className = "form-control";
        //Garantē ka sezonas Id jau neeksistē un izveido jaunu sezonu
        dbRef.once('value', snap => {
            dbRef.child("nosaukums").set(nosaukumsTextField.value);
            //Samaina pogas tekstu kamēr tiek apstrādāti dati
            labotKategoriju.innerText= "Labot!";
            $("#BodyText").text("Kategorija izlabota!");
            $('#ErrorModal').modal();
        });
    }
})