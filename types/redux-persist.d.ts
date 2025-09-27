declare module 'redux-persist/lib/storage/createWebStorage' {
  const createWebStorage: (type: 'local' | 'session') => Storage;
  export default createWebStorage;
}
