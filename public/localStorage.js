function addToLocalStorage(){
	key = document.forms["localStorageAddForm"]["key"].value;
	value = document.forms["localStorageAddForm"]["value"].value;
	
	if (localStorage.getItem(key)){
		document.getElementById("result").innerHTML = "Key already exists, dont added";
		return false;
	}
	
	localStorage.setItem(key, value);
	document.getElementById("result").innerHTML = "Success";
	return false;
}
function getValueByKey(){
	key = document.forms["localStorageGetForm"]["key"].value;
	data = localStorage.getItem(key);
	if (data === null){
		document.getElementById("result").innerHTML = "No values by key";
		return false;
	}
	document.getElementById("result").innerHTML = data;
	return false;
}