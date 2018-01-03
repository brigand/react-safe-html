var React = require('react');
var PropTypes = require('prop-types');
var parse = require('./parse');
var toReactElements = require('./toReactElements.js');
var components = require('./components');

class ReactSafeHtml extends React.Component {
  static propTypes = {
    html: PropTypes.string,
    components: PropTypes.object, // e.g. {div: Component}
  };

  static defaultProps = {
    components: components.makeElements(components.standardAllowedProps),
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.html !== this.props.html;
  }

  render() {
    var parsed = parse(this.props.html + ' ');
    var tree = toReactElements(parsed, this.props.components);
    return tree;
  }
};

ReactSafeHtml.components = components;

module.exports = ReactSafeHtml;

