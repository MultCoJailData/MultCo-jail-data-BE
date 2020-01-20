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
                    <h2>About the API</h2>
                    <p>The data in this API was collected from the Multnomah County Detention Center's <a href="http://www.mcso.us/PAID/">inmate information page</a>.
                    <br>
                    <br>
                    <p><span class="queryinfo">NOTE: Get ALL routes are paged. Use ?page=[page number] and ?perPage=[records per page]</span></p>
                    <ul>
                    <h3>Person Routes</h3>
                        <li>
                        <span class="routes">Get ALL persons - </span><a class="paths" href="https://mult-co-jail-data.herokuapp.com/api/v1/persons" target="_blank">https://mult-co-jail-data.herokuapp.com/api/v1/persons</a>
                        </li>
                        <li>
                        <span class="routes">Query person subsets by keys - <a class="paths" href="https://mult-co-jail-data.herokuapp.com/api/v1/persons/?race=White" target="_blank">/?race=White</a> or <a class="paths" href="https://mult-co-jail-data.herokuapp.com/api/v1/persons/?gender=Male" target="_blank">/?gender=Male</a>
                        </li>
                        <li>
                        <span class="routes">Get count by RACE - </span><a class="paths" href="https://mult-co-jail-data.herokuapp.com/api/v1/persons/countByRace" target="_blank">/countByRace</a>
                        </li>
                        <li>
                        <span class="routes">Get count by GENDER - </span><a class="paths" href="https://mult-co-jail-data.herokuapp.com/api/v1/persons/countByGender" target="_blank">/countByGender</a>
                        </li>
                        <li>
                        <span class="routes">Get count by AGE - </span><a class="paths" href="https://mult-co-jail-data.herokuapp.com/api/v1/persons/countByAgeRange" target="_blank">/countByAgeRange</a>
                        </li>

                        <h3>Detention Routes</h3>
                        <li>
                        <span class="routes">Get ALL detentions - </span><a class="paths" href="https://mult-co-jail-data.herokuapp.com/api/v1/detentions" target="_blank">https://mult-co-jail-data.herokuapp.com/api/v1/detentions</a>
                        </li>
                        <li>
                        <span class="routes">Query detention subsets by keys - <a class="paths" href="https://mult-co-jail-data.herokuapp.com/api/v1/detentions/?arrestingAgency=Gresham+Police+Department" target="_blank">/?arrestingAgency=Gresham+Police+Department</a>
                        </li>
                        <li>
                        <span class="routes">Get count by AGENCY - </span><a class="paths" href="https://mult-co-jail-data.herokuapp.com/api/v1/detentions/countByAgency" target="_blank">/countByAgency</a>
                        </li>
                        <li>
                        <span class="routes">Get count by BOOKING TIME - </span><a class="paths" href="https://mult-co-jail-data.herokuapp.com/api/v1/detentions/countByTime" target="_blank">/countByTime</a>
                        </li>
                        <li>
                        <span class="routes">Get average detention DURATION - </span><a class="paths" href="https://mult-co-jail-data.herokuapp.com/api/v1/detentions/avgDetentionDuration" target="_blank">/avgDetentionDuration</a>
                        </li>
                        <li>
                        <span class="routes">Get average duration by RACE - </span><a class="paths" href="https://mult-co-jail-data.herokuapp.com/api/v1/detentions/avgDetentionByRace" target="_blank">/avgDetentionByRace</a>
                        </li>
                        <li>
                        <span class="routes">Get average detention by GENDER - </span><a class="paths" href="https://mult-co-jail-data.herokuapp.com/api/v1/detentions/avgDetentionByGender" target="_blank">/avgDetentionByGender</a>
                        </li>
                        <li>
                        <span class="routes">Get CHARGE count by RACE - </span><a class="paths" href="https://mult-co-jail-data.herokuapp.com/api/v1/detentions/countChargesByRace" target="_blank">/countChargesByRace</a>
                        </li>
                        <li>
                        <span class="routes">Get charge count by AGENCY - </span><a class="paths" href="https://mult-co-jail-data.herokuapp.com/api/v1/detentions/countChargesByAgency" target="_blank">/countChargesByAgency</a>
                        </li>
                        <li>
                        <span class="routes">Get charge count by GENDER- </span><a class="paths" href="https://mult-co-jail-data.herokuapp.com/api/v1/detentions/countChargesByGender" target="_blank">/countChargesByGender</a>
                        </li>
                        <li>
                        <span class="routes">Get ALL court cases - </span><a class="paths" href="https://mult-co-jail-data.herokuapp.com/api/v1/courtCases" target="_blank">https://mult-co-jail-data.herokuapp.com/api/v1/courtCases</a>
                        </li>
                    </ul>

                    <h3></h3>
                </div>
                <div class="about">
                    <h3></h3>
                    <p></p>
                </div>
                <div class="sample-data">
                    <h2>Sample Detention Record</h2>
                        <table class="sample-table">
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
                                <li>race: White</li>
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
