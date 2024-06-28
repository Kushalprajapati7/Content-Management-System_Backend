import { Document, Types } from "mongoose";

export interface IMedia extends Document {
  title: string;
  body: string;
  uploadedBy: Types.ObjectId;
  media: {
    filename: string;
    path: string;
    mimetype: string;
    size: number;
    uploadedAt: Date;
  }
}
