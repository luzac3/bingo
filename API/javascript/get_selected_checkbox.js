function get_checkbox(name){
    let result = [];

    let elemnts = document.getElementByName(name);

    elements.forEach(function(element){
        if(element.checked){
            result.push(element.value);
        }
    });
    return result;
}