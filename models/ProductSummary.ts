import mongoose from 'mongoose';

const Owner = new mongoose.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    id: { type: String, required: true }
})

const ProductSummary = new mongoose.Schema({
    owner: Owner,
    title: { type: String, required: true },
    company: { type: String, required: true },
    count: { type: Number, required: true },
    currency: { type: String, required: true },
    price: { type: Number, required: true }
});

export default mongoose.model('ProductSummary', ProductSummary);