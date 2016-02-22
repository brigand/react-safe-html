var toReactElements = require('../toReactElements.js');
var {expect} = require('chai');
var log = (x) => console.error(JSON.stringify(x, null, 2));

var types = {
  div: () => ({}),
};

describe('toReactElements', () => {
  it('basic example ', () => {
    var res = toReactElements({
      type: 'div', props: {}, children: [
        {type: 'not-allowed', props: {skipThis: true}, children: ['a child']}
      ],
    }, types);
    log(res);
    expect(res).to.deep.equal({
      type: types.div,
      props: {
        children: [
          {
            type: 'span',
            key: 0,
            props: {
              children: ['a child']
            }
          }
        ]
      }
    });
  });
});

