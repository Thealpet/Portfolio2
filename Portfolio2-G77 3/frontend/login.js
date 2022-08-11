function logIn(){

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const admin = {
        username : username,
        password : password,
    }

    fetch("http://localhost:5000/api/login", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Accept' : 'application/json'

        },
        body: JSON.stringify(admin)
    })
    .then(response => response.json())
    .then(data => checkLogin(data))
    .catch(err => console.log(err));
}

function checkLogin(data){
    answer = data
    console.log(answer)
    if(answer == "correct"){
        var text = document.getElementById('fail')
        text.innerText="";
        var addItem = document.getElementsByClassName('addPlant')[0];

        add_row_content = `
        <section style="margin-left:100px;">
    
            <div class="container">
                <h1 style="margin-top: 100px;">Adding item to plant-shop</h1>
                <div class="addImg" style="margin:10px;" >
                    <label for="image" style="margin-right: 40px;"><b>Image (link)</b></label>
                    <input type="text"  name="image" id="image" required style="width: 500px;">
                </div>
                <div class="addName" style="margin:10px;" >
                    <label for="name" style="margin-right: 77px;"><b>Name</b></label>
                    <input type="text" name="name" id="name" required >
                </div>
                <div class="addShortDes" style="margin:10px;" >
                    <label for="short_des"><b>Short description</b></label>
                    <textarea type="text"  name="short_des" id="short_des" required style="width: 500px; height: 50px;"></textarea>
                </div>
                <div class="addLongDes" style="margin:10px;" >
                    <label for="long_des" ><b>Long description</b></label>
                    <textarea type="text"  name="long_des" id="long_des" required style="width: 500px; height: 100px;"></textarea>
                </div>
                <div class="addPrice" style="margin:10px;" >
                    <label for="price" style="margin-right: 80px;"><b>Price</b></label>
                    <input type="text"  name="price" id="price" required>
                </div>

                <button type="button"  class="btn btn-primary" onclick="addPlant()">Add Plant</button> 
                <div class="failed" id="fail" style="color:red;">
            
                </div>
            </div>

        </section>`;
        addItem.innerHTML=add_row_content;
    }
    else{
        var text = document.getElementById('fail')
        text.innerText="Your password or username is wrong!";
    }
}

function addPlant(){
    const image = document.getElementById('image').value;
    const name = document.getElementById('name').value;
    const shortDescription = document.getElementById('short_des').value;
    const longDescription= document.getElementById('long_des').value;
    const price = document.getElementById('price').value;


    if(name == "" || shortDescription == "" || longDescription == "" || price == ""){
        var text = document.getElementById('added')
        text.innerText="You need to fill in all the input fields, except for the image field";
    } 
    else{
        var text = document.getElementById('added')
        text.innerText="Plant " + name + " is added to the shop";

        const plant = {
            image : image,
            name : name,
            shortDescription : shortDescription,
            longDescription : longDescription,
            price : price,
        }
    
        fetch("http://localhost:5000/api/admin", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept' : 'application/json'
    
            },
            body: JSON.stringify(plant)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }
}