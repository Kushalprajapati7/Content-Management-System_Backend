import { Request, Response } from 'express';
import CustomRequest from '../types/customRequest';
import contentService from '../services/contentService';
import { IContent } from '../interfaces/contentInterface';
import { Types } from 'mongoose';

class contentController {
    public async addContent(req: Request, res: Response): Promise<void> {
        try {
            const contentData: IContent = req.body;
            contentData.uploadedBy = new Types.ObjectId((req as CustomRequest).userId)
            const newContent = await contentService.addContent(contentData);
            res.status(201).send(newContent);
        }
        catch (error: any) {
            res.status(400).send(error.message);
        }
    }

    public async getAllcontent(req: Request, res: Response): Promise<void> {
        try {

            const allContent = await contentService.getAllContent();
            res.status(201).send(allContent);
        }
        catch (error: any) {
            res.status(400).send(error.message);
        }
    }

    public async updateContent(req: Request, res: Response): Promise<void> {
        try {
            const contentId = req.params.id;
            const updatedData = req.body;
            const updatedContent = await contentService.updateContent(contentId, updatedData);
            res.status(201).send(updatedContent);
        }
        catch (error: any) {
            res.status(400).send(error.message);
        }
    }

    public async deleteContent(req: Request, res: Response): Promise<void> {
        try {
            const contentId = req.params.id;

            await contentService.deleteContent(contentId);
            res.status(200).send({ message: 'Content deleted successfully' });
        }
        catch (error: any) {
            res.status(400).send(error.message);
        }
    }

    public async getContentById(req: Request, res: Response): Promise<void> {
        try {
            const contentId = req.params.id;
            const content = await contentService.conentById(contentId);
            res.status(201).send(content);
        }
        catch (error: any) {
            res.status(400).send(error.message);
        }
    }

}

export default new contentController()