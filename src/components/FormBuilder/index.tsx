import React from 'react';

import { uniqId } from '../../utils/uniqId';

import './style.css';

interface Props {
  data: string;
}

const itemTypes = [
  'number',
  'text',
  'textarea',
  'checkbox',
  'date',
  'radio',
] as const;

type ItemTypes = typeof itemTypes[number];

interface Item {
  type: ItemTypes;
  label: string;
  value?: string;
  name?: string;
  options?: { label: string; value: string }[];
}

interface Button {
  type: 'button' | 'submit';
  label: string;
}

const renderer: Record<ItemTypes, (it: Item) => React.ReactElement> = {
  number: ({ label, value }: Item) => <label key={uniqId()}>{label} <input type="number" defaultValue={value} /></label>,
  text: ({ label, value }: Item) => <label key={uniqId()}>{label} <input type="text" defaultValue={value} /></label>,
  date: ({ label, value }: Item) => <label key={uniqId()}>{label} <input type="date" defaultValue={value} /></label>,
  textarea: ({ label, value }: Item) => <label key={uniqId()}>{label} <textarea defaultValue={value} /></label>,
  checkbox: ({ label, value, options = [] }: Item) => (
    <fieldset key={uniqId()}>
      <legend>{label}</legend>
      {options.map(o => <label key={o.value}>{o.label}<input type="checkbox" defaultValue={o.value} defaultChecked={o.value === value} /></label>)}
    </fieldset>
  ),
  radio: ({ label, value, name = Math.random() + '', options = [] }: Item) => (
    <fieldset key={uniqId()}>
      <legend>{label}</legend>
      {options.map(o => (
        <label key={o.value}>{o.label}<input name={name} type="radio" defaultValue={o.value} defaultChecked={o.value === value} /></label>)
      )}
    </fieldset>
  ),
}

function isValidItem(item: unknown): item is Item {
  const it = item as Item;

  return it.type !== undefined &&
    typeof it.type === 'string' &&
    itemTypes.includes(it.type);
}

function isValidButton(button: unknown): button is Button {
  const btn = button as Button;

  return (btn.type === 'button' || btn.type === 'submit') && btn.label !== undefined;
}

export function parseForm(json: string) {
  try {
    var { items, title, buttons } = JSON.parse(json);
  } catch (err) {
    return ['', '', ''];
  }

  const inputs = items.map((it: unknown) => {
    if (isValidItem(it)) {
      return renderer[it.type](it);
    }

    return null;
  });

  const footer = buttons.map((it: unknown) => {
    if (isValidButton(it)) {
      return <button key={uniqId()} type={it.type}>{it.label}</button>
    }

    return null;
  });

  return [title, inputs, footer];
}

function FormBuilder({ data }: Props) {
  const [title, body, buttons] = parseForm(data);

  if (!title && !body && !buttons) {
    return <h3 className="form-builder__error">Error during parsing, perhaps JSON is not valid</h3>;
  }
  const head = title ? <h2>{title}</h2> : null;
  const footer = buttons.length ? <div className="form-builder__footer">{buttons}</div> : null;

  return (
    <form className="form-builder">
      {head}
      {body}
      {footer}
    </form>
  );
}

export default FormBuilder;
