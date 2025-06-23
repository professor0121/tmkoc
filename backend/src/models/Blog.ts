import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

// Define the Blog interface
export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: IUser['_id'];
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  readTime: number;
  views: number;
  likes: number;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

// Create the Blog schema
const BlogSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot be more than 200 characters']
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens']
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
      trim: true,
      maxlength: [500, 'Excerpt cannot be more than 500 characters']
    },
    content: {
      type: String,
      required: [true, 'Content is required']
    },
    featuredImage: {
      type: String,
      required: [true, 'Featured image is required'],
      trim: true
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author is required']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Travel Tips',
        'Destinations',
        'Food & Culture',
        'Adventure',
        'Budget Travel',
        'Luxury Travel',
        'Solo Travel',
        'Family Travel',
        'Business Travel',
        'Travel News',
        'Travel Guides',
        'Photography'
      ],
      trim: true
    },
    tags: [{
      type: String,
      trim: true,
      lowercase: true
    }],
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft'
    },
    publishedAt: {
      type: Date,
      default: null
    },
    readTime: {
      type: Number,
      default: 0,
      min: [0, 'Read time cannot be negative']
    },
    views: {
      type: Number,
      default: 0,
      min: [0, 'Views cannot be negative']
    },
    likes: {
      type: Number,
      default: 0,
      min: [0, 'Likes cannot be negative']
    },
    seo: {
      metaTitle: {
        type: String,
        trim: true,
        maxlength: [60, 'Meta title cannot be more than 60 characters']
      },
      metaDescription: {
        type: String,
        trim: true,
        maxlength: [160, 'Meta description cannot be more than 160 characters']
      },
      keywords: [{
        type: String,
        trim: true,
        lowercase: true
      }]
    }
  },
  {
    timestamps: true // This adds createdAt and updatedAt fields automatically
  }
);

// Indexes for better performance
BlogSchema.index({ slug: 1 });
BlogSchema.index({ status: 1, publishedAt: -1 });
BlogSchema.index({ category: 1, status: 1 });
BlogSchema.index({ tags: 1, status: 1 });
BlogSchema.index({ author: 1 });
BlogSchema.index({ createdAt: -1 });

// Pre-save middleware to set publishedAt when status changes to published
BlogSchema.pre('save', function(next) {
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  next();
});

// Virtual for formatted publish date
BlogSchema.virtual('formattedPublishDate').get(function() {
  if (this.publishedAt) {
    return (this.publishedAt as Date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  return null;
});

// Virtual for reading time calculation (rough estimate: 200 words per minute)
BlogSchema.virtual('estimatedReadTime').get(function(this: IBlog) {
  if (this.content) {
    const wordCount = this.content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);
    return readTime;
  }
  return 0;
});

// Ensure virtual fields are serialized
BlogSchema.set('toJSON', { virtuals: true });
BlogSchema.set('toObject', { virtuals: true });

// Create and export the Blog model
export default mongoose.model<IBlog>('Blog', BlogSchema);
