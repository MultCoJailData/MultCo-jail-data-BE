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
            <div class="content-container">
                <div class="routes">
                    <h2>The API</h2>
                    <ul>
                    <h3>Person Routes</h3>
                        <li>
                        <span class="routes">Get ALL persons > </span> <span class="paths">https://mult-co-jail-data.herokuapp.com/api/v1/persons
                        </li>
                        <li>
                        <span class="routes">Get count by RACE > </span><span class="paths">https://mult-co-jail-data.herokuapp.com/api/v1/persons/countByRace</span>
                        </li>
                        <li>
                        <span class="routes">Get count by GENDER > </span><span class="paths">https://mult-co-jail-data.herokuapp.com/api/v1/persons/countByGender</span>
                        </li>
                        <li>
                        <span class="routes">Get count by AGE > </span><span class="paths">https://mult-co-jail-data.herokuapp.com/api/v1/persons/countByAgeRange</span>
                        </li>

                        <h3>Detention Routes</h3>
                        <li>
                        <span class="routes">Get ALL detentions > </span><span class="paths">https://mult-co-jail-data.herokuapp.com/api/v1/detentions</span>
                        </li>
                        <li>
                        <span class="routes">Get count by RACE > </span><span class="paths">https://mult-co-jail-data.herokuapp.com/api/v1/detentions/countByRace</span>
                        </li>
                        <li>
                        <span class="routes">Get count by GENDER > </span><span class="paths">https://mult-co-jail-data.herokuapp.com/api/v1/detentions/countByGender</span>
                        </li>
                        <li>
                        <span class="routes">Get count by AGE RANGE > </span><span class="paths">https://mult-co-jail-data.herokuapp.com/api/v1/detentions/countByAgeRange</span>
                        </li>
                        <li>
                        <span class="routes">Get count by AGENCY > </span><span class="paths">https://mult-co-jail-data.herokuapp.com/api/v1/detentions/countByAgency</span>
                        </li>

                        <h3>Charge Routes</h3>
                        <li>
                        <span class="routes">Get ALL charges > </span><span class="paths">https://mult-co-jail-data.herokuapp.com/api/v1/detentions/CourtCase</span>
                        </li>
                    </ul>
                    
                    <h3>Key</h3>
                </div>
                <div class="about">
                    <h3>About</h3>
                    <p>Project description</p>
                </div>
                <div class="sample-data">
                    <h4>Sample Booking</h4>
                        <table class="table table-hover table-bordered">
                            <tr>
                                <td><strong>Date:</strong></td>
                                <td>11/07/2019</td>
                            </tr>
                            <tr>
                                <td><strong>Time:</strong></td>
                                <td>10:52 PM</td>
                            </tr>
                            <tr>
                                <td><strong>Agency:</strong></td>
                                <td>Portland Police, East Precinct</td>
                            </tr>
                            <tr>
                                <td><strong>Facility:</strong></td>
                                <td>MCIJ</td>
                            </tr>
                            <tr>
                                <td><strong>Charges:</strong></td>
                                <td>
                                <ul>
                                <li>UNLAW USE WEAPN DV (C Felony)</li>
                                <li>STRANGULATION FEL DV (C Felony)</li>
                                </ul>
                                </td>
                            </tr>
                        </table>
                    </div>	
                </div>
            </div>
        </div>
    `;
  }
        
}

export default App;
