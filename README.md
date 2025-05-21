TaskFlow - Eisenhower Matrix Task Manager
Taskflow is a React-based task management application built using the Eisenhower Matrix framework. It helps users prioritize tasks by categorizing them into four quadrants: Urgent & Important, Urgent but not Important, Important but not Urgent, and Not Urgent Not Important. The app includes a calendar for scheduling tasks, supports multiple languages (English and Polish), and stores tasks in the browser's localStorage for persistence.
Features

Eisenhower Matrix Task Management:

Organize tasks into four quadrants based on urgency and importance.
Add, edit, delete, and mark tasks as done within each quadrant.


Task Scheduling:

Schedule tasks with a date and time using the EditTaskDateTime component.
View scheduled tasks on an integrated calendar (Calendar component).


Multilingual Support:

Switch between English and Polish languages using i18next and react-i18next.
All UI elements, including labels and messages, are translated.


Persistent Storage:

Tasks are stored in the browser's localStorage, ensuring data persists across browser sessions.
Data is local to the user’s browser and device (no server-side storage).


Responsive Design:

Built with Tailwind CSS for a responsive and modern UI.
Works seamlessly on both desktop and mobile devices.


Deployment:

Deployed on Vercel for fast and reliable hosting.
Accessible at: 



Functionality

Home Page:

Displays the four Eisenhower Matrix quadrants.
Users can add tasks to any quadrant, edit task details, mark tasks as done, or delete them.
Language toggle allows switching between English and Polish.


Task Scheduling:

From any quadrant, users can schedule a task by selecting a date and time.
Scheduled tasks are saved to localStorage and displayed on the calendar.


Calendar View:

Shows a monthly calendar with tasks marked on their scheduled dates.
Users can add new events directly on the calendar or view tasks scheduled from the quadrants.
Events are color-coded based on their quadrant category.


Settings:

Navigation to a settings page (placeholder for future features like theme selection or data export).



Getting Started
Prerequisites

Node.js: Ensure Node.js is installed (version 14 or higher recommended).
Git: Required to clone the repository.

Installation

Clone the repository:git clone <your-github-repo-url>
cd taskmaster


Install dependencies:npm install


Start the development server:npm start

The app will be available at http://localhost:3000.

Deployment
The app is deployed on Vercel. To deploy your own instance:

Push your code to a GitHub repository.
Sign up for Vercel and import your repository.
Vercel will automatically detect the React app and deploy it. No additional configuration is needed for a Create React App project.

Technologies Used

React: Frontend framework for building the UI.
React Router: For navigation between pages.
i18next & react-i18next: For internationalization (English and Polish translations).
Tailwind CSS: For styling and responsive design.
localStorage: For client-side task persistence.
Vercel: For deployment and hosting.

Future Enhancements

Add server-side storage to sync tasks across devices.
Implement user authentication for personalized task management.
Add export/import functionality for tasks.
Expand language support to include more languages.

Contributing
Contributions are welcome! Please fork the repository, create a new branch, and submit a pull request with your changes.
License
This project is licensed under the MIT License.
