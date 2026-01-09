import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "./models/User.js";

const app = express();
app.use(express.json());
app.use(cors({
  origin: "*  ", // adapte au port de ton front
  credentials: true
}));

// Connexion MongoDB
mongoose.connect("mongodb://localhost:27017/gsh_social")
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch(err => console.error("Erreur MongoDB:", err));

// ---------------- ROUTES ----------------

// Inscription
app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Vérifie si l'email existe déjà
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email déjà utilisé" });
    }

    // Hash du mot de passe
    const hashed = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const user = await User.create({ username, email, password: hashed });

    res.json({ message: "Utilisateur créé", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Connexion
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Utilisateur introuvable" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Mot de passe incorrect" });

    // Génération du token JWT
    const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1h" });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Profil (protégé par JWT)
app.get("/profile", async (req, res) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: "Token manquant" });

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, "SECRET_KEY");

    const user = await User.findById(decoded.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(401).json({ error: "Token invalide", details: err.message });
  }
});

// ----------------------------------------
app.listen(3000, "0.0.0.0", () => console.log("🚀 Backend lancé sur http://0.0.0.0:3000"));

app.get("/profile", authMiddleware, async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  res.json(user);
});
