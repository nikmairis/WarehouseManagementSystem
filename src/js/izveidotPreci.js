var izveidotPreciBtn = document.getElementById("izveidotPreciBtn");
var idTextField = document.getElementById("idTextfield");
var nosaukumsTextField = document.getElementById("nosaukumsTextfield");
var cenaTextField = document.getElementById("cenaTextfield");


izveidotPreciBtn.addEventListener('click', e=>{
    //Cenas Lauka Validācija
    if(cenaTextField.value == ""){
        $("#BodyText").text("Cenas lauks nav aizpildīts!");
        $('#ErrorModal').modal();
        cenaTextField.className = "form-control is-invalid";
    }else{
        cenaTextField.className = "form-control";
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
                izveidotPreciBtn.innerText= "Pārbauda...";
                nosaukumsTextField.className = "form-control";
                //Garantē ka sezonas Id jau neeksistē un izveido jaunu sezonu
                const dbRef = firebase.database().ref().child("src").child("sezonas")
                .child(localStorage["sezona"]).child("kategorijas")
                .child(localStorage["kategorija"]).child("preces").child(idTextField.value.toLowerCase().replace(" ", "_"));
                dbRef.once('value', snap => {
                    if(snap.exists()){
                        $("#BodyText").text("Prece jau eksistē!");
                        $('#ErrorModal').modal();
                        //Samaina pogas tekstu kamēr tiek apstrādāti dati
                        izveidotPreciBtn.innerText= "Izveidot!";
                    }else{
                        dbRef.set({
                            nosaukums: nosaukumsTextField.value,
                            cena: cenaTextField.value.replace("," , "."),
                            atlikums: 0,
                            atlikumsVIP: 0
                        })
                        //Samaina pogas tekstu kamēr tiek apstrādāti dati
                        izveidotPreciBtn.innerText= "Izveidot!";
                        $("#BodyText").text("Prece izveidota!");
                        $('#ErrorModal').modal();
                        nosaukumsTextField.value = "";
                        idTextField.value = "";
                        cenaTextField.value = "";
                    }
                });
            }
        }
    }
})