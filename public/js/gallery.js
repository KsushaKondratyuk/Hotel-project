document.addEventListener("DOMContentLoaded", function() {
  fillAllImages();
});

function fillAllImages() {
	var str = "";
	for (var i = 0; i < gallery_images.length; i++) {
		str += getOneImageHTML(gallery_images[i]);
	}
	document.getElementById("image").innerHTML = str;
}

function getOneImageHTML(image_path) {
	return "<li class='gallery-item'><img src='" + image_path + "'></li>";
}

gallery_images = [ 
"img/img-rooms/1people-in-1.jpg",
"img/img-rooms/1people-in-2.jpg",
"img/img-rooms/1people-in-3.jpg",
"img/img-rooms/2people-in-3.jpg",
"img/img-rooms/1people.jpg",
"img/img-rooms/2people.jpg",
"img/img-rooms/3people.jpg",
"img/img-rooms/3people-in-1.jpg",
"img/img-rooms/3people-in-2.jpg",
"img/img-rooms/3people-in-3.jpg",
"img/img-rooms/11people-in-1.jpg",
"img/img-rooms/11people-in-2.jpg",
"img/img-rooms/22people.jpg",
"img/img-rooms/22people-in-1.jpg",
"img/img-rooms/22people-in-2.jpg",
"img/img-rooms/22people-in-3.jpg",
"img/img-rooms/33people.jpg",
"img/img-rooms/3people-in-3.jpg"]