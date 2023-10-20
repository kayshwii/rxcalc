import QueryObject from "./QueryObject.js";

async function jsonDataUri()
{
    const requrl = "./resources/drugs.json";
    const request = new Request(requrl);
    const response = await fetch(request);
    const drugJson = await response.json();

    printHtmlJsonData(drugJson, 0);
}

function printHtmlJsonData(json, index)
{
    let rPanel= document.querySelector(".rightPanelBox");
    let h1 = document.createElement("h1");
    const drugs = json.drugs;
    h1.textContent += "Name: " + drugs[index].name + " " + drugs[index].doseStrength + " Pack Size: " + drugs[index].pkSize;
    console.log(drugs[0].name);
    
    rPanel.appendChild(h1);
}
jsonDataUri();

