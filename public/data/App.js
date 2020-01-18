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
                <h2>July 2018 Multnomah County Demographics</h2>
                <br>
                <li>Total population 811,880</li>
                <li>White	alone 79%</li>
                <li>Black or African American alone	6.1%</li>
                <li>American Indian and Alaska Native alone	1.4%</li>
                <li>Asian alone	8.1%</li>
                <li>Native Hawaiian and Other Pacific Islander alone 0.7%</li>
                <li>Hispanic or Latino (of any race) 11.7%</li>
                <li>White alone, not Hispanic or Latino 69.3%</li>
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



