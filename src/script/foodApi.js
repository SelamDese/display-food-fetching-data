// adding barcodes to your food products, ( Open Food Facts api )
// query more information about each product  
const foodHtmlTemplate= (foodobject)=> {
    let foodHTML= `<section class="foodSection">
                 <h1>name: ${foodobject.name}</h1>
                 <p>type: ${foodobject.type}</p>
                 <p>ethnicity: ${foodobject.ethnicity}</p>
                 <p>ingredients: ${foodobject.ingredients}</p>
                 <p>Country: ${foodobject.Country}</p>
                 <p>Calories: ${foodobject.Calories}</p>
                 <p>Fat: ${foodobject.Fat}</p>
                 <p>Sugar: ${foodobject.Sugar}</p>
             </section>`
            return foodHTML
            }
// display it in the DOM.  
const insertFoodToDom= (foodHTML) => {
    let foodList=document.querySelector(".foodList")
    foodList.innerHTML += foodHTML
    }
// fetch call using functions
fetch("http://localhost:8088/food")
    .then(food => food.json())
    .then(parsedFoods => {
        parsedFoods.forEach(food=>{
            fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
                .then(foodInfo =>foodInfo.json())
                .then(parsedfoodInfo=>{
                    food.ingredients=parsedfoodInfo.product.ingredients_text_en
                    food.Country=parsedfoodInfo.product.countries
                    food.Calories=parsedfoodInfo.product.nutriments.energy_serving
                    food.Fat=parsedfoodInfo.product.nutriments.fat_serving
                    food.Sugar=parsedfoodInfo.product.nutriments.sugars_serving
            let foodInfoReturned=foodHtmlTemplate(food)
            insertFoodToDom(foodInfoReturned)
        })
        
    })
})  