import { useState, useRef, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState({});
  const audioRef = useRef(null);
  const carouselRef = useRef(null);
  const carouselRef11 = useRef(null);
  const [initialDvh, setInitialDvh] = useState('100vh');
  const [fadeState, setFadeState] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [screenDimensions, setScreenDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-sine',
      once: false,
      mirror: true,
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState(!fadeState);
    }, 10000);
    return () => clearInterval(interval);
  }, [fadeState]);

  useEffect(() => {
    // Capturar el dvh inicial una sola vez
    const captureInitialHeight = () => {
      const vh = window.innerHeight;
      setInitialDvh(`${vh}px`);
    };

    captureInitialHeight();

    // Solo capturar en el primer load, no en resize
  }, []);

  useEffect(() => {
    // Centrar en imagen 3 después de que todo esté cargado
    const timer = setTimeout(() => {
      if (carouselRef.current) {
        const container = carouselRef.current;
        const image3 = container.children[2]; // imagen 3 está en índice 2
        if (image3) {
          // Calcular scroll para centrar imagen 3
          const containerWidth = container.offsetWidth;
          const imageLeft = image3.offsetLeft;
          const imageWidth = image3.offsetWidth;
          const scrollPosition = imageLeft - (containerWidth / 2) + (imageWidth / 2);

          container.scrollLeft = Math.max(0, scrollPosition - 180);
        }
      }
    }, 500); // Delay para asegurar que las imágenes estén cargadas

    const timer11 = setTimeout(() => {
      if (carouselRef11.current) {
        const container = carouselRef11.current;
        const image3 = container.children[2];
        if (image3) {
          container.scrollLeft = Math.max(0, image3.offsetLeft - (container.offsetWidth / 2) + (image3.offsetWidth / 2) - 180);
        }
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer11);
    };
  }, []);

  useEffect(() => {
    // Countdown hasta el 7 de marzo de 2026
    const weddingDate = new Date('2026-03-07T00:00:00');

    const updateCountdown = () => {
      const now = new Date();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown(); // Ejecutar inmediatamente
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const handlePlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/music/jvke.mp3');
      audioRef.current.loop = true;
    }

    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const menuItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'invitacion', label: 'Contador' },
    { id: 'ubicacion', label: 'Donde será?' },
    { id: 'confirmacion', label: 'Confirma tu  asistencia' },
    { id: 'fecha', label: 'Cuando será?' },
    { id: 'moodboard', label: 'Moodboard' },
    { id: 'dresscode', label: 'Dress Code' },
    { id: 'details', label: 'Detalles' },
    { id: 'galeria', label: 'Galería' },
    { id: 'mensaje', label: 'Regalos' }
  ];


  return (
    <div className="min-h-screen">
      {/* Header con menú hamburguesa */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="flex items-center justify-end px-6 py-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>

      {/* Menú lateral */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#0A2A73] shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Header del menú */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/20">
            <h2 className="text-white text-xl font-bold" style={{ fontFamily: 'Caveat, cursive' }}>
              Menú
            </h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-white focus:outline-none"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Items del menú */}
          <nav className="flex-1 overflow-y-auto py-4">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="w-full text-left px-6 py-3 text-white hover:bg-white/10 transition-colors duration-200"
                style={{ fontFamily: 'Caveat, cursive', fontSize: '18px' }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay cuando el menú está abierto */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Primera sección con fondo bg-1.png */}
      <section
        id="inicio"
        className="bg-cover bg-center bg-no-repeat flex flex-col items-center justify-between pt-8 pb-12"
        style={{
          backgroundImage: "url('/images/backgrounds/bg-1.png')",
          height: initialDvh
        }}
      >
        <svg viewBox="0 0 600 150" className="w-full max-w-[600px] h-auto" style={{ marginTop: '20px' }}>
          <defs>
            <path
              id="curve-luis-sofia"
              d="M 50,120 Q 300,-10 550,120"
              fill="transparent"
            />
          </defs>
          <text
            style={{
              fontFamily: 'EDLavonia',
              fontSize: '61px',
              fill: 'white',
              letterSpacing: '3px'
            }}
          >
            <textPath
              href="#curve-luis-sofia"
              startOffset="50%"
              textAnchor="middle"
            >
              Luis y Sofía
            </textPath>
          </text>
        </svg>
        <div className="flex flex-col items-center justify-center h-[20%]">
          <h1 className="text-[43.3px]">07. 03. 26</h1>
          <div className="relative flex flex-col items-center justify-center h-[42.8px]">
            <img
              src="/images/assets/play.svg"
              className="w-auto h-[100%] cursor-pointer z-10"
              onClick={handlePlay}
            />
            <img
              src="/images/assets/tap.svg"
              className="w-auto h-[60%] absolute animate-pulse"
              style={{ animation: 'pulse-scale 2s ease-in-out infinite', bottom: '0', right: '30%' }}
            />
            <style jsx>{`
              @keyframes pulse-scale {
                0%, 100% {
                  transform: scale(1);
                }
                50% {
                  transform: scale(1.2);
                }
              }
            `}</style>
          </div>
        </div>
      </section>
      <section
        id="invitacion"
        className="bg-cover bg-center bg-no-repeat flex flex-col items-center justify-end pb-4"
        style={{
          backgroundImage: "url('/images/backgrounds/bg-2.png')",
          height: '100vh'
        }}
      >
        <div className="w-full flex items-end justify-center overflow-hidden">
          <img
            src="/images/assets/left-photo.svg"
            className="w-[397px] h-[597px] flex-shrink-0 object-contain"
            style={{ minWidth: '397px' }}
            data-aos="fade-right"
          />
          <div className="relative flex-shrink-1 mx-4 flex items-center justify-center min-w-[614px] max-[600px]:min-w-[90%]" data-aos="fade-up">
            <img src="/images/assets/card.png" className="w-full h-auto max-w-full [@media(max-height:800px)]:w-auto" />
            <img src="/images/assets/card-text.svg" className="w-[70%] h-auto max-w-full absolute top-[80px] max-[600px]:top-[40px] left-1/2 -translate-x-1/2 [@media(max-height:800px)]:w-[70%] [@media(max-height:800px)]:top-[50px]" style={{ filter: 'none', colorScheme: 'light' }} />
            <img src="/images/assets/card-save.svg" className="w-[70%] h-auto max-w-full absolute bottom-[105px] left-1/2 -translate-x-1/2 [@media(max-height:800px)]:w-[50%]" />
            <div className="absolute bottom-[20px] left-1/2 -translate-x-[47%] flex items-center justify-center">
              <div
                className="text-center flex items-center justify-center gap-2"
                style={{
                  fontFamily: 'Caveat, cursive',
                  color: '#4a3728',
                  fontSize: '24px',
                  fontWeight: '600'
                }}
              >
                {/* Números del countdown */}
                <div className="flex flex-col items-center">
                  <span style={{ fontSize: '32px', fontWeight: '700' }}>
                    {String(timeLeft.days || 0).padStart(3, '0')}
                  </span>
                  <span style={{ fontSize: '16px', fontWeight: '400' }}>DÍAS</span>
                </div>
                <div className="relative h-full">
                  <span style={{ fontSize: '24px', fontWeight: '700', position: 'absolute', top: "0px", transform: "translateY(-72%)" }}>:</span>
                </div>
                <div className="flex flex-col items-center">
                  <span style={{ fontSize: '32px', fontWeight: '700' }}>
                    {String(timeLeft.hours || 0).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: '16px', fontWeight: '400' }}>HORAS</span>
                </div>
                <div className="relative h-full">
                  <span style={{ fontSize: '24px', fontWeight: '700', position: 'absolute', top: "0px", transform: "translateY(-72%)" }}>:</span>
                </div>

                <div className="flex flex-col items-center">
                  <span style={{ fontSize: '32px', fontWeight: '700' }}>
                    {String(timeLeft.minutes || 0).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: '16px', fontWeight: '400' }}>MINUTOS</span>
                </div>
                <div className="relative h-full">
                  <span style={{ fontSize: '24px', fontWeight: '700', position: 'absolute', top: "0px", transform: "translateY(-72%)" }}>:</span>
                </div>
                <div className="flex flex-col items-center">
                  <span style={{ fontSize: '32px', fontWeight: '700' }}>
                    {String(timeLeft.seconds || 0).padStart(2, '0')}
                  </span>
                  <span style={{ fontSize: '16px', fontWeight: '400' }}>SEGUNDOS</span>
                </div>
              </div>
            </div>
          </div>
          <img
            src="/images/assets/right-photo.svg"
            className="w-[397px] h-[597px] flex-shrink-0 object-contain"
            style={{ minWidth: '397px' }}
            data-aos="fade-left"
          />
        </div>
      </section>
      <section
        id="ceremonia"
        className="bg-cover bg-center bg-no-repeat flex flex-col items-center relative overflow-hidden"
        style={{
          backgroundImage: "url('/images/backgrounds/bg-3.png')",
          height: '100vh'
        }}
      >
        <div className="h-full flex flex-col items-center justify-center relative">
          <img src="/images/assets/3-up.png" className="w-auto h-1/2" data-aos="fade-down" />
          <img src="/images/assets/3-down.png" className="w-auto h-1/2" data-aos="fade-up" />
          <img src="/images/assets/CU.png" className="w-auto h-auto absolute top-0 left-0 -translate-x-1/2 -translate-y-[30%] z-10" />
          <img src="/images/assets/CD.png" className="w-auto h-auto absolute bottom-0 left-0 -translate-x-1/2 -translate-y-[-10%] z-10" />
          <img src="/images/assets/CM.png" className="w-auto h-auto absolute top-1/2 -translate-y-1/2 right-0 -translate-x-[-40%] z-10" />
        </div>
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: '#4e3c2c',
            opacity: '0.26'
          }}
        />
        <img src="/images/assets/LU.png" className="w-auto h-auto absolute top-0 left-0 -translate-x-[20%] -translate-y-[20%] z-10 max-[900px]:hidden" />
        <img src="/images/assets/LD.png" className="w-auto h-auto absolute bottom-0 left-0 z-10 max-[900px]:hidden" />
        <img src="/images/assets/RU.png" className="w-auto h-auto absolute top-0 right-0 -translate-x-[-30%] z-10 max-[900px]:hidden" />
        <img src="/images/assets/RD.png" className="w-auto h-auto absolute bottom-0 right-0 -translate-y-[-10%] z-10 max-[900px]:hidden" />

      </section>
      <section
        id="ubicacion"
        className="relative flex flex-col items-center overflow-hidden pt-10 gap-5 pb-10"
        style={{
          height: '100vh'
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/bg-4.mp4" type="video/mp4" />
        </video>
        <h1 className="text-[51px] z-10 px-2 leading-normal">¿Dónde?</h1>
        <div className="relative h-[290px] w-full mb-6" data-aos="fade-up">
          <div
            className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] cursor-pointer"
            onClick={(e) => {
              e.currentTarget.style.transform = e.currentTarget.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
            }}
          >
            <img
              src="/images/assets/front-card-4.svg"
              className="w-full h-full absolute [backface-visibility:hidden] z-10"
            />
            <div className="w-full h-full absolute [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <img
                src="/images/assets/back-card-4.svg"
                className="w-full h-full absolute top-0 left-0 z-10"
              />
              <img
                src="/images/assets/back-button-4.svg"
                className="w-auto h-auto absolute top-1/2 -translate-y-[35%] left-1/2 -translate-x-1/2 z-10"
                onClick={() => {
                  window.open('https://maps.app.goo.gl/e9KFaLUbDwG9RozH6', '_blank');
                }}
              />
            </div>
          </div>
        </div>
        <div className={`p-4 bg-[#1f3d58] h-[40%] rounded-lg w-[250px] z-10 ${screenDimensions.width < screenDimensions.height ? 'w-[90%]' : 'w-[250px]'}`} data-aos="fade-up">
          <div className="relative z-10 w-full h-full rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3899.6369954487977!2d-76.9968136!3d-12.2050851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105b9001a377e85%3A0x3b4e2fd19fd58612!2sSede%2004%3A%20Casa%20del%20Lago!5e0!3m2!1ses-419!2spe!4v1759452787959!5m2!1ses-419!2spe&output=embed"
              className="w-full h-full"
              style={{
                border: 0,
                pointerEvents: 'auto',
                touchAction: 'auto'
              }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de la boda"
              aria-hidden="false"
              tabIndex="0"
            />
          </div>
        </div>
      </section>
      <section
        id="confirmacion"
        className="bg-cover bg-center bg-no-repeat flex flex-col items-center relative overflow-hidden"
        style={{
          backgroundImage: window.innerWidth < 768 ? "url('/images/backgrounds/bg-5-mobile.png')" : "url('/images/backgrounds/bg-5.png')",
          height: '100vh'
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: '#4e3c2c',
            opacity: '0.46'
          }}
        />
        <div className="w-full h-full flex items-center justify-center z-10 overflow-hidden">
          <img
            src="/images/assets/left-photo-5.svg"
            className="w-[397px] h-[597px] flex-shrink-0 object-contain"
            style={{ minWidth: '397px' }}
            data-aos="fade-right"
          />
          <div className="flex flex-col gap-16 mx-24 items-center flex-shrink-1" style={{ minWidth: screenDimensions.width < screenDimensions.height ? '90%' : '368px' }} data-aos="fade-up">
            <div className="flex flex-col gap-20 items-center">
              <h1 className="text-[43.3px] w-full text-center">Confirma tu asistencia</h1>
              <div className="flex flex-col gap-6">
                <h1 className="text-[18px] text-center pierson asistencia">¡Nos gustaría compratir este momento tan importante con todos ustedes! Pero sabemos que a veces suceden acontecimientos y motivos por los cuales las fechas no cuadran.
                </h1>
                <h1 className="text-[18px] text-center pierson asistencia"> Aunque puedan o no asistir, tengan por seguro que estaran en nuestro corazon ese dia :)
                </h1>
              </div>
            </div>

            <a className='relative'>
              <button className="w-[250px] h-[65px] text-black rounded-xl bg-[#1f3d58] flex flex-col items-center gap-1 justify-center cursor-pointer" onClick={() => {
                window.open('https://docs.google.com/forms/d/e/1FAIpQLSca2ULzfyN3qfEQMnyJeVyTt4lvJtHkqyvvCcXwy1cTYWvAgg/viewform?usp=dialog', '_blank');
              }} >
                <h1 className="text-[18px] w-[250px] text-center pierson">Confirma tu</h1>
                <h1 className="text-[18px] w-[250px] text-center pierson">aistencia aquí</h1>
              </button>
              <img src="/images/assets/tap.svg" className="w-[30px] absolute animate-pulse" style={{ bottom: '-30px', right: '-30px', animation: 'pulse-scale 2s ease-in-out infinite' }} />
              <style jsx>{`
                @keyframes pulse-scale {
                  0%, 100% {
                    transform: scale(1);
                  }
                  50% {
                    transform: scale(1.2);
                  }
                }
              `}</style>
            </a>
          </div>
          <img
            src="/images/assets/right-photo-5.svg"
            className="w-[397px] h-[597px] flex-shrink-0 object-contain"
            style={{ minWidth: '397px' }}
            data-aos="fade-left"
          />
        </div>
      </section >
      <section
        id="fecha"
        className="bg-cover bg-center bg-no-repeat flex flex-col items-center relative overflow-hidden pt-6 gap-5 pb-0"
        style={{
          backgroundImage: "url('/images/backgrounds/bg-6.png')",
          height: '100vh'
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: '#c8b7a1',
            opacity: '0.85'
          }}
        />
        <h1 className="text-[51px] z-10 px-2 leading-normal">¿Cuándo?</h1>
        <div className="relative w-full h-[290px] w-full" data-aos="fade-up">
          <div
            className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] cursor-pointer"
            onClick={(e) => {
              e.currentTarget.style.transform = e.currentTarget.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
            }}
          >
            <img
              src="/images/assets/front-card-6.svg"
              className="w-full h-full absolute [backface-visibility:hidden] z-10"
            />
            <div className="w-full h-full absolute [transform:rotateY(180deg)] [backface-visibility:hidden]">
              <img
                src="/images/assets/back-card-6.svg"
                className="w-full h-full absolute top-0 left-0 z-10"
              />
              <img
                src="/images/assets/back-button-6.svg"
                className="w-auto h-auto absolute top-1/2 -translate-y-[35%] left-1/2 -translate-x-1/2 z-10 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Evitar que se voltee la tarjeta

                  // Crear evento de calendario
                  const eventDetails = {
                    title: 'Boda de Luis y Sofia',
                    start: '20260307T180000Z', // 7 de marzo 2026, 6:00 PM UTC
                    end: '20260308T020000Z',   // 8 de marzo 2026, 2:00 AM UTC
                    details: 'Celebración de la boda de Luis y Sofia',
                    location: 'Sede 04: Casa del Lago'
                  };

                  // Función para Google Calendar (funciona en todos los dispositivos)
                  function openGoogleCalendar(event) {
                    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.start}/${event.end}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}`;
                    window.open(googleCalendarUrl, '_blank');
                  }

                  // Detectar dispositivo
                  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
                  const isAndroid = /Android/.test(navigator.userAgent);

                  if (isIOS) {
                    // Para iOS - ir directo a Google Calendar (más confiable)
                    // Los URL schemes de iOS son muy inconsistentes entre versiones
                    openGoogleCalendar(eventDetails);

                  } else if (isAndroid) {
                    // Para Android - ir directo a Google Calendar (más confiable)
                    openGoogleCalendar(eventDetails);

                  } else {
                    // Para desktop - Google Calendar
                    openGoogleCalendar(eventDetails);
                  }
                }}
              />
            </div>
          </div>
        </div>
        <img
          src="/images/assets/calendar-6.png"
          className="w-auto h-[40%] z-10 mt-4"
          data-aos="fade-up"
        />
      </section>
      <section
        id="moodboard"
        className="bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center relative overflow-hidden pt-6 gap-5 pb-0"
        style={{
          backgroundImage: "url('/images/backgrounds/bg-7.png')",
          height: '100vh'
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: '#4e3c2c',
            opacity: '0.50'
          }}
        />
        <img src="/images/assets/title-7.svg" className={`h-auto z-10 ${screenDimensions.width < screenDimensions.height ? 'w-[80%]' : 'w-auto'}`} data-aos="fade-up" />
      </section>
      <section
        id="dresscode"
        className="bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center relative overflow-hidden py-6 gap-5 px-10"
        style={{
          backgroundImage: "url('/images/backgrounds/bg-8.png')",
          height: '100vh'
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: '#4e3c2c',
            opacity: '0.87'
          }}
        />
        <div className="flex flex-col items-center justify-center z-10 gap-4" style={{ width: window.innerWidth < 768 ? undefined : '362px' }}>
          <h1 className="text-[51px] z-10 px-2 leading-normal">Dresscode</h1>
          <h1 className="text-[18px] text-center pierson">No puede haber ningun color parecido al blanco o beige o celeste claro o amarillo claro. Ningun color que directa o indirectamente se pueda parecer al blanco en persona o en fotos.</h1>
          <div className="relative mb-4">
            <img src="/images/assets/dresses.png" className="w-full h-auto" />
            <img src="/images/assets/inspo.svg" className="w-[50px] absolute animate-pulse" style={{ bottom: '-40px', right: '-40px', animation: 'pulse-scale 2s ease-in-out infinite' }} />
            <style jsx>{`
              @keyframes pulse-scale {
                0%, 100% {
                  transform: scale(1);
                }
                50% {
                  transform: scale(1.2);
                }
              }
            `}</style>
          </div>
          <h1 className="text-[18px] text-center pierson">Palete de colores ideal <br /> (No es obligatorio)</h1>
          <img src="/images/assets/colors.png" className="h-auto" />
        </div>
      </section>
      <section
        id="details"
        className="bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center relative overflow-hidden py-6 gap-5"
        style={{
          backgroundImage: "url('/images/backgrounds/bg-9.png')",
          height: '100vh'
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: '#4e3c2c',
            opacity: '0.26'
          }}
        />
        <div className="flex flex-col items-center justify-center z-10 gap-8">
          <h1 className="text-[51px] z-10 px-2 leading-normal">Detalles</h1>
          <div className="flex flex-col items-center justify-center gap-10">
            <div className="flex flex-col gap-4">
              <h1 className="text-[18px] w-[362px] text-center pierson">De preferencia no venir con niños (es una fiesta de adultos con alcohol y elementos que podrían ser peligrosos)</h1>
              <h1 className="text-[18px] w-[362px] text-center pierson">Confirma tu asistencia hasta el 07 de enero del 2026</h1>
              <h1 className="text-[18px] w-[362px] text-center pierson">Pedimos llegar puntuales para poder seguir el cronograma.</h1>
            </div>
            <img src="/images/assets/details.png" className="w-[362px] h-auto" />
          </div>
        </div>
      </section>
      <section
        id="galeria"
        className="bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center relative overflow-hidden py-6 gap-5"
        style={{
          backgroundImage: "url('/images/backgrounds/bg-10.png')",
          height: '100vh'
        }}
      >
        <div className="w-full h-[40%] z-10 px-4 flex flex-col items-center gap-12">
          <h1 className="text-[51px] z-10 px-2 leading-normal text-black">Nuestra historia</h1>
          <div className="relative w-full h-full z-10 px-4" data-aos="fade-up">
            <div
              className={`w-[362px] absolute left-1/2 top-0 transform -translate-x-1/2 transition-opacity duration-1000  ${fadeState ? 'opacity-100' : 'opacity-0'
                }`}
            >
              <h1 className="text-[18px] w-[362px] text-center pierson text-black">Nos conocimos en 2015 en la pre de pamer. Fuimos buenos amigos hasta que nuestras carreras y la vida nos alejaron un tiempo. <br /> <br /> Nos reencontramos en el 2023 y fue como si el tiempo no hubiera pasado. Recuperamos una amistad que, no sabíamos, nos acompañaría toda la vida.</h1>
            </div>
            <div

              className={`w-[362px] absolute left-1/2 top-0 transform -translate-x-1/2 transition-opacity duration-1000 ${fadeState ? 'opacity-0' : 'opacity-100'
                } flex flex-col items-center gap-4`}
            >
              <h1 className='text-[18px] w-[362px] text-center pierson text-black'>Hoy somos uno solo. Somos amigos, compañeros, complices, amantes y queremos seguirlo siendo hasta el final de nuestros dias.</h1>
              <h1 className='w-[300px] text-[18px] text-center pierson text-black'>Gracias a los que nos han acompañado todos estos años (solos y juntos).</h1>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center w-full h-[50%] max-w-6xl mx-auto px-4 gap-4" data-aos="fade-up">
          {/* Left Arrow */}
          <button
            onClick={() => {
              const container = document.getElementById('carousel-container');
              const imageWidth = container.children[0].offsetWidth + 16; // +16 por el gap-4
              const currentScroll = container.scrollLeft;
              const targetScroll = currentScroll - imageWidth;

              container.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
              });
            }}
            className="flex-shrink-0 p-2 hover:opacity-80 transition-opacity z-10"
          >
            <img src="/images/carrousels/arrow-left.svg" className="w-8 h-8" alt="Previous" />
          </button>

          {/* Carousel Container */}
          <div
            id="carousel-container"
            ref={carouselRef}
            className="flex overflow-x-auto gap-4 h-full py-4 scroll-smooth flex-1"
            style={{
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            <img
              src="/images/carrousels/10/image-1.png"
              className="flex-shrink-0"
              style={{ scrollSnapAlign: 'center' }}
              alt="Image 1"
            />
            <img
              src="/images/carrousels/10/image-2.png"
              className="flex-shrink-0"
              style={{ scrollSnapAlign: 'center' }}
              alt="Image 2"
            />
            <img
              src="/images/carrousels/10/image-3.png"
              className="flex-shrink-0"
              style={{ scrollSnapAlign: 'center' }}
              alt="Image 3"
            />
            <img
              src="/images/carrousels/10/image-4.png"
              className="flex-shrink-0"
              style={{ scrollSnapAlign: 'center' }}
              alt="Image 4"
            />
            <img
              src="/images/carrousels/10/image-5.png"
              className="flex-shrink-0"
              style={{ scrollSnapAlign: 'center' }}
              alt="Image 5"
            />
            <img
              src="/images/carrousels/11/image-1.png"
              className="flex-shrink-0"
              style={{ scrollSnapAlign: 'center' }}
              alt="Image 1"
            />
            <img
              src="/images/carrousels/11/image-2.png"
              className="flex-shrink-0"
              style={{ scrollSnapAlign: 'center' }}
              alt="Image 2"
            />
            <img
              src="/images/carrousels/11/image-3.png"
              className="flex-shrink-0"
              style={{ scrollSnapAlign: 'center' }}
              alt="Image 3"
            />
            <img
              src="/images/carrousels/11/image-4.png"
              className="flex-shrink-0"
              style={{ scrollSnapAlign: 'center' }}
              alt="Image 4"
            />
            <img
              src="/images/carrousels/11/image-5.png"
              className="flex-shrink-0"
              style={{ scrollSnapAlign: 'center' }}
              alt="Image 5"
            />
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => {
              const container = document.getElementById('carousel-container');
              const imageWidth = container.children[0].offsetWidth + 16; // +16 por el gap-4
              const currentScroll = container.scrollLeft;
              const targetScroll = currentScroll + imageWidth;

              container.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
              });
            }}
            className="flex-shrink-0 p-2 hover:opacity-80 transition-opacity z-10"
          >
            <img src="/images/carrousels/arrow-right.svg" className="w-8 h-8" alt="Next" />
          </button>
        </div>

        <style jsx>{`
          #carousel-container::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </section>
      {/* <section
        className="bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center relative overflow-hidden gap-2"
        style={{
          backgroundColor: "#1f3d58",
          backgroundImage: "url('/images/backgrounds/bg-12.png')",
          height: '100vh'
        }}
      >
        <img src="/images/assets/text-12.svg" className="z-10" />
      </section> */}
      <section
        id="mensaje"
        className="bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center relative overflow-hidden py-6 gap-5"
        style={{
          backgroundImage: "url('/images/backgrounds/bg-13.png')",
          height: '100vh'
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: '#4e3c2c',
            opacity: '0.46'
          }}
        />
        <div className='flex flex-col items-center justify-center gap-16 text-center z-10'>
          <div className='flex flex-col items-center justify-center gap-4'>
            <h1 className='text-[51px] z-10 px-2 leading-normal'>Regalos</h1>
            <h1 className='text-[18px] w-[362px] text-center pierson regalos'>¡Nos llena de emoción compartir este día con ustedes! Para nosotros, el regalo es que nos acompañen. Pero si quisieran hacernos un regalo adicional, les dejamos aqui los datos de nuestras dos mesas de regalos.</h1>
          </div>
          <div className='flex flex-col items-center justify-center gap-10'>
            <h1 className='text-[18px] w-[362px] text-center pierson regalos'>Banco Interbank<br />Nombre: Sofía Isabel Puntriano García<br />No. de cuenta: 98742983740347<br /><br />o<br /><br />yape/plin<br />955170938</h1>
            <h1 className='text-[41px] w-[362px] text-center'>¡Muchas gracias!</h1>
          </div>
        </div>
      </section>
    </div >
  );
}

export default App;