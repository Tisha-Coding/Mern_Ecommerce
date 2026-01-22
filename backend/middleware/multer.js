import multer from "multer";

// Use memoryStorage for Vercel serverless compatibility
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
