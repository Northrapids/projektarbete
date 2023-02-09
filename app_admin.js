"use strict";

// html element
const ordersEl = document.getElementById("orders");

const editNameEl = document.getElementById("editName");
const editEmailEl = document.getElementById("editEmail");
const editAddressEl = document.getElementById("editAddress");
const editCityEl = document.getElementById("editCity");
const editZipEl = document.getElementById("editZip");
const editPaymentEl = document.getElementById("editPayment");
const editShippingEl = document.getElementById("editShipping");
const editProductIdEl = document.getElementById("editProductId");

console.log("hej");

// function getOrders() {
//     localStorage.setItem(data);

fetch("https://firestore.googleapis.com/v1/projects/orders-44001/databases/(default)/documents/orders")
    .then(res => res.json())
    .then(data => displayOrders(data)); // categoryEl.value, 
    // return data;

// }



// function displayOrders(orders) {
//     console.log("displayCart function working"); // checks in console if function is working

//     const order = orders.documents;
//     for(let product of order) {

//         ordersEl.innerHTML += 
//         `
//         <tr>     
//             <td>            
//                 <p>${product.name.replace("projects/orders-44001/databases/(default)/documents/orders/","")}</p>
//             </td> 
//             <td>            
//                 <p>${product.fields.name.stringValue}</p>
//             </td>
//             <td>            
//                 <p>${product.fields.email.stringValue}</p>
//             </td>
//             <td>            
//                 <p>${product.fields.address.stringValue}</p>
//             </td>
//             <td>            
//                 <p>${product.fields.city.stringValue}</p>
//             </td>
//             <td>            
//                 <p>${product.fields.zip.stringValue}</p>
//             </td>
//             <td>            
//                 <p>${product.fields.payment.stringValue}</p>
//             </td>
//             <td>            
//                 <p>${product.fields.shipping.stringValue}</p>
//             </td>
//             <td>            
//                 <p>${product.fields.productId.arrayValue.values.map(value => value.stringValue)}</p>
//             </td>
//             <td>
//                 <button onclick="removeOrders('${product.name}')">Remove</button>
//             </td>
//             <td>
//                 <button onclick="editOrders('${product.name}')">Edit</button>
//             </td>
//         </tr>            
//         `
//         }
// }



    
        function displayOrders(data) {
            console.log("displayCart function working"); // checks in console if function is working

            

            // const ordersId = data.documents.map(document => document,name.split("/").pop());
            const ordersId = data.documents.map(document => document);
            console.log(ordersId);
            // ordersEl.innerHTML = "";

            ordersEl.innerHTML = `
            <tr>
                <th>Order Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>City</th>
                <th>Zip</th>
                <th>Payment Method</th>
                <th>Shipping Method</th>
                <th>Product id(s)</th>
            </tr>
            `

            for(let i = 0; i < data.documents.length; i++) {

            // const products = data.documents[i].fields.productId.arrayValue.values.map(value => value.stringValue);


                ordersEl.innerHTML += 
                `
                <tr>     
                    <td>            
                        <p>${data.documents[i].name.replace("projects/orders-44001/databases/(default)/documents/orders/","")}</p>
                    </td> 
                    <td>            
                        <p>${data.documents[i].fields.name.stringValue}</p>
                    </td>
                    <td>            
                        <p>${data.documents[i].fields.email.stringValue}</p>
                    </td>
                    <td>            
                        <p>${data.documents[i].fields.address.stringValue}</p>
                    </td>
                    <td>            
                        <p>${data.documents[i].fields.city.stringValue}</p>
                    </td>
                    <td>            
                        <p>${data.documents[i].fields.zip.stringValue}</p>
                    </td>
                    <td>            
                        <p>${data.documents[i].fields.payment.stringValue}</p>
                    </td>
                    <td>            
                        <p>${data.documents[i].fields.shipping.stringValue}</p>
                    </td>
                    <td>            
                        <p>${data.documents[i].fields.productId.arrayValue.values.map(value => value.stringValue)}</p>
                    </td>
                    <td>
                        <button onclick="removeOrders('${data.documents[i].name}')">Remove</button>
                    </td>
                    <td>
                        <button onclick="editOrders('${data.documents[i].name}')">Edit</button>
                    </td>
                </tr>            
                `
            }
}






            // const orders = data.documents[i];
            // const name = orders.fields.name.stringValue;
            // const email = orders.fields.email.stringValue;
            // const address = orders.fields.address.stringValue;
            // const city = orders.fields.city.stringValue;
            // const zip = orders.fields.zip.stringValue;
            // const payment = orders.fields.payment.stringValue;
            // const shipping = orders.fields.shipping.stringValue;
            // const productId = orders.fields.productId.arrayValue.values
            //     .map(value => value.satringValue)
            //     .join(", ");
            
            // ordersEl.innerHTML = "";
            // cartEl.innerHTML = 
            // `
            // <tr>    
            //     <th>Product</th>
            //     <th>id</th>
            //     <th>Price</th>
            // </tr>
            // `;
            
            // for(let i = 0; i < data.documents.length; i++) {
            //     ordersEl.innerHTML += 
            //     `
            //     <tr>      
            //         <td>            
            //             <p>${orders.documents[i].name.stringValue}</p>
            //         </td>
            //         <td>            
            //             <p>${orders.documents[i].email.stringValue}</p>
            //         </td>
            //         <td>            
            //             <p>${orders.documents[i].address.stringValue}</p>
            //         </td>
            //         <td>            
            //             <p>${orders.documents[i].city.stringValue}</p>
            //         </td>
            //         <td>            
            //             <p>${orders.documents[i].zip.stringValue}</p>
            //         </td>
            //         <td>            
            //             <p>${orders.documents[i].payment.stringValue}</p>
            //         </td>
            //         <td>            
            //             <p>${orders.documents[i].shipping.stringValue}</p>
            //         </td>
            //         <td>            
            //             <p>${orders.documents[i].productId.arrayValue}</p>
            //         </td>
            //         <td>
            //             <button onclick="removeFromCart('${i}')">Remove</button>
            //         </td>
            //     </tr>            
            //     `
            // }
