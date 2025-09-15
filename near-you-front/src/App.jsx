import { useState, useEffect } from 'react'
import './App.css'
import LoadingPage from './components/LoadingPage'
import BottomNav from './components/BottomNav'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('groups');

  useEffect(() => {
    // Initialize Telegram WebApp
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      
      // Initialize LocationManager if available
      if (window.Telegram.WebApp.LocationManager) {
        window.Telegram.WebApp.LocationManager.init((result) => {
          console.log('LocationManager initialized:', result);
        });
      }
    }

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const requestLocation = () => {
    // Telegram WebApp Location Manager
    if (window.Telegram?.WebApp?.LocationManager) {
      // Перевірити чи доступна геолокація
      if (window.Telegram.WebApp.LocationManager.isLocationAvailable) {
        window.Telegram.WebApp.LocationManager.getLocation((locationData) => {
          if (locationData) {
            console.log('Location from Telegram:', {
              latitude: locationData.latitude,
              longitude: locationData.longitude,
              accuracy: locationData.accuracy
            });
            // Обробити отриману локацію
          } else {
            console.error('No location data received from Telegram');
            requestBrowserLocation();
          }
        });
      } else {
        console.log('Location not available in Telegram, using browser API');
        requestBrowserLocation();
      }
    } else {
      // Fallback до браузерного Geolocation API
      console.log('Telegram LocationManager not available, using browser API');
      requestBrowserLocation();
    }
  };

  const requestBrowserLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          console.log('Browser location:', { latitude, longitude, accuracy });
          // Обробити отриману локацію
        },
        (error) => {
          console.error('Geolocation error:', error.message);
          // Показати помилку користувачу
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    } else {
      console.error('Geolocation не підтримується цим браузером');
    }
  };

  const handleButtonPress = (action, event) => {
    const button = event.currentTarget;
    
    // Додаємо клас для візуального ефекту та блокуємо hover
    button.classList.add('button-pressed');
    button.classList.add('no-hover');
    
    // Прибираємо pressed клас швидко
    setTimeout(() => {
      button.classList.remove('button-pressed');
    }, 150);
    
    // Прибираємо no-hover клас пізніше для повернення до базового стану
    setTimeout(() => {
      button.classList.remove('no-hover');
      button.blur();
    }, 800);

    // Виконати дію в залежності від кнопки
    if (action === 'Use current location') {
      requestLocation();
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="app">
      <main className="main-content">
        {activeTab === 'groups' && (
          <div className="tab-content">
            <h1>Groups</h1>
          </div>
        )}
        {activeTab === 'locations' && (
          <div className="tab-content">
            <h1>Add Location</h1>
            
            <div className="location-buttons">
              <button 
                className="location-button"
                onClick={(e) => handleButtonPress('Use current location', e)}
              >
                <div className="button-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0013 3.06V1h-2v2.06A8.994 8.994 0 003.06 11H1v2h2.06A8.994 8.994 0 0011 20.94V23h2v-2.06A8.994 8.994 0 0020.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
                  </svg>
                </div>
                <div className="button-text">
                  <span className="button-title">Current Location</span>
                </div>
              </button>

              <button 
                className="location-button"
                onClick={(e) => handleButtonPress('Select on map', e)}
              >
                <div className="button-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                </div>
                <div className="button-text">
                  <span className="button-title">Choose on Map</span>
                </div>
              </button>
            </div>
          </div>
        )}
      </main>
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
}

export default App;
