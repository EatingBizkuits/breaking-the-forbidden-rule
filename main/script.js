// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, update, get, onValue, onChildRemoved } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged, browserSessionPersistence, setPersistence } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

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
const auth = getAuth(app);
const db = getDatabase();
const testId = "fYVfmXG7UDNAy4wORCJah3RLziu2";
let userId;
let user;
let sn;

let timeoutsEm;
let timeoutsPw;
let timeoutsPw2;
let snapshotTarget;
    
var navStatus = true;
var drop = false;
var emRegex =/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;


// Auth =======================================


///// NOTE: SIGN UP IS NOT TO BE SUPPORTED. DATAGENERATION ONLY APPLIES WITHIN UNITY ////


$(document).ready(function() {
    $("#sign-up").fadeOut(10);
});

// When login button is clicked
$(document).on("click", ".submit", function(e) {
    // // sign up
    // if ($("#sign-up").attr("style").indexOf("display: none;") == -1)
    // {
    //     if (!$(e.currentTarget).hasClass("active"))
    //     {
    //         if ($(".sign-up.em").val().length <=0) {
    //             $(".em.feedback").empty().html("Please fill in the form!").removeClass("hidden").fadeIn(200);
    //             timeoutsEm = window.setTimeout(function() {
    //                 $(".em.feedback").animate({opacity: 0}, 900);
    //             }, 3000);
    //         }
    //         if ($(".sign-up.pw").val().length <=0) {
    //             $(".pw.feedback").empty().html("Please fill in the form!").removeClass("hidden").fadeIn(200);
    //             timeoutsPw = window.setTimeout(function() {
    //                 $(".pw.feedback").animate({opacity: 0}, 900);
    //             }, 3000);
    //         }
    //         if ($(".sign-up.pw2").val().length <=0) {
    //             $(".pw2.feedback").empty().html("Please fill in the form!").removeClass("hidden").fadeIn(200);
    //             timeoutsPw = window.setTimeout(function() {
    //                 $(".pw2.feedback").animate({opacity: 0}, 900);
    //             }, 3000);
    //         }
    //         return;
    //     }

    //     // Retrieve Info Signup
    //     var email = $(".sign-up.em").val();
    //     var password = $(".sign-up.pw").val();
    //     var password2 = $(".sign-up.pw2").val();

    //     console.log("Email: " + email + " Password: " + password + " Password2: " + password2);

    //     // Validation SignUp

    //     if (!emRegex.test(email))
    //     {
    //         $(".em.sign-up.feedback").empty().html("Invalid Email!").removeClass("hidden").fadeIn(200);
    //             timeoutsEm = window.setTimeout(function() {
    //                 $(".em.sign-up.feedback").animate({opacity: 0}, 900);
    //             }, 3000);
    //         return;
    //     }

    //     if (password.length < 7) {
    //         $(".pw.sign-up.feedback").empty().html("Password should be 7 letters or more!").removeClass("hidden").fadeIn(200);
    //             timeoutsPw = window.setTimeout(function() {
    //                 $(".pw.sign-up.feedback").animate({opacity: 0}, 900);
    //             }, 3000);
    //         return;
    //     } 
    //     if (password2.length < 7) {
    //         console.log("hello")
    //         $(".pw2.sign-up.feedback").empty().html("Password should be 7 letters or more!").removeClass("hidden").fadeIn(200);
    //             timeoutsPw2 = window.setTimeout(function() {
    //                 $(".pw2.sign-up.feedback").animate({opacity: 0}, 900);
    //             }, 3000);
    //         return;
    //     } 
    //     else if (password2 != password)
    //     {
    //         console.log("hello2")
    //         $(".pw2.sign-up.feedback").empty().html("Passwords should match!").removeClass("hidden").fadeIn(200);
    //             timeoutsPw2 = window.setTimeout(function() {
    //                 $(".pw2.sign-up.feedback").animate({opacity: 0}, 900);
    //             }, 3000);
    //         return;
    //     }

    //     createUserWithEmailAndPassword(auth, email, password)
    //     .then((response) => {
    //         console.log(response);
    //         console.log("done");
    //         $("#sign-up").animate({opacity: 0}, 800, function() {
    //             $("#sign-up").fadeOut(10);
    //             $("#log-in").css("display", "block").animate({opacity: 1, display: "block"}, 900)
    //         });

    //     }).catch(err => {
    //         console.log(err.code);
    //         console.log(err.message);
    //     })
    // }
    // else 
        if (!$(e.currentTarget).hasClass("active"))
        {
            if ($(".sign-in.em").val().length <=0) {
                $(".em.feedback").empty().html("Please fill in the form!").removeClass("hidden").fadeIn(200);
                timeoutsEm = window.setTimeout(function() {
                    $(".em.feedback").animate({opacity: 0}, 900);
                }, 3000);
            }
            if ($(".sign-in.pw").val().length <=0) {
                $(".pw.feedback").empty().html("Please fill in the form!").removeClass("hidden").fadeIn(200);
                timeoutsPw = window.setTimeout(function() {
                    $(".pw.feedback").animate({opacity: 0}, 900);
                }, 3000);
            }
            return;
        }

        // Retrieve Info Login
        var email = $(".sign-in.em").val();
        var password = $(".sign-in.pw").val();

        console.log("Email: " + email + " Password: " + password);

        // Validation Login

        if (!emRegex.test(email))
        {
            $(".em.sign-in.feedback").empty().html("Invalid Email!").removeClass("hidden").fadeIn(200);
                timeoutsEm = window.setTimeout(function() {
                    $(".em.feedback").animate({opacity: 0}, 900);
                }, 3000);
            return;
        }

        if (password.length < 7) {
            $(".pw.sign-in.feedback").empty().html("Password should be 7 letters or more!").removeClass("hidden").fadeIn(200);
                timeoutsPw = window.setTimeout(function() {
                    $(".pw.feedback").animate({opacity: 0}, 900);
                }, 3000);
            return;
        } 

        // firebase login
        setPersistence(auth, browserSessionPersistence).then(() => {
            return signInWithEmailAndPassword(auth, email, password)
                .then((response) => {
                    console.log(response)
                    user = response.user;
                    userId = user.uid;
                    console.log(userId);

                    RunWhenLoggedIn();
            
                }).catch((err) => {
                    console.log(err.code);
                    console.log(err.message);
                });
        }).catch((err) => {
            console.log(err.code);
            console.log(err.message);
        });
});

