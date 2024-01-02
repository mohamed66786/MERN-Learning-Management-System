require("dotenv").config();
import mongoose, { Document, Model, Schema } from "mongoose";

// using interfaces
interface IComment extends Document {
  user: object;
  comment: string;
  commntReplies?: IComment[];
}
interface IReview extends Document {
  user: object;
  rating: number;
  comment: string;
  commentReplies: IComment[];
}
interface ILink extends Document {
  title: string;
  url: string;
}
interface ICourseData extends Document {
  title: string;
  description: string;
  videoUrl: string;
  videoThumbnail?: object;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  links: ILink[];
  suggetion: string;
  questions: IComment[];
}
interface ICourse extends Document {
  name: string;
  description: string;
  price: number;
  estimatedPrice?: number;
  thubnail: object;
  tags: string;
  level: string;
  demoUrl: string;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  reviews: [IReview];
  coursData: [ICourseData];
  ratings?: number;
  purchased?: number;
}

// start creating Schemas
const reviewSchema = new Schema<IReview>({
  user: Object,
  rating: {
    type: Number,
    default: 0,
  },
  comment: String,
});
const linkSchema = new Schema<ILink>({
  title: String,
  url: String,
});
const commentSchema = new Schema<IComment>({
  user: Object,
  comment: String,
  commntReplies: [Object],
});
const courseDataSchema = new Schema<ICourseData>({
  videoUrl: String,
  // videoThumbnail: Object,
  title: String,
  videoSection: String,
  description: String,
  videoLength: Number,
  videoPlayer: String,
  links: [linkSchema],
  suggetion: String,
  questions: [commentSchema],
});
const courseSchema = new Schema<ICourse>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  estimatedPrice: {
    type: Number,
    required: true,
  },
  thubnail: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
      // required: true,
    },
  },
  tags: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  demoUrl: [{ title: String }],
  prerequisites: [{ title: String }],
  reviews: [reviewSchema],
  coursData: [courseDataSchema],
  ratings: {
    type: Number,
    default: 0,
  },
  purchased: {
    type: Number,
    default: 0,
  },
});

const courseModel: Model<ICourse> = mongoose.model("Course", courseSchema);
export default courseModel;
