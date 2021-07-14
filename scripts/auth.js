const signUpForm = document.querySelector('#signup') || undefined;
const signInForm = document.querySelector('#signin') || undefined;
const signInVerification = document.querySelector('#signInVerification') || undefined;
const signOutButton = document.querySelector('#signout') || undefined;
const signInWithGoogle = document.querySelector('#signInWithGoogle') || undefined;

const provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        var uid = user.uid;
        console.log('Status: New user signed up');
        console.log(`UID: ${uid}`);
        // ...
    } else {
        console.log('State: User signed out')
    }
});

signInWithGoogle?.addEventListener('click', e => {
    e.preventDefault();

    firebase.auth()
    .signInWithPopup(provider)
    .then(result => {
        let credential = result.credential;
        let token = credential.accessToken;
        let user = result.user;

        console.log(credential)
        console.log(token)
        console.log(user)
    })
    .catch(error => {
        console.log('Failed');
        console.log(error.code, error.message);
    });
});

signUpForm?.addEventListener('submit', e => {
    e.preventDefault();

    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in

            var user = userCredential.user;
            console.log(user)
            console.log('Signed up new user');
            
            // Show verification button
            signInVerification.style.display='block';
            verifyUser(user.email);

            firebase.auth().currentUser.sendEmailVerification()
                .then(() => {
                    // Email verification sent!
                    console.log('Email Sent');
                });
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
            console.log(errorCode, errorMessage);
        });
});

signInForm?.addEventListener('submit', e => {
    e.preventDefault();

    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;
    
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;

            console.log(user);
            console.log('Signed in')
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage)
        });
});

signOutButton?.addEventListener('click', e => {
    e.preventDefault();

    firebase.auth().signOut()
        .then(() => console.log('Signed out successfully'))
        .catch(e => console.log(e.errorMessage, e.errorCode));
});

