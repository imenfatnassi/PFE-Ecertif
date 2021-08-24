const express = require('express')
const router = express.Router()
const service = require('../service/diplomeCrudService')

const genereiqueRouter = require('./generic/genericRouter')
class diplomeRouter extends genereiqueRouter {
  constructor(router, service) {
    super(router, service);
  }

}

router.post('/WithPopulate', async (req, res) => {

  if (req.body) {

    /**************************ADmin *************/

    if (req.body.role == 'Admin') {

      try {
        const docs = await service.afficheAllWithPopulateUserAndEtablissement()
        res.json(docs)
      } catch (err) {
        res.status(201).json({ message: err.message })
      }
    }

    /******************** Recruteur**************/

    /****************Patient */

    if (req.body.role == 'TitulaireDiplome') {

      try {
        const docs = await service.afficheAllForUser(req.body._id)
        res.json(docs)
      } catch (err) {
        res.status(201).json({ message: err.message })
      }
    }


    /********************************* */


       /***************************ResponsableEtablissement*****************/
       if (req.body.role == 'ResponsableEtablissement') {

      
        try {
          const docs = await service.afficheForEtablissement(req.body.etablissement)
          res.json(docs)
        } catch (err) {
          res.status(201).json({ message: err.message })
        }
      }

       /************************************************** */

  }

})

new diplomeRouter(router, service)

module.exports = router