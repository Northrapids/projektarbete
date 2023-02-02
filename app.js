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
const categoryEl = document.getElementById("category");
const cartEl = document.getElementById("cart")

// let cartArray = [];


// --- GET ---
// hämtar alla produkter och skriv ut till konsolen
fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    // .then(data => console.log(data))
    .then(data => renderProducts(data, categoryEl.value, console.log(data)))
    

// funktion som skriver ut alla produkter med kategori alternativ
function renderProducts(product,category) {
    console.log("renderProducts function working")
    let section = ``;
    sectionEl.innerHTML += section;

    for(let i = 0; i < product.length; i++) {
        if (category === product[i].category || category === "all") {
            // sectionEl.innerHTML += `
            section += `
            <br><br><br>
            <div id="img">
                <img src='${product[i].image}'alt='' id="poster" width=100px>
            </div>
            <h2>${product[i].title}</h2>
            <p>${product[i].description}</p>
            <h3>${product[i].category}</h3>
            <div id="price_container">        
                <h4 id="price">$ ${product[i].price} </h4>
            </div>
            <p> id #${product[i].id} </p>
            <button onclick="addToCart('${product[i].image}' ,'(${product[i].title.replace("'","")})', '${product[i].price}', '${product[i].id}')">Add to cart</button>
            <br><br><br>
            `          
        }
        sectionEl.innerHTML = section;
        // console.log(section)
    }
}



// console.log(cartArray);

categoryEl.addEventListener('change', (e) => {
    console.log("category options working");
    fetch("https://fakestoreapi.com/products")
    .then(res => res.json())    
    .then(data => renderProducts(data, categoryEl.value));
});

// let cartArray = JSON.parse(localStorage.getItem("items")) || '[]';
let cartArray = [];

// if(localStorage.getItem("items") == null) {
//     let cartArray = [];
// } else {
//     let cartArray = JSON.parse(localStorage.getItem("items"));
// }

// function addToCart(image, title, price) {   
// function addToCart(image, title, price, id) {   

//     cartArray.push({image, title, price, id});
function addToCart(image, title, price, id) {   

    cartArray.push({image, title, price, id});
    
    // cartArray.push('${product[i].image}' ,'(${product[i].title})', '${product[i].price}');
    // localStorage.setItem("cartArray", JSON.stringify(cartArray));
    localStorage.setItem("items", JSON.stringify(cartArray));
    // sessionStorage.setItem("products", JSON.stringify(cartArray));
    // localStorage.object.key("cartArray", JSON.stringify(cartArray));
    // sessionStorage.setItem("cartArray", JSON.stringify(cartArray));

    // for(let i = 0; i < cartArray.length; i++) {
    //     listEl.innerHTML += `
    //     <li>${cartArray[i].title}</li>
    //     `
    //     // let li = document.createElement("li")
    //     // li.textContent = cartArray[i]
    //     // list.appenChild(li)
    // }
    console.log(cartArray);
    console.log("addToCart function working");
    renderCart(cartArray);
}

// console.log(Object.keys(localStorage));
function removeFromCart(i) {
    cartArray.splice(i, 1);
    localStorage.setItem("items", JSON.stringify(cartArray));
    renderCart(cartArray);
}

// function removeFromCart(product) {
//     for(let i = 0; i < product.length; i++){
//         cartArray.splice(i,1);
//     }
//     localStorage.setItem("items", JSON.stringify(cartArray));

//     console.log(cartArray);
//     console.log("removeFromCart function working");
    
//     renderCart(cartArray);

// }
// function removeFromCart(cartArray) {
   
//     for(let i = 0; i < cartArray.length; i++){
//         if(cartArray.length === cartArray[i].id) {
//             cartArray.splice(i,1);
//         }
//         // cartArray.splice(i,1);
//     }
//     localStorage.setItem("items", JSON.stringify(cartArray));

//     console.log(cartArray);
//     console.log("removeFromCart function working");
    
//     renderCart(cartArray);

// }
// function removeFromCart(product) {
//     console.log(product, "remove function");

