const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Enable CORS for frontend communication
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Only allow PDF files
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// PDF analysis endpoint
app.post('/analyze-pdf', upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }

    const pdfPath = req.file.path;
    const pythonScriptPath = path.join(__dirname, 'PDF Analysis Tool.py');
    
    // Create a modified version of the Python script for this specific file
    const modifiedScriptPath = path.join(__dirname, 'temp_analysis.py');
    let scriptContent = fs.readFileSync(pythonScriptPath, 'utf8');
    
    // Replace the hardcoded path with the uploaded file path
    scriptContent = scriptContent.replace(
      'pdf_file_path = r"the path to the PDF file"',
      `pdf_file_path = r"${pdfPath}"`
    );
    
    // Write the modified script
    fs.writeFileSync(modifiedScriptPath, scriptContent);

    // Execute the Python script
    const pythonProcess = spawn('python', [modifiedScriptPath]);
    
    let output = '';
    let errorOutput = '';

    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    pythonProcess.on('close', (code) => {
      // Clean up temporary files
      fs.unlinkSync(modifiedScriptPath);
      fs.unlinkSync(pdfPath);

      if (code === 0) {
        // Parse the output and extract relevant information
        const analysisResult = parseAnalysisOutput(output);
        res.json({
          success: true,
          analysis: analysisResult,
          rawOutput: output
        });
      } else {
        console.error('Python script error:', errorOutput);
        res.status(500).json({
          error: 'PDF analysis failed',
          details: errorOutput
        });
      }
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Simple function to parse the analysis output
function parseAnalysisOutput(output) {
  const result = {
    fileName: '',
    fileSize: '',
    scanDate: '',
    fileType: '',
    threatCategories: '',
    scanResult: '',
    embeddedUrls: [],
    detectedThreats: []
  };

  // Basic parsing - you can enhance this based on the actual output format
  const lines = output.split('\n');
  
  // Extract key information from the output
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.includes('File Name')) {
      result.fileName = extractValue(line);
    } else if (line.includes('File Size')) {
      result.fileSize = extractValue(line);
    } else if (line.includes('Scan Date')) {
      result.scanDate = extractValue(line);
    } else if (line.includes('File Type')) {
      result.fileType = extractValue(line);
    } else if (line.includes('Threat Categories')) {
      result.threatCategories = extractValue(line);
    } else if (line.includes('Scan Result')) {
      result.scanResult = extractValue(line);
    }
  }

  return result;
}

function extractValue(line) {
  const parts = line.split('|');
  if (parts.length >= 2) {
    return parts[1].trim();
  }
  return '';
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'PDF Analysis Server is running' });
});

app.listen(PORT, () => {
  console.log(`PDF Analysis Server running on http://localhost:${PORT}`);
});
