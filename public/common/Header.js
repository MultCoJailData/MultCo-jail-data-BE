import Component from '../Component.js';

class Header extends Component {
  renderHTML() {

    return /*html*/`
            <header>
              <div class="bs-header">
                <div class="header-container">
                    <div>
                    </div>
                    <div class="logo">
                        <h2>Multnomah County Jail Data</h2>
                    </div>
                    <div class="nav">
                    <ul>
                      <li class="api"><a class="active" href="../index.html">About the API</a></li>
                      <li class="data"><a href="../data.html">See the Data</a></li>
                      <li class="GitHub"><a href="https://github.com/PanOptiCorp/MCDCdata" class="btn btn-primary btn-large">View On Github</a>
                    </ul>
                  </div>
                </div>
              </div>
            </header>
        `;
  }
}

export default Header;
