var toReactElements = require('../toReactElements.js');
var log = (x) => console.log(JSON.stringify(x, null, 2));
var types = {
  div: () => ({}),
};

it('toReactElements basic', () => {
  // TODO: fix the tes
  return;
  var res = toReactElements({
    type: 'div', props: {}, children: [
      {type: 'not-allowed', props: {skipThis: true}, children: ['a child']}
    ],
  }, types);
  expect(res).toMatchSnapshot();
});

