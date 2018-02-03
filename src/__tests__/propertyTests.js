const React = require('react');
const { renderToString } = require('react-dom/server');

var RSH = require('../ReactSafeHtml.js');

var components = {};
var cSE = RSH.components.createSimpleElement;

const allowed = ['y1', 'y2', 'y3', 'y4'];
const disallow = ['n1', 'n2', 'n3'];

var allowProp = 'data-yep';
var disallowProp = 'data-nope';

allowed.forEach((name) => { components[name] = cSE(name, { [allowProp]: true }); });

const choice = xs => xs[Math.floor(Math.random() * xs.length)];

const makeHtml = (tag, attr, child) => {
  return `<${tag} ${attr ? `${attr}="yes"` : ''}>${child}</${tag}>`;
}

const zeroOut = (target, list) => list.forEach((key) => { target[key] = 0 });

describe(`Property tests`, () => {
  const run = html => renderToString(React.createElement(RSH, { html, components })).replace(/^<.*?>/, '').replace(/<\/span>$/, '');

  for (const depth of [1, 2, 3, 4, 5]) {
    it(`works at depth ${depth}`, () => {
      for (let i = 0; i < 15; i += 1) {
        const expected = {};

        zeroOut(expected, allowed);
        zeroOut(expected, disallow);
        zeroOut(expected, [allowProp]);
        zeroOut(expected, [disallowProp]);

        const inputHtml = Array.from({ length: depth }).reduce((html) => {
          const prop = choice([null, allowProp, disallowProp]);

          let tag;
          if (Math.random() > 0.5) {
            tag = choice(allowed);
            expected[tag] += 2;

            if (prop === allowProp) {
              expected[prop] += 1;
            }
          } else {
            tag = choice(disallow);
          }

          return makeHtml(tag, prop, html);
        });
        const resHtml = run(inputHtml);

        const actual = {};
        Object.keys(expected).forEach((key) => {
          const re = new RegExp(`\\b${key}\\b`, 'g');
          const m = resHtml.match(re);
          const count = m ? m.length : 0;
          actual[key] = count;
        });

        try {
          expect(actual).toEqual(expected);
        } catch (e) {
          console.log(`At depth ${depth}:\nFor input\n${inputHtml}\nThe output was\n${resHtml}`);
          expect(actual).toEqual(expected);
        }
      }
    });
  }
});

