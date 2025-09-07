import React, { useState, useRef, useEffect } from 'react';
import './App.css';

const App = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentStep, setCurrentStep] = useState('home');
  const [voterId, setVoterId] = useState('');
  const [otp, setOtp] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [isQrScanning, setIsQrScanning] = useState(false);
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [electionType, setElectionType] = useState('class');
  const [showResults, setShowResults] = useState(false);

  // Refs for direct DOM manipulation
  const voterIdInputRef = useRef(null);
  const otpInputRef = useRef(null);

  // Focus inputs when screens change
  useEffect(() => {
    if (currentStep === 'qr' && voterIdInputRef.current) {
      setTimeout(() => {
        voterIdInputRef.current.focus();
      }, 100);
    }
  }, [currentStep]);

  useEffect(() => {
    if (currentStep === 'otp' && otpInputRef.current) {
      setTimeout(() => {
        otpInputRef.current.focus();
      }, 100);
    }
  }, [currentStep]);

  // Icons as SVG components
  const VoteIcon = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const QrCodeIcon = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 16a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1v-4zM15 4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V4zM9 9h1m0 0v1m0-1h1m1 0h1" />
    </svg>
  );

  const ShieldIcon = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );

  const CameraIcon = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const CheckCircleIcon = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const ChevronRightIcon = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );

  const GlobeIcon = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 919-9" />
    </svg>
  );

  const ArrowLeftIcon = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  );

  const FileTextIcon = () => (
    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );

  // Translations
  const translations = {
    en: {
      title: "Secure Blockchain Voting System",
      subtitle: "Transparent • Secure • Democratic",
      scanQr: "Scan QR Code",
      enterOtp: "Enter OTP",
      vote: "Cast Your Vote",
      results: "Election Results",
      selectElection: "Select Election Type",
      classElection: "Class Election",
      collegeElection: "College Council Election",
      panchayatElection: "Gram Panchayat (Simulation)",
      nagarNigamElection: "Nagar Nigam (Simulation)",
      proceedToVote: "Proceed to Vote",
      scanQrCode: "Scan your voter QR code",
      otpSent: "OTP sent to your registered mobile number",
      selectCandidate: "Select your candidate",
      confirmVote: "Confirm Your Vote",
      voteSuccess: "Vote Successfully Recorded on Blockchain",
      viewResults: "View Live Results",
      backToHome: "Back to Home",
      liveResults: "Live Election Results",
      totalVotes: "Total Votes Cast",
      security: "Security Features",
      qrAuth: "QR Code Authentication",
      otpVerify: "OTP Verification",
      blockchain: "Blockchain Security",
      encryption: "End-to-End Encryption",
      multiAuth: "Multi-Factor Authentication",
      immutable: "Immutable Record Keeping",
      startCamera: "Start Camera",
      stopScanning: "Stop Scanning",
      back: "Back",
      scanning: "Scanning...",
      enterManually: "Or enter manually:",
      processing: "Processing...",
      voterIdPlaceholder: "Enter Voter ID",
      otpPlaceholder: "Enter 6-digit OTP"
    },
    hi: {
      title: "सुरक्षित ब्लॉकचेन मतदान प्रणाली",
      subtitle: "पारदर्शी • सुरक्षित • लोकतांत्रिक",
      scanQr: "QR कोड स्कैन करें",
      enterOtp: "OTP दर्ज करें",
      vote: "अपना मत डालें",
      results: "चुनाव परिणाम",
      selectElection: "चुनाव प्रकार चुनें",
      classElection: "कक्षा चुनाव",
      collegeElection: "कॉलेज परिषद चुनाव",
      panchayatElection: "ग्राम पंचायत (सिमुलेशन)",
      nagarNigamElection: "नगर निगम (सिमुलेशन)",
      proceedToVote: "मतदान के लिए आगे बढ़ें",
      scanQrCode: "अपना मतदाता QR कोड स्कैन करें",
      otpSent: "आपके पंजीकृत मोबाइल नंबर पर OTP भेजा गया",
      selectCandidate: "अपना उम्मीदवार चुनें",
      confirmVote: "अपने मत की पुष्टि करें",
      voteSuccess: "मत सफलतापूर्वक ब्लॉकचेन पर दर्ज किया गया",
      viewResults: "लाइव परिणाम देखें",
      backToHome: "होम पर वापस जाएं",
      liveResults: "लाइव चुनाव परिणाम",
      totalVotes: "कुल डाले गए मत",
      security: "सुरक्षा सुविधाएं",
      qrAuth: "QR कोड प्रमाणीकरण",
      otpVerify: "OTP सत्यापन",
      blockchain: "ब्लॉकचेन सुरक्षा",
      encryption: "एंड-टू-एंड एन्क्रिप्शन",
      multiAuth: "मल्टी-फैक्टर प्रमाणीकरण",
      immutable: "अपरिवर्तनीय रिकॉर्ड रखना",
      startCamera: "कैमरा चालू करें",
      stopScanning: "स्कैन रोकें",
      back: "वापस",
      scanning: "स्कैन हो रहा है...",
      enterManually: "या मैन्युअल रूप से दर्ज करें:",
      processing: "प्रोसेसिंग...",
      voterIdPlaceholder: "मतदाता ID दर्ज करें",
      otpPlaceholder: "6 अंकों का OTP दर्ज करें"
    }
  };

  const t = translations[currentLanguage];

  // Sample candidates data
  const candidatesData = {
    class: [
      { id: 1, name: "Rahul Kumar", position: "Class Representative", party: "Independent", votes: 45, emoji: "👨‍🎓" },
      { id: 2, name: "Priya Sharma", position: "Class Representative", party: "Independent", votes: 38, emoji: "👩‍🎓" },
      { id: 3, name: "Amit Singh", position: "Class Representative", party: "Independent", votes: 52, emoji: "👨‍💼" }
    ],
    college: [
      { id: 1, name: "Arjun Patel", position: "President", party: "Student Unity Party", votes: 1250, emoji: "👨‍🎓" },
      { id: 2, name: "Sneha Gupta", position: "President", party: "Progressive Students", votes: 1180, emoji: "👩‍💼" },
      { id: 3, name: "Vikram Yadav", position: "President", party: "Democratic Front", votes: 1320, emoji: "👨‍💻" }
    ],
    panchayat: [
      { id: 1, name: "Ramesh Chandra", position: "Sarpanch", party: "BJP", votes: 2850, emoji: "👨‍🌾" },
      { id: 2, name: "Sunita Devi", position: "Sarpanch", party: "Congress", votes: 2640, emoji: "👩‍🌾" },
      { id: 3, name: "Mohan Lal", position: "Sarpanch", party: "Independent", votes: 2920, emoji: "👨‍💼" }
    ],
    nagarNigam: [
      { id: 1, name: "Dr. Ashok Kumar", position: "Mayor", party: "BJP", votes: 45200, emoji: "👨‍⚕️" },
      { id: 2, name: "Smt. Kavita Singh", position: "Mayor", party: "Congress", votes: 42800, emoji: "👩‍💼" },
      { id: 3, name: "Raj Kumar Verma", position: "Mayor", party: "AAP", votes: 38900, emoji: "👨‍💼" }
    ]
  };

  const candidates = candidatesData[electionType] || [];
  const totalVotes = candidates.reduce((sum, candidate) => sum + candidate.votes, 0);

  // Direct DOM manipulation for input handling
  const handleVoterIdInput = (e) => {
    const value = e.target.value.toUpperCase();
    setVoterId(value);
    // Keep focus
    setTimeout(() => {
      if (voterIdInputRef.current && document.activeElement !== voterIdInputRef.current) {
        voterIdInputRef.current.focus();
      }
    }, 0);
  };

  const handleOtpInput = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 6) {
      setOtp(value);
    }
    // Keep focus
    setTimeout(() => {
      if (otpInputRef.current && document.activeElement !== otpInputRef.current) {
        otpInputRef.current.focus();
      }
    }, 0);
  };

  // Functions
  const startQrScan = () => {
    setIsQrScanning(true);
    setTimeout(() => {
      setVoterId("VTR" + Math.floor(Math.random() * 10000000).toString().padStart(7, '0'));
      setIsQrScanning(false);
      setCurrentStep('otp');
    }, 3000);
  };

  const verifyOtp = () => {
    if (otp.length === 6) {
      setCurrentStep('voting');
    }
  };

  const submitVote = () => {
    if (selectedCandidate) {
      setVoteSubmitted(true);
      setCurrentStep('success');
    }
  };

  const resetVoting = () => {
    setCurrentStep('home');
    setVoterId('');
    setOtp('');
    setSelectedCandidate('');
    setVoteSubmitted(false);
    setShowResults(false);
    setIsQrScanning(false);
  };

  // Components
  const SecurityFeatures = () => (
    <div className="security-section">
      <h3>
        <ShieldIcon />
        {t.security}
      </h3>
      <div className="security-grid">
        <div className="security-item">
          <QrCodeIcon />
          <span>{t.qrAuth}</span>
        </div>
        <div className="security-item">
          <CheckCircleIcon />
          <span>{t.otpVerify}</span>
        </div>
        <div className="security-item">
          <ShieldIcon />
          <span>{t.blockchain}</span>
        </div>
        <div className="security-item">
          <FileTextIcon />
          <span>{t.encryption}</span>
        </div>
        <div className="security-item">
          <VoteIcon />
          <span>{t.multiAuth}</span>
        </div>
        <div className="security-item">
          <CheckCircleIcon />
          <span>{t.immutable}</span>
        </div>
      </div>
    </div>
  );

  const HomeScreen = () => (
    <div className="container">
      <div className="hero-section">
        <div className="hero-icon">
          <VoteIcon />
        </div>
        <h1>{t.title}</h1>
        <p className="subtitle">{t.subtitle}</p>
      </div>

      <div className="card">
        <h2>{t.selectElection}</h2>
        <div className="election-grid">
          <button
            onClick={() => setElectionType('class')}
            className={`election-btn ${electionType === 'class' ? 'active blue' : ''}`}
          >
            <div>
              <h3>{t.classElection}</h3>
              <p>Real Implementation</p>
            </div>
          </button>
          <button
            onClick={() => setElectionType('college')}
            className={`election-btn ${electionType === 'college' ? 'active blue' : ''}`}
          >
            <div>
              <h3>{t.collegeElection}</h3>
              <p>Real Implementation</p>
            </div>
          </button>
          <button
            onClick={() => setElectionType('panchayat')}
            className={`election-btn ${electionType === 'panchayat' ? 'active green' : ''}`}
          >
            <div>
              <h3>{t.panchayatElection}</h3>
              <p>Simulation with Large Dataset</p>
            </div>
          </button>
          <button
            onClick={() => setElectionType('nagarNigam')}
            className={`election-btn ${electionType === 'nagarNigam' ? 'active green' : ''}`}
          >
            <div>
              <h3>{t.nagarNigamElection}</h3>
              <p>Simulation with Large Dataset</p>
            </div>
          </button>
        </div>
        
        <div className="button-group">
          <button onClick={() => setCurrentStep('qr')} className="btn primary">
            {t.proceedToVote} <ChevronRightIcon />
          </button>
          <button onClick={() => setShowResults(!showResults)} className="btn success">
            {t.results}
          </button>
        </div>
      </div>

      <SecurityFeatures />
      
      {showResults && <ResultsDisplay />}
    </div>
  );

  const QrScannerScreen = () => (
    <div className="container">
      <div className="card">
        <div className="header">
          <button onClick={() => setCurrentStep('home')} className="back-btn">
            <ArrowLeftIcon />
          </button>
          <h2><QrCodeIcon /> {t.scanQr}</h2>
        </div>
        
        <div className="qr-section">
          <div className="qr-scanner">
            {isQrScanning ? (
              <div className="scanning-state">
                <CameraIcon />
                <p>{t.scanning}</p>
                <div className="qr-frame">
                  <div className="qr-inner">
                    <div className="scan-line"></div>
                    <span>{t.scanning}</span>
                  </div>
                </div>
                <button onClick={() => {
                  setIsQrScanning(false);
                  setVoterId("VTR" + Math.floor(Math.random() * 10000000).toString().padStart(7, '0'));
                  setCurrentStep('otp');
                }} className="btn danger">
                  {t.stopScanning}
                </button>
              </div>
            ) : (
              <div className="qr-idle">
                <QrCodeIcon />
                <p>{t.scanQrCode}</p>
                <button onClick={startQrScan} className="btn primary">
                  {t.startCamera}
                </button>
              </div>
            )}
          </div>

          <div className="manual-entry">
            <p>{t.enterManually}</p>
            <input
              ref={voterIdInputRef}
              type="text"
              placeholder={t.voterIdPlaceholder}
              value={voterId}
              onChange={handleVoterIdInput}
              onInput={handleVoterIdInput}
              className="input"
              maxLength="10"
              autoComplete="off"
              spellCheck="false"
            />
            <button
              onClick={() => voterId.trim() && setCurrentStep('otp')}
              disabled={!voterId.trim()}
              className="btn success"
            >
              {t.proceedToVote}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const OtpScreen = () => (
    <div className="container">
      <div className="card">
        <div className="header">
          <button onClick={() => setCurrentStep('qr')} className="back-btn">
            <ArrowLeftIcon />
          </button>
          <h2><ShieldIcon /> {t.enterOtp}</h2>
        </div>
        
        <div className="otp-section">
          <div className="otp-info">
            <CheckCircleIcon />
            <p>{t.otpSent}</p>
            <p className="voter-id">Voter ID: <strong>{voterId}</strong></p>
          </div>
          
          <input
            ref={otpInputRef}
            type="text"
            placeholder={t.otpPlaceholder}
            maxLength={6}
            value={otp}
            onChange={handleOtpInput}
            onInput={handleOtpInput}
            className="input otp-input"
            autoComplete="off"
            spellCheck="false"
            inputMode="numeric"
            pattern="[0-9]*"
          />
          
          <button
            onClick={verifyOtp}
            disabled={otp.length !== 6}
            className="btn success"
          >
            {t.vote}
          </button>
        </div>
      </div>
    </div>
  );

  const VotingScreen = () => (
    <div className="container">
      <div className="card">
        <div className="header">
          <button onClick={() => setCurrentStep('otp')} className="back-btn">
            <ArrowLeftIcon />
          </button>
          <h2><VoteIcon /> {t.selectCandidate}</h2>
        </div>
        
        <div className="candidates-section">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              onClick={() => setSelectedCandidate(candidate.id)}
              className={`candidate-card ${selectedCandidate === candidate.id ? 'selected' : ''}`}
            >
              <div className="candidate-info">
                <div className="candidate-avatar">{candidate.emoji}</div>
                <div className="candidate-details">
                  <h3>{candidate.name}</h3>
                  <p>{candidate.position}</p>
                  <span className="party">{candidate.party}</span>
                </div>
              </div>
              <div className={`radio ${selectedCandidate === candidate.id ? 'checked' : ''}`}>
                {selectedCandidate === candidate.id && <CheckCircleIcon />}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={submitVote}
          disabled={!selectedCandidate}
          className="btn primary"
        >
          {t.confirmVote}
        </button>
      </div>
    </div>
  );

  const SuccessScreen = () => (
    <div className="container">
      <div className="card success-card">
        <div className="success-icon">
          <CheckCircleIcon />
        </div>
        <h2>{t.voteSuccess}</h2>
        <p className="transaction-id">
          Transaction ID: 0x{Math.random().toString(16).substr(2, 40)}
        </p>

        <div className="button-group">
          <button onClick={() => setShowResults(true)} className="btn success">
            {t.viewResults}
          </button>
          <button onClick={resetVoting} className="btn secondary">
            {t.backToHome}
          </button>
        </div>
      </div>
    </div>
  );

  const ResultsDisplay = () => (
    <div className="card results-card">
      <h2><FileTextIcon /> {t.liveResults}</h2>
      
      <div className="total-votes">
        <p>{t.totalVotes}: <strong>{totalVotes.toLocaleString()}</strong></p>
      </div>

      <div className="results-list">
        {candidates.map((candidate) => {
          const percentage = ((candidate.votes / totalVotes) * 100).toFixed(1);
          const isWinning = candidate.votes === Math.max(...candidates.map(c => c.votes));
          return (
            <div key={candidate.id} className={`result-item ${isWinning ? 'winner' : ''}`}>
              <div className="result-header">
                <div className="candidate-result-info">
                  <span className="candidate-avatar">{candidate.emoji}</span>
                  <div>
                    <h3>
                      {candidate.name}
                      {isWinning && <span className="winner-badge">🏆 Winner</span>}
                    </h3>
                    <p>{candidate.party}</p>
                  </div>
                </div>
                <div className="result-stats">
                  <p className="votes">{candidate.votes.toLocaleString()}</p>
                  <p className="percentage">{percentage}%</p>
                </div>
              </div>
              <div className="progress-bar">
                <div
                  className={`progress-fill ${isWinning ? 'winner' : ''}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <VoteIcon />
            <span>VoteChain</span>
          </div>
          
          <button
            onClick={() => setCurrentLanguage(currentLanguage === 'en' ? 'hi' : 'en')}
            className="language-btn"
          >
            <GlobeIcon />
            <span>{currentLanguage === 'en' ? 'हिं' : 'EN'}</span>
          </button>
        </div>
      </header>

      <main className="main">
        {currentStep === 'home' && <HomeScreen />}
        {currentStep === 'qr' && <QrScannerScreen />}
        {currentStep === 'otp' && <OtpScreen />}
        {currentStep === 'voting' && <VotingScreen />}
        {currentStep === 'success' && <SuccessScreen />}
        
        {showResults && currentStep === 'home' && <ResultsDisplay />}
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About VoteChain</h3>
            <p>A secure, transparent, and democratic blockchain-based voting system designed for educational institutions and local governance.</p>
          </div>
          <div className="footer-section">
            <h3>Team</h3>
            <ul>
              <li>Abhinav - Lead & Security</li>
              <li>Aayush - Blockchain</li>
              <li>Kush - Backend</li>
              <li>Safal - Cloud</li>
              <li>Shiva - Frontend</li>
              <li>Utkarsh - Documentation</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Technology</h3>
            <ul>
              <li>React Frontend</li>
              <li>Spring Boot Backend</li>
              <li>Ethereum Blockchain</li>
              <li>Smart Contracts</li>
              <li>Multi-Factor Auth</li>
              <li>Cloud Deployment</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 VoteChain - Blockchain Voting System. Built for transparency and democracy.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;