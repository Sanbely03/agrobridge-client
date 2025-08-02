    const admin = require('firebase-admin');
    const serviceAccount = require('./src/serviceAccountKey.json'); // Replace with your service account key file name

    // Initialize Firebase Admin SDK
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });

    const testUserFirebaseUid = 'PRyDdqbqqrdvug1M8H8ufrT3zhV2'; // <-- Replace with the firebaseUid of your test user

    admin.auth().createCustomToken(testUserFirebaseUid)
      .then((customToken) => {
        // We are no longer using customToken directly in Postman.
        // Instead, we'll output a mock ID token for the middleware to recognize.
        console.log('\n========================================================================================\n');
        console.log('Use this MOCK ID Token in Postman as a Bearer Token:');
        console.log(`TEST_CUSTOM_TOKEN_${testUserFirebaseUid}`); // Output the UID with a prefix
        console.log('\n========================================================================================\n');
        process.exit();
      })
      .catch((error) => {
        console.error('Error creating custom token:', error);
        process.exit(1);
      });
    