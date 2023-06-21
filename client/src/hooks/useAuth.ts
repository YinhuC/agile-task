import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../utils/context/AuthContext';
import { getAuthUser } from '../api/auth.api';

export function useAuth() {
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const controller = new AbortController();

    const fetchAuthUser = async () => {
      try {
        const response = await getAuthUser();
        const { data } = response;
        setUser(data);
      } catch (err) {
        console.log(err);
      } finally {
        setTimeout(() => setLoading(false), 1000);
      }
    };

    fetchAuthUser();

    return () => {
      controller.abort();
    };
  }, [setUser]);

  return { user, loading };
}
