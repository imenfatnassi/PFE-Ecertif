const mongoose = require('mongoose')
const generic = require('./generic/generiqueModel')
const EtablissementSchema = mongoose.Schema({

  _id: {
        type: String,
        required: true,
         },

    nomEtablissement: {
        type: String,
        required: true,
         },
    adr:{
            type: String
        },
    tel: {
            type: String,
            required: true,
            unique:true
            },
    fax: {
                type: String,
                required: true,
                unique:true
                },
    email:{
        type: String, 
        trim: true, 
        index: true,
        unique: true,
        sparse: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({ error: 'Invalid Email address' })
            }
        }
        },
    nomResponsable:{
            type: String
        },
    emailResponsable:{
        type: String, 
        trim: true, 
        index: true,
        unique: true,
        sparse: true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({ error: 'Invalid Email address' })
            }
        }
    },
create_date: {
        type: Date,
    },
update_date: {
        type: Date,
        default: Date.now
     }
     
})
    
generic.dateUpdateDateCreated(EtablissementSchema)

 const EtablissementModel = mongoose.model('etablissement',EtablissementSchema);
 module.exports = EtablissementModel