import React, { useCallback, memo } from 'react';
import styled from 'styled-components';

const fieldWitdh = 300;
const labelWidth = 150;

const RadioGroup = styled.div`
  ::before {
    content: '${props => props.label}';
    display: inline-flex;
    height: 30px;
    line-height: .7;
    vertical-align: top;
    position: absolute;
    margin-left: -${labelWidth - 10}px;
    color: black
  }

  display: inline-flex;
  line-height: .7;
  padding: 10px;
  margin-left: ${labelWidth - 10}px;
  margin-bottom: 1em;
  width: ${fieldWitdh}px;
  
  > div {
    display: flex;
    flex-direction: column;
  }
`;

const Radio = memo(styled.div`
  width: 18px;
  height: 18px;
  line-height: 16px;
  border-radius: 50%;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  display: block;
  position: relative;
  cursor: pointer;

  ::before {
    display: ${props => (props.selected ? 'block' : 'none')};
    content: '';
    background: black;
    width: 100%;
    position: absolute;
    height: 100%;
    border-radius: 50%;
    border: 3px solid white;
  }

  ::after {
    display: block;
    position: absolute;
    margin-left: 30px;
    content: attr(data-option);
    white-space: pre;
  }
`);

export default memo(({ value, options, label, onChange }) => {
  const onClick = useCallback(
    e => {
      const value = e.target.getAttribute('data-option');
      onChange(value);
    },
    [onChange]
  );

  const onKey = useCallback(
    e => {
      if ([13, 32].includes(e.keyCode)) {
        onClick(e);
      }
    },
    [onClick]
  );

  return (
    <RadioGroup label={label}>
      <div>
        {options.map(option => (
          <Radio
            tabIndex={0}
            onKeyUp={onKey}
            data-option={option}
            onClick={onClick}
            key={option}
            selected={option === value}
          />
        ))}
      </div>
    </RadioGroup>
  );
});
