import QueryObject from "./QueryObject.js";

//vars
let input = document.querySelector("#inputSearchDrug");
input.addEventListener("selectionchange", (evt) => 
{
    document.querySelector("#topPanelBoxLabel").innerHTML= (evt.target.value)
})
let choices = document.getElementsByClassName("choices");
for(let i=0; i<choices.length; ++i)
{
}
let props =
{
    name: choices["drugNames"].value,
    doseStrength: choices["doseStrengths"].value,
    pkSize: choices["pkSizes"].value,
    daySupply: choices["daySupply"].value,
    drugType: choices["drugType"].value
}
console.log(props);
function assignSelectionValue(evt) 
{
    selectedChoice = evt.target.id;
    console.log(selectedChoice);
    targetId = document.querySelector(evt.target.id)
    props.name = targetId; 
}

let choice = choices["drugNames"];

//json functions--------------------------------------------------
//main
async function jsonDataUri()
{
    const requrl = "./resources/drugs.json";
    const request = new Request(requrl);
    const response = await fetch(request);
    const drugsJson = await response.json();
    choices["drugNames"].addEventListener("change", (evt) => 
    {
        document.querySelector("#topPanelBoxLabel").innerHTML= (evt.target.value)
        printHtmlJsonData(drugsJson, choices["drugNames"].value);
    })
    mapJsonNameChoices(drugsJson);
    mapJsonChoices(drugsJson, choices["drugNames"].value);
    createQueryObj();
    //printHtmlJsonData(drugsJson, choices["drugNames".value]);
}
//functions--------------------------------------------------
function mapJsonNameChoices(json)
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
function createQueryObj()
{

}
function printHtmlJsonData(json, queryName)
{
    let index = queryName;
    let rPanel= document.querySelector(".rightPanelBox");
    let h1 = document.createElement("h1");
    let drugs = json.drugs;
    console.log(drugs.filter((x) => {if(x.name==queryName) return x}).pop().name);
    //h1.textContent = "Name: " + drugs[index].name + " Strength: " + drugs[index].doseStrength + " Pack Size: " + drugs[index].pkSize + drugs[index].form;
    h1.textContent = "Name: " + drugs.filter((x) => {if(x.name==queryName) return x}).pop().name + " " +
                    "Strength: " + drugs.filter((x) => {if(x.name==queryName) return x}).pop().doseStrength + " " +
                    "Pk Size: " + drugs.filter((x) => {if(x.name==queryName) return x}).pop().pkSize + " " 
                    ;
    rPanel.appendChild(h1);
}

//let query = new QueryObject(props)
jsonDataUri();