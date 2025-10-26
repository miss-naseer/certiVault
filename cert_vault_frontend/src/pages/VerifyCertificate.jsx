import React, { useState, useCallback } from 'react';
import { CheckCircle, XCircle, Search, Loader2 } from 'lucide-react';

const VerifyCertificate = () => {
    const [certId, setCertId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [verificationResult, setVerificationResult] = useState(null); // {status, details}

    const handleVerify = useCallback(async (e) => {
        e.preventDefault();
        setVerificationResult(null);
        setIsLoading(true);
        setTimeout(() => {
            if (certId.trim().toUpperCase() === '2A4F9E') {
                setVerificationResult({ status: 'valid', details: 'Certificate ID 2A4F9E is VALID and confirmed on the blockchain.' });
            } else {
                setVerificationResult({ status: 'invalid', details: `Certificate ID ${certId} is INVALID or not found.` });
            }
            setIsLoading(false);
        }, 1000);
    }, [certId]);

    const VerificationDisplay = ({ result }) => {
        if (result.status === 'valid') {
            return (
                <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-lg">
                    <h3 className="text-xl font-bold text-green-800 flex items-center mb-2">
                        <CheckCircle className="w-6 h-6 mr-2" /> Certificate Verified
                    </h3>
                    <p className="text-green-700">{result.details}</p>
                </div>
            );
        } else {
            return (
                <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-lg">
                    <h3 className="text-xl font-bold text-red-800 flex items-center mb-2">
                        <XCircle className="w-6 h-6 mr-2" /> Invalid Certificate
                    </h3>
                    <p className="text-red-700">{result.details}</p>
                </div>
            );
        }
    };

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
                            disabled={isLoading}
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
