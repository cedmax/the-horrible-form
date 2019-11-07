import React, { memo, useCallback } from 'react';
import styled from 'styled-components';

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  font-family: sans-serif;
  cursor: pointer;
  width: 100px;
  height: 40px;
  background: dodgerblue;
  border-radius: 6px;
  transition: all 0.3s cubic-bezier(0.67, 0.17, 0.4, 0.83);
  * {
    pointer-events: none;
  }

  svg {
    transform: rotate(180deg);
    max-width: 100%;
    transition: all 0.5s;
    width: 50%;
  }

  &.circle {
    width: 60px;
    height: 60px;
    background: mediumseagreen;
    border-radius: 50%;
    transform: rotate(-180deg);
    cursor: default;
  }

  div {
    color: white;
    font-size: 1em;
    transition: all 0.9s;
    text-align: center;
  }
`;

const TickMark = () => (
  <svg viewBox="0 0 58 45">
    <path
      fill="#fff"
      fillRule="nonzero"
      d="M19.11 44.64L.27 25.81l5.66-5.66 13.18 13.18L52.07.38l5.65 5.65"
    />
  </svg>
);

export default memo(({ submitted, onClick }) => {
  const submit = useCallback(() => {
    !submitted && onClick();
  }, [onClick, submitted]);

  const onKey = useCallback(
    e => {
      if ([13].includes(e.keyCode)) {
        submit();
      }
    },
    [submit]
  );

  return (
    <Button
      tabIndex={0}
      onClick={submit}
      onKeyUp={onKey}
      className={submitted ? 'circle' : ''}
    >
      <div>{submitted ? <TickMark /> : 'Submit'}</div>
    </Button>
  );
});
