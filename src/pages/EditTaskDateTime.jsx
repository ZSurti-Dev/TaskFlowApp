import { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import arrow from '../assets/images/Arrow - Left.png';

function EditTaskDateTime() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { task: locationTask, quadrantType } = location.state || {};

  const [task, setTask] = useState(null);
  const [dateTime, setDateTime] = useState('');
  const [taskQuadrant, setTaskQuadrant] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Debug logs
  useEffect(() => {
    console.log('EditTaskDateTime mounted');
    console.log('Location state:', location.state);
    console.log('Task ID from params:', id);
    console.log('Quadrant type:', quadrantType);
  }, [location.state, id, quadrantType]);

  useEffect(() => {
    if (locationTask) {
      console.log('Using location task:', locationTask);
      setTask(locationTask);
      setDateTime(locationTask.dateTime || '');
      setTaskQuadrant(quadrantType || 'urgent-important');
      setIsLoading(false);
    } else {
      console.log('Looking for task in localStorage');
      const currentQuadrant = quadrantType || 'urgent-important';
      const quadrantTasks = JSON.parse(localStorage.getItem(`${currentQuadrant}_tasks`) || '[]');
      console.log(`Stored tasks for ${currentQuadrant}:`, quadrantTasks);

      const taskId = parseInt(id);
      console.log('Looking for task ID:', taskId);
      const foundTask = quadrantTasks.find((t) => t.id === taskId);
      console.log('Found task:', foundTask);

      if (foundTask) {
        setTask(foundTask);
        setDateTime(foundTask.dateTime || '');
        setTaskQuadrant(currentQuadrant);
        setIsLoading(false);
      } else {
        console.log('Task not found, redirecting');
        navigate(`/${quadrantType || 'urgent-important'}`);
      }
    }
  }, [locationTask, navigate, id, quadrantType]);

  const handleSave = () => {
    if (!task) {
      console.log('No task to save');
      return;
    }

    const updatedTask = { ...task, dateTime };
    console.log('Saving updated task:', updatedTask);
    console.log('To quadrant:', taskQuadrant);

    const storedTasks = JSON.parse(localStorage.getItem(`${taskQuadrant}_tasks`) || '[]');
    console.log(`Current stored tasks for ${taskQuadrant}:`, storedTasks);

    const updatedTasks = storedTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t));

    console.log(`Updated tasks list for ${taskQuadrant}:`, updatedTasks);
    localStorage.setItem(`${taskQuadrant}_tasks`, JSON.stringify(updatedTasks));
    console.log(`Saved to localStorage for ${taskQuadrant}`);

    console.log('Navigating back with updated task');
    navigate(`/${taskQuadrant}`, {
      state: { updatedTask, quadrantType: taskQuadrant },
      replace: true,
    });
  };

  // Map quadrant names to translation keys
  const quadrantTranslationKey = taskQuadrant.replace(/-/g, '_');
  const translatedQuadrant = t(`calendar.category_options.${quadrantTranslationKey}`);

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-blue-50 to-green-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-600">{t('edit_task_date_time.loading')}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-green-50">
      <div className="bg-white p-4 flex items-center shadow-sm">
        <button
          onClick={() => navigate(`/${taskQuadrant}`)}
          className="text-gray-800 mr-4"
        >
          <img src={arrow} alt="back" className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">{t('edit_task_date_time.title')}</h1>
      </div>
      <div className="flex-1 p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="text-lg font-medium text-gray-800 mb-1">{task?.title}</h2>
          <div className="text-sm text-gray-500">
            {dateTime
              ? new Date(dateTime).toLocaleString([], {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : t('edit_task_date_time.no_date_set')}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {t('edit_task_date_time.quadrant_label')}: {translatedQuadrant}
          </div>
        </div>
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white mb-4"
        />
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate(`/${taskQuadrant}`)}
            className="p-3 border border-gray-300 rounded-lg text-gray-800 font-medium bg-white hover:bg-gray-50 transition-colors"
          >
            {t('edit_task_date_time.cancel')}
          </button>
          <button
            onClick={handleSave}
            className="p-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
          >
            {t('edit_task_date_time.save')}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditTaskDateTime;