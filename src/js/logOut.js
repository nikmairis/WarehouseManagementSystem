const logOutBtn = document.getElementById('logOutBtn');
const auth = firebase.auth();
logOutBtn.addEventListener('click', e=> {
    firebase.auth().signOut();
})