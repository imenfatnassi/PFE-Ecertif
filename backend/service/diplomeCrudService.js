const diplomeModel = require('../models/diplomeModel')
const genereiqueService = require('../service/generic/genereiqueService')


class model extends genereiqueService {
  constructor(x) {
    super(x);
  }

  async afficheAllWithPopulateUserAndEtablissement() {
  
    return     await diplomeModel.find().populate('etablissement').populate('user').exec()
    
  }

  async afficheAllForUser(x) {
  
    return     await diplomeModel.find({user:x}).exec()
    
  }

  async afficheForEtablissement(x) {
  
    return     await diplomeModel.find({etablissement:x}).exec()
    
  }

  
}


module.exports = new model(diplomeModel)



