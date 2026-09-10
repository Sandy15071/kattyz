import { useEffect } from 'react';

function updateMeta(selector, attribute, value) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    const [key, keyValue] = attribute;
    element.setAttribute(key, keyValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', value);
}

export function PageMeta({ title, description, noIndex = false }) {
  useEffect(() => {
    document.title = title;
    updateMeta('meta[name="description"]', ['name', 'description'], description);
    updateMeta('meta[property="og:title"]', ['property', 'og:title'], title);
    updateMeta('meta[property="og:description"]', ['property', 'og:description'], description);
    updateMeta('meta[name="robots"]', ['name', 'robots'], noIndex ? 'noindex, nofollow' : 'index, follow');
  }, [title, description, noIndex]);

  return null;
}
