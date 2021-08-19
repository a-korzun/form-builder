import { parseForm } from '.';
import renderer from 'react-test-renderer';

const json = '{"title":"My Awesome Form","items":[{"label":"number","type":"number","value":42},{"label":"text","type":"text","value":"Hello There"},{"label":"textarea","type":"textarea","value":"Lorem ipsum"},{"label":"checkbox","type":"checkbox","value":"bar","options":[{"label":"Foo","value":"foo"},{"label":"Bar","value":"bar"}]},{"label":"date","type":"date","value":"2007-09-03"},{"label":"radio","type":"radio","name":"FooBar","value":"bar","options":[{"label":"Foo","value":"foo"},{"label":"Bar","value":"bar"}]}],"buttons":[{"type":"button","label":"Cancel"},{"type":"button","label":"Ok"},{"type":"submit","label":"Apply"}]}';

describe('parseForm', () => {
  test('parse title', () => {
    const [title] = parseForm(json);

    expect(title).toBe('My Awesome Form');
  });

  test('parse body', () => {
    const [, body] = parseForm(json);

    const component = renderer.create(
      <>
        {body}
      </>
    );

    const tree = component.toJSON();

    expect(JSON.stringify(tree)).toEqual(JSON.stringify([
      {"type":"label","props":{},"children":["number"," ",{"type":"input","props":{"type":"number","defaultValue":42},"children":null}]},
      {"type":"label","props":{},"children":["text"," ",{"type":"input","props":{"type":"text","defaultValue":"Hello There"},"children":null}]},
      {"type":"label","props":{},"children":["textarea"," ",{"type":"textarea","props":{"defaultValue":"Lorem ipsum"},"children":null}]},
      {"type":"fieldset","props":{},"children":[
        {"type":"legend","props":{},"children":["checkbox"]},
        {"type":"label","props":{},"children":["Foo",{"type":"input","props":{"type":"checkbox","defaultValue":"foo","defaultChecked":false},"children":null}]},
        {"type":"label","props":{},"children":["Bar",{"type":"input","props":{"type":"checkbox","defaultValue":"bar","defaultChecked":true},"children":null}]}
      ]},
      {"type":"label","props":{},"children":["date"," ",{"type":"input","props":{"type":"date","defaultValue":"2007-09-03"},"children":null}]},
      {"type":"fieldset","props":{},"children":[
        {"type":"legend","props":{},"children":["radio"]},
        {"type":"label","props":{},"children":["Foo",{"type":"input","props":{"name":"FooBar","type":"radio","defaultValue":"foo","defaultChecked":false},"children":null}]},
        {"type":"label","props":{},"children":["Bar",{"type":"input","props":{"name":"FooBar","type":"radio","defaultValue":"bar","defaultChecked":true},"children":null}]}
      ]}
    ]));
  });

  test('parse footer', () => {
    const [, , footer] = parseForm(json);

    const component = renderer.create(
      <>
        {footer}
      </>
    );

    const tree = component.toJSON();

    expect(JSON.stringify(tree)).toEqual(JSON.stringify([
      {"type":"button","props":{"type":"button"},"children":["Cancel"]},
      {"type":"button","props":{"type":"button"},"children":["Ok"]},
      {"type":"button","props":{"type":"submit"},"children":["Apply"]}
    ]));
  });
});