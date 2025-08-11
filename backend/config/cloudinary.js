import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const uploadOnCloudinary = async (filepath) => {
  console.log("🚀 File path received:", filepath);
  console.log("File exists before upload:", fs.existsSync(filepath));

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  try {
    if (!filepath) {
      console.warn("⚠️ No file path provided to uploadOnCloudinary");
      return null;
    }

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(filepath);

    console.log("✅ Uploaded to Cloudinary:", uploadResult.secure_url);

    // Delete local file only if it still exists
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      console.log("🗑️ Local file deleted:", filepath);
    } else {
      console.warn("⚠️ File already removed, skipping unlink:", filepath);
    }

    return uploadResult.secure_url;

  } catch (error) {
    console.error("❌ Cloudinary upload error:", error);

    // Clean up local file if it exists
    if (filepath && fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    throw error;
  }
};

export default uploadOnCloudinary;
