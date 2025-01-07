import { useState } from 'react';
import Arrow from './Arrow';
import { getAllDaysOfMonth, isToday } from './utils';
import { daysOfWeek, monthNames } from './config';

import './styles.css';

const date = new Date();

function App() {
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());
  const [currentYear, setCurrentYear] = useState(date.getFullYear());

  const days = getAllDaysOfMonth(currentYear, currentMonth);

  const changeToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear((prev) => prev - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const changeToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear((prev) => prev + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  return (
    <div className='wrapper'>
      <div className='header'>
        <button className='navigation-button left-navigation-button' onClick={changeToPrevMonth}>
          <Arrow />
        </button>
        <div className='current-date'>
          {monthNames[currentMonth]} {currentYear}
        </div>
        <button className='navigation-button' onClick={changeToNextMonth}>
          <Arrow />
        </button>
      </div>
      <div className='grid-container'>
        {daysOfWeek.map((item) => (
          <div key={item} className='grid-item day'>
            {item}
          </div>
        ))}
        {days.map((item, index) => (
          <div
            key={index}
            className={`grid-item${item.active ? '' : ' inactive-grid-item'}${
              item.active && isToday(currentYear, currentMonth, item.day) ? ' today-grid-item' : ''
            }`}
          >
            {item.day}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
