const trash = document.querySelector(".trash");

const menu = document.querySelector(".menu");
let hidePara = document.querySelectorAll("#left p");
if(localStorage.getItem("history") == null){
    menu.addEventListener("click", () => {
        let hideStatus = hidePara[0].classList.contains("hidden"); 
            hidePara.forEach((para) => {
                if(hideStatus){
                    para.classList.remove("hidden");
                    trash.classList.remove("hidden");
                }else{
                    para.classList.add("hidden");
                    trash.classList.add("hidden");
                }
            })
        });
}


//Add History to recent 
const send = document.querySelector("#send");
const input = document.querySelector("input");
let history = localStorage.getItem("history") !== null ? JSON.parse(localStorage.getItem("history")) : [];
const imageBtn = document.querySelector("#images");

send.addEventListener("click", () => {
    const prompt = input.value.trim();
    history.push(prompt);
    localStorage.setItem("history", JSON.stringify(history));
});

imageBtn.addEventListener("click", () => {
    const prompt = input.value.trim();
    history.push(prompt);
    localStorage.setItem("history", JSON.stringify(history));
})

if(localStorage.length > 1){
    window.addEventListener("load" , () => {
        displayRecentHistory(JSON.parse(localStorage.getItem("history")));
    })
}

const recentContainer = document.querySelector(".recent-container");
function displayRecentHistory(arr){
    const fragment = document.createDocumentFragment();
    arr.forEach((history) => {
        recentContainer.innerHTML = "";
        const recentPrompt = document.createElement("div");
        const promptIcon = document.createElement("span");
        const icon = document.createElement("I");
        const para = document.createElement("p");

        recentPrompt.classList.add("recent-prompt");
        promptIcon.classList.add("prompt-icon");
        icon.classList.add("fa-regular","fa-message", "fa-flip-horizontal");
        para.classList.add("prompt-para");
        para.innerText = history;

        // After Clicking recent history value show on input
        recentPrompt.addEventListener("click", () => {
            input.value = recentPrompt.lastChild.innerText;
        });

        promptIcon.append(icon);
        recentPrompt.append(promptIcon, para);
        fragment.append(recentPrompt);
    });
    recentContainer.append(fragment);

    hidePara = document.querySelectorAll("#left p");
    menu.addEventListener("click", () => {
    let hideStatus = hidePara[0].classList.contains("hidden"); 
        hidePara.forEach((para) => {
            if(hideStatus){
                para.classList.remove("hidden");
                trash.classList.remove("hidden");
            }else{
                para.classList.add("hidden");
                trash.classList.add("hidden");
            }
        })
    });
} 

// Delete Recent 
trash.addEventListener("click", () => {
    localStorage.removeItem("history");
    history = [];
    recentContainer.innerHTML = "";
})

const newChat = document.querySelector(".chat");

newChat.addEventListener("click", () => {
    location.reload();
})