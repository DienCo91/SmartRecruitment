'use client';
import { LoadingDoubleCircle } from '@/components/Loadings/LoadingDoubleCircle';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from '../lib/store';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingDoubleCircle />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
