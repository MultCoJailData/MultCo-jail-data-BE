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
                    <h4>Sample Detention Record</h4>
                        <table class="table table-hover table-bordered">
                            <tr>
                                <td><strong>bookingNumber:</strong></td>
                                <td>1416074</td>
                            </tr>
                            <tr>
                                <td><strong>bookingTime:</strong></td>
                                <td>2017-09-24T05:09:00.000Z</td>
                            </tr>
                            <tr>
                                <td><strong>person:</strong></td>
                                <td>
                                <ul>
                                <li>age: 24</li>
                                <li>gender: Male</li>
                                <li>race: Black</li>
                                <li>height: 6 ft 1 in</li>
                                <li>weight: 160 lbs</li>
                                <li>hairColor: Brown</li>
                                <li>eyeColor: Hazel</li>
                                </ul>
                                </td>
                            </tr>
                            <tr>
                            <td><strong>arrestingAgency:</strong></td>
                            <td>Gresham Police Department</td>
                            </tr>
                            <tr>
                                <td><strong>assignedFacility:</strong></td>
                                <td>MCIJ</td>
                            </tr>
                            <tr>
                                <td><strong>projectedReleaseDate:</strong></td>
                                <td>Unknown</td>
                            </tr>
                            <tr>
                                <td><strong>charges:</strong></td>
                                <td>
                                <ul>
                                <li>description: MURDER I (A Felony)</li>
                                <li>bail: 0</li>
                                <li>status: Released</li>
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
