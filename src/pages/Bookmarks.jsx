import React, { useState, useEffect } from 'react';
import BookCard from '../components/BookCard';
import { getItems, dbOptions } from '../db';

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    loadBookmarks();

  const loadBookmarks = () => {
    setBookmarks(getItems(dbOptions.bookmarks));
  };

  if (bookmarks.length === 0) {
    return (
      <div className="empty-state">
        <p>You haven't bookmarked any books yet.</p>
      </div>
    );
  }

  return (
    <div className="books-grid">
      {bookmarks.map(book => (
        <BookCard key={book.id} book={book} onInteraction={loadBookmarks} />
      ))}
    </div>
  );
}
