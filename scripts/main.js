import QueryObject from "./QueryObject.js";

//debug vars

//json functions--------------------------------------------------
//main--------------------------------------------------
document.addEventListener("DOMContentLoaded", () =>{jsonDataUri()});
async function jsonDataUri()
{
    //vars
    const requrl = "./resources/drugs.json";
    const request = new Request(requrl);
    const response = await fetch(request);
    const drugsJson = await response.json();
    let choices = document.getElementsByClassName("choices");

    document.querySelector("#inputSearchDrug").addEventListener("selectionchange", (evt) => 
    {
        document.querySelector("#topPanelBoxLabel").innerHTML= (evt.target.value)
    })
    choices["drugNames"].addEventListener("change", (evt) => 
    {
        document.querySelector("#topPanelBoxLabel").innerHTML= (evt.target.value);
        printHtmlJsonData(drugsJson, choices["drugNames"].value);
    })
    mapJsonNameChoices(drugsJson, choices);
    createQueryObj(drugsJson, choices);
    //printHtmlJsonData(drugsJson, choices["drugNames".value]);
}
//functions--------------------------------------------------
function mapJsonNameChoices(json, choices)
{
   //console.log(json.drugs[name]);
    for(let i=0; i<json.drugs.length; ++i)
    {
        let choice = document.createElement("option");
        choice.value = json.drugs[i].name;
        choice.textContent = json.drugs[i].name;
        choices["drugNames"].appendChild(choice);
    }
}
function mapJsonChoices(json, choices)
{
    let name = choices["drugNames"].value;
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
function createQueryObj(json, choices)
{
    mapJsonChoices(json, choices);
    let props =
    {
        name: choices["drugNames"].value,
        doseStrength: choices["doseStrengths"].value,
        pkSize: choices["pkSizes"].value,
        daySupply: choices["daySupply"].value,
        drugType: choices["drugType"].value,
    }
    for(let i=0; i<choices.length; ++i)
    {
    }
    let query = new  QueryObject({props});
    console.log(query.name);
}
function printHtmlJsonData(json, query)
{
    let rPanel= document.querySelector(".rightPanelBox");
    let drugs = json.drugs;
    rPanel.innerHTML = "Name: " + drugs.filter((x) => {if(x.name==query) return x}).pop().name + "</br> " +
                    "Strength: " + drugs.filter((x) => {if(x.name==query) return x}).pop().doseStrength
                                        .filter((x) => {if(x.doseStrength==query.doseStrength) return x}).pop() + "</br> " +
                    "Pk Size: " + drugs.filter((x) => {if(x.name==query) return x}).pop().pkSize
                                        .filter((x) => {if(x.pkSize==query.pkSize) return x}).pop() + "</br> " 
                    ;
}

//let query = new QueryObject(props)