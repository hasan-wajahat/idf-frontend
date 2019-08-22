/**
 * Main Widget library file.
 * Can be added to any page to add IDF Article widget 
 * 
 * To use library just initialize with:
 * idfWidget.initialize(educational_partner, element_to_attach_to)
 */

var idfWidget = {
  parentElem: null,
  educationalPartner: '', // IDF's educational partners
  articlesApi: 'https://www.interaction-design.org/widgets/articles',

  initialize: function (ep, attachElem) {
    $(document).ready(function () {
      idfWidget.educationalPartner = ep;
      idfWidget.renderInitialData(ep, attachElem);
    });
  },

  renderInitialData: function (ep, attachElem) {
    var element = document.createElement('div');
    var containerClass = 'idf-widget-container';
    element.setAttribute('class', containerClass);
    // use #idf-widget if no other selector passed
    $(attachElem ? attachElem : '#idf-widget').append(element);
    idfWidget.parentElem = $('.' + containerClass);

    // calls backend for the initial list of articles
    $.ajax({
      url: idfWidget.articlesApi + '?ep=' + ep
    }).done(function (data) {
      idfWidget.parentElem.html(data); // API returns template
      idfWidget.attachButtonListener(); // Can only attach event after API returns button
    }).fail(function () {
      idfWidget.parentElem.html('<h2>Unable to load Widget Data</h2>');
    })
  },

  attachButtonListener: function () {
    $('.articlesWidget__loadMore').find('button').click(idfWidget.loadMoreArticles)
  },

  // fired when load more articles button pressed
  loadMoreArticles: function () {
    idfWidget.toggleButtonAvailability(); // disable button
    $.ajax({
      url: idfWidget.articlesApi + '/load-more/' +
        idfWidget.getLastArticleSlug() + '?ep=' + idfWidget.educationalPartner
    }).done(function (data) {
      idfWidget.parentElem.find('.articlesWidget__articles').append(data);
      idfWidget.scrollList(); // refer to function
      idfWidget.toggleButtonAvailability(); // enable button
    }).fail(function () {
      idfWidget.toggleButtonAvailability(); // enable button
      idfWidget.parentElem
        .find('.articlesWidget__articles')
        .append('<h3>Error: Can not load further data</h3>');
    })
  },

  /**
   * API requires the last loaded article's slug to load the next
   * list of articles. Easiest approach for getting that is to 
   * locate the last item and get slug present in the href attr
   */
  getLastArticleSlug: function () {
    var lastItem = idfWidget.parentElem.find('li').last().find('a');
    var originalString = lastItem.attr('href');
    return originalString.substring(
      originalString.indexOf('/article/') + 9, // 9 is the length of /article/
      originalString.indexOf('?'), // in all cases the slug ends with ?
    );
  },

  toggleButtonAvailability: function () {
    var button = $('.articlesWidget__loadMore').find('button');
    button.prop('disabled', !button.prop('disabled'));
  },

  /**
   * When more articles are loaded the list scrolls
   * down automatically so the user knows that articles
   * loaded
   */
  scrollList: function () {
    var list = $('.articlesWidget__articles');
    // we approx the amount to scroll by assuming that each li will be equal to 100px
    pixelsToScroll = (list.find('li').length * 100).toString();
    list.animate({
      scrollTop: pixelsToScroll + 'px'
    }, 1000);
  }
}