var labotPreciBtn = document.getElementById("labotPreciBtn");
var nosaukumsTextField = document.getElementById("nosaukumsTextfield");
var cenaTextField = document.getElementById("cenaTextfield");

const dbRef = firebase.database().ref().child("src").child("sezonas").child(localStorage["sezona"]).child("kategorijas")
                .child(localStorage["kategorija"]).child("preces").child(localStorage["prece"]);

dbRef.once('value', snap=>{
    cenaTextField.value = snap.val().cena;
    nosaukumsTextField.value = snap.val().nosaukums;
})

labotPreciBtn.addEventListener('click', e=>{
    //Cenas Lauka Validācija
    if(cenaTextField.value == ""){
        $("#BodyText").text("Cenas lauks nav aizpildīts!");
        $('#ErrorModal').modal();
        cenaTextField.className = "form-control is-invalid";
    }else{
        cenaTextField.className = "form-control";
        //Nosaukuma lauka front-end validācija
        if(nosaukumsTextField.value == ""){
            $("#BodyText").text("Nosaukuma lauks nav aizpildīts!");
            $('#ErrorModal').modal();
            nosaukumsTextField.className = "form-control is-invalid";
        }else{
            labotPreciBtn.innerText= "Pārbauda...";
            nosaukumsTextField.className = "form-control";
            //Garantē ka sezonas Id jau neeksistē un izveido jaunu sezonu
            dbRef.once('value', snap => {
                dbRef.child("cena").set(cenaTextField.value);
                dbRef.child("nosaukums").set(nosaukumsTextField.value);
                //Samaina pogas tekstu kamēr tiek apstrādāti dati
                labotPreciBtn.innerText= "Izveidot!";
                $("#BodyText").text("Labojumi saglabāti!");
                $('#ErrorModal').modal();
            });
        }
    }
})