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
    let query = new QueryObject(); 
//eventlisteners--------------------------------------------------
    choices["drugNames"].addEventListener("change", (evt) => 
    {
        //document.querySelector("#topPanelBoxLabel").innerHTML= document.querySelector("#topPanelBoxLabel").options[document.querySelector("#topPanelBoxLabel").selectedIndex].text;
        document.querySelector("#topPanelBoxLabel").innerHTML= (evt.target.value);
        mapJsonDoseStrengthChoices(getQueryName(drugsJson, query));
        printHTMLJsonData(drugsJson, choices["drugNames"].value);
        choices["doseStrengths"].addEventListener("select", selectEvtDoseStrength, "once");
    });
    document.querySelector("#inputSearchDrug").addEventListener("selectionchange", (evt) => 
    {
        //document.querySelector("#topPanelBoxLabel").innerHTML= (evt.target.value)
        let regex;
        let regexFilter = new RegExp("(\^[a-zA-Z]{1,9})");

        try
        {
            if(regexFilter.exec(evt.target.value) !== null)
                {regex = new RegExp("\^" + evt.target.value);
                console.log(regex);}
        }
        catch(err)
        {
        }
        let regQuery = (drugsJson.drugs.filter((x) => {if(regex.exec(x.name) !== null) return x;}));
        document.querySelector("#drugNameDataList").innerHTML = '';
        for(let i=0; evt.target.value.length>0 && i<regQuery.length && i<6; ++i)
        {
            let choice = document.createElement("option");
            choice.value = regQuery[i].name;
            document.querySelector("#drugNameDataList").appendChild(choice);
        };
        //if(regex.match(evt.target.value))
        //{
        //}
    });
    choices["doseStrengths"].addEventListener("change", (evt) => 
    {
        document.querySelector("#topPanelBoxLabel").innerHTML= (choices["drugNames"].value + " " + evt.target.value);
        //mapJsonPkSizeChoices(json, query);
        printHTMLJsonData(drugsJson, choices["drugNames"].value, choices["doseStrengths"].value);
    });

    mapJsonNameChoices(drugsJson, choices);
    //createQueryObj(choices);
//functions--------------------------------------------------
function mapJsonNameChoices(json, choices)
{
    for(let i=0; i<json.drugs.length; ++i)
    {
        let choice = document.createElement("option");
        choice.value = json.drugs[i].name;
        choice.textContent = json.drugs[i].name;
        choices["drugNames"].appendChild(choice);
    }
}
function mapJsonDoseStrengthChoices(query)
{
    if(choices["drugNames"].value == query["name"])
    {
        choices['doseStrengths'].innerHTML = "";
        for(let i=-1; i<query["doseStrength"].length; ++i)
        {
            let choice = document.createElement("option");
            choice.value = query["doseStrength"][i];
            choice.textContent = query["doseStrength"][i];
            choices['doseStrengths'].appendChild(choice);
        }
    //    if(choices["drugNames"].value)
    //    {
    //        choices['pkSizes'].innerHTML = "";
    //        for(let i=0;i<choices.length; ++i)
    //        {
    //            let choice = document.createElement('option');
    //            choice.value = json.drugs[i].pkSize;
    //            choice.textContent = json.drugs["pkSize"];
    //            choices['pkSizes'].appendChild(choice);
    //        }
    //    }
    //    if(choices["pkSizes"].value)
    //    {
    //        for(let i=0;i<choices.length; ++i)
    //        {
    //            let choice = document.createElement('option');
    //            choice.textContent = json.drugs["form"];
    //            choices[i].appendChild(choice); 
    //        }
    //    }
    }
}
function selectEvtDoseStrength()
{

}
//getters--------------------------------------------------
function getQueryName(json, queryName)
{
    for(let i=0; i<choices["drugNames"].length; ++i)
    {
        if(choices["drugNames"].value == json["drugs"][i].name)
        {
            queryName = json["drugs"][i]; 
        }
    }
    return queryName;
}
function getQueryDoseStrength(json, queryDoseStrength)
{
    for(let i=0; i<choices["doseStrengths"].length; ++i)
    {
        if(choices["doseStrengths"].value == json["drugs"][i].doseStrength)
        {
            queryDoseStrength = json["doseStrengths"][i]; 
        }
    }
    return queryDoseStrength;
}
function createQueryObj(choices)
{
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
}
//print--------------------------------------------------
function printHTMLJsonData(json, queryName, queryDoseStrength, queryPkSize)
{
    let rPanel= document.querySelector(".rightPanelBox");
    let drugs = json["drugs"];
    //let queryName = query.name;
    //let queryDoseStrength = query.doseStrength;
    //let queryPkSize = query.pkSize;

    console.log(queryDoseStrength)
    rPanel.innerHTML = 
                    "Name: " + drugs.filter((x) => {if(x.name==queryName) return x}).pop().name + "</br> " +
                    "Strength: " + drugs.filter((x) => {if(x.name==queryName) return x}).pop().doseStrength
                                        .filter((x) => {if(x==queryDoseStrength) return x}).pop() + "</br> " +
                    "Pk Size: " + drugs.filter((x) => {if(x.name==queryName) return x}).pop().pkSize
                                        .filter((x) => {if(x.pkSize==query.pkSize) return x}).pop() + "</br> " 
                    ;
}
}

