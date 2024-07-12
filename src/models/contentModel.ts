import mongoose, { Schema } from "mongoose";
import { IContent } from "../interfaces/contentInterface";

const ContentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        uploadedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: { createdAt: 'uploadedAt' }
    }
);



const Content = mongoose.model<IContent>('Content', ContentSchema);
export default Content;
