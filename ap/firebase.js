// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIvg7AGJgpNZmZck8MUJkyX_YJ35VVNCs",
  authDomain: "the-forbidden-rule.firebaseapp.com",
  databaseURL: "https://the-forbidden-rule-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "the-forbidden-rule",
  storageBucket: "the-forbidden-rule.appspot.com",
  messagingSenderId: "22254540537",
  appId: "1:22254540537:web:951b993275225831a7f428"
};

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = getDatabase();
  const dummyEmail = "test@gmail.com";
  const dummyPW = "hell0there";
  // stores uId of target user
  var userId;
  var user;
  // states if current session is loggedIn
  var loggedIn = false;

  let vasesData = {
    "v1": [0,0],
    "v2": [1,1],
    "v3": [0,2],
    "v4": [0,2],
    "v5": [1,4]
  }
//==================================================================

// SCRIPT EVENTS Start

// similar to void Start(){} function;
$(document).ready(() => {
  RandomizeData();

  // if loggedIn is false, get admin to login
  if (!loggedIn)
  {
    $("#login-update")[0].innerHTML = "Log In?";  
  }
  // login with given userId
  else
  {
    SignInUser(loggedIn);
    console.log("loggedIn");
  }
})

// randomizes data in table
$(document).on("click", "#rand-vase", () => {
  RandomizeData();
})

// run on login button clicked
$(document).on("click", "#login-update", () => {
  if (!loggedIn) {
    SignInUser();
  }
  else {
    PushVaseTableIntoDB();
  }
})

// run on create new Acc button clicked
$(document).on("click", "#newUser", () => {
  if (!loggedIn) {
    CreateNewUser();
  }
})

// run on logout button clicked
$(document).on("click", "#logout", () => {
  if (loggedIn) {
    RunWhenLoggedOut();
  }
})

// SCRIPT EVENTS End

//==================================================================

// METHODS FUNCTION Start

// randomizes TextureIndex and Model Index of table in control.html;
function RandomizeData() {
  const texId = $(".t-i input")
  const modId = $(".m-i input")

  for (let i = 0; i < texId.length; i++) {
    texId.eq(i).val(Math.floor(Math.random() * texId.length)).change();
    modId.eq(i).val(Math.floor(Math.random() * texId.length)).change();
  }
}

// creates a new account in auth when called
function CreateNewUser() {
  var email = $("#userKey").val();
  var password = $("#userPass").val();
  console.log(email, password);
  createUserWithEmailAndPassword(auth, email, password)
  .then((response) => {
    console.log(response);
    user = response.user;
    userId = user.uid;
    RunWhenAccountCreated()

  }).catch(err => {
    console.log(err.code);
    console.log(err.message);
  })
}

// sign in user
function SignInUser(useDummy=false) {
  // get email
  var email = dummyEmail;
  var password = dummyPW;
  if (!useDummy) {
    email = $("#userKey").val();
    password = $("#userPass").val();
  }

  console.log("Email: " + email + " Password: " + password);

  // firebase login
  signInWithEmailAndPassword(auth, email, password)
  .then((response) => {
    console.log(response)
    user = response.user;
    userId = user.uid;
    RunWhenLoggedIn();

  }).catch((err) => {
    console.log(err.code);
    console.log(err.message);
  });
}

// update object literal with table data
function UpdateVaseTableAsObjectLiteral()
{
  const texId = $(".t-i input");
  const modId = $(".m-i input");
  for (let i = 0; i < texId.length; i++) {
    vasesData["v"+(i+1)] = (new Array(texId.eq(i).val(), modId.eq(i).val()))
  }
}

// push the vase into db
function PushVaseTableIntoDB() {
  UpdateVaseTableAsObjectLiteral();
  set(ref(db, "players/" + userId + "/session"), {
    startTime: Date.now(),
    vases: vasesData,
  })
}

// runs when account made, push uid to database
function RunWhenAccountCreated() {
  // set up uidPath
  set(ref(db, "players/" + userId + "/session"), {
    startTime: Date.now()
  })
  RunWhenLoggedIn();
}

// shows logout btn
function RunWhenLoggedIn() {
  console.log("logged in!")
  $("#logout.hidden").removeClass("hidden");
  $("#userPass, #userPassLabel, #newUser").addClass("hidden");
  $("#userKey").val(userId).change();
  $("#login-update")[0].innerHTML = "Replace DB";
  loggedIn = true;
}

// hides logout btn
function RunWhenLoggedOut() {
  console.log("logged out!")
  $("#logout").addClass("hidden");
  $("#userPass.hidden, #userPassLabel, #newUser").removeClass("hidden");
  
  // replace btn text/clear input fields
  $("#login-update")[0].innerHTML = "Log In?";
  $("#userKey, #userPass").val("").change();
  loggedIn = false;
}

// METHODS FUNCTION End