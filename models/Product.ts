import mongoose from 'mongoose';

const Product = new mongoose.Schema({
    owner: { type: String, required: true },
    title: { type: String, required: true },
    company: { type: String, required: true },
    count: { type: Number, required: true },
    currency: { type: String, required: true }
})

export default mongoose.model('Product', Product);