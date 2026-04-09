import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, updateUserPreferences } from '../db';
import logoUrl from '../assets/logo.jpeg';

// Mock Data Models for Questions
const readerTypes = [
  { id: 'beginner', label: 'Beginner', img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&q=80' },
  { id: 'casual', label: 'Casual Reader', img: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=300&q=80' },
  { id: 'booklover', label: 'Book Lover', img: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=300&q=80' },
  { id: 'academic', label: 'Academic', img: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?w=300&q=80' }
];

const genres = [
  { id: 'fiction', label: 'Fiction', img: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&q=80&theme=dark' },
  { id: 'nonfiction', label: 'Nonfiction', img: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=300&q=80' },
  { id: 'romance', label: 'Romance', img: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=300&q=80' },
  { id: 'horror', label: 'Horror', img: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=300&q=80' },
  { id: 'fantasy', label: 'Fantasy', img: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?w=300&q=80' },
  { id: 'action', label: 'Action', img: 'https://images.unsplash.com/photo-1533613220915-609f661a6fe1?w=300&q=80' },
  { id: 'thriller', label: 'Thriller', img: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=300&q=80' },
  { id: 'tech', label: 'Technology', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80' }
];

const timePrefs = [
  { id: 't1', label: '< 30 min', img: 'https://images.unsplash.com/photo-1508013861974-9f6347ce3086?w=300&q=80' },
  { id: 't2', label: '30m - 1 hr', img: 'https://images.unsplash.com/photo-1434493789847-2f02b3c299e5?w=300&q=80' },
  { id: 't3', label: '1 - 2 hrs', img: 'https://images.unsplash.com/photo-1501139083538-0139583c060f?w=300&q=80' },
  { id: 't4', label: '> 2 hrs', img: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=300&q=80' }
];

const langs = [
  { id: 'en', label: 'English', img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=300&q=80' },
  { id: 'hi', label: 'Hindi', img: 'https://images.unsplash.com/photo-1590089415225-401cd073d0c0?w=300&q=80' },
  { id: 'te', label: 'Telugu', img: 'https://images.unsplash.com/photo-1621884483733-14995eb871d3?w=300&q=80' },
  { id: 'mr', label: 'Marathi', img: 'https://images.unsplash.com/photo-1542382103-605d3b6b6ca0?w=300&q=80' },
  { id: 'ta', label: 'Tamil', img: 'https://images.unsplash.com/photo-1555529902-53697920ab02?w=300&q=80' }
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    type: '',
    genres: [],
    time: '',
    languages: []
  });

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/login');
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  const toggleSelection = (field, value) => {
    setForm(prev => {
      const isArray = Array.isArray(prev[field]);
      if (isArray) {
        if (prev[field].includes(value)) {
          return { ...prev, [field]: prev[field].filter(v => v !== value) };
        } else {
          return { ...prev, [field]: [...prev[field], value] };
        }
      }
      return { ...prev, [field]: value };
    });
  };

  const executeTransition = () => {
    updateUserPreferences(user.id, form);
    setStep(5);
    setTimeout(() => {
      navigate('/dashboard');
    }, 4000); // 4 seconds of reading "Welcome to your book heaven"
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else if (step === 4) {
      executeTransition();
    }
  };

  const isNextDisabled = () => {
    if (step === 1) return !form.type;
    if (step === 2) return form.genres.length === 0;
    if (step === 3) return !form.time;
    if (step === 4) return form.languages.length === 0;
    return false;
  };

  if (!user) return null;

  // Step 5 acts as an isolated fullscreen overlay
  if (step === 5) {
    return (
      <div className="onboarding-page cinematic-transition page-entrance">
        <h1 className="heaven-text">Welcome to your book heaven</h1>
      </div>
    );
  }

  return (
    <div className="onboarding-page page-entrance">
      <div className="onboarding-header">
         <img src={logoUrl} alt="Readx" className="onboarding-logo" />
      </div>

      <div className="wizard-container">
        
        {/* Progress Bar */}
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(step / 4) * 100}%` }}></div>
        </div>
        <p className="step-indicator">Step {step} of 4</p>

        {/* --- STEP 1 --- */}
        {step === 1 && (
          <div className="wizard-step simpleFadeIn">
            <h2>What type of reader are you?</h2>
            <p className="wizard-subtitle">Help us personalize your reading journey.</p>
            
            <div className="image-grid-uniform">
              {readerTypes.map(rt => (
                <div 
                  key={rt.id} 
                  className={`image-card small ${form.type === rt.id ? 'selected' : ''}`}
                  onClick={() => setForm({...form, type: rt.id})}
                >
                  <img src={rt.img} alt={rt.label} />
                  <div className="card-overlay">
                    <h4>{rt.label}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- STEP 2 --- */}
        {step === 2 && (
           <div className="wizard-step simpleFadeIn">
            <h2>Your favorite preferences</h2>
            <p className="wizard-subtitle">Select all that apply.</p>
            
            <div className="image-grid-uniform">
              {genres.map(g => (
                <div 
                  key={g.id} 
                  className={`image-card small ${form.genres.includes(g.id) ? 'selected' : ''}`}
                  onClick={() => toggleSelection('genres', g.id)}
                >
                  <img src={g.img} alt={g.label} />
                  <div className="card-overlay">
                    <h4>{g.label}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- STEP 3 --- */}
        {step === 3 && (
           <div className="wizard-step simpleFadeIn">
            <h2>Time preferences</h2>
            <p className="wizard-subtitle">How much time do you dedicate to reading?</p>
            
            <div className="image-grid-uniform">
              {timePrefs.map(tp => (
                <div 
                  key={tp.id} 
                  className={`image-card small ${form.time === tp.id ? 'selected' : ''}`}
                  onClick={() => setForm({...form, time: tp.id})}
                >
                  <img src={tp.img} alt={tp.label} />
                  <div className="card-overlay">
                    <h4>{tp.label}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- STEP 4 --- */}
        {step === 4 && (
           <div className="wizard-step simpleFadeIn">
            <h2>Language preferences</h2>
            <p className="wizard-subtitle">What languages do you prefer reading in?</p>
            
            <div className="image-grid-uniform">
              {langs.map(l => (
                <div 
                  key={l.id} 
                  className={`image-card small ${form.languages.includes(l.id) ? 'selected' : ''}`}
                  onClick={() => toggleSelection('languages', l.id)}
                >
                  <img src={l.img} alt={l.label} />
                  <div className="card-overlay">
                    <h4>{l.label}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="wizard-footer">
          {step > 1 ? (
             <button className="text-btn-subdued" onClick={() => setStep(step-1)}>Back</button>
          ) : <div></div>}
          
          <button 
            className="submit-btn next-btn" 
            disabled={isNextDisabled()} 
            onClick={handleNext}
          >
            {step === 4 ? `Finish Setup` : `Continue`}
          </button>
        </div>

      </div>
    </div>
  );
}
