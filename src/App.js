import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const App = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentStep, setCurrentStep] = useState('home'); 
  const [voterId, setVoterId] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [isQrScanning, setIsQrScanning] = useState(false);
  const [electionType, setElectionType] = useState('class');
  const [showResults, setShowResults] = useState(false);

  const voterIdInputRef = useRef(null);

  useEffect(() => {
    if (currentStep === 'auth' && voterIdInputRef.current) {
      setTimeout(() => voterIdInputRef.current.focus(), 100);
    }
  }, [currentStep]);

  const translations = {
    en: {
      title: "JANADESH", tagline: "A blockchain voting system", 
      subtitle: "Transparent • Secure • Democratic",
      proceed: "Proceed to Vote", select: "Select Election Type",
      voterIdPlace: "Enter 10-Digit Voter ID", 
      class: "Class Election", college: "College Election", panchayat: "Panchayat Election", nagarNigam: "Nagar Nigam",
      team: "JANADESH TEAM", tech: "Core Technology", scan: "Scan QR Code", manual: "Manual Entry",
      results: "View Live Results", totalVotes: "Total Votes Cast", winner: "Winner"
    },
    hi: {
      title: "जनादेश", tagline: "एक ब्लॉकचेन वोटिंग प्रणाली", 
      subtitle: "सुरक्षित • पारदर्शी • लोकतांत्रिक",
      proceed: "मतदान के लिए आगे बढ़ें", results: "लाइव परिणाम", select: "चुनाव प्रकार चुनें",
      voterIdPlace: "10-अंकीय वोटर ID दर्ज करें",
      class: "कक्षा चुनाव", college: "कॉलेज चुनाव", panchayat: "पंचायत चुनाव", nagarNigam: "नगर निगम",
      team: "जनादेश टीम", tech: "तकनीकी स्टैक", scan: "QR कोड स्कैन करें", manual: "मैन्युअल प्रविष्टि",
      results: "लाइव परिणाम देखें", totalVotes: "कुल डाले गए मत", winner: "विजेता"
    }
  };

  const t = translations[currentLanguage];

  const candidatesData = {
    class: [
      { id: 1, name: "Rahul Kumar", party: "Independent", votes: 45, emoji: "👨‍🎓" },
      { id: 2, name: "Priya Sharma", party: "Independent", votes: 38, emoji: "👩‍🎓" },
      { id: 3, name: "Amit Singh", party: "Independent", votes: 52, emoji: "👨‍💼" },
      { id: 4, name: "Sneha Kapur", party: "Independent", votes: 29, emoji: "👩‍🏫" }
    ],
    college: [
      { id: 1, name: "Arjun Patel", party: "Student Unity", votes: 1250, emoji: "👨‍🎓" },
      { id: 2, name: "Elena Gupta", party: "Progressive", votes: 1180, emoji: "👩‍💼" },
      { id: 3, name: "Vikram Yadav", party: "Democratic", votes: 1320, emoji: "👨‍💻" },
      { id: 4, name: "Sana Mir", party: "Youth Front", votes: 980, emoji: "👩‍🎓" }
    ],
    panchayat: [
      { id: 1, name: "Ramesh Chandra", party: "Party A", votes: 2850, emoji: "👨‍🌾" },
      { id: 2, name: "Sunita Devi", party: "Party B", votes: 2640, emoji: "👩‍🌾" },
      { id: 3, name: "Rajesh Ram", party: "Party C", votes: 2100, emoji: "👨‍🔧" },
      { id: 4, name: "Geeta Bai", party: "Ind", votes: 1500, emoji: "👩‍🍳" }
    ],
    nagarNigam: [
      { id: 1, name: "Dr. Ashok Kumar", party: "Development", votes: 45200, emoji: "👨‍⚕️" },
      { id: 2, name: "Smt. Kavita Singh", party: "Clean City", votes: 42800, emoji: "👩‍💼" },
      { id: 3, name: "Verma Ji", party: "People First", votes: 31000, emoji: "👨‍💼" },
      { id: 4, name: "Anil Kapoor", party: "New Era", votes: 25000, emoji: "👨‍🎨" }
    ]
  };

  const candidates = candidatesData[electionType] || [];
  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);

  const handleScanSimulation = () => {
    setIsQrScanning(true);
    setTimeout(() => {
      setIsQrScanning(false);
      setVoterId("VTR9922110"); 
      setCurrentStep('voting'); 
    }, 2500);
  };

  const handleManualEntry = () => {
    if (voterId.length === 10) {
      setCurrentStep('voting'); 
    }
  };

  return (
    <div className="janadesh-app">
      <header className="navbar">
        <div className="navbar-content">
          <div className="brand-box" onClick={() => {setCurrentStep('home'); setShowResults(false);}}>
            <div className="logo-shield">
              <svg viewBox="0 0 24 24" className="shield-svg">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2" />
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <div className="brand-text">
              <span className="main-name">{t.title}</span>
              <p className="full-tagline">{t.tagline}</p>
            </div>
          </div>
          <button className="lang-toggle" onClick={() => setCurrentLanguage(currentLanguage === 'en' ? 'hi' : 'en')}>
            {currentLanguage === 'en' ? 'हिन्दी' : 'English'}
          </button>
        </div>
      </header>

      <main className="container-centered">
        {currentStep === 'home' && (
          <div className="view-fade">
            <div className="hero-section">
              <h1>{currentLanguage === 'en' ? "Empowering Every " : "हर एक " }<span>{currentLanguage === 'en' ? "Vote" : "वोट"}</span></h1>
              <p>{t.subtitle}</p>
            </div>
            <div className="modern-glass-card">
              <h3 className="card-heading">{t.select}</h3>
              <div className="election-selector">
                {['class', 'college', 'panchayat', 'nagarNigam'].map(type => (
                  <button key={type} onClick={() => setElectionType(type)} className={`election-item ${electionType === type ? 'active' : ''}`}>
                    <h4>{t[type]}</h4>
                    <span className="secure-badge">Blockchain Verified</span>
                  </button>
                ))}
              </div>
              <div className="button-group-row">
                <button className="btn-black-primary" onClick={() => setCurrentStep('auth')}>{t.proceed}</button>
                <button 
                  className={`btn-outline-sec ${showResults ? 'blue-active' : ''}`} 
                  onClick={() => setShowResults(!showResults)}
                >
                  {t.results}
                </button>
              </div>
            </div>

            {showResults && (
              <div className="modern-glass-card results-container view-fade">
                <div className="results-header">
                  <h3 className="card-heading">{t.results}</h3>
                  <div className="total-badge">
                    <span>{t.totalVotes}:</span>
                    <strong>{totalVotes.toLocaleString()}</strong>
                  </div>
                </div>
                <div className="results-list">
                  {candidates.map(c => {
                    const percentage = ((c.votes / totalVotes) * 100).toFixed(1);
                    const isWinning = c.votes === Math.max(...candidates.map(cand => cand.votes));
                    return (
                      <div key={c.id} className="result-item">
                        <div className="result-info">
                          <div className="cand-name-box">
                            <span className="cand-emoji-small">{c.emoji}</span>
                            <span className="cand-name-text">
                              {c.name} {isWinning && <span className="winner-tag">🏆 {t.winner}</span>}
                            </span>
                          </div>
                          <div className="vote-stats">
                            <span className="vote-count-num">{c.votes.toLocaleString()}</span>
                            <span className="vote-pct">{percentage}%</span>
                          </div>
                        </div>
                        <div className="progress-bg">
                          <div className={`progress-fill ${isWinning ? 'winner-fill' : ''}`} style={{width: `${percentage}%`}}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {currentStep === 'auth' && (
          <div className="modern-glass-card auth-card view-fade">
            <h2 className="step-title">{t.scan}</h2>
            <div className="scanner-outer">
              <div className="scanner-inner stylish-hud">
                <div className="hud-corners"></div>
                <div className="hud-grid"></div>
                <div className="hud-pulse"></div>
                <div className="scanner-beam stylish-laser"></div>
                <div className="hud-circle"></div>
                {isQrScanning ? (
                  <div className="hud-status scanning-text">ANALYZING BIOMETRICS...</div>
                ) : (
                  <div className="hud-status idle-text">READY FOR INPUT</div>
                )}
              </div>
            </div>
            <button className="btn-indigo-scan shadow-glow" onClick={handleScanSimulation}>
              {isQrScanning ? "Decrypting..." : t.scan}
            </button>
            <div className="or-line"><span>OR</span></div>
            <input 
              ref={voterIdInputRef} 
              className="id-input-field" 
              placeholder={t.voterIdPlace} 
              maxLength="10" 
              value={voterId} 
              onChange={(e) => setVoterId(e.target.value.toUpperCase())} 
            />
            <button className="btn-black-primary" onClick={handleManualEntry} disabled={voterId.length !== 10}>
              {t.proceed}
            </button>
          </div>
        )}

        {currentStep === 'voting' && (
          <div className="modern-glass-card view-fade">
            <h2 className="step-title">Official Ballot</h2>
            <div className="candidate-grid">
              {candidates.map(c => (
                <div key={c.id} className={`candidate-box ${selectedCandidate === c.id ? 'selected' : ''}`} onClick={() => setSelectedCandidate(c.id)}>
                  <span className="cand-emoji">{c.emoji}</span>
                  <div className="cand-info">
                    <strong>{c.name}</strong>
                    <p>{c.party}</p>
                  </div>
                  <div className="radio-indicator"></div>
                </div>
              ))}
            </div>
            <button className="btn-black-primary mt-30" onClick={() => setCurrentStep('success')} disabled={!selectedCandidate}>
              Submit Final Vote
            </button>
          </div>
        )}

        {currentStep === 'success' && (
          <div className="modern-glass-card success-container text-center view-fade">
            <div className="green-circle">✓</div>
            <h2>Recorded Successfully!</h2>
            <p>Your vote is now secured on the blockchain ledger.</p>
            <button className="btn-black-primary" style={{marginTop: '20px'}} onClick={() => {setCurrentStep('home'); setShowResults(false);}}>Finish</button>
          </div>
        )}
      </main>

      <footer className="footer-full-horizontal">
          <div className="footer-content-wrap">
            <span className="team-label">{t.team}</span>
            <div className="team-names-row">
              {["Abhinav", "Aayush", "Shiva", "Safal", "Kush", "Utkarsh"].map((name, index) => (
                <span key={name} className="team-member-name">
                  {name}{index !== 5 ? "," : ""}
                </span>
              ))}
            </div>
            
            <div className="footer-divider-line"></div>
            
            <div className="footer-tech-info">
              <p className="tech-stack-display">
                <span className="tech-badge-alt">ETHEREUM SMART CONTRACTS</span>
                <span className="tech-separator">•</span>
                <span className="tech-badge-alt">REACT 19</span>
              </p>
              <p className="copyright-fine-print">© 2025 JANADESH - Decentralized Democracy Initiative</p>
            </div>
          </div>
      </footer>
    </div>
  );
};

export default App;