const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InstrumentSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
});

InstrumentSchema.virtual('url').get(function () {
    return `/catalog/instrument/${this._id}`;
})

module.exports = mongoose.model("Instruments", InstrumentSchema);
