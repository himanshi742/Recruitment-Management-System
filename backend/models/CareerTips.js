import mongoose from 'mongoose';
const careerTipSchema = new mongoose.Schema(
    {
      content: { type: String }, 
    },
    { timestamps: true }
  );
  
  export default mongoose.model("CareerTip", careerTipSchema);