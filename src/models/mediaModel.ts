import mongoose, { Schema, model, Document } from 'mongoose';
import { IMedia } from '../interfaces/mediaInterface';

const MediaSchema = new mongoose.Schema({
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
    media: {
        filename: {
            type: String,
        },
        path: {
            type: String,
        },
        mimetype: {
            type: String,
        },
        size: {
            type: Number,
        }
    }

}, {
    timestamps: { createdAt: 'uploadedAt' }
});

const Media = mongoose.model<IMedia>('Media', MediaSchema);
export default Media;
