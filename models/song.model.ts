import mongoose from "mongoose";
import slug from "mongoose-slug-updater";
mongoose.plugin(slug);
const songSchema = new mongoose.Schema({
    title: String,
    thumbnail: String,
    description: String,
    singerId: String,
    like: {
        type: Number,
        default: 0
    },
    lyrics: String,
    audio: String,
    status: String,
    topicId: String,
    listen: {
        type: Number,
        default: 0
    },
    slug: {
        type: String,
        slug: "title",
        unique: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
},{
    timestamps: true
})
const Song = mongoose.model("Song", songSchema, "songs");
export default Song;