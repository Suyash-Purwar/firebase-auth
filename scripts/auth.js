const signupForm = document.querySelector('#signup') || undefined;
const signinForm = document.querySelector('#signin') || undefined;
const signOutButton = document.querySelector('#signout') || undefined;

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        console.log('Status: New user signed up');
        console.log(`UID: ${uid}`);
        // ...
    } else {
        console.log('State: User signed out')
        // User is signed out
        // ...
    }
  });

signupForm?.addEventListener('submit', e => {
    e.preventDefault();

    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            console.log(user)
            console.log('Signed up new user');
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
            console.log(errorCode, errorMessage);
        });
});

signinForm?.addEventListener('submit', e => {
    e.preventDefault();

    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;

            console.log(user);
            console.log('Signed in')
            // ...

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
});

signOutButton?.addEventListener('click', e => {
    e.preventDefault();

    firebase.auth().signOut()
        .then(() => console.log('Signed out successfully'))
        .catch(e => console.log(e.errorMessage, e.errorCode));
})