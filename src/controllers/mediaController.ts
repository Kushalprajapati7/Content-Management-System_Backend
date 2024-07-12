import { Request, Response } from 'express';
import CustomRequest from '../types/customRequest';
import mediaServices from '../services/mediaServices';
import { Types } from 'mongoose';

class MediaController {
  public async uploadMedia(req: Request, res: Response): Promise<void> {
    try {
      const file = req.file;
      const { title, body } = req.body;
      const userId = new Types.ObjectId((req as CustomRequest).userId);

      if (!file) {
        res.status(400).send({ message: 'No file uploaded' });
        return;
      }

      const media = await mediaServices.uploadMedia(file, userId, title, body);
      res.status(201).send(media);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  public async getAllMedia(req: Request, res: Response): Promise<void> {
    try {
      const contents = await mediaServices.getAllMedia();
      res.status(200).send(contents);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  public async getMediaById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const media = await mediaServices.getMediaById(id);
      if (!media) {
        res.status(404).send({ message: 'Media not found' });
        return;
      }
      res.status(200).send(media);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  public async deleteMedia(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const media = await mediaServices.deleteMedia(id);
      if (!media) {
        res.status(404).send({ message: 'Media not found' });
        return;
      }
      res.status(200).send({ message: 'Media deleted successfully' });
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  public async updateMedia(req: Request, res: Response): Promise<void> {
    try {

      const { id } = req.params;
      const media = await mediaServices.getMediaById(id);
      const file = req.file;
      if (!file) {
        res.status(400).send({ message: 'No file uploaded' });
        return;
      }
      const { title, body } = req.body;
      const userId = new Types.ObjectId((req as CustomRequest).userId);
      const role = (req as CustomRequest).role;

      if (userId.toString() === media?.uploadedBy._id.toString() || role === 'admin' ) {
        const updatedMedia = await mediaServices.updateMedia(id, file, media?.uploadedBy._id as any, title, body);

        if (!media) {
          res.status(404).send({ message: 'Media not found' });
          return;
        }
        res.status(200).send(updatedMedia);

      } else {
        res.status(403).json({ error: "Don't Have parmisson to Updated this Content!" });
        return
      }


    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }
}

export default new MediaController();
