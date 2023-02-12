"use strict";

// --- HTML - ELEMENT ---

const listEl = document.getElementById("list");

const sectionEl = document.getElementById("section");
const categoryEl = document.getElementById("category");
const cartEl = document.getElementById("cart");
const totalEl = document.getElementById("total");
const quantityEl = document.getElementById("quantity");






// --- GET ---
// fetching api and display all products in console
fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => displayProducts(data, categoryEl.value, console.log(data)))
    

// function that displays all products and option to display by category
//.replace(" ' ", "") removes the apostrophe/ single-quote from title, which gave syntax error when adding to cartArray
function displayProducts(product,category) {
    console.log("displayProducts function working"); // checks in console if function is working
    let section = ``;
    sectionEl.innerHTML += section;

    for(let i = 0; i < product.length; i++) {
        if (category === product[i].category || category === "all") { // makes it possible to switch between categories

            section += 
            `            
            <article id="card">
            <div id="img_container">
                <img src='${product[i].image}'alt='' id="img" >
            </div>
            <div id="title_container">
            <h2 id="title">${product[i].title}</h2>
            </div>
            <h3 id="categories">Category: ${product[i].category}</h3>
            <p id="description">${product[i].description}</p>
            <p id="id"> id #${product[i].id} </p>
            <div id="price_container">                    
                <p id="price">$ ${product[i].price} </p>
                <button id="addToCartBtn" onclick="addToCart('${product[i].image}' ,'(${product[i].title.replace("'","")})', '${product[i].price}', '${product[i].id}')">Add to cart</button>
            </div>
            </article>            
            `          
        }
        sectionEl.innerHTML = section;
        // console.log(section)
    }
}


// addEventListener that change category and fetches product based on category
categoryEl.addEventListener('change', (e) => {
    console.log("category options working");
    fetch("https://fakestoreapi.com/products")
    .then(res => res.json())    
    .then(data => displayProducts(data, categoryEl.value));
});


let cartArray = JSON.parse(localStorage.getItem("product")) || [];


// function that adds products to cart
function addToCart(image, title, price, id) {  
    console.log("addToCart function working");// checks in console if function is working


    cartArray.push({
        image,
        title,
        price,
        id
    }); // adds product by image, title, prica, and id to cartArray    

    localStorage.setItem("product", JSON.stringify(cartArray)); // stores product in localStorage

    displayCart(cartArray); // displays updated cart
    console.log(cartArray); // display updated cart in console

}


// function that removes products from cart
function removeFromCart(i) {
    console.log("removeFromCart function working") // checks in console if function is working

    cartArray.splice(i, 1); // splice method removes specific product from cart
    localStorage.setItem("product", JSON.stringify(cartArray)); // stores product in localStorage
    displayCart(cartArray); // displays updated cart
    console.log(cartArray); // display updated cart in console
}


// function that displays product inside cart
function displayCart(product) {
    console.log("displayCart function working"); // checks in console if function is working

    document.getElementById("quantityIcon").innerHTML = cartArray.length;

    // if case for quantity icon, dosen't show zero when cart is empty
    if (cartArray.length >= 1) {    
    document.getElementById("quantityIcon").style.display = "flex"
    } else {
        document.getElementById("quantityIcon").style.display = "none";
    }
    
    cartEl.innerHTML = "";
    cartEl.innerHTML = 
    `
    <tr>    
        <th>Product</th>
        <th>id</th>
        <th>Price</th>
        <th>Remove</th>
    </tr>
    `;
    
    for(let i = 0; i < product.length; i++) {
        cartEl.innerHTML += 
        `
        <tr>      
            <td>   
                <div id="table_img_container">        
                    <img src="${product[i].image}" id="table_img">&nbsp
                </div>    
            </td>                   
            <td>
                ${product[i].id}&nbsp
            </td>
            <td>
                $${product[i].price}&nbsp
            </td>
            <td>
                <button id="removeFromCartBtn" onclick="removeFromCart('${i}')">Remove</button>
            </td>                      
        </tr>            
        `
    }

    quantityEl.innerHTML = "Quantity: " + product.length; // summarize products in cart

    const sumPrice = product.reduce((acc, product) => { // summarize prices
        return acc + parseFloat(product.price);        
    }, 0);
    totalEl.innerHTML = "Cart Total: $ " + sumPrice.toFixed(2); // toFixed(2) round didgit to two decimals
}
const savedProducts = JSON.parse(localStorage.getItem("product"));
if (savedProducts) {
    cartArray = savedProducts;
}
displayCart(cartArray);

//  function clears cart and array saved in local storage
function clearCart() {
    localStorage.clear(cartArray)

    document.location.reload(); // reloads page
}


function checkout() {
    window.location = "checkout.html"; // brings user to checkout page
}

// scroll to top function when to top button is pressed
function topFunction() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Chrome, Firefox, IE and Opera
}