var input = document.getElementById("input");
var output = document.getElementById("output");
var hidden = document.getElementById("hidden");
var body = document.body;

var counter = 0;

output.onclick = function(){
	input.value = output.src;
};

input.onkeyup = function(event){
    if(event.keyCode == 13){
        search();
    }
};

function search(){
	var terms = input.value.split(" ");
    var url = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=";

    var i = 0;
    var length = terms.length - 1;
    while(i < length){
    	url = url + terms[i] + "+";
    	i += 1;
    }
    url = url + terms[length];

    request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.onreadystatechange = response;
    request.send(null);
};

function response(){
    if(request.readyState === 4 && request.status === 200){
    	var text = JSON.parse(request.responseText).data;
    	if(!isEmpty(text)){
    		var image = text.image_original_url;
        	output.src = image;
    	}
    	else{
    		output.src = "Not_Found.jpg";
    	}
    }
};

function isEmpty(o) {
	for(var p in o){
		if(o.hasOwnProperty(p)){
			return false;
		}
	}
	return true;
};