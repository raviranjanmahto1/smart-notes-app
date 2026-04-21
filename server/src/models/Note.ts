import mongoose, { Document, Schema } from 'mongoose';

export interface INote extends Document {
  title: string;
  content: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// Format returned document
NoteSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = (ret._id as mongoose.Types.ObjectId).toString();
    const updated = ret.updatedAt as Date | undefined;
    const created = ret.createdAt as Date;
    ret.date = updated ? new Date(updated).toLocaleDateString() : new Date(created).toLocaleDateString();
    delete (ret as Record<string, unknown>)._id;
    delete (ret as Record<string, unknown>).__v;
    return ret;
  }
});

export default mongoose.model<INote>('Note', NoteSchema);
