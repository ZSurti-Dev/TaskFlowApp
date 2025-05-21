import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resource for English and Polish
const resources = {
  en: {
    translation: {
      home: {
        title: 'Home',
        urgent_important: 'Urgent & Important',
        urgent_not_important: 'Urgent but not Important',
        important_not_urgent: 'Important but not Urgent',
        not_urgent_not_important: 'Not Urgent Not Important',
        calendar: 'Calendar',
        settings: 'Settings',
      },
      urgent_important: {
        title: 'Urgent & Important',
        no_tasks: 'No tasks yet',
        add_task: 'Add your first task below',
        enter_task: 'Enter Task...',
        schedule: 'Schedule',
        done: 'Done',
        edit: 'Edit',
        delete: 'Delete',
      },
      urgent_not_important: {
        title: 'Urgent but not Important',
        no_tasks: 'No tasks yet',
        add_task: 'Add your first task below',
        enter_task: 'Enter Task...',
        schedule: 'Schedule',
        done: 'Done',
        edit: 'Edit',
        delete: 'Delete',
      },
      important_not_urgent: {
        title: 'Important but not Urgent',
        no_tasks: 'No tasks yet',
        add_task: 'Add your first task below',
        enter_task: 'Enter Task...',
        schedule: 'Schedule',
        done: 'Done',
        edit: 'Edit',
        delete: 'Delete',
      },
      not_urgent_not_important: {
        title: 'Not Urgent Not Important',
        no_tasks: 'No tasks yet',
        add_task: 'Add your first task below',
        enter_task: 'Enter Task...',
        schedule: 'Schedule',
        done: 'Done',
        edit: 'Edit',
        delete: 'Delete',
      },
      calendar: {
        title: 'Calendar',
        add_event: 'Add Event',
        no_events: 'No events scheduled for this day',
        cancel: 'Cancel',
        save: 'Save',
        title_label: 'Title',
        description_label: 'Description',
        date_label: 'Date',
        time_label: 'Time',
        category_label: 'Category',
        category_options: {
          urgent_important: 'Urgent & Important',
          urgent_not_important: 'Urgent but not Important',
          important_not_urgent: 'Important but not Urgent',
          not_urgent_not_important: 'Not Urgent Not Important',
        },
      },
      edit_task_date_time: {
        title: 'Edit Date & Time',
        loading: 'Loading...', // Added missing key
        no_date_set: 'No date set',
        quadrant_label: 'Quadrant',
        cancel: 'Cancel',
        save: 'Save',
      },
    },
  },
  pl: {
    translation: {
      home: {
        title: 'Dom',
        urgent_important: 'Pilne i Ważne',
        urgent_not_important: 'Pilne, ale Nieważne',
        important_not_urgent: 'Ważne, ale Niepilne',
        not_urgent_not_important: 'Niepilne i Nieważne',
        calendar: 'Kalendarz',
        settings: 'Ustawienia',
      },
      urgent_important: {
        title: 'Pilne i Ważne',
        no_tasks: 'Brak zadań',
        add_task: 'Dodaj swoje pierwsze zadanie poniżej',
        enter_task: 'Wprowadź zadanie...',
        schedule: 'Zaplanuj',
        done: 'Zrobione',
        edit: 'Edytuj',
        delete: 'Usuń',
      },
      urgent_not_important: {
        title: 'Pilne, ale Nieważne',
        no_tasks: 'Brak zadań',
        add_task: 'Dodaj swoje pierwsze zadanie poniżej',
        enter_task: 'Wprowadź zadanie...',
        schedule: 'Zaplanuj',
        done: 'Zrobione',
        edit: 'Edytuj',
        delete: 'Usuń',
      },
      important_not_urgent: {
        title: 'Ważne, ale Niepilne',
        no_tasks: 'Brak zadań',
        add_task: 'Dodaj swoje pierwsze zadanie poniżej',
        enter_task: 'Wprowadź zadanie...',
        schedule: 'Zaplanuj',
        done: 'Zrobione',
        edit: 'Edytuj',
        delete: 'Usuń',
      },
      not_urgent_not_important: {
        title: 'Niepilne i Nieważne',
        no_tasks: 'Brak zadań',
        add_task: 'Dodaj swoje pierwsze zadanie poniżej',
        enter_task: 'Wprowadź zadanie...',
        schedule: 'Zaplanuj',
        done: 'Zrobione',
        edit: 'Edytuj',
        delete: 'Usuń',
      },
      calendar: {
        title: 'Kalendarz',
        add_event: 'Dodaj Wydarzenie',
        no_events: 'Brak wydarzeń zaplanowanych na ten dzień',
        cancel: 'Anuluj',
        save: 'Zapisz',
        title_label: 'Tytuł',
        description_label: 'Opis',
        date_label: 'Data',
        time_label: 'Godzina',
        category_label: 'Kategoria',
        category_options: {
          urgent_important: 'Pilne i Ważne',
          urgent_not_important: 'Pilne, ale Nieważne',
          important_not_urgent: 'Ważne, ale Niepilne',
          not_urgent_not_important: 'Niepilne i Nieważne',
        },
      },
      edit_task_date_time: {
        title: 'Edytuj Datę i Godzinę',
        loading: 'Ładowanie...', // Added missing key
        no_date_set: 'Brak ustawionej daty',
        quadrant_label: 'Kwadrant',
        cancel: 'Anuluj',
        save: 'Zapisz',
      },
    },
  },
};

i18n
  // Detects browser language
  .use(LanguageDetector)
  // Passes i18n instance to react-i18next
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;