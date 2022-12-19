// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, update, get, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

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
const db =getDatabase();
const testId = "fYVfmXG7UDNAy4wORCJah3RLziu2";
let userId = testId;
let sn;

const snapshotTarget = ref(db, `players/${userId}/session`);

var navStatus = true;
var drop = false;

onValue(snapshotTarget, (snapshot) => {
    sn = snapshot.val();
    console.log(sn);
    
    if (!sn.factors)
    {
        update(ref(db, "players/" + userId + "/session"), {
            factors: generateCFactors(sn.vases)
        });
    }

    var correct = sn.vases["v" + sn.keylocation][1] + sn.vases["v" + sn.keylocation][0];
    var x = $(".draggable");
    var count = 0;

    for (let i = 0; i < x.length; i++) {

        if ($(x[i]).attr("data-vase") == correct)
        {
            $(x[i]).attr("data-clue", sn.factors[1])
        }
        else 
        {
            $(x[i]).attr("data-clue", String(sn.factors[0][count]))
            count++;
        }
    }
})

$(document).on('readystatechange', function() {
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
        }
    }

    var clueCode = $(item).attr("data-clue");
    // t2factors
    if (clueCode.split("").indexOf("x") != -1) {
        clueCode = clueCode.split("x");

        clue = `If there are ${clueCode[1]} ${statements["texId"][clueCode[0]]} vases, break this vase in this location`
    }
    // mTfactors
    else {
        clueCode = String(clueCode);
        console.log(clueCode);
        clue = `If there is at least one ${statements["modId"][clueCode[0]]}-like vase, with a ${statements["texId"][clueCode[1]]} color, break this vase in this location`
    }

    $(target).parent().siblings().children(".information").empty().html(clue)


    // console.log($(target).parent())

    // console.log($(target).parent().siblings().children(".information"))
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

    // console.log(stringComb)
    // console.log(vaseModel)
    // console.log(vaseTex)

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
    // console.log(texFactors)

    // console.log(mTfactors)
    // console.log(t2factors)

    // code randomization of factors (choose b/n mT or t2 + choose) > display

    // all possible wrong clues
    var merged = mTfactors.concat(t2factors);

    // chosen wrong clues for this session
    var chosen = [];

    for (var i = 0; i < 9; i++) {
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