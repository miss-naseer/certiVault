import React, { useState, useCallback } from "react";
// Import a loading icon library if you use one (e.g., react-icons/fa)
// For this example, we'll use a simple Tailwind spinner class

// --- SIMULATED ASYNCHRONOUS WEB3/BACKEND LOGIC ---
const simulateIssue = async (formData, certificateFile) => {
  console.log("Simulating Blockchain Transaction...");
  console.log("Data to be Hashed:", formData);
  console.log("File to be stored off-chain:", certificateFile.name);
  
  // 1. (REAL-WORLD): Calculate cryptographic hash of formData + File
  // 2. (REAL-WORLD): Call Smart Contract to record the hash
  // 3. (REAL-WORLD): Upload file to secure storage (IPFS/S3)

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
  
  // Simulate success
  if (Math.random() > 0.1) { 
    return { 
      success: true, 
      certificateId: '0x' + Math.random().toString(16).substr(2, 10).toUpperCase(),
    };
  } else {
    // Simulate failure
    throw new Error("Transaction rejected: Insufficient gas or invalid data format.");
  }
};

const IssueCertificate = () => {
  // --- STATE MANAGEMENT (MODIFIED) ---
  const [formData, setFormData] = useState({
    studentName: "",
    studentId: "", // ✨ NEW REQUIRED FIELD
    course: "",
    issueDate: "",
  });
  const [certificateFile, setCertificateFile] = useState(null); // ✨ NEW STATE for File Upload
  const [isLoading, setIsLoading] = useState(false); // ✨ NEW STATE for Loading/Web3 Transaction
  const [status, setStatus] = useState({ message: '', type: '' }); // ✨ NEW STATE for Success/Error feedback

  // --- HANDLERS ---
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleFileChange = (e) => {
    // Only accept the first file
    setCertificateFile(e.target.files[0]);
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setStatus({ message: '', type: '' }); // Clear previous status

    // Ensure a file is selected
    if (!certificateFile) {
      setStatus({ message: "Please upload the certificate file (PDF/JSON).", type: 'error' });
      return;
    }

    setIsLoading(true);

    try {
      const result = await simulateIssue(formData, certificateFile);
      
      // Handle successful transaction
      if (result.success) {
        setStatus({ 
          message: `Success! Certificate Issued. Blockchain ID: ${result.certificateId}`, 
          type: 'success' 
        });
        // Clear form after success
        setFormData({ studentName: "", studentId: "", course: "", issueDate: "" });
        setCertificateFile(null);
      }
    } catch (error) {
      // Handle transaction failure
      setStatus({ 
        message: `Issue Failed: ${error.message}`, 
        type: 'error' 
      });
    } finally {
      setIsLoading(false);
    }
  }, [formData, certificateFile]);

  // --- UI/UX Enhancements based on state ---
  const statusClasses = 
    status.type === 'success' 
      ? 'bg-green-100 border-green-400 text-green-700'
      : status.type === 'error' 
      ? 'bg-red-100 border-red-400 text-red-700'
      : 'hidden';
      
  const inputClass = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-yellow-600 transition duration-150";

  return (
    // Outer container for a modern full-width feel (simulate main content area)
    <div className="p-8 bg-gray-50 min-h-full">
        
      {/* Modern Header */}
      <h1 className="text-3xl font-extrabold text-pink-900 mb-6 border-b pb-2 border-yellow-600/30">
        Issue New Certificate
      </h1>

      {/* Main Content Card with better shadow and spacing */}
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-4xl mx-auto">
        
        {/* Status Message Display */}
        <div className={`p-4 mb-6 border-l-4 rounded-lg font-medium ${statusClasses}`}>
          {status.message}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* --- SECTION 1: STUDENT DETAILS (GROUPED) --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4 border-b border-gray-100">
            <h2 className="md:col-span-2 text-xl font-semibold text-gray-700 mb-2">Student & Identification</h2>

            {/* Student Name */}
            <div>
              <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-1">Student Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="studentName"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                placeholder="Aisha Bello"
                className={inputClass}
                required
              />
            </div>
            
            {/* Student ID (NEW FIELD) */}
            <div>
              <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">Student ID <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="2023-CS-1234"
                className={inputClass}
                required
              />
            </div>
          </div>
          
          {/* --- SECTION 2: COURSE & DATE --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4 border-b border-gray-100">
            <h2 className="md:col-span-2 text-xl font-semibold text-gray-700 mb-2">Course Information</h2>

            {/* Course Name */}
            <div>
              <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">Course Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                placeholder="Introduction to Blockchain"
                className={inputClass}
                required
              />
            </div>
            
            {/* Issue Date */}
            <div>
              <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700 mb-1">Issue Date <span className="text-red-500">*</span></label>
              <input
                type="date"
                id="issueDate"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
          </div>

          {/* --- SECTION 3: FILE UPLOAD (NEW FIELD) --- */}
          <div>
            <label htmlFor="certificateFile" className="block text-sm font-medium text-gray-700 mb-1">
              Certificate File (PDF or JSON) <span className="text-red-500">*</span>
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-yellow-600/50 border-dashed rounded-lg hover:border-yellow-600 transition">
              <div className="space-y-1 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">...</svg>
                <div className="flex text-sm text-gray-600">
                  <label htmlFor="certificateFile" className="relative cursor-pointer bg-white rounded-md font-medium text-pink-900 hover:text-pink-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-900 transition duration-150">
                    <span>Upload a file</span>
                    <input 
                        id="certificateFile" 
                        name="certificateFile" 
                        type="file" 
                        accept=".pdf,.json" 
                        onChange={handleFileChange} 
                        className="sr-only" 
                        required 
                    />
                  </label>
                  <p className="pl-1 text-gray-500">or drag and drop</p>
                </div>
                {certificateFile && <p className="text-xs text-yellow-600 mt-1">File Selected: {certificateFile.name}</p>}
                {!certificateFile && <p className="text-xs text-gray-500 mt-1">PDF or JSON up to 10MB</p>}
              </div>
            </div>
          </div>


          {/* --- SUBMIT BUTTON WITH LOADING STATE (MODIFIED) --- */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center space-x-2 px-6 py-3 rounded-lg font-semibold text-white transition duration-200 
                ${isLoading 
                  ? 'bg-pink-900/70 cursor-not-allowed' 
                  : 'bg-pink-900 hover:bg-pink-800 shadow-md hover:shadow-lg'
                }`}
            >
              {isLoading && (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isLoading ? "Broadcasting to Blockchain..." : "Issue Certificate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IssueCertificate;