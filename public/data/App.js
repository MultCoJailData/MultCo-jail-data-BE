import Component from '../Component.js';
import Header from '../common/Header.js';
import { makeCountByRaceChart, makeCountByTimeChart, makeCountByGenderChart } from './graph.js';


class App extends Component {
    
  onRender(dom) {
    const header = new Header();
    dom.prepend(header.renderDOM());

    const chartByRace = makeCountByRaceChart();
    console.log(chartByRace);
    const chartByTime = makeCountByTimeChart();
    console.log(chartByTime);
    const countbyGender = makeCountByGenderChart();
    console.log(countbyGender);
  }

  renderHTML() {
    return /*html*/`
        <div>
            <!-- header goes here --> 
            <div>
              <h1>Detentions by Race in Multnomah County</h1>
                <div id="container"></div>
                <div id="timecontainer"></div>
                <div id="gendercontainer"></div>
            </div>
        </div>
    `;
  }
        
}

export default App;



