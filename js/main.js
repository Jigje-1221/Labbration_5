"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: Jingye Chen
 */

// Hämta element från DOM
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");

const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const fontSelect = document.querySelector("#font");

const previewFullname = document.querySelector("#previewfullname");
const previewEmail = document.querySelector("#previewemail");
const previewPhone = document.querySelector("#previewphone");

const errorList = document.querySelector("#errorlist");
const historySection = document.querySelector("#history");
const deleteHistoryButton = document.querySelector("#delete");


// Array som används för felmeddelanden
let errors = [];

// Array som innehåller sparade studentkort
let history = [];

/**
 * Validerar formulärets inmatning.
 * @returns {boolean}
 */
function validateForm() {
    // Kontrollera formulärets obligatoriska fält
    
    // Visa eventuella felmeddelanden

    // Returnera resultatet (true eller false) av valideringen

    errors = [];

    if(fullnameInput.value === ""){
        errors.push("Du måste ange ditt fullstända namn")
    };
    if(emailInput.value === ""){
        errors.push("Du måste ange din e-postadress")
    };
    if(phoneInput.value === ""){
        errors.push("Du måste ange ditt telefonnummer")
    };
    if(errors.length === 0){return true;}
    else{return false;};
}


/**
 * Visar felmeddelanden på sidan.
 */
function displayErrors() {
    // Rensa tidigare felmeddelanden

    // Skriv ut aktuella felmeddelanden till DOM

    errorList.innerHTML = "";

    for(let i = 0; i < errors.length; i++){
        let newErrorEl = document.createElement("li");
        let newErrorText = document.createTextNode(errors[i]);

        newErrorEl.appendChild(newErrorText);

        errorList.appendChild(newErrorEl);
    }
}


/**
 * Skapar ett studentkort och visar det på sidan.
 */
function createStudentCard() {
    // Hämta information från formuläret

    // Uppdatera studentkortet

    // Lägg till studentkortet i historiken

    // Spara och uppdatera historiken

    const studentCard ={
        fullname: fullnameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        font: fontSelect.value
    };

    history.unshift(studentCard);

    let fullnamn = document.createTextNode(studentCard.fullname);
    previewFullname.innerHTML = "";
    previewFullname.style.fontFamily = studentCard.font;
    previewFullname.appendChild(fullnamn);

    let email = document.createTextNode(studentCard.email);
    previewEmail.innerHTML = "";
    previewEmail.style.fontFamily = `${studentCard.font}`;
    previewEmail.appendChild(email);

    let phone = document.createTextNode(studentCard.phone);
    previewPhone.innerHTML = "";
    previewPhone.style.fontFamily = studentCard.font;
    previewPhone.appendChild(phone);
}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    // Spara history i localStorage
    let studentCards = JSON.stringify(history);
    localStorage.setItem("student", studentCards)
}


/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    // Hämta eventuell sparad historik

    // Uppdatera history
    let studentCards = localStorage.getItem("student");
    history = JSON.parse(studentCards);
}


/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik

    historySection.innerHTML = "";
    // Skriv ut innehållet i history till DOM'
    history.forEach(function (studentCard) {
        const article = document.createElement("article");
        const name = document.createElement("div");
        const email = document.createElement("div");
        const phone = document.createElement("div");
        const font = document.createElement("div");

        article.style.border = "rgb(210 210 210) solid 1px"
        article.style.margin = "10px";
        article.style.padding = "10px";

        name.textContent = "Namn: " + studentCard.fullname;
        email.textContent = "Email: " + studentCard.email;
        phone.textContent = "Telefon: " + studentCard.phone;
        font.textContent = "Font:" + studentCard.font;

        article.appendChild(name);
        article.appendChild(email);
        article.appendChild(phone);
        article.appendChild(font);
        historySection.appendChild(article);
    });
}


/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
    // Återställ formulär och studentkort

    // Rensa eventuella felmeddelanden


}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {
    // Radera sparad historik

    // Uppdatera history och visningen på sidan
}


// Eventlyssnare

// När formuläret skickas:
// - validera inmatningen
// - skapa studentkort om valideringen lyckas


// När användaren klickar på "Rensa"


// När användaren klickar på "Radera historik"


// När sidan laddas:
// - läs in och visa eventuell tidigare historik

form.addEventListener("submit", function(event){
    event.preventDefault();

    const nameValue = fullnameInput.value;
    const emailValue = emailInput.value;
    const phoneValue = phoneInput.value;
    const fontStyle = fontSelect.value;

    if(!validateForm()){
        displayErrors();
    }
    else{
        createStudentCard();
        saveHistory();
        renderHistory();
    }
})

document.addEventListener("DOMContentLoaded", function(event){
    event.preventDefault();
    loadHistory();
    renderHistory();

    
})