"use strict";

// HTML - element
const listEl = document.getElementById("list");
const cartEl = document.getElementById("cart");
const totalEl = document.getElementById("total");
const quantityEl = document.getElementById("quantity");

const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const addressEl = document.getElementById("address");
const cityEl = document.getElementById("city");
const zipEl = document.getElementById("zip");
const paymentEl = document.getElementById("payment");
const shippingEl = document.getElementById("shipping");

const messageEl = document.getElementById("message");


let cartArray = JSON.parse(localStorage.getItem("product")) || [];


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
                    ${product[i].id}
                </td>
                <td>
                    $${product[i].price}
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


// checks if ther is products saved in local storage otherwise displays empty array
const savedProducts = JSON.parse(localStorage.getItem("product"));
if (savedProducts) {
    cartArray = savedProducts;
}
displayCart(cartArray);



function clearCart() {
    localStorage.clear(cartArray)

    document.location.reload();
}

// function posts order to firebase
function placeOrder() {
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const address = addressEl.value.trim();
    const city = cityEl.value.trim();
    const zip = zipEl.value.trim();
    const payment = paymentEl.value.trim();
    const shipping = shippingEl.value.trim();


    // all fields must be filled out or order can't be placed and message appears asking user to do so
    if(!name || !email || !address || !city || !zip || !payment || !shipping) {

        console.log("place order error");

        messageEl.innerHTML = `
        <h3 style="color: red">Please fill out all fields to proceed!</h3>        
        `;

        
        return;
    }

    const productId = cartArray.map(product => {
        return {"stringValue": product.id}
    });

    const data = {
        "fields": {            
            "name": {
                "stringValue": name
            },
            "email": {
                "stringValue": email
            },
            "address": {
                "stringValue": address
            },
            "city": {
                "stringValue": city
            },
            "zip": {
                "stringValue": zip
            },
            "payment": {
                "stringValue": payment
            },
            "shipping": {
                "stringValue": shipping
            },
            "productId": {
                "arrayValue": {
                    "values": productId
                }
            }
        }
        
    }

    fetch("https://firestore.googleapis.com/v1/projects/orders-44001/databases/(default)/documents/orders",{

        method: "POST",
        headers: {
            "Content-type": "application/json"
        },

        body : JSON.stringify(data)

    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))    

    messageEl.innerHTML = `
        <h3 style="color: orange">Thank You For Your order!</h3>        
        `;

    localStorage.clear(cartArray); //clears array after order is placed

    // directs user to index page after order is placed
    setTimeout(() => {
        window.location = "index.html";
    },500)
}

// scroll to top function when to top button is pressed
function topFunction() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Chrome, Firefox, IE and Opera
}