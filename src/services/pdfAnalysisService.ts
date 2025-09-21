export interface PDFAnalysisResult {
  success: boolean;
  analysis?: {
    fileName: string;
    fileSize: string;
    scanDate: string;
    fileType: string;
    threatCategories: string;
    scanResult: string;
    embeddedUrls: string[];
    detectedThreats: string[];
  };
  rawOutput?: string;
  error?: string;
  details?: string;
}

const API_BASE_URL = 'http://localhost:3001';

export const analyzePDF = async (file: File): Promise<PDFAnalysisResult> => {
  try {
    const formData = new FormData();
    formData.append('pdf', file);

    const response = await fetch(`${API_BASE_URL}/analyze-pdf`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'PDF analysis failed');
    }

    return result;
  } catch (error) {
    console.error('PDF Analysis Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

export const checkServerHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error('Server health check failed:', error);
    return false;
  }
};
