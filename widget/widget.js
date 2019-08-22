$(document).ready(function () {
  const element = document.createElement('div');
  element.setAttribute('class', 'idf-widget-container');
  document.querySelector('#idf-widget').appendChild(element);

  $.ajax({
    url: 'https://www.interaction-design.org/widgets/articles?ep=usabilitygeek'
  }).done(function(data){
    $('.idf-widget-container').html(data);
  })

});