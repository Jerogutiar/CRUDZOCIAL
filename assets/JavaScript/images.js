//get access to elements on the html
const addImageField = document.getElementById("add");
const form = document.getElementById("form");
const input = document.getElementById("input");
const newCardContainer = document.createElement("div");
const newCard = document.createElement("div");
const image = document.createElement("img");
const cards = document.getElementById("cards");
let inputValue;
//show/hide text field that receives url images
addImageField.addEventListener("click", ()=>{
    //validates if there is a class named hidden (wich indicates styles to hide the text field and button)
    if(form.classList.contains("hidden")){
        form.classList.remove("hidden");
        form.classList.add("visible");
    } else {
        form.classList.remove("visible")
        form.classList.add("hidden");
    }
})
//store input content
form.addEventListener("submit", (event)=>{
    //prevent the webpage to reload when clicking the button
    event.preventDefault();
    //captures input value
    inputValue = input.value;
    //creates a new image div container
    if(!inputValue == ""){
        newCardContainer.classList.add("col");
        cards.append(newCardContainer);
        newCard.classList.add("card", "w-100", "p-5");
        newCardContainer.append(newCard);
        image.src = inputValue;
        newCard.append(image);
    }

})


