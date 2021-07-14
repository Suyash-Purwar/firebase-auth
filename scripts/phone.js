const submitPhoneNumber = document.querySelector('#submitPhone') || undefined;
const submitOTP = document.querySelector('#submitOTP') || undefined;

const db = firebase.firestore();

submitPhoneNumber?.addEventListener('submit', e => {
    e.preventDefault();
    let phone = document.querySelector('#phone').value;
    let currentUserUID = firebase.auth().currentUser?.uid;
    let currentUserEmail = firebase.auth().currentUser?.email;
    let proceedDecision = null;

    if (!currentUserUID) {
        console.log('No user logged in');
        return;
    }

    let docRef = db.collection('contact_numbers').get();
    docRef
        .then(querySnapshot => {
            let doesPhoneNumberExists = false;
            querySnapshot.forEach(doc => {
                if (doc.data().phone === phone) {
                    console.log(`Another account ${doc.data().email} exists with this phone number`);
                    doesPhoneNumberExists = true;
                }
            });

            if (!doesPhoneNumberExists) {
                db.collection('contact_numbers').doc(currentUserUID).set({
                    phone: phone,
                    email: currentUserEmail
                })
                .then(() => console.log('Sent'))
                .catch(e => console.log(e.code, e.message));
            } else {
                console.log('Another account is already registered with this number');
                proceedDecision = prompt(`Do you want to continue with ${currentUserEmail}`);
            }
        
            if (proceedDecision === 'true') {
                db.collection('contact_numbers').doc(currentUserUID).set({
                    phone: phone,
                    email: currentUserEmail
                })
                .then(() => console.log(`Registered again with ${currentUserEmail}`))
                .catch(e => console.log(e.code, e.message));
            } else if (proceedDecision === null) {}
            else if(proceedDecision === 'false') {
                console.log('Sign in with emails that are associated with this number');
            }
        });
});
