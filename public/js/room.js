window.addEventListener('load', function() {
    var bigPicture = document.querySelector('#largeImg');
    var smallPicturesList = document.querySelector('#thumbs');
    var smallImages = smallPicturesList.querySelectorAll('.small-image');
    smallPicturesList.addEventListener('click', function(evt) {
        var target = evt.target;
        if (target.tagName.toLowerCase() === 'img') {
            var src = target.getAttribute('src');
            for (var i = 0; i < smallImages.length; i++) {
                smallImages[i].parentNode.classList.remove('room-active');
            }

            bigPicture.src = src;
            target.parentNode.classList.add('room-active');
        }
    });
});