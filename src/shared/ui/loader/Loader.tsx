import React from 'react';
import BlocksShuffle from './svg/BlocksShuffle';

export const Loader: React.FC<React.HTMLProps<HTMLDivElement> & { text?: string }> = ({ text, style, ...props }) => {
  return (
    <div style={{ ...s.loader, ...style }} {...props}>
      <BlocksShuffle style={s.svg} />
      <div style={s.text}>{text}</div>
    </div>
  );
};

const s: Record<string, React.CSSProperties> = {
  loader: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px'
  },
  svg: {
    width: '40px',
    height: '40px',
    fill: 'var(--light-500)'
  },
  text: {
    color: 'var(--light-500)',
    fontSize: 'var(--font-size-s)',
    textAlign: 'center'
  }
};
