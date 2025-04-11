const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerAdmin = async (req, res) => {
  const { name,email, password, secretCode } = req.body;
  // Verify admin secret code
  if (secretCode !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ message: "Invalid secret code" });
  }

  try {
    const adminExists = await Admin.findOne({ email });
    if (adminExists) return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ name,email, password: hashedPassword });

    res.status(201).json({ message: "Admin registered" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};


exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.status(200).json({ token, admin: { email: admin.email } });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
