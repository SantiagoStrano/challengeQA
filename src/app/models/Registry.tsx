import { ObjectId } from 'mongodb';
import mongoose, { model, models, Schema } from 'mongoose';

const RegistrySchema = new Schema(
	{
		_id: Schema.Types.ObjectId,
		name: String,
		isActive: Boolean,
        startDate: Date,
		
	},
	{
		timestamps: true,
		toJSON: {
			versionKey: false,
			virtuals: true,
			transform: (_, ret) => {
				delete ret._id;
			},
		},
	}
);
const Registry = models.Registry || model('Registry', RegistrySchema);
export default Registry;

