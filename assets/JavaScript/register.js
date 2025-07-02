//getting button and form elements from html
const myButton = document.getElementById("myButton");
const myForm = document.getElementById("myForm");
const myInputConfirmPasswordContainer = document.getElementById("confirmPasswordContainer");
//array of form elements without the button
const myInput = myForm.elements;
const errorMessage = document.createElement("span");
//remove error message and error styles if any
myForm.elements["password"].addEventListener("click", ()=>{
    if (errorMessage){
        errorMessage.remove();
        myForm.elements["password"].style.borderColor = "";
        myForm.elements["passwordConfirmation"].style.borderColor = "";
    }
})
//Capture the information on the input field
myForm.addEventListener("submit", (event)=>{
    //Prevent the page to reload when clicking on the submit button
    event.preventDefault();
    //Capture input from password and confirm password fields
    const password = myForm.elements["password"].value;
    const passwordConfirm = myForm.elements["passwordConfirmation"].value;
    //Validate password and confirm password are the same
    if (password !== passwordConfirm){
        //styling error message and input fields
        errorMessage.style.color = "red";
        errorMessage.style.fontSize = "x-small";
        errorMessage.style.display = "flex";
        myForm.elements["password"].style.borderColor = "red";
        myForm.elements["passwordConfirmation"].style.borderColor = "red";
        errorMessage.innerHTML = "Paswords do not match";
        //add span with alert message below confirmpassowrd field
        myInputConfirmPasswordContainer.appendChild(errorMessage);
        return;
    }
    //loop over the array of inputs
    const user = {};
    for (const element of myInput) {
        //validate whether the input element has the name property, so we can rule out the button
        if(element.name){
            //exclude the password confirmation value
            if(element.name == "passwordConfirmation"){
                break;
            } else {
                //add the pairs to the object user
                user[element.name] = element.value;
                console.log(user);
            }           
        }
    }
    //saving user object in localstorage
    //using JSON stringigy method to serialize the object
    localStorage.setItem(user["userName"], JSON.stringify(user));
    //styling account creation confirmation
    errorMessage.style.color = "green";
    errorMessage.style.fontSize = "x-small";
    errorMessage.style.display = "flex";
    errorMessage.innerHTML = "Account created";
    //add span with confirmation message below confirmpassowrd field
    myInputConfirmPasswordContainer.appendChild(errorMessage);
    //remove text from input fields after submitting information
    for (const element of myForm.elements) {
        if(element.name){
            element.value = "";      
        }
    }
})


