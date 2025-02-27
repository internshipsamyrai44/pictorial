import React, { useState } from 'react';
import s from './Carousel.module.scss';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';

type Props = {
  children: React.ReactNode[];
};

export const Carousel: React.FC<Props> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const slideNext = () => {
    setActiveIndex((val) => {
      if (val >= children.length - 1) {
        return 0;
      } else {
        return val + 1;
      }
    });
  };

  const slidePrev = () => {
    setActiveIndex((val) => {
      if (val <= 0) {
        return children.length - 1;
      } else {
        return val - 1;
      }
    });
  };

  return (
    <div className={s.container}>
      {children.map((item, index) => {
        return (
          <div className={`${s.item} ${activeIndex === index ? s.active : s.inactive}`} key={index}>
            {item}
          </div>
        );
      })}

      {children.length > 1 && (
        <div className={s.links}>
          {children.map((_, index) => (
            <Button
              key={index}
              className={activeIndex === index ? `${s.small} ${s.active}` : s.small}
              onClick={() => {
                setActiveIndex(index);
              }}
            ></Button>
          ))}
        </div>
      )}

      {children.length > 1 && (
        <>
          <Button
            variant="ghost"
            className={s.next}
            onClick={(e) => {
              e.preventDefault();
              slideNext();
            }}
            aria-label="Next slide"
          ></Button>
          <Button
            variant="ghost"
            className={s.prev}
            onClick={(e) => {
              e.preventDefault();
              slidePrev();
            }}
            aria-label="Previous slide"
          ></Button>
        </>
      )}
    </div>
  );
};
