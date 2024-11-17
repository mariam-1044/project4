let ProductsInCart = localStorage.getItem("ProductsInCart")
let allProducts = document.querySelector(".products")
let noProductsDom = document.querySelector(".noproducts")
let total = 0;

// show products in cart

if(ProductsInCart){
    let item = JSON.parse(ProductsInCart) ;
    drawCartProducts(item);
}

function drawCartProducts(productsSelected = []){
    if(JSON.parse(localStorage.getItem("ProductsInCart")).length === 0)
        noProductsDom.innerHTML = "Cart is empty"
        document.getElementById("total").innerHTML = "L.E" + 0 + ".00"
    let products = JSON.parse(localStorage.getItem("ProductsInCart")) || productsSelected
    let y = products.map((item) => {
        total +=  item.price
        document.getElementById("total").innerHTML = "TotalPrice: " + total + " L.E" + ""
        return `
           <div class="product_item col-sm">
                    <img class="product_item_img" src="${item.imageUrl}" alt="">
                    <div class="product_item_info">
                        <h5>${item.title}</h5>
                        <p>Price : ${item.price}L.E</p>
                        <span class="counter text-primary" onclick="increment(${item.id})">+</span>
                        <span class="counter">${item.quantity}</span>
                        <span class="counter text-danger" onclick="decrement(${item.id})">-</span>
                    </div> 
                    <div class="product_item_action">
                        <button class="remove_from_cart" onclick="removeFromCart(${item.id})">Remove From Cart</button>
                    </div>  
            </div>  
        `
    })
    allProducts.innerHTML = y.join("");
}

// remove products from cart

function removeFromCart (id) {
    let ProductsInCart = localStorage.getItem("ProductsInCart")
    if(ProductsInCart){
        let items = JSON.parse(ProductsInCart) ;
        let removeItem = items.filter(item => item.id !== id)
        localStorage.setItem("ProductsInCart" , JSON.stringify(removeItem))
        drawCartProducts(removeItem)
    }    
}

////////////////////////////////////////
let data = JSON.parse(localStorage.getItem("ProductsInCart")) || []

// increment item
function increment(id){
        let choosenItem = products.find((item) => item.id === id )
        let items = data.find((i) => i.id === choosenItem.id)
        if(items){
            data = data.map((p) => {
                if(p.id === choosenItem.id)
                    p.quantity += 1 
                return p;
            })
        }else{
            data.push(choosenItem)
        }
        document.getElementById("total").innerHTML = "" 
        data.forEach((item) => {
            total += item.price
            document.getElementById("total").innerHTML = "TotalPrice: " + total + " L.E" + ""
        })
        localStorage.setItem("ProductsInCart" , JSON.stringify(data) )
        drawCartProducts(data)
    }

//  decrement item
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
        document.getElementById("total").innerHTML = "" 
        data.forEach((item) => {
            total -= item.price
            document.getElementById("total").innerHTML = "TotalPrice: " + total + " L.E" + ""
        })
        localStorage.setItem("ProductsInCart" , JSON.stringify(data) )
        drawCartProducts(data)
    }

// ///////////////////////////////////
// show product favorite
let ProductsFavorite = localStorage.getItem("ProductsFavourite")
let allProductsFavorie = document.querySelector(".item_favourite")
let noProductsFavorite = document.querySelector(".noproductsfavorite")

if(ProductsFavorite){
    let item = JSON.parse(ProductsFavorite) ;
    drawItemsFavorite(item);
}
 
function drawItemsFavorite(productsSelected = []){
    if(JSON.parse(localStorage.getItem("ProductsFavourite")).length === 0)
        noProductsFavorite.innerHTML = "No Products Favorite"
    let products = JSON.parse(localStorage.getItem("ProductsFavourite")) || productsSelected
    let y = products.map((item) => {
        return `
           <div class="product_item col-sm">
                    <img class="product_item_img" src="${item.imageUrl}" alt="">
                    <div class="product_item_info">
                        <h5 style="margin-bottom: -20px">${item.title}</h5>
                    </div> 
                    <div class="product_item_action">
                        <button onclick="removeFromFavorite(${item.id})" style="border : none" class="float-right">
                          <i class="fa-solid fa-heart fav"  style="color : red; background :white" ></i>
                        </button>
                    </div>  
                </div>      
                </div>     
        `
    })
    allProductsFavorie.innerHTML = y.join("");
}

// remove product from favorite
function removeFromFavorite (id) {
    let ProductsInCart = localStorage.getItem("ProductsFavourite")
    if(ProductsInCart){
        let items = JSON.parse(ProductsInCart) ;
        let removeItem = items.filter(item => item.id !== id)
        localStorage.setItem("ProductsFavourite" , JSON.stringify(removeItem))
        drawItemsFavorite(removeItem)
    }       
}
//  ///////////////////////////////////////////

