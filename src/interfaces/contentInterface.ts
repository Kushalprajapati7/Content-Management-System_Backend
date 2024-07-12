import { Document, Types } from "mongoose";

export interface IContent extends Document {
    title: string;
    body: string;
    uploadedBy: Types.ObjectId;
    uploadedAt: Date;
}
