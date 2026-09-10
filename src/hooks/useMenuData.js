import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebaseConfig';
import { fallbackCategories, fallbackMenuItems } from '../data/fallbackData';

function groupItemsByCategory(items) {
  return items.reduce((acc, item) => {
    if (!acc[item.categoryId]) {
      acc[item.categoryId] = [];
    }
    acc[item.categoryId].push(item);
    return acc;
  }, {});
}

export function useMenuData() {
  const [categories, setCategories] = useState(fallbackCategories);
  const [itemsByCategory, setItemsByCategory] = useState(() => groupItemsByCategory(fallbackMenuItems));
  const [allItems, setAllItems] = useState(fallbackMenuItems);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isFirebaseConfigured || !db) {
      setCategories(fallbackCategories);
      setAllItems(fallbackMenuItems);
      setItemsByCategory(groupItemsByCategory(fallbackMenuItems));
      setLoading(false);
      return;
    }

    let unsubCategories = () => {};
    let unsubItems = () => {};

    try {
      // 1. Categories listener
      const catQuery = query(
        collection(db, 'menuCategories'),
        where('isActive', '==', true),
        orderBy('sortOrder', 'asc')
      );

      unsubCategories = onSnapshot(
        catQuery,
        (snapshot) => {
          if (!snapshot.empty) {
            const fetchedCats = snapshot.docs.map((d) => ({
              id: d.id,
              ...d.data(),
            }));
            setCategories(fetchedCats);
          }
        },
        (err) => {
          console.warn("Categories listener error, using fallback:", err);
          setError(err);
        }
      );

      // 2. Items listener
      const itemsQuery = query(
        collection(db, 'menuItems'),
        where('isAvailable', '==', true),
        orderBy('sortOrder', 'asc')
      );

      unsubItems = onSnapshot(
        itemsQuery,
        (snapshot) => {
          if (!snapshot.empty) {
            const fetchedItems = snapshot.docs.map((d) => ({
              id: d.id,
              ...d.data(),
            }));
            setAllItems(fetchedItems);
            setItemsByCategory(groupItemsByCategory(fetchedItems));
          }
          setLoading(false);
        },
        (err) => {
          console.warn("MenuItems listener error, using fallback:", err);
          setError(err);
          setLoading(false);
        }
      );
    } catch (err) {
      console.warn("Error subscribing to menu collections:", err);
      setLoading(false);
    }

    return () => {
      unsubCategories();
      unsubItems();
    };
  }, []);

  return { categories, itemsByCategory, allItems, loading, error };
}

export default useMenuData;