// check if key is being pressed, ensures that fields are not empty
$(document).on("keypress", function(e) {
    if (!$("input").focus()) return;
    // console.log($("#sign-up").val());
    // if ($("#sign-up").attr("style").indexOf("display: none;") == -1)
    // {
    //     if ($("input.sign-up.em").val().length > 0 && $("input.sign-up.pw").val().length > 0 && $("input.sign-up.pw2").val().length > 0)
    //     {
    //         $(".signup.submit").addClass("active");
    //     }
    //     else {
    //         $(".signup.submit.active").removeClass("active");
    //     }
    // }   
    // else 
        if ($("input.sign-in.em").val().length > 0 && $("input.sign-in.pw").val().length > 0)
        {
            $(".login.submit").addClass("active");
        }
        else {
            $(".login.submit.active").removeClass("active");
        }
})

///// NOTE: SIGN UP IS NOT TO BE SUPPORTED. DATAGENERATION ONLY APPLIES WITHIN UNITY ////

// // toggles between sign up and log in
// $(document).on("click", ".btn.swap", function(e) {
//     if ($(e.currentTarget).hasClass("login"))
//     {
//         $("#sign-up").animate({opacity: 0}, 800, function() {
//             $("#sign-up").fadeOut(10);
//             $("#log-in").css("display", "block").animate({opacity: 1, display: "block"}, 900)
//         });
//     }
//     else 
//     {
//         $("#log-in").animate({opacity: 0}, 900, function() {
//             $("#log-in").fadeOut(10);
//             $("#sign-up").css("display", "block").animate({opacity: 1, display: "block"}, 900)
//         });
//     }
// })

