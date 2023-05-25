import { Schema, model } from 'mongoose';



const OwnerSchema = new Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    id: { type: String, required: true }
});

const ProductSummarySchema = new Schema({
    owner: { type: OwnerSchema, required: true },
    title: { type: String, required: true },
    company: { type: String, required: true },
    count: { type: Number, required: true },
    currency: { type: String, required: true },
    price: { type: Number, required: true }
});

const ProductSummary = model('ProductSummary', ProductSummarySchema);

export default ProductSummary;