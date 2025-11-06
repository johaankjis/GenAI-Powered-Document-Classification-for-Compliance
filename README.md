# GenAI-Powered Document Classification for Compliance

A modern, AI-powered web application for automatically classifying compliance documents using machine learning. This system helps organizations streamline their document management and compliance workflows by intelligently categorizing documents and assessing their risk levels.

![Next.js](https://img.shields.io/badge/Next.js-16.0.0-black)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.9-38bdf8)

## 🎯 Features

- **Intelligent Document Classification**: Automatically categorizes documents into compliance-relevant categories:
  - Financial Reports
  - Tax Documents
  - Legal Contracts
  - Internal Memos
  - Regulatory Filings
  - Audit Reports

- **Risk Assessment**: Each document is analyzed for risk level (Low, Medium, High, Critical) based on content analysis

- **Real-time Processing**: Fast document processing with visual feedback and processing time metrics

- **Interactive Dashboard**: 
  - Upload documents via drag-and-drop or file picker
  - View comprehensive statistics and analytics
  - Browse classification history with detailed metadata
  - Real-time activity feed
  - Interactive charts and visualizations

- **Confidence Scoring**: Machine learning-based confidence scores for each classification

- **Audit Trail**: Track all document classifications with timestamps and metadata

- **Modern UI/UX**: 
  - Responsive design that works on all devices
  - Dark/Light theme support
  - Smooth animations and transitions
  - Accessible components

## 🛠️ Tech Stack

### Frontend
- **Next.js 16.0.0** - React framework with App Router
- **React 19.2.0** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4.1.9** - Utility-first CSS framework

### UI Components
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Re-usable component library
- **Lucide React** - Icon system
- **Recharts** - Data visualization
- **Sonner** - Toast notifications

### Classification Engine
- Custom keyword-based classifier (simulates ML model behavior)
- Category scoring algorithm
- Risk level detection

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.17.0 or higher recommended)
- **pnpm** (recommended) or npm/yarn

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/johaankjis/GenAI-Powered-Document-Classification-for-Compliance.git
   cd GenAI-Powered-Document-Classification-for-Compliance
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/
│   ├── api/                    # API routes
│   │   ├── audit-logs/        # Audit log endpoints
│   │   ├── classifications/    # Classification history endpoints
│   │   ├── classify/          # Document classification endpoint
│   │   └── stats/             # Statistics endpoints
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   ├── ui/                    # Reusable UI components
│   ├── audit-trail.tsx        # Audit log viewer
│   ├── category-chart.tsx     # Category distribution chart
│   ├── classification-detail-modal.tsx
│   ├── classification-table.tsx
│   ├── real-time-feed.tsx     # Live activity feed
│   ├── risk-distribution.tsx  # Risk level visualization
│   ├── stats-overview.tsx     # Dashboard statistics
│   ├── theme-provider.tsx     # Theme management
│   └── upload-zone.tsx        # File upload interface
├── lib/
│   ├── classifier.ts          # Document classification logic
│   ├── mock-db.ts             # In-memory database
│   ├── types.ts               # TypeScript types
│   └── utils.ts               # Utility functions
├── public/                    # Static assets
├── styles/                    # Additional styles
├── components.json            # shadcn/ui configuration
├── next.config.mjs            # Next.js configuration
├── package.json               # Dependencies
├── postcss.config.mjs         # PostCSS configuration
├── tailwind.config.ts         # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

## 🔌 API Endpoints

### POST `/api/classify`
Classify a document and return category, confidence, and risk level.

**Request:**
- Method: POST
- Content-Type: multipart/form-data
- Body: file (text document)

**Response:**
```json
{
  "success": true,
  "classification": {
    "id": "doc-123...",
    "documentName": "example.txt",
    "category": "Financial Report",
    "confidence": 0.87,
    "riskLevel": "Medium",
    "timestamp": "2025-11-06T04:29:32.848Z",
    "processingTime": 892,
    "metadata": {
      "fileSize": 1234,
      "fileType": "text/plain",
      "wordCount": 250
    }
  }
}
```

### GET `/api/classifications`
Retrieve all document classifications.

**Response:**
```json
{
  "success": true,
  "classifications": [...]
}
```

### GET `/api/stats`
Get classification statistics and analytics.

**Response:**
```json
{
  "success": true,
  "stats": {
    "totalDocuments": 42,
    "byCategory": {...},
    "byRiskLevel": {...},
    "averageConfidence": 0.85,
    "recentClassifications": [...]
  }
}
```

### GET `/api/audit-logs`
Retrieve audit trail for document classifications.

**Response:**
```json
{
  "success": true,
  "logs": [...]
}
```

## 💡 Usage

1. **Upload a Document**
   - Drag and drop a text file into the upload zone, or
   - Click to browse and select a file
   - Click "Classify Document" to process

2. **View Results**
   - See the classification category and confidence score
   - Review the assigned risk level
   - Check processing time and metadata

3. **Explore Dashboard**
   - View overall statistics in the overview section
   - Analyze category distribution in the pie chart
   - Monitor risk levels across documents
   - Track recent activity in the real-time feed

4. **Review History**
   - Browse all classified documents in the table
   - Click on any document to see detailed information
   - Sort and filter classifications

## 🎨 Classification Categories

The system classifies documents into six main categories:

1. **Financial Report** - Revenue, profit/loss statements, balance sheets, earnings reports
2. **Tax Document** - Tax returns, IRS filings, deductions, withholding documents
3. **Legal Contract** - Agreements, terms and conditions, covenants
4. **Internal Memo** - Team updates, announcements, internal communications
5. **Regulatory Filing** - SEC filings, compliance disclosures, regulatory submissions
6. **Audit Report** - Audit findings, examinations, assessments

## 🔒 Risk Levels

Documents are assessed for risk based on content analysis:

- **Low** - Routine, standard documents
- **Medium** - Documents requiring attention or review
- **High** - Documents with concerns, issues, or warnings
- **Critical** - Documents containing fraud indicators, violations, or legal issues

## 🧪 Development

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### Building for Production

```bash
pnpm build
pnpm start
```

The application will be optimized and ready for deployment.

## 🌐 Deployment

This application can be deployed on any platform that supports Next.js:

- **Vercel** (recommended) - Zero configuration deployment
- **Netlify** - Deploy with build command: `pnpm build`
- **Docker** - Containerized deployment
- **Self-hosted** - Deploy on your own infrastructure

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons by [Lucide](https://lucide.dev/)
- Charts by [Recharts](https://recharts.org/)

## 📧 Contact

For questions, issues, or suggestions, please open an issue on GitHub.

---

**Note:** This is a demonstration application. The classification engine uses a keyword-based approach to simulate ML model behavior. For production use, consider integrating a real machine learning model like DistilBERT, BERT, or other transformer-based models fine-tuned for document classification tasks.
