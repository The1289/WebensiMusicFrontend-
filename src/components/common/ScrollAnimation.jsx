import { useState, useEffect } from 'react';

const useScrollAnimation = (elementRef, buffer = 10) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = elementRef.current;

      if (element) {
        const rect = element.getBoundingClientRect();
        const isElementVisible = rect.bottom >= buffer && rect.top <= window.innerHeight - buffer;
        setIsVisible(isElementVisible);
      }
    };

    // Initial check when the component mounts
    handleScroll();

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [elementRef, buffer]);

  return isVisible;
};

export default useScrollAnimation;
