(function () {
  jQuery(document).ready(function ($) {
    // Check if there is a key for background in local storage
    var currentBackground = localStorage.getItem("background");
    if (currentBackground) {
      $('body').css('background-image', 'url("../images/bg-textures/' + currentBackground + '")');
    }else{
      $('body').css('background-image', 'url("../images/bg-textures/t-5.jpg")');
    }

    // Open the lateral panel
    $('.cd-btn').on('click', function (event) {
      event.preventDefault();
      $('.cd-panel').addClass('is-visible');
      $('.cd-btn').hide();
    });

    // Close the lateral panel
    $('.cd-panel-close').on('click', function (event) {
      $('.cd-panel').removeClass('is-visible');
      $('.cd-btn').show();
      event.preventDefault();
    });

    // Populate the panel
    var panelContainer = $('#bg-images-container');

    for (var i = 0; i < 16; i += 1) {
      var $currentDiv = $("<div>");
      var textureId = i + 1;
      $currentDiv.addClass('bg-texture');
      $currentDiv.attr('id', 't-' + textureId);
      $currentDiv.css('background-image', 'url("../images/bg-textures/t-' + textureId + '.jpg")');

      if (i > 0 && (i + 1) % 4 == 0) {
        $currentDiv.addClass('end');
      }

      $currentDiv.appendTo(panelContainer);
    }

    // Add click event on panels
    $('.bg-texture').on('click', function (event) {
      event.preventDefault();
      var textureName = event.target.id + '.jpg';
      $('body').css('background-image', 'url("../images/bg-textures/' + textureName + '")');
      localStorage.setItem("background", textureName);
    });
  });
}());