export const callback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0) {
        // Element is in view, do something
        console.log("Element is in view");
      } else {
        // Element is out of view, do something
        console.log("Element is out of view");
      }
    });
  };
  
export const options = {
    root: null,            // Use the viewport as the root
    rootMargin: "0px 0px -50px 0px",
    threshold: 0         // Trigger when 50% of the target is visible
  };
  
export const observer = new IntersectionObserver(callback, options);
  