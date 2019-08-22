# Hasan Wajahat IDF Frontend Test

- App made for IDF frontend test
---

To use the widget simply add `widget.js` and `widget.scss` to your html file and then
create a div with a unique selector so that widget can attach to it.
Once that is done initialize the widget using: 
`idfWidget.initialize(educational_partner, selector)`

The widget requires jquery (it needs to be loaded before the widget). Also for a better look include Robot font.

## Philosophy behind writing the app in its current form

- I have put considerable though into how to approach this problem. My first instinct was to use a framework like React. But after looking at the response from the api it seemed clear to me that anything that complex was overkill. For this app most of the heavy lifting is done on the backend. Meaning on frontend we can focus on keeping things extremely lean and efficient.
- Great care has been taken to make sure that the lib can work on any browser, this meant not using any es6 features! (oh woe is me!). The idea is to create a widget for third party websites, that means we have very little control on which browsers are being used.
- I had to decide on whether to use Babel, but in the end I decided to go with the simplest route, and kept in mind that test mentioned that there are no gotcha's in the test. Also transpiling can increase bundle size. Ours however is an extremely small package.
- JQuery is the only shortcut taken, since I could not use the native fetch (thanks a lot IE11), I went with Ajax. jquery also made couple of other things simpler. This however means that the widget has a dependency on jQuery. Which is perhaps possible future issue.
- I have wrapped everything in a parent css class so that none of the css bleeds out or in.

## Possible Improvements

- The library is not minimized or uglified. In future perhaps if this feature were to increase in complexity then then the better approach would be to have a build process. My personal preference is to use Webpack + webpack-plugins and Babel.

- If a bundler is not added then jQuery should not be present as a dependency. It could be easily done but would require more time.

- With a bundler, scoping could perhaps be improved by using es6 classes and static properties. Right now the object is in global scope and easily mutable.

