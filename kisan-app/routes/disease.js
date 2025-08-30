// routes/disease.js
import express from "express";
import multer from "multer";
import Plant from "../models/Plant.js"; // ✅ import your Mongoose model

const router = express.Router();

// Configure multer (store images in /uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Fake model prediction (replace with ML model later)
const diseaseDB = {
  "leaf_blight": { solution: "Use fungicide and remove infected leaves." },
  "powdery_mildew": { solution: "Spray sulfur solution weekly." },
};

// Upload + Predict
router.post("/upload", upload.single("image"), (req, res) => {
  try {
    // In real case: send image to ML model here
    const predictedDisease = "leaf_blight"; // dummy
    const result = diseaseDB[predictedDisease];

    if (result) {
      res.json({ disease: predictedDisease, solution: result.solution });
    } else {
      res.json({ disease: "Unknown", solution: "No info available yet." });
    }
  } catch (err) {
    res.status(500).json({ msg: "Error processing image" });
  }
});

// Get all plants/diseases
router.get("/", async (req, res) => {
  try {
    const plants = await Plant.find();
    res.json(plants);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