//     const filter = cartArray.filter((a,i) => {
//         if(product == a.id){
//             product.splice(i,1);
//         }
//     })
//     // for(let i = 0; i < product.length; i++){
//     //     cartArray.splice(i,1);
//     // }
//     // localStorage.setItem("items", JSON.stringify(cartArray));

//     // console.log(cartArray);
//     // console.log("removeFromCart function working");
    
//     // renderCart(cartArray);

// }

// function renderCart(products) {
//     listEl.innerHTML = "";
//     listEl.innerHTML = `
//     <ul></ul>
//     `;
//     for(let i = 0; i < products.length; i++) {
//         listEl.innerHTML += `
//         <li>            
//         <img src="${products[i].image}" width=50px>
//         <p>${products[i].title}</p>
//         <p>product id#${products[i].id}</p>
//         <p>${products[i].price}</p>
//         </li>
//         `
//     }
    

// }


function renderCart(product) {
    
    cartEl.innerHTML = "";
    cartEl.innerHTML = `
    <tr>
    
    <th>Product</th>
    <th>id</th>
    <th>Price</th>
    </tr>
    `;

    
    for(let i = 0; i < product.length; i++) {
        cartEl.innerHTML += `
        <tr>        
            <td>            
                <img src="${product[i].image}" width=50px>
            </td>
                
            <td>
                ${product[i].id}
            </td>
            <td>
                ${product[i].price}
            </td>
            <td>
            <button onclick="removeFromCart('${i}')">Remove</button>

            </td>
        </tr>            
        `
    }
    // cartEl.innerHTML + "<tr><td>total price</td></tr>"
    console.log("renderCart function working")
    

}

{/* <button onclick="removeFromCart('${product[i].image}', '${product[i].id}', '${product[i].price}')">Remove</button> */}

{/* <td>
                ${products[i].title}
                </td> */}

// {/* <div>
//             <img src="${products[i].image}" width=100px>
//             </div> */}

// function renderCart {}


// // --- swtich for categorys----
// function categories() {


    
// }




// function filterSelection(value) {

//     // let url = "https://fakestoreapi.com/products";
//     let url;

//     // fetch(url)
//     // .then((results) => results.json())
//     // .then((data) => renderApp(data));

//     switch(value) {
//         case ("all"):
//             // default:
//             url = "https://fakestoreapi.com/products";
//             // url;
//             // reload();
//             break;
//         case ("mClothing"):
//             url = "https://fakestoreapi.com/products/category/men's clothing";
//             // url += "/category/men's clothing";
//             // location.reload();
//             location.refresh();
//             break;
//         case ("wClothing"):
//             url = "https://fakestoreapi.com/products/category/women's clothing";
//             // url += "/category/women's clothing";
//             // location.reload();
//             break;
//         case ("jewelery"):
//             url = "https://fakestoreapi.com/products/category/jewelery";
//             // url += "/category/jewelery";
//             // location.reload();
//             break;
//         case ("electronics"):
//             url = "https://fakestoreapi.com/products/category/electronics";
//             // url += "/category/electronics";
//             // location.reload();
//             break;
        
//         default:
//             url = "https://fakestoreapi.com/products";
//             // break;
//     }

//     // return url;

//     fetch(url)
//     .then((results) => results.json())
//     .then((data) => renderApp(data));

    

//     // setCategoryData(value);
// }




// const categories = (value) => {
//     let url;
//     switch (value) {
//         case 0:
//         // default:
//         filterSelection('all') 
//         url = "https://fakestoreapi.com/products";
//         break;

//         case 1:
//         url = "https://fakestoreapi.com/products/category/men's clothing";
//         break;

//         case 2:
//         url = "https://fakestoreapi.com/products/category/women's clothing";
//         break;
//         case 2:
//         url = "https://fakestoreapi.com/products/category/jewelery";
//         break;
//         case 2:
//         url = "https://fakestoreapi.com/products/category/electronics";
//         break;
//     }

//     fetch(url)
//         .then((results) => results.json())
//         .then((data) => renderApp(data));

        

