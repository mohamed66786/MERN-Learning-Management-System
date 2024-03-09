require("dotenv").config();
import  { Document, Model, Schema, model } from "mongoose";
interface FaqItem extends Document {
  question: string;
  answer: string;
}

interface category extends Document {
  title: string;
}
interface BannerImage extends Document {
  publiceId: String;
  url: String;
}
interface layout extends Document {
  type: string;
  faq: FaqItem[];
  categories: category[];
  banner: {
    image: BannerImage;
    title: string;
    subTitle: string;
  };
}
const faqSchema = new Schema<FaqItem>({
  question: { type: String },
  answer: { type: String },
});
const categorySchema = new Schema<category>({
  title: { type: String },
});
const BannerImageSchema = new Schema<BannerImage>({
  publiceId: { type: String },
  url: { type: String },
});

const layoutSchema = new Schema<layout>({
  type: { type: String },
  faq: [faqSchema],
  categories: [categorySchema],
  banner: {
    image: BannerImageSchema,
    title: { type: String },
    subtitle: { type: String },
  },
});
const layoutModel = model<layout>("layout", layoutSchema);
export default layoutModel;
