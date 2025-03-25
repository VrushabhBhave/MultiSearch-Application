const API_Key = "56hJnyxfW2AzQPJ3jpj1CFqJ4dhxjW7XZ7pBj9JjYn0";

async function fetchImages(search){
    if(textInput.value === ""){
        alert("Please Enter Some Prompt To Search!");
        dataContainer.innerHTML = "";
        dataContainer.style.boxShadow = "none";
        return;
    }

    loader.style.display = "flex";
    cards.style.display = "none";
    document.querySelector("#google").classList.remove("active");
    document.querySelector("#wikipedia").classList.remove("active");
    document.querySelector("#gemini").classList.remove("active");
    document.querySelector("#images").classList.add("active");

    const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${search}&client_id=${API_Key}&per_page=9`);
    const result = await response.json();
    console.log(result.results);
    setTimeout(() => {
        displayFetchImages(result.results)
    }, 500)
}

function displayFetchImages(data){
    dataContainer.innerHTML = "";
    let heading = document.createElement("h3");
  heading.classList.add("heading");
  if (data.length === 0) {
    heading.innerText =
      "🔍 No results found for your search. Please try different keywords.";
    dataContainer.append(heading);
    loader.style.display = "none";
  }else{
    const fregment = document.createDocumentFragment();
    const imgesContainer = document.createElement("div");
    imgesContainer.classList.add("imgesContainer");
    data.forEach((obj) => {
        const imageContainer = document.createElement("div");
        const imageDiv = document.createElement("div");
        const image = document.createElement("img");

        const darkDiv = document.createElement("div");
        const anchor = document.createElement("a");
        const downloadIcon = document.createElement("i");
        downloadIcon.classList.add("fa-solid","fa-download");

        anchor.href = obj.links.html;
        anchor.setAttribute("target", "_blank");
        anchor.append(downloadIcon);
        
        imageContainer.classList.add("imageContainer");
        image.classList.add("image");
        darkDiv.classList.add("darkDiv");

        image.src = obj.urls.regular;

        imageDiv.append(image);
        darkDiv.append(anchor);
        imageContainer.append(imageDiv, darkDiv);
        fregment.append(imageContainer);
    });
    imgesContainer.append(fregment);
    dataContainer.append(imgesContainer);
    loader.style.display = "none";
  }
}

imageBtn.addEventListener("click", () => {
    fetchImages(textInput.value);
})