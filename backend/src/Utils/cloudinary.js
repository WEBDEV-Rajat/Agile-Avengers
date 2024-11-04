import { v2 as cloudinary} from "cloudinary";
import fs from "fs"
// to manage file system
// Set up Cloudinary

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET, // Click 'View API Keys' above to copy your API secret
});

// Function to upload file to Cloudinary
const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath){
            console.log("could not find local file path");
            return null;
        }
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:'auto',
            folder: "Agile Avengers",
        })

        // file has been uploaded successfully
        // console.log("file uploaded successfully to cloudinary");
        // console.log("response : ", response);
        fs.unlinkSync(localFilePath)// remove the locally saved temporary file as the upload failed

        return response;
        
        

    } catch (error) {
        fs.unlinkSync(localFilePath)// remove the locally saved temporary file as the upload failed
        return null;
    }
}

export {uploadOnCloudinary}