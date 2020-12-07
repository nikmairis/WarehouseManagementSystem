var izveidotKategorijuBtn = document.getElementById("izveidotKategorijuBtn");
var idTextField = document.getElementById("idTextfield");
var nosaukumsTextField = document.getElementById("nosaukumsTextfield");

izveidotKategorijuBtn.addEventListener('click', e=>{
    //ID lauka front-end validācija
    if(idTextField.value == ""){
        $("#BodyText").text("ID lauks nav aizpildīts!");
        $('#ErrorModal').modal();
        idTextField.className = "form-control is-invalid";
    }else{
        idTextField.className = "form-control";
        //Nosaukuma lauka front-end validācija
        if(nosaukumsTextField.value == ""){
            $("#BodyText").text("Nosaukuma lauks nav aizpildīts!");
            $('#ErrorModal').modal();
            nosaukumsTextField.className = "form-control is-invalid";
        }else{
            izveidotKategorijuBtn.innerText= "Pārbauda...";
            nosaukumsTextField.className = "form-control";
            //Garantē ka sezonas Id jau neeksistē un izveido jaunu sezonu
            const dbRef = firebase.database().ref().child("src").child("sezonas")
            .child(localStorage["sezona"]).child("kategorijas").child(idTextField.value.toLowerCase().replace(" ", "_"));
            dbRef.once('value', snap => {
                if(snap.exists()){
                    $("#BodyText").text("Kategorija jau eksistē!");
                    $('#ErrorModal').modal();
                    //Samaina pogas tekstu kamēr tiek apstrādāti dati
                    izveidotKategorijuBtn.innerText= "Izveidot!";
                }else{
                    dbRef.set({nosaukums: nosaukumsTextField.value})
                    //Samaina pogas tekstu kamēr tiek apstrādāti dati
                    izveidotKategorijuBtn.innerText= "Izveidot!";
                    $("#BodyText").text("Kategorija izveidota!");
                    $('#ErrorModal').modal();
                    nosaukumsTextField.value = "";
                    idTextField.value = "";
                }
            });
        }
    }
})