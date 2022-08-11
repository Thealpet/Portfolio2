from flask import Flask, request
import flask 
import mysql.connector 


mydb = mysql.connector.connect(user = 'user', password = 'G1f3HiAq45', host ='mysql1', database = 'shopDB')
mydb_cart = mysql.connector.connect(user = 'shopper', password = 'hGm75Uv32dS', host ='mysql1', database = 'shopDB')

app = Flask(__name__, static_folder="/var/fullstack/frontend", static_url_path="")

@app.route('/', defaults={'path': 'index.html'}) 
@app.route('/<path>')
def serve_page(path):
    return flask.send_from_directory('/var/fullstack/frontend', path)

@app.route('/api/plants', methods=['GET'])
def get_users():
    print("Requested users")
    mycursor = mydb.cursor(buffered=True)
    mycursor.execute("SELECT * FROM plants")
    mycursor.close()
    myresult = mycursor.fetchall()
    return flask.jsonify(myresult)


@app.route('/api/plants/<int:plant_id>', methods=['GET']) 
def oneItem(plant_id):
    print("Requested plant with id: "+ str(plant_id))
    mycursor = mydb.cursor(buffered=True)
    mycursor.execute("SELECT * FROM plants WHERE id={}".format(plant_id))
    mycursor.close() 
    myresult = mycursor.fetchall()
    return flask.jsonify(myresult)
     

@app.route('/api/plants/cart', methods=['GET', 'POST']) #antall varer
def getCart():
    if request.method == "POST":
        data = request.get_json()
        image = data['image']
        name = data['name']
        price = data['price']

        mycursor = mydb_cart.cursor()
        sql = "INSERT INTO cart (image, name, price) VALUES (%s, %s, %s)"
        val = (image, name, price)
        mycursor.execute(sql, val)
        mydb_cart.commit()
        myresult = mycursor.fetchall()
        return flask.jsonify(myresult)

    if request.method == "GET":
        mycursor = mydb_cart.cursor(buffered=True)
        mycursor.execute("SELECT * FROM cart")
        myresult = mycursor.fetchall()
        mycursor.close()
        return flask.jsonify(myresult)

@app.route('/api/plants/cart/<int:cart_id>', methods=['DELETE', 'GET'])
def deleteFromCart(cart_id):
    mycursor = mydb_cart.cursor(buffered=True)
    mycursor.execute("DELETE FROM cart WHERE id = {}".format(cart_id))
    mycursor.close()
    return flask.jsonify(cart_id) 

@app.route('/api/plants/basket/delAll', methods=['DELETE'])
def deleteAllFromBasket():
    mycursor = mydb_cart.cursor(buffered=True)
    mycursor.execute("DELETE FROM cart")
    mycursor.close()
    return flask.jsonify("Everything is deleted!")

@app.route('/api/login', methods=['POST'])
def logIn():
    data = request.get_json()
    username = data['username']
    password = data['password']

    if username == "admin123" and password == "yHo67bNsE43":
        return flask.jsonify("correct")
    else:
        return flask.jsonify("failed")


@app.route('/api/admin', methods=['POST'])
def addToShop():
    data = request.get_json()
    image = data['image']
    name = data['name']
    shortDes = data['shortDescription']
    longDes = data['longDescription']
    price = data['price']

    if image == "":
        image = "https://static.thenounproject.com/png/526867-200.png"

    mycursor = mydb.cursor()
    sql = "INSERT INTO plants (image, name, shortDescription, longDescription, price) VALUES (%s, %s, %s, %s, %s)"
    val = (image, name, shortDes, longDes, price)
    mycursor.execute(sql, val)
    mydb.commit()
    myresult = mycursor.fetchall()
    return flask.jsonify(myresult)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
    mydb.close()