var parse = require('../parse.js');
//var {expect} = require('chai');
var log = (x) => console.log(JSON.stringify(x, null, 2));

describe('parse', () => {
  it('parses a simple string', () => {
    var res = parse('<x a="b">foo</x>');
    log(res);
    expect(res).toEqual({
      type: 'div', props: {}, children: [
        {type: 'x', props: {a: 'b'}, children: ['foo']}
      ],
    });
  });

  it(`parses nested elements`, () => {
    var res = parse(`<div>c1<blockquote>c2</blockquote></div>`);
    expect(res).toEqual({
      type: 'div', props: {}, children: [
        {type: 'div', props: {}, children: [
          'c1',
          { type: 'blockquote', props: {}, children: ['c2'] },
        ]}
      ],
    });
  });
});

