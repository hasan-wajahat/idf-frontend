import Widget from './widget';

export default class IdfWidget {
  static initialize(ep, attachElem) {
    // eslint-disable-next-line no-new
    new Widget(ep, attachElem);
  }
}
