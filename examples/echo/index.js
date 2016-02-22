var React = require('react');
var ReactDOM = require('react-dom');
var ReactSafeHtml = require('../../');

const INITIAL_HTML = `
<h1>Hello</h1>
<p>
  Attributes like onerror aren't passed through by default
  <img src="/" onerror="alert('hax')">
</p>
<p>
  The default <a> behavior sanatizes urls
  <a href="javascript:alert('xss');">hax0r</a>
</p>
`.trim();

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      html: INITIAL_HTML,
    };
  }
  render() {
    return (
      <div>
        <div style={{display: 'inline-block'}}>
          <textarea value={this.state.html} onChange={(e) => this.setState({html: e.target.value})} />
        </div>
        <div style={{border: '1px dashed #666', padding: '0.5em', display: 'inline-block'}}>
          <ReactSafeHtml html={this.state.html} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));


