var firebaseConfig = {
  apiKey: "AIzaSyAb8kbvWVnfW7mQa1vcK3xujydiDdWrVdo",
  authDomain: "farmfresh-a10be.firebaseapp.com",
  projectId: "farmfresh-a10be",
  storageBucket: "farmfresh-a10be.appspot.com",
  messagingSenderId: "614939333458",
  appId: "1:614939333458:web:379c974ba0b9575cb4608b"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

function checkPasswords() {
  var password1 = document.getElementById('password1').value;
  var password2 = document.getElementById('password2').value;

  if (password1 === password2) {
    return true;
  } else {
    document.getElementById("error-message").textContent = "Passwords do not match!";
    return false;
  }
}

function signUp() {
  if (checkPasswords()) {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password1").value;
    
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise
      .then((res) => {
        console.log("response", res);
        alert("Signed Up");
      })
      .catch(e => {
        // Display the error in the UI instead of alerting
        document.getElementById("error-message").textContent = e.message;
      });
  } else {
    // Display an error message in the UI instead of alerting
    document.getElementById("error-message").textContent = "Passwords do not match!";
  }
}

function signIn() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  const promise = auth.signInWithEmailAndPassword(email, password);
  promise
    .then((res) => {
      console.log("response", res);
      // go to home page
      alert("Signed In, go to home page");
      setTimeout(function(){ window.location.href = "index.html"; }, 1000);
      
    })
    .catch(e => {
      // Display the error in the UI instead of alerting
      document.getElementById("error-message").textContent = e.message;
    });
}

function signOut() {
  auth.signOut()
    .then(() => {
      // go to home page
      window.location.href = "loginform.html";
      alert("Signed Out");

    })
    .catch(e => {
      // Display the error in the UI instead of alerting
      document.getElementById("error-message").textContent = e.message;
    });
}

const userInfo = document.getElementById("user-info");
	
	auth.onAuthStateChanged(function(user){
		
		if(user){
			
			var email = user.email;
      userInfo.textContent = "Welcome " + email;
			// alert("Active User " + email);
			//Take user to a different or home page
			//is signed in
		}else{
      userInfo.textContent = "Not signed in";
			// alert("No Active User");
			//no user is signed in
		}
	});
	
