function readJSONToDict() {
	var roomData = JSON.parse(data);
	return roomData;
}

var DATA = readJSONToArray();

const rooms_on_page = 6;

function readJSONToArray() {
	var roomData = JSON.parse(data);
	var items = Object.keys(roomData).map(function(key) {
		return [key, roomData[key]];
	  });
	return items;
}

function fillAllRooms(length) {
	var str = "";
	if (length > DATA.length){
		length = DATA.length;
		}
	for (var i = 0; i < length; i++) {
		var room = DATA[i];
		str += fillOneRoom(room);
	}
	document.getElementById("rooms").innerHTML = str;
	document.getElementById("counts").innerHTML = "Найдено: " + DATA.length;
}

function fillOneRoom(roomData) {
	var str = "";
		str += " <li class='rooms-list-item'>";
		str += " <div class='rooms-inner-container'>";
		str +=	"<img class='rooms-picture' src=" + roomData[1].room_image + " alt='Фото одноместного номера'>";
		str += " <div class='rooms-description'>";
		str += "<p class='rooms-name'>"+ roomData[1].room_name + "</p>";
		str += "<div class='rooms-type'>";
		str += "<p class='general-description'>" + roomData[1].room_small_description + "</p>";
		str += "<p class='rooms-price'>"+ roomData[1].room_price + "$" + "</p>";
		str += "</div>";
		str += "<div class='rooms-actions'>";
		str += "<a class='button button-more' href='room.html?id="+ roomData[0] +"'>Подробнее</a>";
		str += "<a class='button button-book' type='button'>Забронировать</a>";
		str += "</div>";
		str += "</div>";
		str += "</div>";
		str += "</li>";
	return str;
}

function showPopUp() {
	var str = "";
		str +="<section class='modal'>";
        str += "<form action='' class='modal-search-form'>";
		str += "<div class='search-form-item'>";
        str += "<label for='arrival-date'>Дата заезда:</label>";
		str += "<input type='date' name='arrival-date' id='arrival-date'>";
        str += "</div>";
		str += "<div class='search-form-item'>";
        str += "<label for='departure-date'>Дата выезда:</label>";
		str += "<input type='date' name='departure-date' id='departure-date'>";
		str += "</div>";
        str += "<button class='button submit-button' type='button'>Забронировать</button>";
        str += "<button class='modal-close'>Закрыть</button>";
        str += "</form>";
		str += "</section>";
		str += "<section class='modal-responce'>";
        str += "<div class='modal-red'>";
        str += "<button class='modal-response-close'>Закрыть</button>";
        str += "</div>";
        str += "<div class='modal-green'>";
		str += "<button class='modal-response-close'>Закрыть</button>";
        str += "</div>";
		str +="</section>";

	document.getElementById("popUp").innerHTML = str;
}

function fillAllRoomsNotSorted() {
	fillAllRooms(rooms_on_page);
}

function fillAllRoomsByPriceDesc() {
	DATA.sort(function(first, second) {
		return second[1].room_price - first[1].room_price;
	  });

	fillAllRooms(rooms_on_page);
}

function fillAllRoomsByPriceAsc() {
	DATA.sort(function(first, second) {
		return first[1].room_price - second[1].room_price;
	  });
	fillAllRooms(rooms_on_page);
}

function fillAllRoomsByCapabilityDesc(){
	DATA.sort(function(first, second) {
		return second[1].room_capability - first[1].room_capability;
	  });
	fillAllRooms(rooms_on_page);
}

function fillAllRoomsByCapabilityAsc(){
	DATA.sort(function(first, second) {
		return first[1].room_capability - second[1].room_capability;
	});
	fillAllRooms(rooms_on_page);
}

function fillRoom() {
	// read id from url
	var url_string = window.location.href;
	var url = new URL(url_string);
	var id = url.searchParams.get("id");

	var roomData = readJSONToDict();
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
	str += "<a href='' class='button button-book'>Забронировать</a>";
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
 var checkboxes = document.querySelectorAll('.input-item input:checked');
 DATA = readJSONToArray();

 var conditions = Array.from(checkboxes).map(function (item) {
  return item.name;
 });

 DATA = DATA.filter(function (room) {
  for (var i = 0; i < conditions.length; i++) {
   if (room[1].room_options.indexOf(conditions[i]) === -1) {
	return false;
   }
  }
 return true;
});

fillAllRooms(DATA.length);

}

document.addEventListener("DOMContentLoaded", function() {
  fillAllRoomsNotSorted();
});

document.addEventListener('click', function (evt) {
	if (evt.target.classList.contains('button-book')) {
		evt.preventDefault();
		showPopUp();
		var closeBtn = document.querySelector('.modal-close');
		closeBtn.addEventListener('click', function(evt) {
			evt.preventDefault();
			document.getElementById("popUp").innerHTML = '';
		});
	}
});
