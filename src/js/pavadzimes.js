const pavadzimesContainer = document.getElementById("pavadzimesContainer");

const darbnicasRef = firebase.database().ref().child("data").child("sezonas").child(localStorage["sezona"]).child("darbnicas");
const pavadzimesRef = darbnicasRef.child("pavadzimes");

pavadzimesRef.once('value', snap=>{
    const pavadzimes = snap.val();
    for(const pz in pavadzimes){
        if(pz !== "currentId"){
            const formGroupDiv = document.createElement("div");
            formGroupDiv.className = "form-group";

            const pavadzimeBtn = document.createElement("button");
            pavadzimeBtn.className = "btn btn-primary";
            pavadzimeBtn.style.width = "100%";
            pavadzimeBtn.addEventListener('click', e=>{
                printPavadzime(pz);
            })

            const rowDiv = document.createElement("div");
            rowDiv.className = "row";

            const pavadzimeCol = document.createElement("div");
            pavadzimeCol.className = "col-md-12";
            pavadzimeCol.innerText = "PZ_" + pavadzimes[pz].pavadzimesId;

            const placeDateCol = document.createElement("div");
            placeDateCol.className = "col-md-12";
            placeDateCol.innerText = pavadzimes[pz].tirdznVieta + " " + pavadzimes[pz].datums;

            rowDiv.append(pavadzimeCol);
            rowDiv.append(placeDateCol);
            pavadzimeBtn.append(rowDiv);
            formGroupDiv.append(pavadzimeBtn);
            pavadzimesContainer.prepend(formGroupDiv);
        }
    }
})

function printPavadzime(obj){
    localStorage["printPavadzimeNr"] = obj;
    window.open('printPavadzime.html', '_blank', 'nodeIntegration=no, width=680, height=800, left=200, top=200');
}