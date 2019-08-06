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

function readJSONToDict() {
	roomData = JSON.parse(data);
	return roomData;
}

function readJSONToArray() {
	roomData = JSON.parse(data);
	var items = Object.keys(roomData).map(function(key) {
		return [key, roomData[key]];
	  });
	return items;
}

function fillAllRooms(roomData) {
	i = 0;
	str = "";
	for(var element in roomData) {
		str += " <li class='rooms-list-item'>";
		str += " <div class='rooms-inner-container'>";
		str +=	"<img class='rooms-picture' src=" + roomData[element][1].room_image + " alt='Фото одноместного номера'>";
		str += " <div class='rooms-description'>";
		str += "<p class='rooms-name'>"+ roomData[element][1].room_name + "</p>";
		str += "<div class='rooms-type'>";
		str += "<p class='general-description'>" + roomData[element][1].room_small_description + "</p>";
		str += "<p class='rooms-price'>"+ roomData[element][1].room_price + "$" + "</p>";
		str += "</div>";
		str += "<div class='rooms-actions'>";
		str += "<a class='button button-more' href='room.html?id="+roomData[element][0]+"'>Подробнее</a>";
		str += "<a class='button button-book' href=''>Забронировать</a>";
		str += "</div>";
		str += "</div>";
		str += "</div>";
		str += "</li>";
		i += 1;
	}
	document.getElementById("rooms").innerHTML = str;
	document.getElementById("counts").innerHTML = "Найдено: " + i;
}

function fillAllRoomsNotSorted(){
	items = readJSONToArray();
	fillAllRooms(items);
}

function fillAllRoomsByPriceDesc(){
	items = readJSONToArray();
	//sort
	items.sort(function(first, second) {
		return second[1].room_price - first[1].room_price;
	  });
	
	fillAllRooms(items);
}

function fillAllRoomsByPriceAsc(){
	items = readJSONToArray();
	//sort
	items.sort(function(first, second) {
		return first[1].room_price - second[1].room_price;
	  });
	
	fillAllRooms(items);
}

function fillAllRoomsByCapabilityDesc(){
	items = readJSONToArray();
	//sort
	items.sort(function(first, second) {
		return second[1].room_capability - first[1].room_capability;
	  });
	
	fillAllRooms(items);
}

function fillAllRoomsByCapabilityAsc(){
	items = readJSONToArray();
	//sort
	items.sort(function(first, second) {
		return first[1].room_capability - second[1].room_capability;
	});
	
	fillAllRooms(items);
}

function fillRoom() {
	// read id from url
	var url_string = window.location.href;
	var url = new URL(url_string);
	var id = url.searchParams.get("id");

	roomData = readJSONToDict();
	str = "";
	str += "<h1 class='page-title'>"+ roomData[id].room_name +"</h1>";
	str += "<div class='room-columns'>";
	str += "<section class='room-photos'>";
	str += "<h2 class='visually-hidden'>Фото номера</h2>";
	str += "<p class='room-photo-full'>";
	str += "<img id='largeImg' src='"+ roomData[id].room_image +"' alt='Фото номера большое'>";
	str += "</p>";
	str += "<ul class='room-photo-small' id='thumbs'>";
	roomData[id].room_image_add.forEach(element =>{
		str += "<li><img class='small-image' src='" + element + "'  alt='Фото номера маленькое'></li>";
	});
	str += "</ul>";
	str += "</section>";
	str += "<section class='room-information'>";
	str += "<h2 class='room-information-title'>Описание комнаты</h2>";
	str += "<p class='room-description'>" + roomData[id].room_big_description + "</p>";
	str += "<p class='room-book'>";
	str += "<b class='room-price'>" + roomData[id].room_price + "$</b>";
	str += "<a href='' class='button'>Забронировать</a>";
	str += "</p>";
	str += "<h3>Услуги в даном номере:</h3>";
	str += "<ul class='room-set'>";
	roomData[id].room_options.forEach(element => {
		str += "<li>"+element+"</li>";
	});
	
	str += "</ul>";
	str += "</section>"
	str += "</div>"

	document.getElementById("room_info").innerHTML = str;
}

function onShowButtonClick() {
 var items = readJSONToArray();
 var checkboxes = document.querySelectorAll('.input-item input:checked');

 var conditions = Array.from(checkboxes).map(function (item) {
  return item.name;
 });
 console.log(conditions);

 var conditionItems = items.filter(function (room) {
  for (var i = 0; i < conditions.length; i++) {
   if (room[1].room_options.indexOf(conditions[i]) === -1) {
	return false;
   }
  }
 return true;
});

 fillAllRooms(conditionItems);

}




// document.addEventListener('DOMContentLoaded', function() {
// 	var sortUpByPrice = document.querySelectorAll('.sorting-arrows .up')[0];
// 	var sortUpByCapability = document.querySelectorAll('.sorting-arrows .up')[1];
// 	sortUpByPrice.addEventListener('click', fillAllRoomsByPriceAsc);
// 	sortUpByCapability.addEventListener('click', fillAllRoomsByCapabilityAsc);
// });


