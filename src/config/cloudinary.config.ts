import { v2 as cloudinary } from 'cloudinary';
import { Express } from 'express';

cloudinary.config({
  cloud_name: 'img',
  api_key: '253293437495722',
  api_secret: 's8uilX6Sc5PAtkPzhApUCspNhz4',
});

async function uploadImageToCloudinary(file: Express.Multer.File) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file.path, { folder: 'productos' }, (error, result) => {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
}