import mongoose from "mongoose"

const fakultasSchema = new mongoose.Schema(
    {
    name : {
        type : String,
        required: true, //MONGO AKAN MELAKUKAN VALIDASI INPUT DATA SBLM MSK KE MONGO
        unique:true, //OTOMATIS NGECEK DATA SDH ADA ATAU BLM
    },
}, 
{
    timestamps : true //BAKAL TERISIOTOMATIS KALO..
},

) 

const FakultasModel = mongoose.model('fakultas',fakultasSchema)
export default FakultasModel