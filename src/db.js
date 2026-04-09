// Mock local database using LocalStorage

export const dbOptions = {
  users: 'readx_users',
  currentUser: 'readx_current_user',
  bookmarks: 'readx_bookmarks',
  favorites: 'readx_favorites'
};

// Initialize DB safely
export const initDB = () => {
  if (!localStorage.getItem(dbOptions.users)) {
    localStorage.setItem(dbOptions.users, JSON.stringify([]));
  }
  if (!localStorage.getItem(dbOptions.bookmarks)) {
    localStorage.setItem(dbOptions.bookmarks, JSON.stringify([]));
  }
  if (!localStorage.getItem(dbOptions.favorites)) {
    localStorage.setItem(dbOptions.favorites, JSON.stringify([]));
  }
};

export const registerUser = (name, email, password) => {
  const users = JSON.parse(localStorage.getItem(dbOptions.users) || '[]');
  if (users.find(u => u.email === email)) {
    throw new Error('User already exists');
  }
  const newUser = { id: Date.now(), name, email, password };
  users.push(newUser);
  localStorage.setItem(dbOptions.users, JSON.stringify(users));
  return newUser;
};

export const loginUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem(dbOptions.users) || '[]');
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    localStorage.setItem(dbOptions.currentUser, JSON.stringify(user));
    return user;
  }
  throw new Error('Invalid credentials');
};

export const logoutUser = () => {
  localStorage.removeItem(dbOptions.currentUser);
};

export const getCurrentUser = () => {
  const user = localStorage.getItem(dbOptions.currentUser);
  return user ? JSON.parse(user) : null;
};

// Data Operations
export const toggleItem = (storeKey, item) => {
  const items = JSON.parse(localStorage.getItem(storeKey) || '[]');
  const index = items.findIndex(i => i.id === item.id);
  
  if (index >= 0) {
    items.splice(index, 1);
  } else {
    items.push(item);
  }
  localStorage.setItem(storeKey, JSON.stringify(items));
  return items;
};

export const getItems = (storeKey) => {
  return JSON.parse(localStorage.getItem(storeKey) || '[]');
};

export const isFavorited = (id) => {
  const faves = getItems(dbOptions.favorites);
  return faves.some(i => i.id === id);
};

export const isBookmarked = (id) => {
  const marks = getItems(dbOptions.bookmarks);
  return marks.some(i => i.id === id);
};

initDB();
