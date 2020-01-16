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
                    <h3>Routes</h3>
                    <p>Get all persons by gender...</p>
                    <p>female: /persons?gender=Female</p>
                    <p>male: 
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
