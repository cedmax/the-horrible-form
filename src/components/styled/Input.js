import React, { useCallback, useRef, memo } from 'react';
import styled from 'styled-components';

const fieldWitdh = 300;
const labelWidth = 150;

const Input = styled.div`
  ::before {
    content: '${props => props.label}';
    display: inline-flex;
    height: 30px;
    line-height: .7;
    vertical-align: top;
    position: absolute;
    margin-left: -${labelWidth}px;
    color: black
  }

  ::after {
    content: '${props => (!!props.value ? props.value : props.placeHolder)}';
    color: ${props => (props.isDefault ? '#ccc' : '#000')};
    display: inline;
    position: absolute;
  }

  display: inline-flex;
  border: 1px solid #ccc;
  height: 30px;
  line-height: .7;
  padding: 10px;
  color: white;
  caret-color: black;
  margin-left: ${labelWidth}px;
  margin-bottom: 1em;
  width: ${fieldWitdh}px;
  overflow: hidden;
  ::selection {
    color: #ACCEF7;
    background: #ACCEF7;
  }
`;

export default memo(({ label, value, placeHolder, onChange = () => {} }) => {
  const input = useRef();
  const callback = useCallback(
    e => {
      var value = input.current.innerText;
      onChange(value);
    },
    [onChange]
  );

  return (
    <Input
      ref={input}
      onInput={callback}
      onBlur={callback}
      isDefault={!value}
      label={label}
      contentEditable
      value={value}
      placeHolder={placeHolder}
    ></Input>
  );
});
