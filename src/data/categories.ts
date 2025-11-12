import {
    faFilePdf,
    faScissors,
    faLock,
    faUnlock,
    faFileWord,
    faRotate,
    faFileSignature,
    faFileLines,
    faCompress,
    faImage,
    faTextHeight,
    faFont,
    faKey,
    faCode,
    faRulerCombined,
    faPlay,
    faQrcode,
} from "@fortawesome/free-solid-svg-icons";

export const categories = [
    // {

    //     title: "AI Tools (Free)",
    //     tools: [
    //         {
    //             name: "Free AI Chat",
    //             description: "Chat with a free AI powered by open-source models.",
    //             path: "/tools/free-ai-chat",
    //             icon: faRobot,
    //         },
    //     ],
    // },
    {
        title: "📄 PDF Tools",
        tools: [
            {
                name: "PDF Merge",
                description: "Combine multiple PDFs into one document easily.",
                path: "/tools/pdf-merge",
                icon: faFilePdf,
            },
            {
                name: "PDF Splitter",
                description: "Split large PDFs into smaller files.",
                path: "/tools/pdf-split",
                icon: faScissors,
            },
            {
                name: "PDF Password Protect",
                description: "Encrypt your PDF with a secure password.",
                path: "/tools/pdf-protect",
                icon: faLock,
            },
            {
                name: "PDF Unlock",
                description: "Remove password protection from secured PDFs.",
                path: "/tools/pdf-unlock",
                icon: faUnlock,
            },
            {
                name: "PDF to Word",
                description: "Convert your PDF documents into editable Word files.",
                path: "/tools/pdf-to-word",
                icon: faFileWord,
            },
            {
                name: "PDF Rotate",
                description: "Rotate pages in your PDF document.",
                path: "/tools/pdf-rotate",
                icon: faRotate,
            },
            {
                name: "PDF Sign",
                description: "Digitally sign PDF documents.",
                path: "/tools/pdf-sign",
                icon: faFileSignature,
            },
            {
                name: "Text to PDF",
                description: "Convert plain text files into PDFs.",
                path: "/tools/text-to-pdf",
                icon: faFileLines,
            },
        ],
    },
    {
        title: "🖼️ Image Tools",
        tools: [
            {
                name: "Image Compressor",
                description: "Compress images without losing quality.",
                path: "/tools/image-compressor",
                icon: faCompress,
            },
            {
                name: "Image Resizer",
                description: "Resize, compress, and optimize images instantly.",
                path: "/tools/image-resize",
                icon: faImage,
            },
        ],
    },
    {
        title: "🎵 Audio & Video Tools",
        tools: [
            {
                name: "Video Compressor",
                description:
                    "Compress video files to reduce size without losing much quality.",
                path: "/tools/video-compressor",
                icon: faCompress,
            },
            // {
            //     name: "Video to MP3",
            //     description: "Extract and convert the audio track from video files to MP3 format.",
            //     path: "/tools/video-to-mp3",
            //     icon: faMusic,
            // },
        ],
    },
    {
        title: "📝 Text & Utility Tools",
        tools: [
            // {
            //     name: "Online Notepad",
            //     description: "Write, edit, and autosave notes in your browser.",
            //     path: "/tools/online-notepad",
            //     icon: faFileLines,
            // },
            {
                name: "Text Case Converter",
                description: "Convert text to UPPERCASE, lowercase, Title Case, etc.",
                path: "/tools/text-case-converter",
                icon: faTextHeight,
            },
            {
                name: "Word Counter",
                description: "Count words, characters, and estimate reading time.",
                path: "/tools/word-counter",
                icon: faFont,
            },
            {
                name: "Password Generator",
                description: "Generate secure random passwords with one click.",
                path: "/tools/password-generator",
                icon: faKey,
            },
            {
                name: "JSON Formatter",
                description: "Validate & format JSON with syntax highlighting.",
                path: "/tools/json-formatter",
                icon: faCode,
            },
            {
                name: "Unit Converter",
                description: "Convert length, weight, temperature, and more units.",
                path: "/tools/unit-converter",
                icon: faRulerCombined,
            },
        ],
    },
    {
        title: "⚡ Developer Tools",
        tools: [
            {
                name: "JS Runner",
                description: "Write and run JavaScript code online.",
                path: "/tools/js-runner",
                icon: faPlay,
            },
            {
                name: "QR Code Generator",
                description: "Generate QR codes instantly from text or URLs.",
                path: "/tools/qr-code-generator",
                icon: faQrcode,
            },
        ],
    },
];