//     setCategoryData(value);
// };

// // category btns------------------
// function renderApp(jsonData) {

//     filterSelection("all") {
//         fetch("https://fakestoreapi.com/products")
//         .then(res=> res.json())
//         // .then(data => console.log(data));
//         .then(data => renderApp(data));
//     }
//     filterSelection("mClothing") {
//         fetch("https://fakestoreapi.com/products/category/men's clothing")
//         .then(res=> res.json())
//         // .then(data => console.log(data));
//         .then(data => renderApp(data));
//     }
//     filterSelection("wClothing") {
//         fetch("https://fakestoreapi.com/products//category/women's clothing")
//         .then(res=> res.json())
//         // .then(data => console.log(data));
//         .then(data => renderApp(data));
//     }
//     filterSelection("jewelery") {
//         fetch("https://fakestoreapi.com/products/category/jewelery")
//         .then(res=> res.json())
//         // .then(data => console.log(data));
//         .then(data => renderApp(data));
//     }
//     filterSelection("electronics") {
//         fetch("https://fakestoreapi.com/products/category/electronics")
//         .then(res=> res.json())
//         // .then(data => console.log(data));
//         .then(data => renderApp(data));
//     }
// }






// function filterSelection(c) {
//     var x, i;
//     x = document.getElementsByClassName("filterDiv");
//     if (c == "all") c = "";
//     // Add the "show" class (display:block) to the filtered elements, and remove the "show" class from the elements that are not selected
//     for (i = 0; i < x.length; i++) {
//         w3RemoveClass(x[i], "show");
//     if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
//     }
// }

// // Show filtered elements
// function w3AddClass(element, name) {
//     var i, arr1, arr2;
//     arr1 = element.className.split(" ");
//     arr2 = name.split(" ");
//     for (i = 0; i < arr2.length; i++) {
//         if (arr1.indexOf(arr2[i]) == -1) {
//         element.className += " " + arr2[i];
//         }
//     }
// }

//   // Hide elements that are not selected
// function w3RemoveClass(element, name) {
//     var i, arr1, arr2;
//     arr1 = element.className.split(" ");
//     arr2 = name.split(" ");
//     for (i = 0; i < arr2.length; i++) {
//         while (arr1.indexOf(arr2[i]) > -1) {
//         arr1.splice(arr1.indexOf(arr2[i]), 1);
//         }
//     }
//     element.className = arr1.join(" ");
// }

//   // Add active class to the current control button (highlight it)
// var btnContainer = document.getElementById("myBtnContainer");
// var btns = btnContainer.getElementsByClassName("btn");
// for (var i = 0; i < btns.length; i++) {
//     btns[i].addEventListener("click", function() {
//         var current = document.getElementsByClassName("active");
//         current[0].className = current[0].className.replace(" active", "");
//         this.className += " active";
//     });
// }

// // category btns------------------


    // --- Tabel ---
// function renderApp(jsonData) {
//     const productArray = jsonData;

//     console.log(jsonData)
//     console.log("renderApp is running")
    
//     for (let products of productArray) {
//         sectionEl.innerHTML += `                    
//         <article id="card">
//             <div class="img">
//                 <img src='${products.image}' alt='' id="poster">
//             </div>
//             <h2 id="title"> ${products.title} </h2>
//             <p> ${products.description} <p>
//             <h3> ${products.category} </h3>
//             <div id="price_container">        
//                 <h4 id="price">$ ${products.price} </h4>
//             </div>
//             <p> ${products.id} </p>
//             <button onclick="topFunction()" id="myBtn">Add to cart</button>
            
//         </article>        
//         `
//     }

    // <i class="fa-solid fa-bag-shopping"></i>

    // <img src='${products.image}' alt='' class='image'>

    // <p> ${products.description} <p>
    //     <p> ${products.category} <p></p>

    // <hr></hr> gör linjer i article

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

// }




// scroll to top function when to top button is pressed
function topFunction() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Chrome, Firefox, IE and Opera
}