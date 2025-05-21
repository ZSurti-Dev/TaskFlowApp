import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../assets/images/Logo.png';

function Calendar() {
  const { t } = useTranslation();

  // State for managing calendar data
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    category: 'urgent-important',
    time: '12:00',
  });

  // Navigation items with translated labels
  const navItems = [
    {
      path: '/home',
      label: t('home.title'), // Use translation from Home
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
        </svg>
      ),
    },
    {
      path: '/calendar',
      label: t('calendar.title'),
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
        </svg>
      ),
    },
    // {
    //   path: '/settings',
    //   label: t('home.settings'), // Use translation from Home
    //   icon: (
    //     <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    //       <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path>
    //     </svg>
    //   ),
    // },
  ];

  // Category color mapping
  const categoryColors = {
    'urgent-important': 'bg-red-400',
    'urgent-not-important': 'bg-orange-400',
    'important-not-urgent': 'bg-blue-300',
    'not-urgent-not-important': 'bg-purple-300',
  };

  // Category options with translated labels
  const categoryOptions = [
    { value: 'urgent-important', label: t('calendar.category_options.urgent_important') },
    { value: 'urgent-not-important', label: t('calendar.category_options.urgent_not_important') },
    { value: 'important-not-urgent', label: t('calendar.category_options.important_not_urgent') },
    { value: 'not-urgent-not-important', label: t('calendar.category_options.not_urgent_not_important') },
  ];

  // Mock event data
  useEffect(() => {
    const mockEvents = [
      {
        id: 1,
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
        title: 'Project Deadline',
        description: 'Submit final project',
        category: 'urgent-important',
        time: '14:00',
      },
      {
        id: 2,
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
        title: 'Team Meeting',
        description: 'Weekly sync',
        category: 'important-not-urgent',
        time: '10:00',
      },
      {
        id: 3,
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
        title: 'Coffee Chat',
        description: 'Networking',
        category: 'not-urgent-not-important',
        time: '16:30',
      },
    ];
    setEvents(mockEvents);
  }, []);

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get the first day of the month
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Handle month navigation
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  // Handle date selection
  const handleDateClick = (day) => {
    const newSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newSelectedDate);
  };

  // Handle event form submission
  const handleAddEvent = (e) => {
    e.preventDefault();
    const newEventObj = {
      id: events.length + 1,
      date: selectedDate,
      ...newEvent,
    };
    setEvents([...events, newEventObj]);
    setShowAddEvent(false);
    setNewEvent({
      title: '',
      description: '',
      category: 'urgent-important',
      time: '12:00',
    });
  };

  // Handle event input changes
  const handleEventInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({
      ...newEvent,
      [name]: value,
    });
  };

  // Check if a date has events
  const hasEvents = (day) => {
    return events.some(
      (event) =>
        event.date.getDate() === day &&
        event.date.getMonth() === currentDate.getMonth() &&
        event.date.getFullYear() === currentDate.getFullYear()
    );
  };

  // Get events for selected date
  const getEventsForSelectedDate = () => {
    return events.filter(
      (event) =>
        event.date.getDate() === selectedDate.getDate() &&
        event.date.getMonth() === selectedDate.getMonth() &&
        event.date.getFullYear() === selectedDate.getFullYear()
    );
  };

  // Calendar grid generation
  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
    const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());

    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12 md:h-20"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday =
        day === new Date().getDate() &&
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getFullYear() === new Date().getFullYear();

      const isSelected =
        day === selectedDate.getDate() &&
        currentDate.getMonth() === selectedDate.getMonth() &&
        currentDate.getFullYear() === selectedDate.getFullYear();

      const dayHasEvents = hasEvents(day);

      days.push(
        <div
          key={day}
          onClick={() => handleDateClick(day)}
          className={`h-12 md:h-20 p-1 border border-gray-100 cursor-pointer relative transition-all duration-200
            ${isToday ? 'bg-blue-50' : ''} 
            ${isSelected ? 'ring-2 ring-blue-500 shadow-md' : ''}
            ${dayHasEvents ? 'font-medium' : ''}
            hover:bg-gray-50`}
        >
          <div
            className={`text-sm ${isToday ? 'bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center mx-auto' : ''}`}
          >
            {day}
          </div>
          {dayHasEvents && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
              {events
                .filter(
                  (event) =>
                    event.date.getDate() === day &&
                    event.date.getMonth() === currentDate.getMonth() &&
                    event.date.getFullYear() === currentDate.getFullYear()
                )
                .slice(0, 2)
                .map((event, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full ${categoryColors[event.category]} shadow-sm`}
                  ></div>
                ))}
              {events.filter(
                (event) =>
                  event.date.getDate() === day &&
                  event.date.getMonth() === currentDate.getMonth() &&
                  event.date.getFullYear() === currentDate.getFullYear()
              ).length > 2 && <div className="w-2 h-2 rounded-full bg-gray-400 shadow-sm"></div>}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  // Format for month and year display
  const monthYearFormat = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });

  // Format date for event list
  const dateFormat = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div
      className="flex flex-col h-screen"
      style={{
        background:
          'linear-gradient(135deg, rgba(197, 255, 236, 0.7) 0%, rgba(255, 248, 214, 0.7) 40%, rgba(243, 233, 255, 0.6) 60%, rgba(255, 233, 235, 0.6) 100%)',
      }}
    >
      {/* Header */}
      <header className="p-4 flex mt-5 items-center justify-between">
        <Link to="/">
          <img src={logo} alt="logo" className="md:h-16 h-12 mb-5 w-auto" />
        </Link>
        {/* <div className="flex items-center space-x-2">
          <button
            className="p-2 rounded-full bg-white bg-opacity-50 hover:bg-opacity-80 transition-all text-gray-800"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              ></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </button>
        </div> */}
      </header>

      {/* Calendar container */}
      <div className="flex-1 px-4 pb-4 overflow-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 md:max-w-4xl mx-auto">
          {/* Calendar header */}
          <div className="p-4 bg-white border-b flex items-center justify-between">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <h2 className="text-xl font-semibold text-gray-800">
              {monthYearFormat.format(currentDate)}
            </h2>
            <button
              onClick={handleNextMonth}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 bg-gray-50 border-b">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="text-center py-3 text-sm font-medium text-gray-500">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 bg-white">{renderCalendarGrid()}</div>
        </div>

        {/* Selected day events */}
        <div className="mt-6 bg-white rounded-2xl shadow-lg p-4 md:max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            {dateFormat.format(selectedDate)}
          </h3>
          <div className="space-y-3">
            {getEventsForSelectedDate().length > 0 ? (
              getEventsForSelectedDate().map((event) => (
                <div
                  key={event.id}
                  className={`p-3 rounded-lg shadow-sm border-l-4 ${categoryColors[event.category]}`}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold">{event.title}</h4>
                    <span className="text-sm text-gray-600">{event.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">{t('calendar.no_events')}</p>
            )}
          </div>
          <button
            onClick={() => setShowAddEvent(true)}
            className="mt-4 w-full py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg flex items-center justify-center space-x-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            <span>{t('calendar.add_event')}</span>
          </button>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">{t('calendar.add_event')}</h3>
              <button
                onClick={() => setShowAddEvent(false)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddEvent}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('calendar.title_label')}</label>
                <input
                  type="text"
                  name="title"
                  value={newEvent.title}
                  onChange={handleEventInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('calendar.description_label')}</label>
                <textarea
                  name="description"
                  value={newEvent.description}
                  onChange={handleEventInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('calendar.date_label')}</label>
                  <div className="px-3 py-2 border border-gray-300 rounded-lg bg-gray-50">
                    {selectedDate.toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('calendar.time_label')}</label>
                  <input
                    type="time"
                    name="time"
                    value={newEvent.time}
                    onChange={handleEventInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('calendar.category_label')}</label>
                <select
                  name="category"
                  value={newEvent.category}
                  onChange={handleEventInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddEvent(false)}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {t('calendar.cancel')}
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {t('calendar.save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Navigation footer */}
      <nav className="flex justify-evenly p-3 bg-white shadow-md">
        {navItems.map((item) => (
          <Link
            to={item.path}
            key={item.path}
            className={`flex flex-col items-center transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-gray-50 ${
              item.path === '/calendar'
                ? 'text-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-blue-600'
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Calendar;