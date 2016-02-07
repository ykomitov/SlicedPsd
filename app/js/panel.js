(function(){
  jQuery(document).ready(function($){
    //open the lateral panel
    $('.cd-btn').on('click', function(event){
      event.preventDefault();
      $('.cd-panel').addClass('is-visible');
      $('.cd-btn').hide();
    });
    //clode the lateral panel
    $('.cd-panel').on('click', function(event){
      if( $(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close') ) {
        $('.cd-panel').removeClass('is-visible');
        $('.cd-btn').show();
        event.preventDefault();
      }
    });
  });
}());