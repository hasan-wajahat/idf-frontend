/**
 * Main Widget library file.
 * Can be added to any page to add IDF Article widget
 *
 * To use library just initialize with:
 * idfWidget.initialize(educational_partner, element_to_attach_to)
 */

// IDF's educational partners
const ARTICLES_API = 'https://www.interaction-design.org/widgets/articles';


function toggleButtonAvailability() {
  const button = $('.articlesWidget__loadMore').find('button');
  button.prop('disabled', !button.prop('disabled'));
}

/**
 * When more articles are loaded the list scrolls
 * down automatically so the user knows that articles
 * loaded
 */
function scrollList() {
  const list = $('.articlesWidget__articles');
  // we approx the amount to scroll by assuming that each li will be equal to 100px
  const pixelsToScroll = (list.find('li').length * 100).toString();
  list.animate({
    scrollTop: `${pixelsToScroll}px`,
  }, 1000);
}

export default class widget {
  parentElem = null;

  educationalPartner = '';


  constructor(ep, attachElem) {
    $(document).ready(() => {
      this.educationalPartner = ep;
      this.renderInitialData(ep, attachElem);
    });
  }

  renderInitialData(ep, attachElem) {
    const element = document.createElement('div');
    const containerClass = 'idf-widget-container';
    element.setAttribute('class', containerClass);
    // use #idf-widget if no other selector passed
    $(attachElem || '#idf-widget').append(element);
    this.parentElem = $(`.${containerClass}`);

    // calls backend for the initial list of articles
    $.ajax({
      url: `${ARTICLES_API}?ep=${ep}`,
    }).done((data) => {
      this.parentElem.html(data); // API returns template
      this.attachButtonListener(); // Can only attach event after API returns button
    }).fail(() => {
      this.parentElem.html('<h2>Unable to load Widget Data</h2>');
    });
  }

  attachButtonListener() {
    $('.articlesWidget__loadMore').find('button').click(this.loadMoreArticles);
  }

  // fired when load more articles button pressed
  loadMoreArticles = () => {
    toggleButtonAvailability(); // disable button
    $.ajax({
      constext: this,
      url: `${ARTICLES_API}/load-more/${this.getLastArticleSlug()}?ep=${this.educationalPartner}`,
    }).done((data) => {
      this.parentElem.find('.articlesWidget__articles').append(data);
      scrollList(); // refer to function
      toggleButtonAvailability(); // enable button
    }).fail(() => {
      toggleButtonAvailability(); // enable button
      this.parentElem
        .find('.articlesWidget__articles')
        .append('<h3>Error: Can not load further data</h3>');
    });
  }

  /**
   * API requires the last loaded article's slug to load the next
   * list of articles. Easiest approach for getting that is to
   * locate the last item and get slug present in the href attr
   */
  getLastArticleSlug() {
    const lastItem = this.parentElem.find('li').last().find('a');
    const originalString = lastItem.attr('href');
    return originalString.substring(
      originalString.indexOf('/article/') + 9, // 9 is the length of /article/
      originalString.indexOf('?'), // in all cases the slug ends with ?
    );
  }
}
