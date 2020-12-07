(function() {

    // Your web app's Firebase configuration
      var firebaseConfig = {
        apiKey: "{{API_KEY}}",
        authDomain: "{{AUTH-DOMAIN}}",
        databaseURL: "{{DATABASE_URL}}",
        projectId: "{{PROJECT_ID}},
        storageBucket: "{{STORAGE_BUCKET}}",
        messagingSenderId: "{{MESSAGING_SENDER_ID}}",
        appId: "{{APP_ID}}"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

    }());