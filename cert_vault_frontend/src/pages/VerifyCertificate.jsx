import React, { useState, useCallback, useEffect } from 'react';
import { doc, getDoc} from 'firebase/firestore';
import { getAuth, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { CheckCircle, XCircle, Loader2, Search } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// ... is correct!


// --- GLOBAL VARIABLES (Provided by the Canvas environment) ---
const appId = typeof __app_id !== 'undefined' ? __app_id : 'certivault-default';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Initialize Firebase services outside the component
let db, auth;
try {
    if (firebaseConfig.projectId) {
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        auth = getAuth(app);
    }
} catch (e) {
    console.error("Firebase Init Error for Verifier:", e);
}

// --- CORE SIMULATION LOGIC ---
const fetchAndVerifyCertificate = async (certId) => {
    if (!db) throw new Error("Verification service is offline due to configuration error.");
    
    // STEP 1: Fetch the official record from the public database
    // Path: /artifacts/{appId}/public/data/certificates/{certId}
    const certRef = doc(db, 'artifacts', appId, 'public', 'data', 'certificates', certId);
    const docSnap = await getDoc(certRef);

    if (!docSnap.exists()) {
        return { 
            status: 'unverified', 
            details: 'Record not found in the public ledger.', 
            data: null 
        };
    }

    const officialRecord = docSnap.data();

    // STEP 2: Simulate fetching the original file and re-hashing it
    // In a real application, this step would involve fetching the encrypted file 
    // from storage (S3/IPFS) and calculating its hash (e.g., using SHA-256)
    
    // For simulation, we assume the re-calculated hash matches the official stored hash
    // 95% of the time, simulating a successful match.
    const isHashMatch = Math.random() > 0.05; 
    
    // STEP 3: Check the blockchain (Simulated)
    // The officialRecord.blockchainHash is the fingerprint recorded on the immutable ledger.
    // If the re-calculated hash matches the official hash, the certificate is VERIFIED.

    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network check delay

    if (isHashMatch) {
        return { 
            status: 'verified', 
            details: 'Hash matches the record on the immutable blockchain ledger.', 
            data: officialRecord 
        };
    } else {
        return { 
            status: 'tampered', 
            details: 'Hash mismatch! The certificate content has been altered.', 
            data: officialRecord 
        };
    }
};

const VerifyCertificate = () => {
    const [certId, setCertId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [verificationResult, setVerificationResult] = useState(null); // {status, details, data}
    const [authReady, setAuthReady] = useState(false);

    // Ensure user is authenticated for Firestore read access
    useEffect(() => {
        if (!auth) return;
        const authenticate = async () => {
            if (initialAuthToken) {
                await signInWithCustomToken(auth, initialAuthToken).catch(e => console.error("Custom Auth Error:", e));
            } else {
                await signInAnonymously(auth).catch(e => console.error("Anon Auth Error:", e));
            }
            setAuthReady(true);
        };
        authenticate();
    }, []);

    const handleVerify = useCallback(async (e) => {
        e.preventDefault();
        setVerificationResult(null);
        if (!authReady || !db) {
            setVerificationResult({ status: 'error', details: "Verification service is not ready. Please refresh." });
            return;
        }

        if (certId.length < 5) {
            setVerificationResult({ status: 'error', details: "Please enter a valid certificate ID." });
            return;
        }

        setIsLoading(true);
        try {
            const result = await fetchAndVerifyCertificate(certId.trim());
            setVerificationResult(result);
        } catch (error) {
            setVerificationResult({ status: 'error', details: error.message });
        } finally {
            setIsLoading(false);
        }
    }, [certId, authReady]);

    // --- RENDER HELPERS ---

    const VerificationDisplay = ({ result }) => {
        const { status, details, data } = result;

        if (status === 'error') {
            return (
                <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-lg">
                    <h3 className="text-xl font-bold text-red-800 flex items-center mb-2">
                        <XCircle className="w-6 h-6 mr-2" /> Verification Error
                    </h3>
                    <p className="text-red-700">{details}</p>
                </div>
            );
        }

        const isVerified = status === 'verified';
        const isTampered = status === 'tampered';
        
        const cardClass = isVerified ? 'bg-green-50 border-green-500' : 
                          isTampered ? 'bg-red-50 border-red-500' :
                          'bg-gray-50 border-gray-400';
        
        const icon = isVerified ? <CheckCircle className="w-8 h-8 text-green-600" /> : 
                     isTampered ? <XCircle className="w-8 h-8 text-red-600" /> :
                     <XCircle className="w-8 h-8 text-gray-600" />;

        const title = isVerified ? 'VERIFIED' : 
                      isTampered ? 'TAMPERED' : 
                      'NOT FOUND';

        const titleColor = isVerified ? 'text-green-600' : 
                           isTampered ? 'text-red-600' :
                           'text-gray-600';

        return (
            <div className={`border-l-4 p-6 rounded-lg shadow-md ${cardClass}`}>
                <div className="flex items-center space-x-4 mb-4">
                    {icon}
                    <h3 className={`text-4xl font-extrabold ${titleColor}`}>{title}</h3>
                </div>
                <p className="text-gray-700 font-medium mb-4">{details}</p>

                {data && (
                    <div className="mt-6 border-t pt-4 border-gray-200">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Certificate Details Found:</h4>
                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                            <p className="text-gray-500">Student Name:</p>
                            <p className="font-semibold text-gray-900">{data.studentName}</p>

                            <p className="text-gray-500">Course:</p>
                            <p className="font-semibold text-gray-900">{data.course}</p>
                            
                            <p className="text-gray-500">Issuer:</p>
                            <p className="font-semibold text-gray-900">{data.issuerName}</p>

                            <p className="text-gray-500">Issue Date:</p>
                            <p className="font-semibold text-gray-900">{data.issueDate}</p>

                            <p className="text-gray-500">Blockchain Hash:</p>
                            <p className="font-mono text-xs break-all text-pink-900">{data.blockchainHash}</p>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // --- JSX RENDER ---
    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-xl mx-auto">
                <h1 className="text-3xl font-extrabold text-pink-900 mb-6 border-b pb-2 border-yellow-600/30 text-center">
                    Certificate Verification
                </h1>

                <div className="bg-white p-8 rounded-xl shadow-2xl">
                    <p className="text-sm text-gray-600 mb-6 text-center">
                        Instantly verify the authenticity of any CertiVault certificate by checking its record against the blockchain ledger.
                    </p>
                    
                    <form onSubmit={handleVerify} className="flex space-x-3 mb-8">
                        <div className="flex-1">
                            <label htmlFor="certId" className="sr-only">Certificate ID</label>
                            <input
                                id="certId"
                                type="text"
                                value={certId}
                                onChange={(e) => setCertId(e.target.value)}
                                placeholder="Enter Certificate ID (e.g., 2A4F9E)"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 outline-none transition duration-150"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-pink-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-800 transition shadow-md flex items-center space-x-2"
                            disabled={isLoading || !authReady}
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin w-5 h-5" />
                            ) : (
                                <Search className="w-5 h-5" />
                            )}
                            <span>{isLoading ? "Checking..." : "Verify"}</span>
                        </button>
                    </form>

                    {/* Verification Result Area */}
                    {!verificationResult && !isLoading && (
                        <div className="text-center p-10 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="text-gray-500">Enter an ID above to begin verification.</p>
                        </div>
                    )}

                    {verificationResult && (
                        <VerificationDisplay result={verificationResult} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerifyCertificate;
