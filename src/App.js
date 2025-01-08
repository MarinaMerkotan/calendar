import { useEffect, useState } from 'react';
import Arrow from './Arrow';
import { getAllDaysOfMonth, isInRange, isToday } from './utils';
import { daysOfWeek, monthNames } from './config';

import './styles.css';

const msg1 = 'The selected range cannot be chosen due to the presence of unavailable days.';
const msg2 = 'The selected day cannot be chosen due to the presence of unavailable days.';

const date = new Date();

const unavailableDays = [4, 5, 17];

function App() {
  const [currentMonth, setCurrentMonth] = useState(date.getMonth());
  const [currentYear, setCurrentYear] = useState(date.getFullYear());
  const [days, setDays] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    const daysOfTheMonth = getAllDaysOfMonth(currentYear, currentMonth).map((item) => ({
      ...item,
      selected: item.active && selectedDays.includes(item.day),
      unavailable: unavailableDays.includes(item.day),
    }));
    setDays(daysOfTheMonth);
  }, [currentYear, currentMonth, selectedDays]);

  const changeToPrevMonth = () => {
    setSelectedDays([]);
    if (currentMonth === 0) {
      setCurrentYear((prev) => prev - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const changeToNextMonth = () => {
    setSelectedDays([]);
    if (currentMonth === 11) {
      setCurrentYear((prev) => prev + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const showAlert = (msg) => {
    setAlertMessage(msg);
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000);
  };

  const selectDay = (item) => {
    if (item.active) {
      if (selectedDays.length === 0 || selectedDays.length > 1) {
        unavailableDays.includes(item.day) ? showAlert(msg2) : setSelectedDays([item.day]);
      } else {
        if (selectedDays[0] === item.day) {
          setSelectedDays([]);
        } else {
          const min = Math.min(item.day, selectedDays[0]);
          const max = Math.max(item.day, selectedDays[0]);
          const inRange = unavailableDays.some((unavailable) => isInRange(unavailable, min, max));
          inRange ? showAlert(msg1) : setSelectedDays(Array.from({ length: max - min + 1 }, (_, i) => i + min));
        }
      }
    }
  };

  const handleDone = () => {
    setSelectedDays([]);
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
        {days.map((item, index) => {
          const classNames = [
            'grid-item',
            !item.active && 'inactive-item',
            item.selected && 'selected-item',
            item.active && item.unavailable && 'unavailable-item',
            item.selected && item.day === selectedDays[0] && 'first-selected',
            item.selected && item.day === selectedDays.at(-1) && 'last-selected',
            item.active && !item.selected && isToday(currentYear, currentMonth, item.day) && 'today-item',
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <div key={index} className={classNames} onClick={() => selectDay(item)}>
              {item.day}
            </div>
          );
        })}
      </div>
      <div className='footer'>
        <button className='done-button' onClick={handleDone}>
          Done
        </button>
      </div>
      {alertMessage && <div className='alert'>{alertMessage}</div>}
    </div>
  );
}

export default App;
