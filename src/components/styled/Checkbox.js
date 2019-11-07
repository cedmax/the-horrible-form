import React, { useCallback } from 'react';
import styled from 'styled-components';

const Checkbox = styled.div`
  ::before {
    display: ${props => (props.selected ? 'block' : 'none')};
    position: absolute;
    content: '✓';

  }

  display: inline-flex;
  line-height: 14px;
  margin: 1em 8px;
  width: 16px;
  height: 16px;
  border: 1px solid #ccc;
  position: relative;
  cursor: pointer;

  ::after {
    content: '${props => props.label}';
    position: absolute;
    margin-left: 30px;
    width: 300px
  }
`;

export default ({ selected, onChange, label }) => {
  const onClick = useCallback(() => {
    onChange(!selected);
  }, [onChange, selected]);

  const onKey = useCallback(
    e => {
      if ([13, 32].includes(e.keyCode)) {
        onClick(e);
      }
    },
    [onClick]
  );

  return (
    <Checkbox
      onKeyUp={onKey}
      tabIndex={0}
      selected={selected}
      onClick={onClick}
      label={label}
    />
  );
};
