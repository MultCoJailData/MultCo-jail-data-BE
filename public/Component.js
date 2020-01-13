import htmlToDOM from './utils/htmlToDOM.js';

class Component {
  constructor(props) {
    this.props = props || {};
    this.state = {};
  }

  onRender(/*dom*/) {

  }

  renderDOM() {
    const html = this.renderHTML();
    if(typeof(html) !== 'string') {
      throw new Error(`Componend "${this.constructor.name}" needs to return an html string from renderHTML`);
    }

    const dom = htmlToDOM(html);

    this.rootElement = dom;
    this.onRender(dom);

    return dom;
  }

  renderHTML() {
    throw new Error(`Componend "${this.constructor.name}" needs to implement renderHTML`);
  }

  update(props) {
    props = props || {};
    
    Object.assign(this.props, props);

    const oldRoot = this.rootElement;

    if(!oldRoot) {
      throw new Error(`"update()" was called on Componend "${this.constructor.name}", but no prior render has happened. Be sure to call ".renderDOM()" before useing ".update()"`);
    }

    const newDOM = this.renderDOM();
    oldRoot.replaceWith(newDOM);
  }
}

export default Component;
