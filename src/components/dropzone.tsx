import { useDropzone } from "react-dropzone";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaFilePdf } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import { useCandidate } from "../context/candidate";
import { analyzePDF, PDFAnalysisResult } from "../services/pdfAnalysisService";
import { useState } from "react";

function Upload({ error }: { error?: string }) {
    const { resume, setResume } = useCandidate();
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<PDFAnalysisResult | null>(null);
    
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxFiles: 1,
        accept: {
            "application/pdf": [],
        },
    });

    async function onDrop(files: File[]) {
        const file = files[0];
        setResume(file);
        
        // Start PDF analysis
        setIsAnalyzing(true);
        setAnalysisResult(null);
        
        try {
            const result = await analyzePDF(file);
            setAnalysisResult(result);
        } catch (error) {
            console.error('PDF Analysis failed:', error);
            setAnalysisResult({
                success: false,
                error: 'Analysis failed. Please try again.'
            });
        } finally {
            setIsAnalyzing(false);
        }
    }

    return (
        <section className="space-y-2">
            <h1>
                Upload Resume <span className="text-red-600">*</span>
            </h1>
            {resume ? (
                <div className="space-y-3">
                    <div className="border border-dashed border-black/20 rounded-lg text-blue-500 flex flex-col items-center justify-center py-10 dropzone relative">
                        <FaFilePdf className=" w-10 h-10" />
                        <h1>{resume.name}</h1>
                        {isAnalyzing && (
                            <div className="text-sm text-gray-600 mt-2">
                                <div className="animate-spin inline-block w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full mr-2"></div>
                                Analyzing PDF...
                            </div>
                        )}
                        <button
                            onClick={() => {
                                setResume(null);
                                setAnalysisResult(null);
                            }}
                            title="delete"
                            className="text-white px-2 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors duration-300 ease-in-out absolute bottom-1 right-1"
                        >
                            {" "}
                            <BsTrash />{" "}
                        </button>
                    </div>
                    
                    {analysisResult && (
                        <div className={`p-4 rounded-lg border ${
                            analysisResult.success 
                                ? analysisResult.analysis?.scanResult?.includes('Clean') 
                                    ? 'bg-green-50 border-green-200 text-green-800'
                                    : 'bg-red-50 border-red-200 text-red-800'
                                : 'bg-red-50 border-red-200 text-red-800'
                        }`}>
                            <h3 className="font-semibold mb-2">PDF Analysis Result</h3>
                            {analysisResult.success && analysisResult.analysis ? (
                                <div className="text-sm space-y-1">
                                    <p><strong>File:</strong> {analysisResult.analysis.fileName}</p>
                                    <p><strong>Size:</strong> {analysisResult.analysis.fileSize} bytes</p>
                                    <p><strong>Status:</strong> {analysisResult.analysis.scanResult}</p>
                                    {analysisResult.analysis.threatCategories && (
                                        <p><strong>Threats:</strong> {analysisResult.analysis.threatCategories}</p>
                                    )}
                                </div>
                            ) : (
                                <p className="text-sm">{analysisResult.error || 'Analysis failed'}</p>
                            )}
                        </div>
                    )}
                </div>
            ) : (
                <div
                    className="border border-dashed border-black/20 rounded-lg text-blue-500 flex flex-col items-center justify-center py-10 dropzone "
                    {...getRootProps()}
                >
                    <input {...getInputProps()} />
                    <AiOutlineCloudUpload className=" w-10 h-10" />
                    <h1>Upload a File</h1>
                    <p className="text-black">Drag and drop your resume here</p>
                </div>
            )}
            {error && <small className="text-red-500">{error}</small>}
        </section>
    );
}

export default Upload;
