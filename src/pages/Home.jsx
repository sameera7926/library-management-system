import React from 'react';
import BookCard from '../components/BookCard';

export const mockBooks = [
  { id: 1, title: 'The Silent Patient', author: 'Alex Michaelides', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400&h=600' },
  { id: 2, title: 'Atomic Habits', author: 'James Clear', cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400&h=600' },
  { id: 3, title: 'Dune', author: 'Frank Herbert', cover: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&q=80&w=400&h=600' },
  { id: 4, title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', cover: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=400&h=600' },
  { id: 5, title: '1984', author: 'George Orwell', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400&h=600' },
  { id: 6, title: 'Sapiens', author: 'Yuval Noah Harari', cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=400&h=600' },
  { id: 7, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400&h=600&theme=dark' },
  { id: 8, title: 'To Kill a Mockingbird', author: 'Harper Lee', cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400&h=600&theme=dark' },
  { id: 9, title: 'Brave New World', author: 'Aldous Huxley', cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400&h=600&theme=dark' },
  { id: 10, title: 'The Hobbit', author: 'J.R.R. Tolkien', cover: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?auto=format&fit=crop&q=80&w=400&h=600&theme=dark' },
  { id: 11, title: 'Fahrenheit 451', author: 'Ray Bradbury', cover: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=400&h=600&theme=dark' },
  { id: 12, title: 'Project Hail Mary', author: 'Andy Weir', cover: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=400&h=600&theme=dark' }
];

export default function Home() {
  return (
    <div className="books-grid">
      {mockBooks.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
