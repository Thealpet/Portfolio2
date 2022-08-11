var cart = []

function render_cart(data){
    var h_list = document.getElementById("items");
    var h_col = document.getElementById("first-row");

    for (var i = 0; i < data.length; i++){
        cart[i] = data[i];
        [id, img, n, price] = data[i];

        var cloned_col = h_col.cloneNode(true);
        cloned_col.id = id;
            
        var h_name = cloned_col.querySelector(".name");
        h_name.innerHTML = n;

        var h_img = cloned_col.querySelector(".card-image");
        h_img.src = img;

        var h_price = cloned_col.querySelector(".price");
        h_price.innerHTML = price + " kr";
        
        h_list.appendChild(cloned_col);
    }
    h_col.remove();
    totalPrice2(data);
}

function totalPrice2(data){
    var total_price = 0;
    
    for (var i = 0; i < data.length; i++){
        [id, img, n, price] = data[i];
        total_price += price;  
    }
    document.getElementsByClassName('total-price')[0].innerHTML = total_price + "kr";
}

function completePurchase(){
    if ( cart.length == 0){
        alert("Cart is empty! You have to add something to buy")
        window.location = 'index.html';
    }
    else{
        fetch(`./api/plants/basket/delAll`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    
        alert("Thank you for purchasing from our plant shop! This is your lucky day, you get all the items for free!")
        window.location = 'index.html';
    }
}

fetch("./api/plants/cart", {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify()
})
.then(response => response.json())
.then(data => render_cart(data))
.catch(err => console.log(err));


function totalPrice(data){
    var total_price = 0;
    
    for (var i = 0; i < data.length; i++){
        [id, img, n, price] = data[i];
        total_price += price;  
    }
    document.getElementsByClassName('cart-total-price')[0].innerHTML = total_price + "kr";
}
    
function updateNumber(data){   
    number = data.length;
    add_number = `<p class="count" style="color: white; position: fixed; margin-top: 14px; "> ${number}</p>`
    document.getElementsByClassName('number-count')[0].innerHTML = add_number;
}
    
function elementsInBag(data){
    for (var i = 0; i < data.length; i++){
        var add_row = document.createElement('div');
        add_row.classList.add('cart-row');
        var cart_items = document.getElementsByClassName('cart-items')[0];
        cart[i] = data[i];
        [id, img, n, price] = data[i];
    
        add_row_content = `
            <div class="row" id ="cart-row" style="border-bottom: 0.5px solid black ;">
                <div class="col-md-3">
                    <img src="${img}" class="cart-img" style="width: 80px; height:70px; object-fit: cover;"/>
                </div>
                <div class="col-md-3" style="margin-top: 10px;">
                    <h5 class="cart-name">${n}</h5>
                </div>
                <div class="col-md-3" style="margin-top: 10px;" >
                    <h5 class="cart-price">${price} kr</h5>
                </div>
                <div class="col-md-3" id="${id}" style="margin-top: 10px;">
                    <button class="btn btn-danger" onclick="removeFromCart(this)">X</button>
                </div>
            </div>`;
        add_row.innerHTML = add_row_content;
        cart_items.append(add_row);   
    }
    totalPrice(data);
    updateNumber(data);         
}

function removeFromCart(element){
    location.replace("checkout.html");
    element.parentElement.parentElement.remove();
    let deleted_item = element.parentElement;
    console.log(deleted_item.id);
    
    fetch(`http://localhost:5000/api/plants/cart/${deleted_item.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(deleted_item)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}
    

fetch("./api/plants/cart", {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify()
})
.then(response => response.json())
.then(data => elementsInBag(data))
.catch(err => console.log(err));