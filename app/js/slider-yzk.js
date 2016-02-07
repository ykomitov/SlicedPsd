(function () {
  var NUMBER_OF_VISIBLE_ITEMS = 7;

  $('#btn-prev').on('click', function () {
    var items = $('.slider-item'),
      indexOfFirstActive = FindFirstActiveIndex(items),
      indexOfLast = FindLast(items),
      hasSetLast = false,
      i, item;

    if (indexOfFirstActive === 0) {
      console.log('no more');
      return;
    }

    for (i = indexOfLast; i >= 0; i -= 1) {
      item = $(items[i]);

      if (item.hasClass('active') && item.hasClass('last')) {
        item.removeClass('last');
        item.removeClass('active');
        item.addClass('inactive');
        continue;
      }

      if (item.hasClass('active') && !item.hasClass('last') && !hasSetLast) {
        item.addClass('last');
        hasSetLast = true;
        continue;
      }

      if (item.hasClass('inactive')) {
        item.removeClass('inactive');
        item.addClass('active');
        break;
      }
    }

  });

  $('#btn-next').on('click', function () {

    var items = $('.slider-item'),
      itemsCount = items.length,
      indexOfFirstActive = FindFirstActiveIndex(items),
      i, item;

    if (itemsCount - indexOfFirstActive === NUMBER_OF_VISIBLE_ITEMS) {
      return;
    }

    for (i = indexOfFirstActive; i < items.length; i += 1) {
      item = $(items[i]);

      if (item.hasClass('active')) {
        item.removeClass('active');
        item.addClass('inactive');
        break;
      }
    }

    for (i = indexOfFirstActive + 1; i < items.length; i += 1) {
      item = $(items[i]);

      if (item.hasClass('inactive')) {
        item.removeClass('inactive');
        item.addClass('active');
        item.addClass('last');
        break;
      }
    }

    for (i = indexOfFirstActive; i < items.length; i += 1) {
      item = $(items[i]);

      if (item.hasClass('last')) {
        item.removeClass('last');
        break;
      }
    }
  });

  $('.slider-item').on('mouseover', function () {
    var $that = $(this);

    // Cut the length of the original text if it exceeds 90 chars
    var originalText = $that.find('p').text();

    if (originalText.length > 90) {
      $that.find('p').text((originalText.substr(0, 87) + '...'));
    }
    $that.addClass('hovered');
    $that.find('p').show();
  }).on('mouseleave', function () {
    var $that = $(this);
    $that.removeClass('hovered');
    $that.find('p').hide();
  });

  function FindFirstActiveIndex(items) {
    for (var i = 0; i < items.length; i += 1) {

      var item = $(items[i]);

      if (item.hasClass('active')) {
        return i;
      }
    }
  }

  function FindLast(items) {
    for (var i = 0; i < items.length; i += 1) {
      var item = $(items[i]);

      if (item.hasClass('last')) {
        return i;
      }
    }
  }
}());