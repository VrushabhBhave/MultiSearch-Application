async function fetchDataOfWikipedia(query){
    if(textInput.value === ""){
        alert("Please Enter Some Prompt To Search!");
        dataContainer.innerHTML = "";
        dataContainer.style.boxShadow = "none";
        return;
    }

    loader.style.display = "flex";
    cards.style.display = "none";
    document.querySelector("#google").classList.remove("active");
    document.querySelector("#wikipedia").classList.add("active");
    document.querySelector("#gemini").classList.remove("active");
    document.querySelector("#images").classList.remove("active");

    dataContainer.style.boxShadow = "rgba(0, 0, 0, 0.24) 0px 3px 8px";

    const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*`);
    const result = await response.json();
    console.log(result);
    displayDataOfWikipedia(result.query.search);
}

function displayDataOfWikipedia(data){
    dataContainer.innerHTML = "";
    let heading = document.createElement("h3");
    heading.classList.add("heading");
    if(data.length === 0){
        heading.innerText = "🔍 No results found for your search. Please try different keywords.";
        dataContainer.append(heading);
    }else{
        heading.innerText = `Google search result for : ${textInput.value}`;
        dataContainer.append(heading);
        const fregment = document.createDocumentFragment();
        data.forEach((obj) => {
            const container = document.createElement("div");
            const titleDiv = document.createElement("div");
            const anchor = document.createElement("a");
            const date = document.createElement("p");

            const discriptionDiv = document.createElement("div");
            const discription = document.createElement("p");

            anchor.href = `https://en.wikipedia.org/wiki/${obj.title}`;
            anchor.innerText = obj.title;
            anchor.setAttribute("target", "_blank");
            date.innerText = obj.timestamp.slice(0, 10);
            discription.innerHTML = obj.snippet;

            container.classList.add("container");
            anchor.classList.add("anchor");
            date.classList.add("date");
            discription.classList.add("discription");

            let divide = document.createElement("hr");

            titleDiv.append(anchor, date);
            discriptionDiv.append(discription);
            container.append(titleDiv, discriptionDiv, divide);
            fregment.append(container);
        });
        loader.style.display = "none";
        dataContainer.append(fregment);
    }
}

wikiBtn.addEventListener("click", () => {
    fetchDataOfWikipedia(textInput.value);
})