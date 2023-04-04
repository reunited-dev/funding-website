// GPLv3 licence
// author : Sebastien Michea
//check if the variable templateElement exists, if not then initialise it
if(typeof templateElement === 'undefined'){
    var templateElement=document.body;
}

// parse query parameters to extract the data file name
var urlParams = new URLSearchParams(window.location.search);
var dataFile = urlParams.get('data');


/**  
 * replace in DOM templateElement content the tags ${variableName} 
 * by the value of the variable variableName in the template_var object
**/
function applyTemplate(templateContent,template_var){
    templateElement.innerHTML = templateContent.split('${').map(function (i) {
        var variableName = i.substring(0, i.indexOf('}')).trim();
        return i.replace(variableName + '}', template_var[variableName]);
    }).join('');
}

function applyTemplateOnJsFile(templateContent) {
    // load the js data file that define the variable template_var
    var script = document.createElement('script');
    script.onload = function () {
        applyTemplate(templateContent,template_var);
    };
    script.src = "/data/" + dataFile;
    document.head.appendChild(script)
}

function applyTemplateOnJsonFile(templateContent) {
    // load the json data file that define the variable template_var
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                applyTemplate(templateContent,JSON.parse(this.responseText));
            }
        }
    }
    xhttp.open("GET", "/data/" + dataFile, true);
    xhttp.send();
}


// if no data file is specified, do nothing
if (dataFile && (dataFile.endsWith(".js") || dataFile.endsWith(".json"))) {
    let applyTemplate=applyTemplateOnJsonFile;
    if(dataFile.endsWith(".js")){
        applyTemplate = applyTemplateOnJsFile;
    } 
    // get the attribute 'template' of the body tag
    let templateFile = document.body.getAttribute('template');
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) { applyTemplate(this.responseText) }
        }
    }
    xhttp.open("GET", templateFile, true);
    xhttp.send();
}


