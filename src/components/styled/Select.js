import React, { memo, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';

const labelWidth = 150;
const fieldWitdh = 300;

const OptionList = styled.div`
  position: absolute;
  top: 30px;
  left: 0%;
  width: 100%;
  background: white;
  z-index: 1;
  border: 1px solid #ccc;
`;

const Select = styled.div`
  cursor: pointer;
  
  ::before {
    content: '${props => props.label}';
    display: inline-flex;
    height: 30px;
    line-height: .7;
    vertical-align: top;
    position: absolute;
    margin-left: -${labelWidth}px;
    color: black;
    padding: 10px;
  }

  ::after {
    content: '${props => (props.isOpen ? '▼' : '◄')}';
    border-left: 1px solid #ccc;
    width: 30px;
    height: 25px;
    position: absolute;
    right: 0;
    top: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  display: inline-flex;
  border: 1px solid #ccc;
  height: 30px;
  line-height: .7;
  margin-left: ${labelWidth}px;
  margin-bottom: 1em;
  width: ${fieldWitdh}px;
  position:relative;
  border-radius: 3px;  

  ${OptionList} {
    display: ${props => (props.isOpen ? 'block' : 'none')}
  }
`;

const SelectText = styled.div`
  padding: 10px;
  width: 100%;
`;

const Option = styled.div`
  padding: 10px;

  :not(:last-child) {
    border-bottom: 1px solid #ccc;
  }

  :hover {
    background: #fafafa;
  }
`;

const fixMax = (next, max) => {
  if (next > max) next = 0;
  if (next < 0) next = max;
  return next;
};

export default memo(({ label, options, value, onChange }) => {
  const select = useRef();
  const [optionsRefs] = useState(options.map(o => useRef()));
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = useCallback(() => setIsOpen(isOpen => !isOpen), [
    setIsOpen,
  ]);

  const onSelect = useCallback(e => onChange(e.target.innerText), [onChange]);

  const onSelectKey = useCallback(
    e => {
      if ([13].includes(e.keyCode)) {
        toggleIsOpen();
      }
      if ([32, 40].includes(e.keyCode)) {
        setIsOpen(true);
      }
      if ([40].includes(e.keyCode)) {
        optionsRefs[0].current.focus();
      }
      if ([27].includes(e.keyCode)) {
        setIsOpen(false);
      }
    },
    [setIsOpen, optionsRefs, toggleIsOpen]
  );

  const onOptionKey = useCallback(
    e => {
      if ([13, 38].includes(e.keyCode)) {
        const value = e.target.innerText;
        onChange(value);
      }
      if ([40, 38].includes(e.keyCode)) {
        const idx = optionsRefs.findIndex(o => o.current === e.target);
        const max = optionsRefs.length - 1;
        const next = fixMax(e.keyCode === 40 ? idx + 1 : idx - 1, max);

        optionsRefs[next].current.focus();
        e.stopPropagation();
      }
    },
    [onChange, optionsRefs]
  );

  return (
    <Select
      ref={select}
      isOpen={isOpen}
      onKeyUp={onSelectKey}
      label={label}
      value={value}
      onClick={toggleIsOpen}
    >
      <SelectText tabIndex={0}>{value || ' '}</SelectText>
      <OptionList>
        {options.map((option, i) => (
          <Option
            onKeyUp={onOptionKey}
            tabIndex={0}
            ref={optionsRefs[i]}
            onClick={onSelect}
            key={option}
          >
            {option}
          </Option>
        ))}
      </OptionList>
    </Select>
  );
});
