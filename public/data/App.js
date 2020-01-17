import Component from '../Component.js';
import Header from '../common/Header.js';


class App extends Component {
    
  onRender(dom) {
    const header = new Header();
    dom.prepend(header.renderDOM());
  }

  renderHTML() {
    return /*html*/`
        <div>
            <!-- header goes here --> 
            <div class="container">
            <h1>Super Awesome Charts Go Here!</h1>
            </div>
        </div>
    `;
  }
        
}

export default App;
