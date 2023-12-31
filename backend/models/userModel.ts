require("dotenv").config();
import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // rgex for valid email addresses

// using for defining the type of the user interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ courseId: string }>;
  comparePasswords: (passwords: string) => Promise<boolean>;
  SignAccessToken: () => string;
  SignRefreshToken: () => string;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please inter your name"],
    },
    email: {
      type: String,
      required: [true, "please inter your email"],
      validate: {
        validator: function (value: string): boolean {
          return emailRegexPattern.test(value);
        },
        message: "Please enter a valid email address",
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "please inter your password"],
      minLength: [4, "Password must be at least 4 characters"],
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    courses: {
      courseId: String,
    },
  },
  {
    timestamps: true,
  }
);

// middleware for hashing the password
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
//sign access token
userSchema.methods.signAccessToken = function () {
  //  jwt.sign(payload,secretKey,options)
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || "");
};
//sign refresh token
userSchema.methods.signAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || "");
};

// middleware for comparing the password
userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const userModel: Model<IUser> = mongoose.model("User", userSchema);
export default userModel;


