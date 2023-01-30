"use strict";

// --- HTML - ELEMENT ---
// const tableEl = document.getElementById("table");
// const sectionEl = document.getElementById("section");
// const usernameEl = document.getElementById("username");
// const userageEl = document.getElementById("userage");
// const userlevelEl = document.getElementById("userlevel");
// const submitButtonEl = document.getElementById("submitButton")
// const deleteButtonEl = document.getElementById("deleteButton")

const listEl = document.getElementById("list");
const sectionEl = document.getElementById("section");

// --- GET ---
// hämta alla användare och skriv ut till konsolen
fetch("https://fakestoreapi.com/products")
    .then(res=> res.json())
    // .then(data => console.log(data));
    .then(data => renderApp(data));


    // --- Tabel ---
function renderApp(jsonData) {
    const productArray = jsonData;

    console.log(jsonData)
    console.log("renderApp is running")
    
    for (let products of productArray) {
        sectionEl.innerHTML += `                    
        <article>
        <h2> ${products.title} </h2>
        <img src='${products.image}' alt='' class='image'>
        <p> ${products.description} <p>
        <p> ${products.category} <p>
        <p> ${products.price} </p>
        <p> ${products.id} </p>
        </article>
        <hr>
        `
    }

    // for (let i = 0; i< classListArray.length; i++) {
    // // for (let users of classListArray) {
    //     tableEl.innerHTML += `                    
    //     <tr>
    //     <td> ${classListArray[i].name} </td>
    //     <td>  ${classListArray[i].age} </td>
    //     <td>  ${classListArray[i].level} </td>
    //     <td>  ${classListArray[i]._id} </td>
    //     <input type="button" value="radera" id="deleteButton" onclick="deleteUser('${classListArray[i]._id}')">
    //     <button value="radera" ionclick></button>                       
    //     </tr>  
    //     `
    // }

}