"use strict";

// $.getScript(app.js);


const listEl = document.getElementById("list");
const cartEl = document.getElementById("cart");
const totalEl = document.getElementById("total");
const quantityEl = document.getElementById("quantity");

const nameEl = document.getElementById("name");
const emailEl = document.getElementById("email");
const addressEl = document.getElementById("address");
const cityEl = document.getElementById("city");
const zipEl = document.getElementById("zip");
// const phoneEl = document.getElementById("phone");
const paymentEl = document.getElementById("payment");
const shippingEl = document.getElementById("shipping");

const messageEl = document.getElementById("message");



// måste skriva const för namn, email, address osv...........

// let cartArray= [];
let cartArray = JSON.parse(localStorage.getItem("product")) || [];
// let cartArray = [];
// console.log("hej");

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

function clearCart() {
    localStorage.clear(cartArray)

    document.location.reload();
}


function placeOrder() {
    // const fname = fnameEl.value.trim();
    // const sname = snameEl.value.trim();
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const address = addressEl.value.trim();
    const city = cityEl.value.trim();
    const zip = zipEl.value.trim();
    const payment = paymentEl.value.trim();
    const shipping = shippingEl.value.trim();



    // if(!fname || !sname || !email || !address || !city || !zip || !payment || !shipping) {
    if(!name || !email || !address || !city || !zip || !payment || !shipping) {

        console.log("place order error");

        messageEl.innerHTML = `
        <h3>Please fill out all fields to proceed!</h3>        
        `;

        
        return;
    }

    const productId = cartArray.map(product => {
        return {"stringValue": product.id}
    });
    // const productId = cartArray.map(product => {
    //     return {"stringValue": product.title, "stringValue": product.id}
    // });

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

    // const contactformEl = document.querySelector("#contactform");

    // contactformEl.innerHTML = `
    // <h1>Thank You For Your order!</h1>
    // `;

    messageEl.innerHTML = `
        <h3>Thank You For Your order!</h3>        
        `;

    localStorage.clear(cartArray);

    setTimeout(() => {
        window.location = "index.html";
    },3000)


//     // thank you message apperas when send button is pressed
// const buttonEl = document.querySelector('.button');
// const contactformEl = document.querySelector(".contactform");

// function messagetext(e) {
//     e.preventDefault();
//     document.body.style.fontSize = '4rem'
//     document.body.style.fontFamily = 'Lato'

//     contactformEl.innerHTML = "Thank You For Your Message!";
// }

}






// buttonEl.addEventListener('click', messagetext);






