import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import arrow from '../assets/images/Arrow - Left.png';  
import clock from '../assets/images/clock_icon.png';

function UrgentImportant() {

  const {t} = useTranslation(); //Initialize translation hook
  const location = useLocation();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const quadrantType = 'urgent-important'; // Define the quadrant type for this component

  const [newTask, setNewTask] = useState('');
  const [newTaskDateTime, setNewTaskDateTime] = useState('');

  // Debug logs
  useEffect(() => {
    console.log('UrgentImportant mounted');
    console.log('Location state:', location.state);
  }, [location.state]);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    console.log('Loading tasks from localStorage');
    const storedTasks = JSON.parse(localStorage.getItem(`${quadrantType}_tasks`) || '[]');
    console.log(`Loaded ${quadrantType} tasks:`, storedTasks);
    setTasks(storedTasks);
  }, []);

  // Check for updated task in location state when returning from edit screen
  useEffect(() => {
    if (location.state?.updatedTask) {
      const { updatedTask, quadrantType: returnedQuadrant } = location.state;
      console.log('Received updated task:', updatedTask);
      console.log('From quadrant:', returnedQuadrant);
      
      // Only process if the task belongs to this quadrant
      if (returnedQuadrant === quadrantType) {
        // Update the task in the state
        setTasks(prevTasks => {
          console.log('Previous tasks:', prevTasks);
          const updatedTasks = prevTasks.map(task => 
            task.id === updatedTask.id ? updatedTask : task
          );
          console.log('Updated tasks array:', updatedTasks);
          
          // Also update in localStorage
          localStorage.setItem(`${quadrantType}_tasks`, JSON.stringify(updatedTasks));
          console.log(`Saved updated tasks to localStorage for ${quadrantType}`);
          
          return updatedTasks;
        });
      }
        
      // Clear the location state to prevent duplicate updates
      window.history.replaceState({}, document.title);
      console.log('Cleared location state');
    }
  }, [location.state]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      const newTaskItem = {
        id: Date.now(),
        title: newTask,
        dateTime: newTaskDateTime || '',
        status: 'pending',
        quadrant: quadrantType // Store the quadrant with the task
      };
      
      console.log('Adding new task:', newTaskItem);
      const updatedTasks = [...tasks, newTaskItem];
      setTasks(updatedTasks);
      
      // Save to localStorage immediately using the quadrant-specific key
      localStorage.setItem(`${quadrantType}_tasks`, JSON.stringify(updatedTasks));
      console.log(`Saved tasks with new task to localStorage for ${quadrantType}`);
      
      setNewTask('');
      setNewTaskDateTime('');
    }
  };

  const handleStatusChange = (id, newStatus) => {
    console.log(`Changing status of task ${id} to ${newStatus}`);
    const updatedTasks = tasks.map((task) => 
      task.id === id ? { ...task, status: newStatus } : task
    );
    
    setTasks(updatedTasks);
    // Save to localStorage immediately
    localStorage.setItem(`${quadrantType}_tasks`, JSON.stringify(updatedTasks));
    console.log(`Saved status change to localStorage for ${quadrantType}`);
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return '';
    const date = new Date(dateTime);
    return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}) + 
           ' ' + date.toLocaleDateString([], {month: 'short', day: 'numeric'});
  };

  const handleDelete = (id) => {
    console.log(`Deleting task ${id}`);
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
    // Save to localStorage immediately
    localStorage.setItem(`${quadrantType}_tasks`, JSON.stringify(filteredTasks));
    console.log(`Saved tasks after deletion to localStorage for ${quadrantType}`);
  };

  const handleEditDateTime = (task) => {
    console.log('Editing task:', task);
    const taskId = task.id.toString();
    console.log('Navigating to edit with task ID:', taskId);
    // Pass the quadrant type along with the task
    navigate(`/edit-task-datetime/${taskId}`, { 
      state: { 
        task,
        quadrantType 
      } 
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-green-50">
      {/* Header with back button */}
      <div className="p-4 flex items-center bg-white shadow-sm">
        <Link to="/home" className="text-gray-700 mr-2">
          <img src={arrow} alt="arrow-left" className="w-8 h-8" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">{t('urgent_important.title')}</h1>
      </div>

      {/* Task List */} 
      <div className="flex-1 px-4 py-6 space-y-4 overflow-auto">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="text-lg">{t('urgent_important.no_tasks')}</p>
            <p className="text-sm">{t('urgent_important.add_task')}</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div 
              key={task.id} 
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-800">{task.title}</h3>
                    {task.dateTime && (
                      <div className="flex items-center mt-1 text-gray-500">
                        <img src={clock} alt="clock" className="h-4 w-4 mr-1" />
                        <span className="text-sm">{formatDateTime(task.dateTime)}</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleStatusChange(task.id, task.status === 'done' ? 'pending' : 'done')}
                    className={`ml-4 px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                      task.status === 'done' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white text-gray-700 border border-gray-300'
                    }`}
                  >
                    {t('urgent_important.done')}
                  </button>
                </div>
              </div>
              
              <div className="flex border-t border-gray-100">
                <button 
                  onClick={() => handleEditDateTime(task)}
                  className="flex-1 py-2 text-center text-blue-500 hover:bg-blue-50 transition-colors"
                >
                  <span className="flex items-center justify-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    {t('urgent_important.edit')}
                  </span>
                </button>
                <button 
                  onClick={() => handleDelete(task.id)}
                  className="flex-1 py-2 text-center text-red-500 hover:bg-red-50 transition-colors border-l border-gray-100"
                >
                  <span className="flex items-center justify-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    {t('urgent_important.delete')}
                  </span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Task Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <form onSubmit={handleAddTask} className="flex items-center">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Enter Task..."
              className="w-full p-3 pr-24 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <button
                type="button"
                onClick={() => document.getElementById('task-datetime').showPicker()}
                className="text-gray-400 hover:text-gray-600"
              >
                <div className="flex items-center">
                  <span className="text-xs mr-1">{t('urgent_important.schedule')}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </button>
              <input
                id="task-datetime"
                type="datetime-local"
                value={newTaskDateTime}
                onChange={(e) => setNewTaskDateTime(e.target.value)}
                className="hidden"
              />
            </div>
          </div>
          <button
            type="submit"
            className="ml-2 bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors flex-shrink-0"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default UrgentImportant;