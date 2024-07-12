import { IContent } from "../interfaces/contentInterface";
import Content from "../models/contentModel";

class ContentService {
    public async addContent(contentData: IContent): Promise<IContent> {
        const content = new Content(contentData);
        return await content.save();
    }

    public async getAllContent(): Promise<IContent[]> {
        return await Content.find().populate('uploadedBy', 'username email');;
    }

    public async updateContent(id: string, contentData: IContent): Promise<IContent | null> {
        const content = await Content.findById(id);
        
        if (!content) {
            throw new Error(`Content Not Found`);
        }
        const updateContent = await Content.findByIdAndUpdate(id, contentData, { new: true });
        return updateContent;
    }

    public async deleteContent(id: string): Promise<void> {
        const content = await Content.findOne({ _id: id }).populate('uploadedBy','username email');
        if (!content) {
            throw new Error(`Content Not Found`);
        }
        await Content.findByIdAndDelete(id);
    }

    public async conentById(id: string): Promise<IContent> {
        const content = await Content.findOne({ _id: id }).populate('uploadedBy','username email');
        
        if (!content) {
            throw new Error(`Content Not Found`);
        }
        return content;
    }


}

export default new ContentService();