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
const localstorageData = localStorage.getItem("User Login Data") !== null ? JSON.parse(localStorage.getItem("User Login Data")) : [];
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let data = {
        userName: SignUpformElements[0].value,
        name: SignUpformElements[1].value,
        email: SignUpformElements[2].value,
        password: SignUpformElements[3].value,
    };
    checkDataSameOrNot(localstorageData, data);
})

function clearForm(SignUpformElements){
    SignUpformElements.forEach((element) => {
        element.value = "";
    });
}

function checkDataSameOrNot(localStorageData, data){
    if(localStorageData.length > 0){
        localStorageData.forEach((obj) => {
            if((localStorageData.length > 0) && obj.email == data.email){
                alert("email is already exists!");
                return;
            }else if(localStorageData.length > 0 && obj.userName == data.userName){
                alert("username is already exists!");
            }else{
                localstorageData.push(data);
                localStorage.setItem("User Login Data", JSON.stringify(localstorageData));
                clearForm(SignUpformElements);
                navigate();
            }
        })
    }
    else{ 
        localstorageData.push(data);
        localStorage.setItem("User Login Data", JSON.stringify(localstorageData));
        clearForm(SignUpformElements);
        navigate();
    }
}


const singUpBtn = document.querySelector("#sign-up-btn");
singUpBtn.addEventListener("click", () => {

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