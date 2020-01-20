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
    console.log(chartByTime);
    const chartDurByRace = makeDurationByRaceChart();
    console.log(chartDurByRace);
    const countbyGender = makeCountByGenderChart();
    console.log(countbyGender);
  }

  renderHTML() {
    return /*html*/`
        <div>
            <!-- header goes here -->
            <div>
            <ul>
                <h2>2017 Multnomah County Demographic Estimates</h2>
                <br>
                <li>Total population 788,549</li>
                <li>White: 652,045 - 82.7%</li>
                <li>Black or African American: 56,569 - 7.2%</li>
                <li>American Indian and Alaska Native: 19,879 -	2.5%</li>
                <li>Asian: 72,700 -	9.2%</li>
                <li>Native Hawaiian and Other Pacific Islander: 8,515 - 1.1%</li>
                <li>Hispanic or Latino (of any race): 88,966 - 11.3%</li>
                </ul>
                <br>
                <br>
              <h2>Detentions by Race per 100,000 in Multnomah County</h2>
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