function RunWhenLoggedIn() {
    window.location.href = "./main/game.html";
}

// Game ========================================


onAuthStateChanged(auth, (currentUser) => {
    console.log(currentUser);
    user = currentUser;
    userId = currentUser.uid;
    snapshotTarget = ref(db, `players/${userId}/session`);

    onValue(snapshotTarget, (snapshot) => {
        if (location.href.indexOf("game") == -1) return;

        sn = snapshot.val();
        
        if (!sn.factors)
        {
            update(ref(db, "players/" + userId + "/session"), {
                factors: generateCFactors(sn.vases)
            });
        }

        var correct = sn.vases["v" + String(sn.keylocation+1)][1] + sn.vases["v" + String(sn.keylocation+1)][0];
        var x = $(".draggable");
        var count = 0;

        for (let i = 0; i < x.length; i++) {

            // if item is correct, assign correct factor/clue
            if ($(x[i]).attr("data-vase") == Number(correct)-1)
            {
                $(x[i]).attr("data-ans", String(sn.factors[1]))

            }
            // if item is wrong, leave empty answer
            else 
            {
                $(x[i]).attr("data-ans", "")
            }

            $(x[i]).attr("data-clue", String(sn.factors[0][count]))
            count++;
        }
    })

    onChildRemoved(ref(db, `players/${userId}/session`), () => {
        console.log("hello")
        location.reload();
    })


    $(document).on('click', '#nav-toggle', function() {
        if (navStatus) {
            $('nav:not(inactive)').addClass("inactive");
            $(this).children().css("transform", "rotateZ(180deg)");
        }
        else {
            $('nav.inactive').removeClass("inactive");
            $(this).children().css("transform", "rotateZ(0)");
        }
        navStatus = !navStatus;
    })

    $(".draggable").draggable(
        {
            revert: function() {
                if (drop) {
                    $(this).draggable({disabled: true})
                    .animate({opacity: 0}, 400)
                    .animate({top: 0, left: 0,}, 10)
                    .animate({opacity: 1}, 350)
                    .draggable({disabled: false})

                } else {
                    return true;
                }
            },
            containment: "document",
            cursor: "move",
            zIndex: 2,
            start: function() {
                drop = false;
                $(this).css("z-index", "3");
            },
            stop: function() {
                $(this).css("z-index", "auto");
            }
        }
    );

    $(".wrapper").droppable(
        {
            accept: ".draggable",
            classess: {
                "wrapper" : "drop-valid"
            },
            drop: function(event, ui) {

                drop = true;
                addVase(ui.draggable, this);
            }
        }
    );

    $(document).on("click", ".options.logout", function() {
        signOut(auth).then(() => {
        // Sign-out successful.
        console.log("logged out");
        location.href = "../../";
        }).catch((err) => {
        // An error happened.
        console.log(err);
        });
    })

    function addVase(item, target) {
        $(target).droppable();
        $(target).append(item.clone()).parent().addClass("selected").parent().addClass("selected");
        $(target).children().removeAttr("style");
        if ($(target).children().length > 1)
        {
            $(target).children()[0].remove()
        }
        // .info

        var clue = "";
        var statements = {
            "texId" : {
                0 : "Gray",
                1 : "Red",
                2 : "Jade",
                3 : "Obsidian",
                4 : "Bronze",
            },
            "modId" : {
                0 : "Mason Jar",
                1 : "Olpe"
            },
            "locations" : {
                0 : "Bookshelf Area 1",
                1 : "Bookshelf Area 2",
                2 : "Cabinet and Bookshelf Area",
                3 : "Workdesk Area 1",
                4 : "Workdesk Area 2"
            }
        }

        // randomization of location
        const locationCode = $(target).parent().siblings().children(".information").attr("data-region");
        var appliedLocation = locationCode;


        var clueCode = $(item).attr("data-clue");
        // if item chosen is correct type + item location is correct override clue
        if ($(item).attr("data-ans") != "")
        {
            clueCode = $(item).attr("data-ans");
            appliedLocation = sn.keylocation;
        }

        // t2factors
        if (clueCode.split("").indexOf("x") != -1) {
            clueCode = clueCode.split("x");

            if (sn.keylocation%2 == 0) {
                appliedLocation = (Number(clueCode[0]) + Number(clueCode[1]) + Number(locationCode))%5 + 1;
                console.log(appliedLocation)
            }

            clue = `If there are ${clueCode[1]} ${statements["texId"][clueCode[0]]} vases, break this vase at ${statements["locations"][appliedLocation]}`
        }
        // mTfactors
        else {
            clueCode = String(clueCode);

            if (sn.keylocation%2 != 0) {
                appliedLocation = (Number(clueCode[0]) + Number(locationCode))%5 + 1;
                console.log(appliedLocation)
            }

            clue = `If there is at least one ${statements["modId"][clueCode[0]]}-like vase, with a ${statements["texId"][clueCode[1]]} color, break this vase in location #${appliedLocation}`
        }

        
        $(target).parent().siblings().children(".information").empty().html(clue)
    }

    $(document).on("click", ".stack.selected", function(e) {
        var target = $(this).children();

        for (let i = 0; i < target.length; i++) {
            if ($(target[i]).hasClass("back"))
            {
                var timeout = 0
                if ($(target[i]).hasClass("card")) {
                    $(target).droppable({disabled: false});
                    timeout = 350
                }
                setTimeout(function() {
                    $(target[i]).removeClass("back");
                },350)
            }
            else {
                $(target[i]).addClass("back");
            }
        }
    })

    // Calculate Questions 
    // Generate true questions, adjust to make it wrong (2factors)
    function generateCFactors(vaseData)
    {
        let vaseModel = [];
        let vaseTex = [];
        
        let stringComb = [];

        for (let i = 0; i < Object.keys(vaseData).length; i++) {
            var key = `v${i+1}`;
            vaseModel.push(vaseData[key][1]);
            vaseTex.push(vaseData[key][0]);

            stringComb.push(vaseData[key][1].toString() + vaseData[key][0].toString())
        }

        const allFactors = ["00", "01", "02", "03", "04","10", "11", "12", "13", "14"]
        // unused combinations of vase
        var mTfactors = [];

        for (var i = 0; i < allFactors.length; i++) {
            var temp = allFactors[i];
            if (stringComb.indexOf(temp) == -1) {
                mTfactors.push(temp);
            }
        }
            

        // Object data of current texture combinations
        var texFactors = {
            "0": 0,
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0
        };
        var t2factors = [];
        
        // setting up current texture combinations
        for (var i = 0; i < vaseTex.length; i++) {
            texFactors[vaseTex[i]]++
        }

        // wrong texture combinations
        for (var i = 0; i < Object.values(texFactors).length; i++)
        {
            const cFac = Object.values(texFactors);
            var temp;
            var x = 0;
            while (x < 3)
            {
                if (x != cFac[i])
                {
                    temp = `${i}x${x}`;
                    t2factors.push(temp);
                }
                x++;
            }
        }

        // code randomization of factors (choose b/n mT or t2 + choose) > display

        // all possible wrong clues
        var merged = mTfactors.concat(t2factors);

        // chosen wrong clues for this session
        var chosen = [];

        for (var i = 0; i < 10; i++) {
            chosen.push(merged.splice(Math.floor(Math.random() * merged.length), 1)[0]);
        }

        var cClue;
        if (Math.floor(Math.random() * 2)  == 1)
        {
            cClue = stringComb[Math.floor(Math.random() * stringComb.length)];
        }
        else {
            const countList = Object.values(texFactors);
            cClue = countList[Math.floor(Math.random() * countList.length)];
            cClue = countList.indexOf(cClue) + "x" + cClue;
        }
        
        console.log("clues");
        console.log(chosen);
        console.log(cClue);

        return [chosen, cClue];
    }

})
