export function stripHtml(html){
    // Create a new div element
    var temporalDivElement = document.createElement("div");
    // Set the HTML content with the providen
    temporalDivElement.innerHTML = html;
    // Retrieve the text property of the element (cross-browser support)
    return temporalDivElement.textContent || temporalDivElement.innerText || "";
}

export function saveLocation(latitude,longitude){
    localStorage.setItem("location",JSON.stringify({latitude,longitude}));
}

export function getLocation(){
    try {
        const {latitude,longitude} = JSON.parse(localStorage.getItem("location")); 
        return {latitude,longitude};
    } catch (error) {
        
    }
    return {latitude:null,longitude:null};
}