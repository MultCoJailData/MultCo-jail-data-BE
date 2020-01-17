import Component from '../Component.js';
import Header from '../common/Header.js';
import { makeCountByRaceChart, makeCountByTimeChart, makeDetentionByRaceChart } from './graph.js';


class App extends Component {

  onRender(dom) {
    const header = new Header();
    dom.prepend(header.renderDOM());

    const chartByRace = makeCountByRaceChart();
    const chartByTime = makeCountByTimeChart();
    const chartDetByRace = makeDetentionByRaceChart();
  }

  renderHTML() {
    return /*html*/`
        <div>
            <!-- header goes here -->
            <div>
              <h1>Detentions by Race in Multnomah County</h1>
                <div id="container"></div>
                <div id="timecontainer"></div>
                <div id="durationcontainer"></div>
            </div>
        </div>
    `;
  }

}

export default App;
