import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/images/Logo.png'
import SplashScreen from '../components/Splash_Screen';
import { useTranslation } from 'react-i18next';

function Home() {
  const {t, i18n} = useTranslation();

  // Function to change language
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'pl' : 'en';
    i18n.changeLanguage(newLang);
  };

  const cards = [
    {
      title: t('home.urgent_important'),
      color: 'bg-red-400',
      hoverColor: 'hover:bg-red-500',
      path: '/urgent-important',
      textColor: 'text-gray-800',
      icon: (
        <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
        </svg>
      )
    },
    {
      title: t('home.urgent_not_important'),
      color: 'bg-orange-400',
      hoverColor: 'hover:bg-orange-500',
      path: '/urgent-not-important',
      textColor: 'text-gray-800',
      icon: (
        <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
        </svg>
      )
    },
    {
      title: t('home.important_not_urgent'),
      color: 'bg-blue-300',
      hoverColor: 'hover:bg-blue-400',
      path: '/important-not-urgent',
      textColor: 'text-gray-800',
      icon: (
        <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
        </svg>
      )
    },
    {
      title: t('home.not_urgent_not_important'),
      color: 'bg-purple-300',
      hoverColor: 'hover:bg-purple-400',
      path: '/not-urgent-not-important',
      textColor: 'text-gray-800',
      icon: (
        <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path>
        </svg>
      )
    },
  ];

  // Navigation items with labels
  const navItems = [
    // {
    //   path: '/',
    //   label: 'Home',
    //   icon: (
    //     <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    //       <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
    //     </svg>
    //   )
    // },
    {
      path: '/calendar',
      label: t('home.calendar'),
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path>
        </svg>
      ) 
    },
    // {
    //   path: '/settings',
    //   label: t('home.settings'),
    //   icon: (
    //     <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    //       <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path>
    //     </svg>
    //   )
    // }
  ];

  return (
    <div className="flex flex-col h-screen"
      style={{
        background: "linear-gradient(135deg, rgba(197, 255, 236, 0.7) 0%, rgba(255, 248, 214, 0.7) 40%, rgba(243, 233, 255, 0.6) 60%, rgba(255, 233, 235, 0.6) 100%)"
      }}>
        
      {/* Header */}
      <header className="p-4 flex mt-5 items-center justify-between">
        <Link to="/" element={<SplashScreen />}>
          <img src={logo} alt="logo" className="md:h-16 h-12 mb-5 w-auto" />
        </Link>
        <div className="flex items-center space-x-2">
          {/* Language Toggle Button */}
          <button
            onClick={toggleLanguage}
            className="p-2 rounded-full bg-white bg-opacity-50 hover:bg-opacity-80 transition-all text-gray-800 flex items-center space-x-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
            </svg>
            <span className="text-sm">{i18n.language === 'en' ? 'EN' : 'PL'}</span>
          </button>
          {/* Settings Button */}
          {/* <button className="p-2 rounded-full bg-white bg-opacity-50 hover:bg-opacity-80 transition-all text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              ></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </button> */}
        </div>
      </header>
      
      {/* Cards container */}
      <div className="flex-1 px-4 pb-4 overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:py-6 md:max-w-4xl mx-auto">
          {cards.map((card) => (
            <Link to={card.path} key={card.title} className="block transform transition-all duration-300 hover:scale-105">
              <div className={`p-6 rounded-2xl ${card.color} ${card.hoverColor} ${card.textColor} text-center shadow-md hover:shadow-lg flex flex-col items-center justify-center min-h-42 transition-all duration-300`}>
                {card.icon}
                <h2 className="text-2xl font-medium">{card.title}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Navigation footer */}
      <nav className="flex justify-evenly p-3 bg-white shadow-md">
        {navItems.map((item) => (
          <Link 
            to={item.path} 
            key={item.path} 
            className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors duration-300 px-4 py-2 rounded-lg hover:bg-gray-50"
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default Home;