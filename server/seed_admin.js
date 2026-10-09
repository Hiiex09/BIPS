import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./src/model/auth_model.js";

dotenv.config();

const createAdmin = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/BIPS";
    console.log("Connecting to:", mongoUri);
    await mongoose.connect(mongoUri);

    const email = "admin@barangaytejero.gov.ph";
    const mobile = "09123456789";
    const password = "AdminPassword123!";

    const existingUser = await User.findOne({ $or: [{ email }, { mobile }] });
    if (existingUser) {
      existingUser.role = "Admin";
      existingUser.status = "Active";
      const salt = await bcrypt.genSalt(10);
      existingUser.password = await bcrypt.hash(password, salt);
      await existingUser.save();
      console.log(`Updated existing user (${existingUser.email}) to Admin!`);
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const adminUser = new User({
        firstName: "System",
        lastName: "Administrator",
        address: "Barangay Hall, Tejero",
        email,
        mobile,
        password: hashedPassword,
        role: "Admin",
        status: "Active",
      });

      await adminUser.save();
      console.log("Successfully created new Admin user!");
    }

    console.log("-----------------------------------------");
    console.log("Credentials:");
    console.log(`Email:    ${email}`);
    console.log(`Mobile:   ${mobile}`);
    console.log(`Password: ${password}`);
    console.log("Role:     Admin");
    console.log("-----------------------------------------");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin:", error.message);
    process.exit(1);
  }
};

createAdmin();

