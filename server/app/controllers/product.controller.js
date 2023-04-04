const db = require('../models')
const Product = db.products
const multer = require('multer')

exports.myFindAll = (req, res) => {
    Product.findAll()
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: 'Could not find the table'
        })
    })
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/') // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname) // Unique filename for uploaded file
    }
  })

exports.myFindOne = (req, res) => {
    const id = req.params.id
    Product.findByPk(id)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: 'Could not find the data'
        })
    })
}

exports.myCreate = (req, res) => {
    // console.log(req.body)
    if(!req.body.name) {
        res.status(400).send({
            message: 'The name is mandatory'
        })
        return;
    }

    Product.create(req.body)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: 'Could not insert the data'
            })
        })
}

exports.myDestroy = (req, res) => {
    const id = req.params.id
    Product.destroy({ where: {id : id}})
    .then(num => {
        if (num == 1) {
            res.send({
                message: 'product was deleted'
            })
        }else {
            res.send({
                message: 'product was not deleted'
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: 'Could not delete the data'
        })
    })
}

exports.myUpdate = (req, res) => {
    const id = req.params.id
    Product.update(req.body, {
        where: {id: id}
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: 'product was updated'
            })
        }else {
            res.send({
                message: 'product was not updated'
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            message: 'Could not update the data'
        })
    })

}
/* custom  */

// Add quantity
exports.addQuantity = (req, res) => {
    const id = req.params.id;
  
    Product.increment('quantity', { where: { id: id } })
      .then((data) => {
        if (data[0] === 0) {
          res.status(404).send({ message: 'Product not found with id: ' + id });
        } else {
          return Product.findByPk(id);
        }
      })
      .then((product) => {
        res.send(product);
      })
      .catch((error) => {
        res.status(500).send({ message: 'Error updating product with id: ' + id });
      });
  };
  
  // Remove quantity
  exports.removeQuantity = (req, res) => {
    const id = req.params.id;

    console.log(id);
  
    Product.findByPk(id)
      .then((product) => {
        if (!product) {
          res.status(404).send({ message: 'Product not found with id: ' + id });
        } else if (product.quantity > 0) {
          return Product.decrement('quantity', { where: { id: id } });
        } else {
          res.status(400).send({ message: 'Product quantity cannot be less than 0' });
        }
      })
      .then((data) => {
        if (data) {
          return Product.findByPk(id);
        }
      })
      .then((product) => {
        if (product) {
          res.send(product);
        }
      })
      .catch((error) => {
        res.status(500).send({ message: 'Error updating product with id: ' + id });
      });
  };

  // Upload a photo for a product by ID
exports.uploadPhoto = (req, res) => {
    const id = req.params.id
  
    upload.single('photo')(req, res, (err) => {
      if (err) {
        res.status(400).send({ message: 'Error uploading file: ' + err.message })
      } else {
        const file = req.file
        Product.findByPk(id)
          .then((product) => {
            if (!product) {
              res.status(404).send({ message: 'Product not found with id: ' + id })
            } else {
              // Update the product with the uploaded photo filename
              return product.update({ photo: file.filename })
            }
          })
          .then((updatedProduct) => {
            res.send(updatedProduct)
          })
          .catch((error) => {
            res.status(500).send({ message: 'Error updating product with id: ' + id })
          })
      }
    })
};
  
  




