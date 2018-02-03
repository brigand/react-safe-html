var React = require('react');
var ReactDOM = require('react-dom');
var { renderToString } = require('react-dom/server');
var ReactSafeHtml = require('../../');
var components = ReactSafeHtml.components.makeElements({});
// delete components.span;

components.div = ReactSafeHtml.components.createSimpleElement('div', {});
components.blockquote = ReactSafeHtml.components.createSimpleElement('blockquote', {});
components.em = ReactSafeHtml.components.createSimpleElement('em', {});
components.p = ReactSafeHtml.components.createSimpleElement('p', {});
components.strong = ReactSafeHtml.components.createSimpleElement('strong', {});
components.ul = ReactSafeHtml.components.createSimpleElement('ul', {});
components.ol = ReactSafeHtml.components.createSimpleElement('ol', {});
components.li = ReactSafeHtml.components.createSimpleElement('li', {});
//components.span = ReactSafeHtml.components.createSimpleElement('span', {
//  class: true
//});
const INITIAL_HTML = `
<div>
<blockquote>1</blockquote>

<div>
  <blockquote>hello <strong>bar</strong></blockquote>
  <p><em>this should show</em></p>
</div>
  </div>
`.trim();

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      html: INITIAL_HTML,
    };
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    var inp = document.querySelector('.demo-a');
    var out = document.querySelector('.demo-b');

    out.textContent = inp.innerHTML;
  }

  render() {
    var display = <ReactSafeHtml html={this.state.html} components={components} />;
    return (
      <div style={{fontSize: '16px'}}>
        <div>
          <textarea value={this.state.html} onChange={(e) => this.setState({html: e.target.value})} style={{width: '500px', height: '500px', fontSize: '1em'}} />
        </div>
        <div style={{border: '1px dashed #666', padding: '0.5em', display: 'inline-block'}} className="demo-a">
          {display}
        </div>
        <hr />

        <pre>{renderToString(display)}</pre>
        <hr />
        <pre className="demo-b">
        </pre>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));


