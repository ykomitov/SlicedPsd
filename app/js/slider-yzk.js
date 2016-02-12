(function () {
  var numberOfVisibleItems = 7,
    eventFired = false;

  var MAX_WIDTH = 491;
  var MIDDLE_WIDTH = 261;

  var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();

  setNumberOfActiveItems();

  $(window).resize(function () {
    delay(function () {
      if (!eventFired) {
        $('.multimedia-slider').resize();
        eventFired = true;
      } else {
        eventFired = false;
        return;
      }
    }, 250);
  });

  $('.multimedia-slider').resize(function () {
    setNumberOfActiveItems();
  });

  function setNumberOfActiveItems() {
    var width = $('.multimedia-slider').width();
    console.log(width);

    if (width >= MAX_WIDTH) {
      numberOfVisibleItems = 7;
      setNumberOfVisibleItems(numberOfVisibleItems);
    } else if (width <= MIDDLE_WIDTH) {
      numberOfVisibleItems = 4;
      setNumberOfVisibleItems(numberOfVisibleItems);
    }
  }

  function setNumberOfVisibleItems(numberOfItems) {
    var items = $('.slider-item'), i,
      currentNumberOfActiveItems = findNumberOfActiveItems(items),
      counter = 0,
      indexOfFirstActiveItem = findFirstActiveIndex(items),
      indexOfLastActiveItem = findLast(items);

    if (numberOfItems === currentNumberOfActiveItems) {
      return;
    } else if (numberOfItems < currentNumberOfActiveItems) {
      for (i = indexOfFirstActiveItem; i <= indexOfLastActiveItem; i += 1) {
        var item = $(items[i]);
        if (counter < numberOfItems - 1) {
          counter++;
        } else if (counter === numberOfItems - 1) {
          item.addClass('last');
          counter++;
        } else {
          counter++;
          item.removeClass('last');
          item.removeClass('active');
          item.addClass('inactive');
        }
      }
    } else {
      for (i = 0; i < items.length; i += 1) {
        var item = $(items[i]);
        if (i < numberOfItems - 1) {
          item.removeClass('inactive');
          item.addClass('active');
          item.removeClass('last');
        } else if (i === numberOfItems - 1) {
          item.removeClass('inactive');
          item.addClass('active');
          item.addClass('last');
        } else {
          item.removeClass('active');
          item.removeClass('last');
          item.addClass('inactive');
        }
      }
    }
  }

  $('#btn-prev').on('click', function () {
    var items = $('.slider-item'),
      indexOfFirstActive = findFirstActiveIndex(items),
      indexOfLast = findLast(items),
      hasSetLast = false,
      i, item;

    if (indexOfFirstActive === 0) {
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
      indexOfFirstActive = findFirstActiveIndex(items),
      i, item;

    if (itemsCount - indexOfFirstActive === numberOfVisibleItems) {
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

  function findFirstActiveIndex(items) {
    for (var i = 0; i < items.length; i += 1) {

      var item = $(items[i]);

      if (item.hasClass('active')) {
        return i;
      }
    }
  }

  function findLast(items) {
    for (var i = 0; i < items.length; i += 1) {
      var item = $(items[i]);

      if (item.hasClass('last')) {
        return i;
      }
    }
  }

  function findNumberOfActiveItems(items) {
    var counter = 0;

    for (var i = 0; i < items.length; i += 1) {

      var item = $(items[i]);

      if (item.hasClass('active')) {
        counter += 1;
      }
    }

    return counter;
  }
}());