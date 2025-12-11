// Multilanguage support for English, Telugu, and Hindi
export type Language = 'en' | 'te' | 'hi';

export const translations = {
  en: {
    // Header
    appName: 'RespiCheck',
    tagline: 'AI-Powered Respiratory Screening',
    login: 'Login',
    logout: 'Logout',
    history: 'History',
    
    // Hero
    heroTitle: 'AI-Powered Respiratory Disease Screening',
    heroSubtitle: 'Describe your symptoms or upload audio samples for intelligent health analysis. Get instant predictions with probability scores.',
    
    // Input
    symptomsPlaceholder: 'Describe your symptoms in detail...\n\nExample: I have been coughing for 3 days with a mild fever, runny nose, and sore throat. I also feel tired and have body aches.',
    uploadAudio: 'Upload Audio',
    recordAudio: 'Record',
    stopRecording: 'Stop',
    analyzeSymptoms: 'Analyze Symptoms',
    analyzing: 'Analyzing...',
    audioRecorded: 'Audio recorded',
    audioSelected: 'Audio file selected',
    
    // Results
    analysisResults: 'Analysis Results',
    aiPowered: 'AI-Powered',
    ruleBased: 'Rule-Based',
    topPredictions: 'Top Predictions',
    probability: 'Probability',
    matchedSymptoms: 'Matched Symptoms',
    recommendations: 'Recommendations',
    suggestedMedicines: 'Suggested OTC Medicines',
    whenToSeekHelp: 'When to Seek Medical Help',
    disclaimer: 'Disclaimer: This is a screening tool only and not a medical diagnosis. Always consult a healthcare professional for proper medical advice.',
    medicineDisclaimer: 'Medicine suggestions are for informational purposes only. Consult a pharmacist or doctor before taking any medication.',
    
    // History
    analysisHistory: 'Analysis History',
    noHistory: 'No analysis history yet. Start by analyzing your symptoms.',
    symptoms: 'Symptoms',
    date: 'Date',
    method: 'Method',
    delete: 'Delete',
    backToHome: 'Back to Home',
    
    // Auth
    signIn: 'Sign In',
    signUp: 'Sign Up',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    createAccount: 'Create Account',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",
    signInError: 'Invalid email or password',
    signUpError: 'Failed to create account',
    passwordMismatch: 'Passwords do not match',
    
    // Footer
    footerText: 'RespiCheck - AI-Powered Respiratory Health Screening',
    
    // Severity
    mild: 'Mild',
    moderate: 'Moderate',
    severe: 'Severe',
    chronic: 'Chronic',
    variable: 'Variable',
  },
  te: {
    // Header
    appName: 'రెస్పీచెక్',
    tagline: 'AI శ్వాసకోశ పరీక్ష',
    login: 'లాగిన్',
    logout: 'లాగౌట్',
    history: 'చరిత్ర',
    
    // Hero
    heroTitle: 'AI-ఆధారిత శ్వాసకోశ వ్యాధి పరీక్ష',
    heroSubtitle: 'మీ లక్షణాలను వివరించండి లేదా తెలివైన ఆరోగ్య విశ్లేషణ కోసం ఆడియో నమూనాలను అప్‌లోడ్ చేయండి. సంభావ్యత స్కోర్‌లతో తక్షణ అంచనాలు పొందండి.',
    
    // Input
    symptomsPlaceholder: 'మీ లక్షణాలను వివరంగా వివరించండి...\n\nఉదాహరణ: నాకు 3 రోజులుగా దగ్గు, తేలికపాటి జ్వరం, ముక్కు కారడం మరియు గొంతు నొప్పి ఉంది. నేను అలసిపోయాను మరియు శరీర నొప్పులు కూడా ఉన్నాయి.',
    uploadAudio: 'ఆడియో అప్‌లోడ్',
    recordAudio: 'రికార్డ్',
    stopRecording: 'ఆపు',
    analyzeSymptoms: 'లక్షణాలను విశ్లేషించు',
    analyzing: 'విశ్లేషిస్తోంది...',
    audioRecorded: 'ఆడియో రికార్డ్ అయింది',
    audioSelected: 'ఆడియో ఫైల్ ఎంచుకోబడింది',
    
    // Results
    analysisResults: 'విశ్లేషణ ఫలితాలు',
    aiPowered: 'AI-ఆధారిత',
    ruleBased: 'నియమ-ఆధారిత',
    topPredictions: 'అగ్ర అంచనాలు',
    probability: 'సంభావ్యత',
    matchedSymptoms: 'సరిపోలిన లక్షణాలు',
    recommendations: 'సిఫారసులు',
    suggestedMedicines: 'సూచించిన మందులు',
    whenToSeekHelp: 'వైద్య సహాయం ఎప్పుడు తీసుకోవాలి',
    disclaimer: 'నిరాకరణ: ఇది స్క్రీనింగ్ సాధనం మాత్రమే మరియు వైద్య నిర్ధారణ కాదు. సరైన వైద్య సలహా కోసం ఎల్లప్పుడూ వైద్య నిపుణులను సంప్రదించండి.',
    medicineDisclaimer: 'మందుల సూచనలు సమాచార ప్రయోజనాల కోసం మాత్రమే. ఏదైనా మందులు తీసుకునే ముందు ఫార్మసిస్ట్ లేదా వైద్యుడిని సంప్రదించండి.',
    
    // History
    analysisHistory: 'విశ్లేషణ చరిత్ర',
    noHistory: 'ఇంకా విశ్లేషణ చరిత్ర లేదు. మీ లక్షణాలను విశ్లేషించడం ద్వారా ప్రారంభించండి.',
    symptoms: 'లక్షణాలు',
    date: 'తేదీ',
    method: 'పద్ధతి',
    delete: 'తొలగించు',
    backToHome: 'హోమ్‌కు తిరిగి వెళ్ళు',
    
    // Auth
    signIn: 'సైన్ ఇన్',
    signUp: 'సైన్ అప్',
    email: 'ఇమెయిల్',
    password: 'పాస్‌వర్డ్',
    confirmPassword: 'పాస్‌వర్డ్ నిర్ధారించండి',
    createAccount: 'ఖాతా సృష్టించు',
    alreadyHaveAccount: 'ఇప్పటికే ఖాతా ఉందా?',
    dontHaveAccount: 'ఖాతా లేదా?',
    signInError: 'చెల్లని ఇమెయిల్ లేదా పాస్‌వర్డ్',
    signUpError: 'ఖాతా సృష్టించడంలో విఫలమైంది',
    passwordMismatch: 'పాస్‌వర్డ్‌లు సరిపోలడం లేదు',
    
    // Footer
    footerText: 'రెస్పీచెక్ - AI-ఆధారిత శ్వాసకోశ ఆరోగ్య పరీక్ష',
    
    // Severity
    mild: 'తేలికపాటి',
    moderate: 'మధ్యస్థం',
    severe: 'తీవ్రమైన',
    chronic: 'దీర్ఘకాలిక',
    variable: 'వేరియబుల్',
  },
  hi: {
    // Header
    appName: 'रेस्पिचेक',
    tagline: 'AI श्वसन जांच',
    login: 'लॉग इन',
    logout: 'लॉग आउट',
    history: 'इतिहास',
    
    // Hero
    heroTitle: 'AI-संचालित श्वसन रोग जांच',
    heroSubtitle: 'अपने लक्षणों का वर्णन करें या बुद्धिमान स्वास्थ्य विश्लेषण के लिए ऑडियो नमूने अपलोड करें। संभावना स्कोर के साथ तत्काल पूर्वानुमान प्राप्त करें।',
    
    // Input
    symptomsPlaceholder: 'अपने लक्षणों का विस्तार से वर्णन करें...\n\nउदाहरण: मुझे 3 दिनों से खांसी है, हल्का बुखार है, नाक बह रही है और गले में खराश है। मुझे थकान भी महसूस हो रही है और शरीर में दर्द है।',
    uploadAudio: 'ऑडियो अपलोड',
    recordAudio: 'रिकॉर्ड',
    stopRecording: 'रुकें',
    analyzeSymptoms: 'लक्षणों का विश्लेषण करें',
    analyzing: 'विश्लेषण हो रहा है...',
    audioRecorded: 'ऑडियो रिकॉर्ड हुआ',
    audioSelected: 'ऑडियो फ़ाइल चुनी गई',
    
    // Results
    analysisResults: 'विश्लेषण परिणाम',
    aiPowered: 'AI-संचालित',
    ruleBased: 'नियम-आधारित',
    topPredictions: 'शीर्ष पूर्वानुमान',
    probability: 'संभावना',
    matchedSymptoms: 'मिलान लक्षण',
    recommendations: 'सिफारिशें',
    suggestedMedicines: 'सुझाई गई दवाइयां',
    whenToSeekHelp: 'चिकित्सा सहायता कब लें',
    disclaimer: 'अस्वीकरण: यह केवल एक स्क्रीनिंग टूल है और चिकित्सा निदान नहीं है। उचित चिकित्सा सलाह के लिए हमेशा स्वास्थ्य पेशेवर से परामर्श करें।',
    medicineDisclaimer: 'दवा सुझाव केवल सूचनात्मक उद्देश्यों के लिए हैं। कोई भी दवा लेने से पहले फार्मासिस्ट या डॉक्टर से परामर्श करें।',
    
    // History
    analysisHistory: 'विश्लेषण इतिहास',
    noHistory: 'अभी तक कोई विश्लेषण इतिहास नहीं। अपने लक्षणों का विश्लेषण करके शुरू करें।',
    symptoms: 'लक्षण',
    date: 'तारीख',
    method: 'विधि',
    delete: 'हटाएं',
    backToHome: 'होम पर वापस',
    
    // Auth
    signIn: 'साइन इन',
    signUp: 'साइन अप',
    email: 'ईमेल',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    createAccount: 'खाता बनाएं',
    alreadyHaveAccount: 'पहले से खाता है?',
    dontHaveAccount: 'खाता नहीं है?',
    signInError: 'अमान्य ईमेल या पासवर्ड',
    signUpError: 'खाता बनाने में विफल',
    passwordMismatch: 'पासवर्ड मेल नहीं खाते',
    
    // Footer
    footerText: 'रेस्पिचेक - AI-संचालित श्वसन स्वास्थ्य जांच',
    
    // Severity
    mild: 'हल्का',
    moderate: 'मध्यम',
    severe: 'गंभीर',
    chronic: 'दीर्घकालिक',
    variable: 'परिवर्तनशील',
  }
};

export type TranslationKeys = keyof typeof translations.en;
