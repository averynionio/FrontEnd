var logs = new Array();
var TAcandidates = {
    candidates: new Array(
        {id:"0001", firstName:"Avery", lastName:"Niou", areaofSpecial:"Programming", selected:false},
        {id:"0002", firstName:"Benny", lastName:"Hsieh", areaofSpecial:"Database", selected:false},
        {id:"0003", firstName:"Mina", lastName:"Meow", areaofSpecial:"Testing", selected:false},
        {id:"0004", firstName:"Kay", lastName:"Aong", areaofSpecial:"Testing", selected:false},
        {id:"0005", firstName:"Anthony", lastName:"Fong", areaofSpecial:"Networking", selected:false},
        {id:"0006", firstName:"Ping", lastName:"Hwa", areaofSpecial:"Programming", selected:false},
        {id:"0007", firstName:"Queenie", lastName:"Wang", areaofSpecial:"Database", selected:false}
    ),

    search: function(candidatesID) {
        let t = this.candidates.find(candidates => {
            return candidatesID == candidates.id;
        });
        return t;
    },

    add: function(candidate) {
        let t = this.search(candidate.id);
        if (t == undefined) {
            this.candidates.push(candidate);
        } else {
            t.firstName = candidate.firstName;
            t.lastName = candidate.lastName;
            t.areaofSpecial = candidate.areaofSpecial;
            t.selected = candidate.selected;
        }
        this.save();
    },

    remove: function(candidatesID) {
        let targetIdx = this.candidates.findIndex(candidate => {
            return candidatesID == candidate.id;
        });
        if (targetIdx >= 0) {
            this.candidates.splice(targetIdx,1);
            this.save();
        }
    },

    load: function() {
        let candidateStr = localStorage.candidates;
        if (candidateStr != undefined) {
            this.candidates = JSON.parse(candidateStr);
        }
    },

    save: function() {
        let candidateStr = JSON.stringify(this.candidates);
        localStorage.candidates = candidateStr;
    }
}
TAcandidates.load();

function showLog() {
    let s = new String();
    let logView = document.getElementById("log")
    console.log(logs)
    for (var l in logs) {
        s += (logs[l]+'\r\n');
    }
    logView.value = s;
}

function viewMode() {
    document.getElementById("new").disabled = "";
    document.getElementById("edit").disabled = "";
    document.getElementById("delete").disabled = "";
    document.getElementById("save").disabled = "disabled";
    document.getElementById("cancel").disabled = "disabled";
    document.getElementById("f_name").disabled = "disabled";
    document.getElementById("l_name").disabled = "disabled";
    document.getElementById("input_id").disabled = "disabled";
    document.getElementById("areaL").disabled = "disabled";
    document.getElementById("select").disabled = "disabled";
    document.getElementById("log").disabled = "disabled";
}
function editMode() {
    document.getElementById("new").disabled = "disabled";
    document.getElementById("edit").disabled = "disabled";
    document.getElementById("delete").disabled = "disabled";
    document.getElementById("save").disabled = "";
    document.getElementById("cancel").disabled = "";
    document.getElementById("f_name").disabled = "";
    document.getElementById("l_name").disabled = "";
    document.getElementById("input_id").disabled = "";
    document.getElementById("areaL").disabled = "";
    document.getElementById("select").disabled = "";
}
function valueMode(t) {
    document.getElementById("f_name").value = t.firstName;
    document.getElementById("l_name").value = t.lastName;
    document.getElementById("input_id").value = t.id;
    var arealist = document.getElementById("areaL");
    arealist.value = t.areaofSpecial
    document.getElementById("select").checked = t.selected;
}
function emptyMode() {
    document.getElementById("f_name").value = "";
    document.getElementById("l_name").value = "";
    document.getElementById("input_id").value = "";
    document.getElementById("areaL").value = "";
    document.getElementById("select").value = "";
}
function getRandom(){
    return Math.floor(Math.random()*TAcandidates.candidates.length)-1;
};


