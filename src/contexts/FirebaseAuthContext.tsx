import * as React from 'react';
import { useRouter } from 'next/router';
import { auth } from '../libs/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';

type UserType = User | null;

type FirebaseAuthContextProps = {
  user: UserType;
  logout: () => void;
};

const FirebaseAuthContext = React.createContext<Partial<FirebaseAuthContextProps>>({
  logout: () => {},
});

export const useFirebaseAuthContext = () => React.useContext(FirebaseAuthContext);

export const FirebaseAuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const router = useRouter();
  const isAvailableForViewing =
    router.pathname === '/' || 
    router.pathname === '/login' || 
    router.pathname === '/signup' ||
    router.pathname === '/404';

  // ユーザーがログインしているか確認
  React.useEffect(() => {
    onAuthStateChanged(auth, async (res) => {
      if (res) {
        setUser(res);
      } else {
        !user && !isAvailableForViewing && await router.push('/login');
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ログアウト
  const logout = () => {
    signOut(auth);
  };

  const contextValue = { user, logout };

  return (
    <FirebaseAuthContext.Provider value={contextValue}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};