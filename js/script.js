// user info
let userInfo = document.querySelector("#user_info")
let userData = document.querySelector("#user")
let links = document.querySelector("#link")

if(localStorage.getItem("username")){
    links.remove()
    userInfo.style.display = "flex"
    userData.innerHTML = localStorage.getItem("username")
}
// ///////////////////////////////////////////////
// log out
let logOutBtn = document.querySelector("#logout")
logOutBtn.addEventListener("click" , function(){
    localStorage.clear()
    setTimeout(() => {
        window.location = "login.html"
    } , 1500);
})

///////////////////////////////////////////////////
// show Products

let allProducts = document.querySelector(".products")
let total = 0
function drawItems(){
    let y = products.map((item) => {
        return `
              <div class="product_item col-sm">
                    <img class="product_item_img" src="${item.imageUrl}" alt="">
                    <div class="product_item_info">
                        <h3 class="category">${item.category}</h3>
                        <p>${item.title}</p>
                        <span>Price : ${item.price}L.E</span>
                    </div>   
                    <div class="product_item_action">
                        <button class="add_to_cart"  onclick="addToCart(${item.id})">Add To Cart</button>
                         <button class="remove_from_cart remove" onclick="removeFromCart(${item.id})">Remove From Cart</button>
                        <i class="far fa-heart fav ${item.liked == true ? "fa-solid fa-heart fav": ""}" style="color : ${item.liked == true ? "red" : ""}" onclick="addToFavourite(${item.id})"></i>
                    </div>  
                </div>     
        `
    })
    allProducts.innerHTML = y.join("");
}
drawItems()
// /////////////////////////////////////////////////
// add product to cart

let cartproductsDiv = document.querySelector(".carts_products div")
let badge = document.querySelector(".badge")
let data = localStorage.getItem("ProductsInCart") ? JSON.parse(localStorage.getItem("ProductsInCart")) : [];

// reload
if(data){
    data.map(item => {
        cartproductsDiv.innerHTML += 
        `<div>
            <span>${item.title}</span>
            <span class="counter text-primary" onclick="addToCart(${item.id})">+</span>
            <span class="counter qtn">${item.quantity}</span>
            <span class="counter text-danger" onclick="decrement(${item.id})">-</span>
         </div?
        `
    })
    badge.style.display = "block"
    badge.innerHTML = data.length
}
function addToCart(id){
    if(localStorage.getItem("username")){
        let choosenItem = products.find((item) => item.id === id )
        let items = data.find((i) => i.id === choosenItem.id)
        if(items){
            data = data.map((p) => {
                if(p.id === choosenItem.id)
                     p.quantity += 1
                return p
            })
        }else{
            data.push(choosenItem)
        }
        cartproductsDiv.innerHTML = ""
        data.forEach((item) => {
            cartproductsDiv.innerHTML += 
            `<div>
                <span>${item.title}</span>
                <span class="counter text-primary" onclick="addToCart(${item.id})">+</span>
                <span class="counter">${item.quantity}</span>
                <span class="counter text-danger" onclick="decrement(${item.id})">-</span>
             </div>
            `
        })
        localStorage.setItem("ProductsInCart" , JSON.stringify(data))
    
        let cartProductsLength = document.querySelectorAll(".carts_products div div")
        badge.style.display = "block"
        badge.innerHTML = cartProductsLength.length
    }else{
        window.location = "login.html"
    }
}

// decrement item
function decrement(id){
        let choosenItem = products.find((item) => item.id === id )
        let items = data.find((i) => i.id === choosenItem.id)
        if(items.quantity !== 1){
            data = data.map((p) => {
                if(p.id === choosenItem.id)
                     p.quantity -= 1
                return p
            })
        }else{
            data.pop(choosenItem)
        }
        cartproductsDiv.innerHTML = ""
        data.forEach((item) => {
            cartproductsDiv.innerHTML += 
            `<div>
                <span>${item.title}</span>
                <span class="counter text-primary" onclick="addToCart(${item.id})">+</span>
                <span class="counter">${item.quantity}</span>
                <span class="counter text-danger" onclick="decrement(${item.id})">-</span>
             </div>
            `
        })
        localStorage.setItem("ProductsInCart" , JSON.stringify(data) )
        let cartProductsLength = document.querySelectorAll(".carts_products div div")
        badge.style.display = "block"
        badge.innerHTML = cartProductsLength.length
    }

//////////////////////////////////////////////////
// open cart

let shoppingCartIcon = document.querySelector(".cart")
let cartsProducts = document.querySelector(".carts_products")
shoppingCartIcon.addEventListener("click", opencart)
function opencart(){
    if(cartproductsDiv.innerHTML != ""){
        if(cartsProducts.style.display == "block"){
            cartsProducts.style.display = "none"
        }else{
            cartsProducts.style.display = "block"
        }
    }
}

// ///////////////////////////////////////////////
// add products to favorite

let favoriteItem = localStorage.getItem("ProductsFavourite") ? JSON.parse(localStorage.getItem("ProductsFavourite")) : []
function addToFavourite(id){
    if(localStorage.getItem("username")){
        let choosenItem = products.find((item) => item.id === id )
        choosenItem.liked = true
        favoriteItem = [...favoriteItem , choosenItem]
        let uniqueProducts = getUniqueArr(favoriteItem,"id")
        localStorage.setItem("ProductsFavourite" , JSON.stringify(uniqueProducts) )
        products.map(item => {
            if(item.id === choosenItem.id){
                item.liked = true
            }
        })
        localStorage.setItem("products" , JSON.stringify("products"))
        drawItems(products)

    }else{
        window.location = "login.html"
    }
}

function getUniqueArr(arr , filterId){
    let unique = arr.map((item) => item[filterId])
    .map((item,index,a) => a.indexOf(item) === index && index)
    .filter((item) => arr[item]).map((item) => arr[item])
    return unique;
}

// ///////////////////////////////////////////////
// Search  

function search(){
    let filter = document.getElementById('find').value.toUpperCase();
    let item = document.querySelectorAll('.product_item');
    let l = document.getElementsByTagName('p');
    for(var i = 0 ; i<=l.length ; i++){
        let arr = item[i].getElementsByTagName('p')[0];
        let value = arr.innerHTML || arr.innerText || arr.textContent;
        if(value.toUpperCase().indexOf(filter) > -1){
            item[i].style.display = "";
        }else{
            item[i].style.display = "none";
        }
    }
}
////////////////////////////////////////////////////
