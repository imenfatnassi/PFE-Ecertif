var mongoose = require('mongoose');
const generic = require('./generic/generiqueModel')
var DiplomeSchema = mongoose.Schema({
    _id: {
        type: String
      
    },
    titre:{
        type: String
    },
    nomTitulaire:{
        type: String
    },
    numCin:{
        type: String
    },
    nomEtablissement:{
        type: String
    },
    dateObtunation:{
        type: String
    },

user:{ type: mongoose.Schema.Types.ObjectId, ref: 'user' },
etablissement:{ type: mongoose.Schema.Types.ObjectId, ref: 'etablissement' },

})

generic.dateUpdateDateCreated(DiplomeSchema)

const DiplomeModel= mongoose.model('diplome', DiplomeSchema);
module.exports = DiplomeModel