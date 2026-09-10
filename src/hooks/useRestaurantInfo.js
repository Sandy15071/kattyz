import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebaseConfig';
import { fallbackRestaurantInfo } from '../data/fallbackData';

export function useRestaurantInfo() {
  const [data, setData] = useState(fallbackRestaurantInfo);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If Firebase isn't configured, use the verified real fallback data directly
    if (!isFirebaseConfigured || !db) {
      setData(fallbackRestaurantInfo);
      setLoading(false);
      return;
    }

    try {
      const docRef = doc(db, 'restaurantInfo', 'main');
      const unsubscribe = onSnapshot(
        docRef,
        (docSnap) => {
          if (docSnap.exists()) {
            setData({ ...fallbackRestaurantInfo, ...docSnap.data() });
          } else {
            setData(fallbackRestaurantInfo);
          }
          setLoading(false);
        },
        (err) => {
          console.warn("Firestore restaurantInfo listener error, using fallback:", err);
          setError(err);
          setData(fallbackRestaurantInfo);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.warn("Error setting up restaurantInfo listener:", err);
      setData(fallbackRestaurantInfo);
      setLoading(false);
    }
  }, []);

  return { data, loading, error };
}

export default useRestaurantInfo;
