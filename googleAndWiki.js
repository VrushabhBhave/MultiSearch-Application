let dataContainer = document.querySelector(".data-container");
let sendBtn = document.querySelector("#send");
let textInput = document.querySelector(".search-container input");
let googleBtn = document.querySelector("#google");
let loader = document.querySelector(".loader");
let cards = document.querySelector(".cards");
let API_KEY = "AIzaSyBr7VrahcC0LMU8n5HQRNs4dgpF0nejrxk";
let CX_ID = "f1ab3c4e0f0534813";

async function fetchDataOfGoogle(query){
    if(query == ""){
        alert("Please Enter Some Prompt To Search!");
        dataContainer.innerHTML = "";
        dataContainer.style.boxShadow = "none";
        return;
    }

    loader.style.display = "flex";
    document.querySelector("#google").classList.add("active");
    document.querySelector("#wikipedia").classList.remove("active");
    document.querySelector("#gemini").classList.remove("active");
    document.querySelector("#images").classList.remove("active");

    const response = await fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CX_ID}&q=${query}`);
    const result = await response.json();

    loader.style.display = "none";

    dataContainer.style.boxShadow = "rgba(0, 0, 0, 0.24) 0px 3px 8px";

    console.log(result.items);
    dataContainer.innerHTML = ""
    displayData(result.items)
}


function displayData(result){
    let heading = document.createElement("h3");
    heading.classList.add("heading");
    heading.innerText = `Google search result for : ${textInput.value}`;
    dataContainer.append(heading);
    let fregment = document.createDocumentFragment();
    result.forEach((data) => {
        let resultDiv = document.createElement("div");
        resultDiv.classList.add("resultDiv");

        let header = document.createElement("div");
        header.classList.add("header");

        let imgIconDiv = document.createElement("div");
        imgIconDiv.classList.add("imgIcon-div");

        let icon = document.createElement("img");
        const thumbnailImg = data.pagemap?.cse_thumbnail != undefined ? data.pagemap?.cse_thumbnail[0].src : '/assets/logo.png';
        icon.src = thumbnailImg;

        let titleDiv = document.createElement("div");
        titleDiv.classList.add("title-div");

        let title = document.createElement("h4");
        let showTitle = data.displayLink.split(".");

        if(showTitle.length > 2){
            title.innerText = showTitle[1];
        }else{
            title.innerText = showTitle[0];
        }

        let websiteLink  =document.createElement("a");
        websiteLink.href = data.link;
        websiteLink.setAttribute("target","_blank");
        websiteLink.innerText = data.link

        let discriptionDiv = document.createElement("div");
        discriptionDiv.classList.add("discriptionDiv");

        let anchorHeading = document.createElement("a");
        anchorHeading.href = data.link;
        anchorHeading.setAttribute("target","_blank");

        let heading = document.createElement("h2");
        heading.innerHTML = data.htmlTitle;
        let descriptionPara = document.createElement("p");
        descriptionPara.innerHTML = data.htmlSnippet;

        let divide = document.createElement("hr");

        anchorHeading.append(heading);

        imgIconDiv.append(icon);
        titleDiv.append(title, websiteLink);

        header.append(imgIconDiv, titleDiv);
        discriptionDiv.append(anchorHeading, descriptionPara);

        resultDiv.append(header, discriptionDiv);

        fregment.append(resultDiv, divide);
    });
    dataContainer.append(fregment);
}

sendBtn.addEventListener("click", () => {
    fetchDataOfGoogle(textInput.value);
    cards.style.display = "none";
})

googleBtn.addEventListener("click", () => {
    document.querySelector("#google").classList.add("active");
    document.querySelector("#wikipedia").classList.remove("active");
    document.querySelector("#gemini").classList.remove("active");
    document.querySelector("#images").classList.remove("active");
    dataContainer.innerHTML = "";
    fetchDataOfGoogle(textInput.value);
})


//Mic Icon
let micIcon = document.querySelector("#mic");
let isRecognizing = false;

const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.lang = 'en-US';

micIcon.addEventListener("click",()=>{
    if (!isRecognizing) {
        if(textInput.contains.value){
            textInput.value = "";
        }
        recognition.start();
        micIcon.textContent = 'Stop Voice Recognition';
        micIcon.style.backgroundColor = "#f7d2c7"
        isRecognizing = true;
    } else {
      recognition.stop(); 
      micIcon.textContent = 'Start Voice Recognition';
      micIcon.style.backgroundColor = ""
      isRecognizing = false;
    }
})
recognition.onresult = (event) => {
    const result = event.results[event.results.length - 1][0].transcript;
    textInput.value += result;
};

recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
};