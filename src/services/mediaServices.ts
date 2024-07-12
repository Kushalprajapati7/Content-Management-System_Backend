import { Document, Types } from 'mongoose';
import Media from '../models/mediaModel';
import { IMedia } from '../interfaces/mediaInterface';
import fs from 'fs';
class MediaService {
  public async uploadMedia(file: Express.Multer.File, userId: Types.ObjectId, title: string, body: string): Promise<IMedia> {
    const formattedPath = file.path.replace(/^src[\\\/]/, '');
    const media = new Media({
      title: title,
      body: body,
      uploadedBy: userId,
      media: {
        filename: file.filename,
        path: formattedPath,
        mimetype: file.mimetype,
        size: file.size
      }
    });

    return await media.save();
  }

  public async getAllMedia(): Promise<IMedia[]> {
    return await Media.find().populate('uploadedBy', 'username email');
    // return await Media.find()
  }

  public async getMediaById(id: string): Promise<IMedia | null> {
    return await Media.findById(id).populate('uploadedBy', 'username email');
  }

  public async deleteMedia(id: string): Promise<IMedia | null> {
    const media = await Media.findOne({ _id: id });
    if (!media) {
      throw new Error('media not found!')
    }
    const path = media.media.path.split("\\")[1];

    fs.unlink(`C:/Users/sit429/Desktop/CMS_Backend/src/uploads/${path}`, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return { statusCode: 500, message: 'Failed to delete content!' };
      }
    });
    return await Media.findByIdAndDelete(id);
  }

  public async updateMedia(id: string, file: Express.Multer.File, userId: Types.ObjectId, title: string, body: string): Promise<IMedia | null | boolean> {
    const media = await Media.findOne({ _id: id });
    if (!media) {
      throw new Error('media not found!')
    }


    const path = media.media.path.split("\\")[1];
    fs.unlink(`C:/Users/sit429/Desktop/CMS_Backend/src/uploads/${path}`, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return { statusCode: 500, message: 'Failed to delete content!' };
      }
    });

    const formattedPath = file.path.replace(/^src[\\\/]/, '');
    const updatedData = {
      title: title,
      body: body,
      uploadedBy: userId,
      media: {
        filename: file.filename,
        path: formattedPath,
        mimetype: file.mimetype,
        size: file.size
      }
    };

    return await Media.findByIdAndUpdate(id, updatedData, { new: true });
  }


}

export default new MediaService();
