import { v2 as cloudinary} from "cloudinary";
import fs from "fs"


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET, 
});

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

        // console.log("file uploaded  to cloudinary");
        // console.log("response : ", response);
        fs.unlinkSync(localFilePath)
        return response;
               

    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null;
    }
}

export {uploadOnCloudinary}