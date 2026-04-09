import React, { useState, useEffect } from 'react';
import { Heart, Bookmark } from 'lucide-react';
import { toggleItem, isFavorited, isBookmarked, dbOptions } from '../db';

export default function BookCard({ book, onInteraction }) {
  const [faved, setFaved] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    setFaved(isFavorited(book.id));
    setBookmarked(isBookmarked(book.id));
  }, [book.id]);

  const handleFavorite = (e) => {
    e.preventDefault();
    toggleItem(dbOptions.favorites, book);
    setFaved(!faved);
    if (onInteraction) onInteraction();
  };

  const handleBookmark = (e) => {
    e.preventDefault();
    toggleItem(dbOptions.bookmarks, book);
    setBookmarked(!bookmarked);
    if (onInteraction) onInteraction();
  };

  return (
    <div className="book-card">
      <div className="book-cover">
        <img src={book.cover} alt={book.title} />
        <div className="book-overlay">
          <button className={`icon-btn ${bookmarked ? 'active' : ''}`} onClick={handleBookmark}>
            <Bookmark size={20} fill={bookmarked ? "currentColor" : "none"} />
          </button>
          <button className={`icon-btn ${faved ? 'active' : ''}`} onClick={handleFavorite}>
            <Heart size={20} fill={faved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
      <div className="book-info">
        <h3>{book.title}</h3>
        <p>{book.author}</p>
      </div>
    </div>
  );
}
