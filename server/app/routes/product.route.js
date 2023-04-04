module.exports = app => {
    const product = require('../controllers/product.controller.js')
    const router = require('express').Router()

    router.get('/', product.myFindAll)

    router.post('/', product.myCreate)

    router.get('/:id', product.myFindOne)

    router.delete('/:id', product.myDestroy)

    router.put('/:id', product.myUpdate)

    router.put('/:id/add', product.addQuantity);
    
    router.put('/:id/remove', product.removeQuantity);

    app.use('/api/product', router)
}