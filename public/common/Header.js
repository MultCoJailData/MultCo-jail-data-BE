import Component from '../Component.js';

class Header extends Component {
  renderHTML() {

    return /*html*/`
            <header>
              <div class="bs-header">
                <div class="container">
                    <div class="col-md-6">
                    </div>
                    <div class="col-md-6">
                        <h1>PanOptiCorp</h1>
                        <h2>Multnomah County Jail Data</h2>
                        <p><a href="https://github.com/PanOptiCorp/MCDCdata" class="btn btn-primary btn-large">View On Github</a></p>
                    </div>
                </div>
              </div>
            </header>
        `;
  }
}

export default Header;
