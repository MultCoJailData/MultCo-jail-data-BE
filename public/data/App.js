import Component from '../Component.js';
import Header from '../common/Header.js';
import { makeCountByRaceChart, makeCountByTimeChart, makeDurationByRaceChart, makeCountByGenderChart } from './graph.js';


class App extends Component {

  onRender(dom) {
    const header = new Header();
    dom.prepend(header.renderDOM());

    const chartByRace = makeCountByRaceChart();
    console.log(chartByRace);
    const chartByTime = makeCountByTimeChart();
    const chartDurByRace = makeDurationByRaceChart();
    console.log(chartDurByRace);
    console.log(chartByTime);
    const countbyGender = makeCountByGenderChart();
    console.log(countbyGender);
  }

  renderHTML() {
    return /*html*/`
        <div>
            <!-- header goes here -->
            <div>
            <ul>
                <h2>Current Multnomah County Demographics</h2>
                <br>
                <li>Total population	4,025,127</li>
                <li>White	3,586,891</li>
                <li>Black or African American	112,874</li>
                <li>American Indian and Alaska Native	125,819</li>
                <li>Asian	227,382</li>
                <li>Native Hawaiian and Other Pacific Islander	32,197</li>
                <li>Hispanic or Latino (of any race)	509,507</li>
                <li>Other race	140,719</li>
                </ul>
                <br>
                <br>
              <h2>Detentions by Race in Multnomah County</h2>
                <div id="container"></div>
                <h2>Detention duration by Race in Multnomah County</h2>
                <div id="durationcontainer"></div>
                <h2>Detentions by Gender in Multnomah County</h2>
                <div id="gendercontainer"></div>
               <h2>Bookings by Time of Day in Multnomah County</h2>
                <div id="timecontainer"></div>
            </div>
        </div>
    `;
  }

}

export default App;



