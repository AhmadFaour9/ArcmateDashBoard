import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// import './LanguageSwitcher.css'; // Import the CSS file

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(t('LanguageArabic'));

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang === 'ar' ? t('LanguageArabic') : t('LanguageEnglish'));

    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    setSelectedLanguage(i18n.language === 'ar' ? t('LanguageArabic') : t('LanguageEnglish'));
  }, [i18n.language, t]);

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle bg-light text-dark"
        type="button"
        id="languageDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        style={{ border: 'none' ,direction:'ltr',textAlign:'right'}}
        dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
      >
        {selectedLanguage} 
      </button>
      <ul className="dropdown-menu" aria-labelledby="languageDropdown">
        <li>
          <button
            className="dropdown-item text-dark hover:bg-dark hover:text-white custom-spacing"
            onClick={() => changeLanguage('en')}
          >
            {t('LanguageEnglish')}
          </button>
        </li>
        <li>
          <button
            className="dropdown-item text-dark hover:bg-dark hover:text-white custom-spacing"
            onClick={() => changeLanguage('ar')}
          >
            {t('LanguageArabic')}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