// }

function removeOrders(name) {
    console.log("order removed");

    fetch("https://firestore.googleapis.com/v1/" + name, {
    // fetch(`https://firestore.googleapis.com/v1/projects/orders-44001/databases/(default)/documents/orders/${data.documents[i].name}`, {

        method: "DELETE"
    })

        .then(res => res.json())
        .then(data => displayOrders(data))
        // .then(data => console.log(data))        
        .catch(error => console.log(error));

        setTimeout(() => {
        document.location.reload();
        },1000);

        // updateFetch();
}
// updateFetch();


function editOrders(name) {

    const editName = editNameEl.value;
    const editEmail = editEmailEl.value;
    const editAddress = editAddressEl.value;
    const editCity = editCityEl.value;
    const editZip = editZipEl.value;
    const editPayment = editPaymentEl.value;
    const editShipping = editShippingEl.value;
    const editProductId = editProductIdEl.value;

    const body = JSON.stringify(

        {"fields": {            
                "name": {
                    "stringValue": editName
                },
                "email": {
                    "stringValue": editEmail
                },
                "address": {
                    "stringValue": editAddress
                },
                "city": {
                    "stringValue": editCity
                },
                "zip": {
                    "stringValue": editZip
                },
                "payment": {
                    "stringValue": editPayment
                },
                "shipping": {
                    "stringValue": editShipping
                },
                "productId": {
                    "arrayValue": {
                        "values": [{
                            "stringValue": editProductId
                        }] 
                    }
                }
            }
        }
    )

    fetch("https://firestore.googleapis.com/v1/" + name, {

        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },

        body: body
    })

        .then(res => res.json())             
        .then(data => console.log(data))        
        .catch(error => console.log(error));

}

// function updateFetch() {
//     ordersEl.innerHTML = "";

//     fetch("https://firestore.googleapis.com/v1/projects/orders-44001/databases/(default)/documents/orders")
//     .then(res => res.json())
//     .then(data => {
//         ordersEl.innerHTML = "";
//         displayOrders(data);
//     })
//     .catch(error => console.log(error)) 

    
// }

