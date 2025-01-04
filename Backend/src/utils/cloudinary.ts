import { v2 as Cloudinary } from 'cloudinary';
import fs from 'fs'
Cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadImageOnCloudinary = async (localFilePath: any) => {

  try {
    if (!localFilePath) return null;
    const response = await Cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto'
    })
    fs.unlinkSync(localFilePath);
    return response.url;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }

}
export { uploadImageOnCloudinary }
