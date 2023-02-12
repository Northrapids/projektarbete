"use strict";

// html - element
const ordersEl = document.getElementById("orders");

const editNameEl = document.getElementById("editName");
const editEmailEl = document.getElementById("editEmail");
const editAddressEl = document.getElementById("editAddress");
const editCityEl = document.getElementById("editCity");
const editZipEl = document.getElementById("editZip");
const editPaymentEl = document.getElementById("editPayment");
const editShippingEl = document.getElementById("editShipping");
const editProductIdEl = document.getElementById("editProductId");




// fetch orders from firebase
fetch("https://firestore.googleapis.com/v1/projects/orders-44001/databases/(default)/documents/orders")
    .then(res => res.json())
    .then(data => displayOrders(data));

// function that displays orders from firebase   
function displayOrders(data) {
    console.log("displayCart function working"); // checks in console if function is working

            

    // const ordersId = data.documents.map(document => document,name.split("/").pop());
    const ordersId = data.documents.map(document => document);
    console.log(ordersId);


    ordersEl.innerHTML = 
        `
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
            <th>Remove</th>
            <th>Edit</th>
            </tr>
            `

    for(let i = 0; i < data.documents.length; i++) {

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
                    <button id="removeButton" onclick="removeOrders('${data.documents[i].name}')">Remove</button>
                </td>
                <td>
                    <button id="editButton" onclick="editOrders('${data.documents[i].name}')">Edit</button>
                </td>
            </tr>            
            `
    }
}



// function for removing orders from firebase
function removeOrders(name) {
    console.log("order removed");

    fetch("https://firestore.googleapis.com/v1/" + name, {
    // fetch(`https://firestore.googleapis.com/v1/projects/orders-44001/databases/(default)/documents/orders/${data.documents[i].name}`, {

        method: "DELETE"
    })

        .then(res => res.json())
        .then(data => displayOrders(data))        
        .catch(error => console.log(error));

        setTimeout(() => {
            document.location.reload();
        },500);
}


// function for editing orders from firebase
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

    setTimeout(() => {
        document.location.reload();
    },1000);

}

// scroll to top function when to top button is pressed
function topFunction() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Chrome, Firefox, IE and Opera
}