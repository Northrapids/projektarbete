"use strict";

// $.getScript(app.js);


const listEl = document.getElementById("list");
const cartEl = document.getElementById("cart");
const totalEl = document.getElementById("total");
const quantityEl = document.getElementById("quantity");

// let cartArray= [];
let cartArray = JSON.parse(localStorage.getItem("product")) || [];
// let cartArray = [];
console.log("hej");

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

    // console.log(Object.keys(localStortage));

    if (cartArray.lenght === 0) {
        console.log("empty");
        cartEl.innerHTML = `
        <td>
            <p>Cart is empty!</p>
        </td>
        `
    } else {
    
        cartEl.innerHTML = "";
        // cartEl.innerHTML = 
        // `
        // <tr>    
        //     <th>Product</th>
        //     <th>id</th>
        //     <th>Price</th>
        // </tr>
        // `;
        
        for(let i = 0; i < product.length; i++) {
            cartEl.innerHTML += 
            `
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

        quantityEl.innerHTML = "Quantity: " + product.length; // summarize products in cart

        const sumPrice = product.reduce((acc, product) => { // summarize prices
            return acc + parseFloat(product.price);        
        }, 0);
        totalEl.innerHTML = "Cart Total: $ " + sumPrice.toFixed(2); // toFixed(2) round didgit to two decimals
    }
}

const savedProducts = JSON.parse(localStorage.getItem("product"));
if (savedProducts) {
    cartArray = savedProducts;
}
displayCart(cartArray);

// const savedProducts = JSON.parse(localStorage.getItem("product"));

// if (savedProducts.lenght === 0) {
//     cartArray = savedProducts;
//     displayCart(cartArray);
// } else {
//     console.log("empty");
//     cartEl.innerHTML = `
//     <td>
//         <p>Cart is empty!</p>
//     </td>
//     `
// }

// if (savedProducts.lenght === 0) {
//     console.log("empty");
//     cartEl.innerHTML = `
//     <td>
//         <p>Cart is empty!</p>
//     </td>
//     `
// } else {
    
//     cartArray = savedProducts;
//     displayCart(cartArray);
// }


// function placeOrder() {
//     const fname = fnameEl.value.trim();
//     const sname = snameEl.value.trim();
//     const email = emailEl.value.trim();
//     const address = addressEl.value.trim();
//     const city = cityEl.value.trim();
//     const zip = zipEl.value.trim();

//     if(!fname || !sname || !email || !address || !city || !zip)
    
// }


