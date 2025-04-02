const signInNavigation = document.querySelector(".navigation-left a");
const signUpNavigation = document.querySelector(".navigation-right a");
const navigationLeftDiv = document.querySelector(".navigation-left");
const navigationRightDiv = document.querySelector(".navigation-right");
const signInForm = document.querySelector("#sign-in-form");
const signUpForm = document.querySelector("#sign-up-form");

navigationLeftDiv.addEventListener("click", (e) => {
    e.preventDefault();
    navigate();
})

navigationRightDiv.addEventListener("click", (e) => {
    e.preventDefault();
    navigationRightDiv.classList.add("blue-bottom-border");
    navigationRightDiv.classList.remove("gray-bottom-border")
    navigationLeftDiv.classList.add("gray-bottom-border");
    navigationLeftDiv.classList.remove("blue-bottom-border");
    signInForm.classList.add("hidden");
    signUpForm.classList.remove("hidden");
})


//store sign up data in localstorage
const SignUpformElements = Array.from(document.forms[1].elements);
console.log(SignUpformElements);
const form = document.querySelector("#sign-up-form form");
const dataArray = [];
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let data = {
        name: SignUpformElements[0].value,
        email: SignUpformElements[1].value,
        password: SignUpformElements[2].value,
    };
    dataArray.push(data);
    clearForm(SignUpformElements);
    console.log(dataArray);
})

function clearForm(SignUpformElements){
    SignUpformElements.forEach((element) => {
        element.value = "";
    });
}


const singUpBtn = document.querySelector("#sign-up-btn");
singUpBtn.addEventListener("click", () => {
    navigate();
})

//nevigate form after clicking signUpBtn or nevigationLeftDiv
function navigate(){
    navigationLeftDiv.classList.add("blue-bottom-border");
    navigationLeftDiv.classList.remove("gray-bottom-border");
    navigationRightDiv.classList.remove("blue-bottom-border");
    navigationRightDiv.classList.add("gray-bottom-border");
    signInForm.classList.remove("hidden");
    signUpForm.classList.add("hidden");
}