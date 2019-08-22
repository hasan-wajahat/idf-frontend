var idfWidget = {
  parentElem: null,
  educationalPartner: '',
  articlesApi: 'https://www.interaction-design.org/widgets/articles',

  initialize: function (ep) {
    $(document).ready(function () {
      idfWidget.educationalPartner = ep;
      idfWidget.renderInitialData(ep);
    });
  },

  renderInitialData: function (ep, attachElem) {
    var element = document.createElement('div');
    var containerClass = 'idf-widget-container';
    element.setAttribute('class', containerClass);
    $(attachElem ? attachElem : '#idf-widget').append(element);
    this.parentElem = $('.' + containerClass);

    $.ajax({
      url: idfWidget.articlesApi + '?ep=' + ep
    }).done(function (data) {
      idfWidget.parentElem.html(data);
      idfWidget.attachButtonListener();
    }).fail(function () {
      idfWidget.parentElem.html('<h2>Unable to load Widget Data</h2>');
    })
  },

  attachButtonListener: function () {
    $('.articlesWidget__loadMore').find('button').click(idfWidget.loadMoreArticles)
  },

  loadMoreArticles: function () {
    $.ajax({
      url: idfWidget.articlesApi + '/load-more/' +
        idfWidget.getLastArticleSlug() + '?ep=' + idfWidget.educationalPartner
    }).done(function (data) {
      idfWidget.parentElem.find('.articlesWidget__articles').append(data);
    }).fail(function () {
      idfWidget.parentElem
        .find('.articlesWidget__articles')
        .append('<h3>Error: Can not load further data</h3>');
    })
  },

  getLastArticleSlug: function () {
    var lastItem = idfWidget.parentElem.find('li').last().find('a');
    var originalString = lastItem.attr('href');
    return originalString.substring(
      originalString.indexOf('/article/') + 9,
      originalString.indexOf('?'),
    );
  }
}