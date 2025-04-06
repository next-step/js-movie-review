export const callback = (entries, observer, fn) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0) {
        fn();
      }
    });
  };
  
export const options = {
    root: null,            // Use the viewport as the root
    rootMargin: "0px 0px -50px 0px",
    threshold: 0         // Trigger when 50% of the target is visible
  };
  
  