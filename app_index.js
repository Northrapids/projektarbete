"use strict";

// --- HTML - ELEMENT ---

const listEl = document.getElementById("list");

const sectionEl = document.getElementById("section");
const categoryEl = document.getElementById("category");
const cartEl = document.getElementById("cart");
const totalEl = document.getElementById("total");
const quantityEl = document.getElementById("quantity");
// const quantityIconEl = document.getElementById("quantityIcon");






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
            // sectionEl.innerHTML += `
            section += `
            
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



// console.log(cartArray);


// addEventListener that change category and fetches product based on category
categoryEl.addEventListener('change', (e) => {
    console.log("category options working");
    fetch("https://fakestoreapi.com/products")
    .then(res => res.json())    
    .then(data => displayProducts(data, categoryEl.value));
});

// let cartArray = JSON.parse(localStorage.getItem("items")) || '[]';
// let cartArray = [];

// if(localStorage.getItem("items") == null) {
//     let cartArray = [];
// } else {
//     let cartArray = JSON.parse(localStorage.getItem("items"));
// }

// function addToCart(image, title, price) {   
// function addToCart(image, title, price, id) {   

//     cartArray.push({image, title, price, id});


let cartArray = JSON.parse(localStorage.getItem("product")) || [];
// let cartArray = [];



// function that adds products to cart
function addToCart(image, title, price, id) {  
    console.log("addToCart function working");// checks in console if function is working


    cartArray.push({
        image,
        title,
        price,
        id
    }); // adds product by image, title, prica, and id to cartArray
    
    // cartArray.push('${product[i].image}' ,'(${product[i].title})', '${product[i].price}');
    // localStorage.setItem("cartArray", JSON.stringify(cartArray));
    localStorage.setItem("product", JSON.stringify(cartArray)); // stores product in localStorage

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
    displayCart(cartArray); // displays updated cart
    console.log(cartArray); // display updated cart in console

}

// console.log(Object.keys(localStorage));


// function that removes products from cart
function removeFromCart(i) {
    console.log("removeFromCart function working") // checks in console if function is working

    cartArray.splice(i, 1); // splice method removes specific product from cart
    localStorage.setItem("product", JSON.stringify(cartArray)); // stores product in localStorage
    displayCart(cartArray); // displays updated cart
    console.log(cartArray); // display updated cart in console
}


    
//     displayCart(cartArray);

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

// function displayCart(product) {

//     document.getElementById("quantityIcon").innerHTML = cartArray.length;

//     if (cartArray.length >= 1) {    
//     document.getElementById("quantityIcon").style.display = "flex"
//     } else {
//         document.getElementById("quantityIcon").style.display = "none";
//     }
//     cartEl.innerHTML = ``;
//     cartEl.innerHTML = `
//     <ul></ul>
//     `;
//     for(let i = 0; i < product.length; i++) {
//         cartEl.innerHTML += `
//         <section>
//         <li>            
//         <img src="${product[i].image}" width=50px>
//         <p>${product[i].title}</p>
//         <p>product id#${product[i].id}</p>
//         <p>${product[i].price}</p>
//         <button onclick="removeFromCart('${i}')">Remove</button>
//         </li>
//         </section>
//         <br>
//         `
//     }
//     quantityEl.innerHTML = "Quantity: " + product.length; // summarize products in cart

//     const sumPrice = product.reduce((acc, product) => { // summarize prices
//         return acc + parseFloat(product.price);        
//     }, 0);
//     totalEl.innerHTML = "Cart Total: $ " + sumPrice.toFixed(2); // toFixed(2) round didgit to two decimals
// }
// const savedProducts = JSON.parse(localStorage.getItem("product"));
// if (savedProducts) {
//     cartArray = savedProducts;
// }
// displayCart(cartArray);
    



// function that displays product inside cart
function displayCart(product) {
    console.log("displayCart function working"); // checks in console if function is working

    document.getElementById("quantityIcon").innerHTML = cartArray.length;

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

// const savedProducts = JSON.parse(localStorage.getItem("product"));
// if (savedProducts) {
//     cartArray = savedProducts;
// }
// displayCart(cartArray);
// const savedProducts = JSON.parse(localStorage.getItem("product"));

// cartArray = savedProducts;

// displayCart(cartArray);





function clearCart() {
    localStorage.clear(cartArray)

    document.location.reload();
}


function checkout() {
    window.location = "checkout.html";
}





// // function that displays product inside cart
// function displayCart(product) {
//     console.log("displayCart function working"); // checks in console if function is working

//     // console.log(Object.keys(localStortage));

   
    
//         cartEl.innerHTML = "";
//         cartEl.innerHTML = 
//         `
//         <tr>    
//             <th>Product</th>
//             <th>id</th>
//             <th>Price</th>
//         </tr>
//         `;
        
//         for(let i = 0; i < product.length; i++) {
//             cartEl.innerHTML += 
//             `
//             <tr>      
//                 <td>            
//                     <img src="${product[i].image}" width=50px>
//                 </td>                   
//                 <td>
//                     ${product[i].id}
//                 </td>
//                 <td>
//                     ${product[i].price}
//                 </td>
//                 <td>
//                     <button onclick="removeFromCart('${i}')">Remove</button>
//                 </td>
//             </tr>            
//             `
//         }

//         quantityEl.innerHTML = "Quantity: " + product.length; // summarize products in cart

//         const sumPrice = product.reduce((acc, product) => { // summarize prices
//             return acc + parseFloat(product.price);        
//         }, 0);
//         totalEl.innerHTML = "Cart Total: $ " + sumPrice.toFixed(2); // toFixed(2) round didgit to two decimals
//     }

//     if (cartArray.lenght === 0) {
//         console.log("empty");
        
//     }


{/*         <td>            
                ${i+1}
            </td> */}






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