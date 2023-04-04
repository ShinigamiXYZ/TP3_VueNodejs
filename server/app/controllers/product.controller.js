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
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

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
  if (!req.body.name) {
    res.status(400).send({
      message: 'Name is required!',
    });
    return;
  }

  let photoPath = '';
  if (req.file) {
    photoPath = req.file.path;
  }

  const product = {
    name: req.body.name,
    photo: photoPath.replace(/\\/g, '/'),
    price: req.body.price,
    description: req.body.description,
    type: req.body.type,
    quantity: req.body.quantity,
  };

  Product.create(product)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not insert the data',
      });
    });
};


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

  
  




