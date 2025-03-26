const API_Key = "AIzaSyAQI7Lz2Zf6KSDdYiG9_ddJyhv-_HnC9t8";
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(API_Key);

async function run(prompt) {
  if (prompt === "") {
    alert("Please Enter Some Prompt To Search!");
    document.querySelector(".cards").style.display = "flex";
    resultContainer.innerHTML = "";
    return;
  }

  document.querySelector(".cards").style.display = "none";

  loader.style.display = "flex";
  dataContainer.style.boxShadow = "rgba(0, 0, 0, 0.24) 0px 3px 8px";
  const model = genAI.getGenerativeModel({ model: "models/gemini-2.0-flash-lite" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  let formattedText = text
    .replace(/\n{2,}/g, "</p><p>") // Convert double line breaks to paragraph tags
    .replace(/\n/g, "<br>") // Convert single line breaks to <br>
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Convert **bold** to <b>
    .replace(/\*(.*?)\*/g, "<i>$1</i>") // Convert *italic* to <i>
    .replace(/```([^`]+)```/g, "<pre>$1</pre>") // Convert ```code``` to <pre>
    .replace(/- (.+)/g, "<li>$1</li>"); // Convert "- item" to list items

  // If list items are found, wrap them in <ul>
  if (formattedText.includes("<li>")) {
    formattedText = "<ul>" + formattedText + "</ul>";
  }

  // Wrap everything inside <p> tags
  formattedText = "<p>" + formattedText + "</p>";
  document.querySelector("#wikipedia").classList.remove("active");
  document.querySelector("#google").classList.remove("active");
  document.querySelector("#gemini").classList.add("active");
  document.querySelector("#images").classList.remove("active");
  console.log(text);

  displayGeminiData(formattedText);
}

function displayGeminiData(formattedText) {
  dataContainer.innerHTML = "";
  let heading = document.createElement("h3");
  heading.classList.add("heading");
  heading.innerText = `Gemini search result for : ${textInput.value}`;
  dataContainer.append(heading);
  const dataDiv = document.createElement("div");
  dataDiv.classList.add("geminiDataDiv");
  const para = document.createElement("para");
  para.innerHTML = `<ul>${formattedText}</ul>`;
  dataDiv.append(para);
  dataContainer.append(dataDiv);
  loader.style.display = "none";
}

geminiBtn.addEventListener("click", () => {
  run(textInput.value);
});
