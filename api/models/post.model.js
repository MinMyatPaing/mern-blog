import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    default:
      "https://www.google.com/imgres?q=blog%20image%20sample&imgurl=https%3A%2F%2Fimages.examples.com%2Fwp-content%2Fuploads%2F2018%2F06%2FBlog-Examples.png&imgrefurl=https%3A%2F%2Fwww.examples.com%2Fbusiness%2Fblog.html&docid=LQ26JdGgjsHJSM&tbnid=j-XHQXZ3uhmFyM&vet=12ahUKEwikjPHKloqGAxXqVPEDHZDWDEgQM3oECGgQAA..i&w=1160&h=600&hcb=2&ved=2ahUKEwikjPHKloqGAxXqVPEDHZDWDEgQM3oECGgQAA",
  },
  category: {
    type: String,
    default: 'Uncategorized',
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  }
}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);

export default Post;