let target = TAcandidates.candidates[0]
valueMode(target);
viewMode();

// First
let firstBtn = document.getElementById("first");
firstBtn.addEventListener("click", e => {
    target = TAcandidates.candidates[0]
    valueMode(target)
});

// Previous
let prevopisBtn = document.getElementById("previous");
prevopisBtn.addEventListener("click", e => {
    var idx = TAcandidates.candidates.findIndex(ta => ta === target)
    idx = idx-1
    if (idx < 0) {
        idx = TAcandidates.candidates.length -1
    }
    target = TAcandidates.candidates[idx]
    valueMode(target)
});

// Next
let nextBtn = document.getElementById("next");
nextBtn.addEventListener("click", e => {
    var idx = TAcandidates.candidates.findIndex(ta => ta === target)
    idx = idx+1
    if (idx > TAcandidates.candidates.length -1) {
        idx = 0
    }
    target = TAcandidates.candidates[idx]
    valueMode(target)
});

// Last
let lastBtn = document.getElementById("last");
lastBtn.addEventListener("click", e => {
    target = TAcandidates.candidates[TAcandidates.candidates.length -1]
    valueMode(target)
});

// Select
let selectBtn = document.getElementById("selectbtn");
selectBtn.addEventListener("click", e => {
    var idx = getRandom();
    var i = idx;
    while (TAcandidates.candidates[i].selected == true) {
        i += 1;
        console.log(i)
        if (i == TAcandidates.candidates.length) {
            i = 0;
        } else if (i == idx) {
            break;
        }
    };
    target = TAcandidates.candidates[i]
    target.selected = true
    valueMode(target)
    logs.push("Select " + target.firstName +" "+ target.lastName+", "+target.id+", "+target.areaofSpecial)
    showLog();
});

// New
let newBtn = document.getElementById("new");
newBtn.addEventListener("click", e => {
    emptyMode();
    editMode();
});

// Edit
let editBtn = document.getElementById("edit");
editBtn.addEventListener("click", e => {
    editMode();
    valueMode(target);
});

// Delete
let deleteBtn = document.getElementById("delete");
deleteBtn.addEventListener("click", e => {
    if (confirm("Are you certain you want to remove " + target.firstName) == true ) {
        emptyMode();
        viewMode();
        logs.push("Delete " + target.firstName +" "+ target.lastName+", "+target.id+", "+target.areaofSpecial)
        showLog();
        TAcandidates.remove(target.id);
    } else {
        emptyMode();
        viewMode();
    }
});

// Save
let saveBtn = document.getElementById("save");
saveBtn.addEventListener("click", e => {
    let ta = {};
    ta.id = document.getElementById("input_id").value;
    ta.firstName = document.getElementById("f_name").value;
    ta.lastName = document.getElementById("l_name").value;
    ta.areaofSpecial = document.getElementById("areaL").value;
    ta.selected = document.getElementById("select").checked;

    var i = TAcandidates.search(ta.id)
    if (i) {
        if (confirm("Are you certain you want to apply the changes to " +ta.firstName) == true ) {
            TAcandidates.candidates[i] = ta;
            viewMode();
            logs.push("Edit " + ta.firstName +" "+ ta.lastName+", "+ta.id+", "+ta.areaofSpecial)
            showLog();
        } else {
            emptyMode();
            viewMode();
        }
    } else {
        if (confirm("Are you certain you want to add " +ta.firstName) == true ) {
        TAcandidates.add(ta)
        viewMode();
        logs.push("Add " + ta.firstName +" "+ ta.lastName+", "+ta.id+", "+ta.areaofSpecial)
        showLog();
        target = ta;
        } else {
            emptyMode();
            viewMode();
        } 
    }
});

// Cancel
let cancelBtn = document.getElementById("cancel");
cancelBtn.addEventListener("click", e => {
    viewMode();
});