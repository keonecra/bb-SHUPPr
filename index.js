import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"
// console.log(add(1,1))

const appData = {
    databaseURL: "https://pika-cart-default-rtdb.firebaseio.com/"
}
const app = initializeApp(appData)
const database = getDatabase(app)
const foodInDB = ref(database, "groceries")


const addToCart = document.getElementById("add-button")
const input = document.getElementById("input-field")
const shoppingList = document.getElementById("shopping-list")

addToCart.addEventListener("click", function() {
    let inputValue = input.value
    push(foodInDB, inputValue)
    //input.value = ""
    clearInput()
    //shoppingList.innerHTML += `<li>${inputValue}</li>`
    //addToList(inputValue)//-----------get rid of this after the onValue us added so it will stop creating duplicates of every new entry
    
})

onValue(foodInDB, function(snapshot) {
    if (snapshot.exists()) {
    let storedFood = Object.entries(snapshot.val()) //to make sure it does not repeat, you'll have to write code to clear the items between the let and for loop without the +:
    clearShoppingList()//shoppingList.innerHTML = ""
    for (let i = 0; i < storedFood.length; i ++) {
        let currentItem = storedFood[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        // Challenge: Use the addToList(itemValue) function inside of the for loop to append item to the shopping list element for each iteration.
        addToList(currentItem)//storedFood[i])//use [i] so it doesnt repeat iteself forever
        
       }   //console.log(storedFood[i])
    } else {
        shoppingList.innerHTML = "Nothing here yet!"
    
}
    //console.log(snapshot.val())
})

function clearShoppingList() {
    shoppingList.innerHTML = ""
}

function clearInput() {
    input.value = ""
}

function addToList(item)
{
        let itemID = item[0]
        let itemValue = item[1]
        //shoppingList.innerHTML += `<li>${itemValue}</li>` < WE ARE HOW GOING TO TURN THAT INTO A CREATE ELEMENT 
        let newEl = document.createElement("li")
        newEl.textContent = itemValue
        
        newEl.addEventListener("click", function() {
            let exactLocationEl = ref(database, `groceries/${itemID}`)
            remove(exactLocationEl)
        })
        shoppingList.append(newEl)
}
