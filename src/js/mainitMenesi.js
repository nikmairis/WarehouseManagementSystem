const changeMonthBtn = document.getElementById("changeMonth");
const menesisField = document.getElementById("menesis");

const dataRef = firebase.database().ref().child("data").child("sezonas").child(localStorage["sezona"]).child("ofiss");

changeMonthBtn.addEventListener('click', e=>{
    const orderRef = dataRef.child(localStorage["kalendars_menesis"]).child(localStorage["pasutijumaID"]);
    orderRef.once('value', snap => {
       const copyMonth = dataRef.child(menesisField.value).child(localStorage["pasutijumaID"]);
       const pasDetails = snap.val();
       copyMonth.set(
           pasDetails
       );
       orderRef.set(null);
       $("#BodyText").text("Mēnesis samainīts uz " + menesisField.value + "! Šis logs tiks aizvērts!");
       $('#ErrorModal').modal();
       window.close();
    })

})