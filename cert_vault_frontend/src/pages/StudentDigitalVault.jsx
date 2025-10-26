import React, { useState, useEffect, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { ExternalLink, Share2, Copy, CheckCircle, Clock, XCircle, Loader2 } from 'lucide-react';

// --- GLOBAL VARIABLES (Provided by the Canvas environment) ---
// MUST use these variables for Firebase setup
const appId = typeof __app_id !== 'undefined' ? __app_id : 'certivault-default';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Mock UUID generation since crypto.randomUUID() might be unavailable in some environments
const generateMockUUID = () => {
    return 'user-' + Math.random().toString(36).substring(2, 9);
};

// --- SIMULATED WEB3/BACKEND SERVICE ---
// In a real app, this would generate a secure, short-lived token and save it to a database
const generateSecureShareLink = async (certificateId) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generates a mock, temporary token to embed in the URL
    const mockToken = Math.random().toString(36).substring(2, 15);
    
    // The link the Verifier will use
    const shareLink = `https://certivault.app/verify?id=${certificateId}&token=${mockToken}`;
    return shareLink;
};

// --- MAIN REACT COMPONENT ---
const App = () => {
    // --- FIREBASE/AUTH STATE ---
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    // --- APPLICATION STATE ---
    const [certificates, setCertificates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [shareLink, setShareLink] = useState('');
    const [sharingCertId, setSharingCertId] = useState(null);
    const [copySuccess, setCopySuccess] = useState(false);
    const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

    // 1. FIREBASE INITIALIZATION & AUTHENTICATION
    useEffect(() => {
        if (!firebaseConfig || !Object.keys(firebaseConfig).length) {
            console.error("Firebase config is missing. Using mock data.");
            setIsAuthReady(true);
            setIsLoading(false);
            return;
        }

        try {
            const firebaseApp = initializeApp(firebaseConfig);
            const firestore = getFirestore(firebaseApp);
            const firebaseAuth = getAuth(firebaseApp);
            setDb(firestore);
            setAuth(firebaseAuth);

            // Handle initial authentication
            const authenticate = async () => {
                try {
                    if (initialAuthToken) {
                        await signInWithCustomToken(firebaseAuth, initialAuthToken);
                    } else {
                        await signInAnonymously(firebaseAuth);
                    }
                } catch (error) {
                    console.error("Firebase Auth Error:", error);
                    await signInAnonymously(firebaseAuth);
                }
            };
            authenticate();

            // Set up Auth State Listener
            const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
                if (user) {
                    setUserId(user.uid);
                } else {
                    setUserId(generateMockUUID()); // Fallback to a mock ID
                }
                setIsAuthReady(true);
            });

            return () => unsubscribe();
        } catch (e) {
            console.error("Failed to initialize Firebase:", e);
            setIsAuthReady(true); // Proceed with mock data if initialization fails
            setIsLoading(false);
        }
    }, []);

    // 2. FIRESTORE DATA FETCHING (Certificates belong to the authenticated user)
    useEffect(() => {
        if (!db || !userId || !isAuthReady) return;

        // Path: /artifacts/{appId}/users/{userId}/certificates
        const certCollectionRef = collection(db, 'artifacts', appId, 'users', userId, 'certificates');
        
        // Simulating the data structure from the Issuer side
        const q = query(certCollectionRef);

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const certs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                issuedOn: doc.data().issuedOn?.toDate ? doc.data().issuedOn.toDate().toLocaleDateString() : 'N/A'
            }));
            
            // Fallback mock data if Firestore is empty or unavailable
            if (certs.length === 0) {
                 const mockCertificates = [
                    { id: '1A2B3C', course: 'B.Sc. Computer Science', issuedBy: 'CertiVault University', issuedOn: '2022-06-15', status: 'Active' },
                    { id: '4D5E6F', course: 'Blockchain Fundamentals', issuedBy: 'Global Tech Institute', issuedOn: '2023-11-01', status: 'Active' },
                    { id: '7G8H9I', course: 'Project Management', issuedBy: 'SkillUp Academy', issuedOn: '2024-03-20', status: 'Pending' },
                ];
                setCertificates(mockCertificates);
            } else {
                setCertificates(certs);
            }

            setIsLoading(false);
        }, (error) => {
            console.error("Error fetching certificates:", error);
            setStatusMessage({ type: 'error', text: 'Could not load certificates in real-time.' });
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, [db, userId, isAuthReady]);

    // 3. SHARING LOGIC
    const handleShare = useCallback(async (certId) => {
        setSharingCertId(certId);
        setShareLink('');
        setShareModalOpen(true);
        setCopySuccess(false);

        try {
            const link = await generateSecureShareLink(certId);
            setShareLink(link);
        } catch (error) {
            setStatusMessage({ type: 'error', text: 'Failed to generate share link.' });
        }
    }, []);

    const handleCopy = () => {
        // Fallback for iFrames using document.execCommand('copy')
        try {
            const el = document.createElement('textarea');
            el.value = shareLink;
            el.setAttribute('readonly', '');
            el.style.position = 'absolute';
            el.style.left = '-9999px';
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.error('Failed to copy text using fallback:', err);
            setStatusMessage({ type: 'error', text: 'Failed to copy link. Please copy manually.' });
        }
    };
    
    // --- RENDER HELPERS ---

    const StatusBadge = ({ status }) => {
        const classes = {
            'Active': 'bg-green-100 text-green-800 border-green-400',
            'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-400',
            'Revoked': 'bg-red-100 text-red-800 border-red-400',
            'N/A': 'bg-gray-100 text-gray-800 border-gray-400',
        };
        const Icon = {
            'Active': CheckCircle,
            'Pending': Clock,
            'Revoked': XCircle,
            'N/A': ExternalLink,
        };
        const CurrentIcon = Icon[status] || ExternalLink;

        return (
            <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full border ${classes[status] || classes['N/A']}`}>
                <CurrentIcon className="w-3 h-3 mr-1" />
                {status}
            </span>
        );
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <Loader2 className="animate-spin w-8 h-8 text-pink-900" />
                <p className="ml-3 text-lg text-gray-600">Loading your Digital Vault...</p>
            </div>
        );
    }

    // --- JSX RENDER ---
    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <header className="mb-8 border-b pb-4 border-yellow-600/30">
                <h1 className="text-3xl font-extrabold text-pink-900">
                    My Certificates
                </h1>
                <p className="text-gray-600 mt-1">
                    Manage and share your verified certificates, User ID: <code className="bg-yellow-100 px-1 rounded text-yellow-800">{userId}</code>
                </p>
            </header>

            {statusMessage.text && (
                <div className={`p-4 mb-6 border-l-4 rounded-lg font-medium ${statusMessage.type === 'error' ? 'bg-red-100 border-red-400 text-red-700' : 'bg-green-100 border-green-400 text-green-700'}`}>
                    {statusMessage.text}
                </div>
            )}

            <div className="bg-white p-6 rounded-xl shadow-2xl overflow-x-auto">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Certificates Issued to Me</h2>
                
                {certificates.length === 0 ? (
                    <div className="text-center p-10 text-gray-500">
                        <p>No certificates found in your vault. Please ensure you are logged in correctly.</p>
                    </div>
                ) : (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issuer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issued On</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {certificates.map((cert) => (
                                <tr key={cert.id} className="hover:bg-yellow-50/50 transition duration-150">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cert.course}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cert.issuedBy}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cert.issuedOn}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <StatusBadge status={cert.status} />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                                        <button 
                                            onClick={() => setStatusMessage({type: 'success', text: `Viewing details for ${cert.course}`})}
                                            className="text-pink-900 hover:text-pink-700 font-medium inline-flex items-center"
                                        >
                                            <ExternalLink className="w-4 h-4 mr-1" /> View
                                        </button>
                                        <button
                                            onClick={() => handleShare(cert.id)}
                                            className="text-yellow-600 hover:text-yellow-700 font-medium inline-flex items-center"
                                        >
                                            <Share2 className="w-4 h-4 mr-1" /> Share
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* --- SHARE MODAL (For requirement 2: Control who sees what) --- */}
            {shareModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl p-8 max-w-lg w-full shadow-2xl transform transition-all">
                        <h3 className="text-2xl font-bold text-pink-900 mb-4">Secure Sharing</h3>
                        <p className="text-gray-600 mb-6">
                            Share this temporary link with the employer/verifier. The link grants them temporary, view-only access.
                        </p>

                        <div className="space-y-4">
                            {shareLink ? (
                                <>
                                    <label className="block text-sm font-medium text-gray-700">Verification Link:</label>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            type="text"
                                            readOnly
                                            value={shareLink}
                                            className="flex-1 p-3 border border-yellow-600 rounded-lg bg-yellow-50 text-sm overflow-x-scroll"
                                        />
                                        <button
                                            onClick={handleCopy}
                                            className={`p-3 rounded-lg font-semibold text-white transition duration-200 flex items-center ${copySuccess ? 'bg-green-600' : 'bg-pink-900 hover:bg-pink-800'}`}
                                        >
                                            {copySuccess ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    <p className="text-center text-xs text-gray-500 pt-2">
                                        Scan this code for immediate verification access. 
                                    </p>
                                </>
                            ) : (
                                <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg">
                                    <Loader2 className="animate-spin w-5 h-5 text-pink-900 mr-2" />
                                    <p className="text-gray-600">Generating secure share link...</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setShareModalOpen(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
