require('dotenv').config();
const mongoose = require('mongoose');

let url = process.env.MONGODB_URI;

if(process.env.NODE_ENV === 'test'){
  url = process.env.TEST_MONGODB_URI;
}
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .catch(error => {
    console.log('error occured when trying to connect to database: ', error);
  });

const blogSchema = new mongoose.Schema({
  title: {
    type:String,
    required: true
  },
  author: String,
  url: {
    type:String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

blogSchema.set('toJSON', {
  transform: (document, returnedDocument) => {
    returnedDocument.id = returnedDocument._id;
    delete returnedDocument._id;
    delete returnedDocument.__v;
  }
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
