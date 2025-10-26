const bill = document.getElementById('bill');
const totalEl = document.getElementById('total-el');
const tipAmountEl = document.getElementById('tip-amount-el');
const pBtn = document.querySelectorAll(".pbtn");
const varBtn = document.getElementById("var-btn");
const peopleInput = document.getElementById("people-input");

let billWert = 0;
let prozentWert = 0;
let persons = 1;

// --- Funktionen ---
function prozent() {
    let total = billWert + (billWert * prozentWert / 100);
    total = total / persons;
    return total;
}

function tipAmountPerPerson() {
    let tipTotal = billWert * prozentWert / 100;
    let tipPerPerson = tipTotal / persons;
    return tipPerPerson;
}

function updateDisplay() {
    totalEl.textContent = prozent().toFixed(2);
    tipAmountEl.textContent = tipAmountPerPerson().toFixed(2);
}

// --- Bill Input ---
bill.addEventListener("input", ()=>{
    billWert = Number(bill.value) || 0;
    updateDisplay();
});

// --- Tip Buttons ---
pBtn.forEach(btn => {
    btn.addEventListener("click", (event) => {
        // aktiven Button markieren
        pBtn.forEach(b => b.classList.remove("active"));
        event.target.classList.add("active");

        prozentWert = Number(event.target.id);
        varBtn.value = ""; // eigenes Prozentfeld leeren
        updateDisplay();
    });
});

// --- Custom Prozentfeld ---
varBtn.addEventListener("input", (event)=>{
    prozentWert = Number(event.target.value) || 0;
    pBtn.forEach(b => b.classList.remove("active")); // Buttons entmarkieren
    updateDisplay();
});

// --- Personen Input ---
peopleInput.addEventListener("input", ()=>{
    persons = Number(peopleInput.value);
    if (isNaN(persons) || persons <= 0) persons = 1; // Minimum 1 Person
    updateDisplay();
});
