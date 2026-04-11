import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import { getItems, dbOptions } from '../db';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = () => {
    setFavorites(getItems(dbOptions.favorites));
  };

  if (favorites.length === 0) {
    return (
      <div className="empty-state">
        <p>You haven't added any books to your favorites yet.</p>
      </div>
    );
  }

  return (
    <div className="books-grid">
      {favorites.map(book => (
        <BookCard key={book.id} book={book} onInteraction={loadFavorites} />
      ))}
    </div>
  );
}
