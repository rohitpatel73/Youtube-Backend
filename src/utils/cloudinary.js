import {v2 as cloudinary} from "cloudinary";
// import { response } from "express";
import fs from "fs";

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});




const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //  file has beeen uploaded successfull
        // console.log("file is uploaded on cloudinary ", response.url);

        fs.unlinkSync(localFilePath)
        return response

    } catch (error) {
        fs.unlinkSync(localFilePath)  //  remmove the locally saved temporary file as the upload operaation got failed
        return null;
    }
}

export { uploadOnCloudinary }

// cloudinary.v2.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes'
//            },
       
// function(error, result) {console.log(result);});




