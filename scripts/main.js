import QueryObject from "./QueryObject.js";

//document.querySelector(select)
let choices = document.getElementsByClassName("choices");
let props =
{
    name: choices["drugNames"].value,
    doseStrength: choices["doseStrengths"].value,
    pkSize: choices["pkSizes"].value,
    daySupply: choices["daySupply"].value,
}

async function jsonDataUri()
{
    const requrl = "./resources/drugs.json";
    const request = new Request(requrl);
    const response = await fetch(request);
    const drugsJson = await response.json();
    mapJsonNameChoices(drugsJson);
    mapJsonChoices(drugsJson, choices["drugNames"].value);
    printHtmlJsonData(drugsJson, 0);
}
function printHtmlJsonData(json, query)
{
    let index = 0;
    let rPanel= document.querySelector(".rightPanelBox");
    let h1 = document.createElement("h1");
    let drugs = json.drugs;
    h1.textContent += "Name: " + drugs[index].name + " Strength: " + drugs[index].doseStrength + " Pack Size: " + drugs[index].pkSize + drugs[index].form;
    rPanel.appendChild(h1);
}

function mapJsonNameChoices(json)
{
   //console.log(json.drugs[name]);
    for(let i=0; i<json.drugs.length; ++i)
    {
        let choice = document.createElement("option");
        choice.textContent = json.drugs[i].name;
        choices["drugNames"].appendChild(choice);
    }
}
function mapJsonChoices(json, name)
{
    for(let i=1; i<choices.length; ++i)
    {
        for(let j=0; j<json.length; ++j)
        {
            let prop = (choices[i].attributes.jsonname.value);
            let choice = document.createElement("option");
            choice.textContent = json.drugs[name];
            choices[i].appendChild(choice);
        }
    }
}
console.log(props);
//let query = new QueryObject(props)
jsonDataUri();