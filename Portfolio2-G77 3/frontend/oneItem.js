var plants = [];

function getItem(data){

    var itemlist = document.getElementById("item");
    var itemrow = document.getElementById("item_row");

    plants[0] = data[0];
    
    [id, img, n, s_des, l_des, price] = data[0];

    var cloned_row = itemrow.cloneNode(true);
    cloned_row.id = id;

    var itemimg = cloned_row.querySelector(".itemcard-image");
    itemimg.src = img;

    var itemname = cloned_row.querySelector(".itemname");
    itemname.innerHTML = n;

    var long_des = cloned_row.querySelector(".long_description");
    long_des.innerHTML = l_des;

    var itemprice = cloned_row.querySelector(".itemprice");
    itemprice.innerHTML = price + " kr";

    itemlist.appendChild(cloned_row);

    itemrow.remove();

}

var queryString = decodeURIComponent(window.location.search);
queryString =queryString.substring(1);
var get_id = queryString.split("=");
let plant_id = get_id[1];

fetch(`http://localhost:5000/api/plants/${plant_id}`) 
    .then(response => response.json())
    .then(data => getItem(data))
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

function addToBag(){
    location.reload(true);

    var plant = [];
    plant[0] = plants[0];
    [id, img, n, s_des, l_des, price] = plant[0];

    const a_plant = {
        image : img,
        name : n,
        price : price,
    }
    
    fetch("http://localhost:5000/api/plants/cart", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept' : 'application/json'

        },
        body: JSON.stringify(a_plant)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}


function removeFromCart(element){
    location.reload(true);
    element.parentElement.parentElement.remove();

    let deleted_item = element.parentElement;

    fetch(`http://localhost:5000/api/plants/cart/${deleted_item.id}`, {
        method: 'DELETE',
        headers: {
            'Accept' : 'application/json'
        },
        body: JSON.stringify(deleted_item)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.log(err));
}  

fetch("http://localhost:5000/api/plants/cart", {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify()
})
.then(response => response.json())
.then(data => elementsInBag(data))
.catch(err => console.log(err));




                        




