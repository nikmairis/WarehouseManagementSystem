const emailField = document.getElementById('txtEmail');
const passwordField = document.getElementById('txtPassword');
const loginBtn = document.getElementById('btnLogin');

loginBtn.addEventListener('click', e=> {
    const email = emailField.value;
    const password = passwordField.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => {
        alert("Wrong password/username!");
    });
})

firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        document.location.href = "html/landingPage.html";
    }else{
        console.log("User not logged in!");
    }
})

