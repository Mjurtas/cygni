/**
 * Creates IntersectionObserver.
 * @param {function}  callback callback function to be executed when entry is intersected.
 * @param {Object} options options like threshold, rootMargin and root.
 */

const useIntersectionObserver = (callback, options) => {
  return new IntersectionObserver((entries) => callback(entries), options);
};

export default useIntersectionObserver;
