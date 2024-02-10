import React, { useEffect, useState, useRef } from 'react';
import './App.css';

const App = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const stickyRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      transform(stickyRef.current);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const transform = (section) => {
    const offsetTop = section.parentElement.offsetTop;
    let percentage = ((window.scrollY - offsetTop) / window.innerHeight) * 100;
    percentage = Math.max(0, Math.min(percentage, 100));
    const centerIndex = Math.round(percentage / 40);
    setActiveIndex(centerIndex);
  };

  return (
    <main>
      {/* Intro Section */}
      <section>
        <div className="container">
          <h1>Start Scroll</h1>
          <p>Lorem ipsum...</p>
        </div>
      </section>

      {/* Sticky Parent Section */}
      <div className="sticky__parent">
        <div className="sticky" ref={stickyRef}>
          <div className="scroll__section">
            {[1, 2, 3].map((num, index) => (
              <Accordion
                key={num}
                id={`accordion-${num}`}
                title={`Accordion ${num}`}
                isActive={activeIndex === index}
              >
                {Array(8).fill(`Content for Accordion ${num}`)}
              </Accordion>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <section>
        <div className="container">
          <h1>End Scroll</h1>
          <p>Lorem ipsum...</p>
        </div>
      </section>
    </main>
  );
};

const Accordion = ({ id, title, isActive, children }) => {
  return (
    <div className="accordion-wrap">
      <input type="radio" name="accordion" id={id} className="accordion-radio" checked={isActive} readOnly />
      <label htmlFor={id} className="accordion-header">{title}</label>
      <div className="accordion-body">
        {children.map((child, index) => <p key={index}>{child}</p>)}
      </div>
    </div>
  );
};

export default App;
