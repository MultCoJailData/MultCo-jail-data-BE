import Component from '../Component.js';
import Header from '../common/Header.js';
import { makeCountByRaceChart, makeCountByTimeChart } from './graph.js';


class App extends Component {
    
  onRender(dom) {
    const header = new Header();
    dom.prepend(header.renderDOM());

    const chartByRace = makeCountByRaceChart();
    const chartByTime = makeCountByTimeChart();
  }

  renderHTML() {
    return /*html*/`
        <div>
            <!-- header goes here --> 
            <div>
              <h2>Detentions by Race in Multnomah County</h2>
                <div id="container"></div>
                <div id="timecontainer" ></div>
            </div>
        </div>
    `;
  }
        
}

export default App;
