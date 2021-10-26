const router = require('express').Router();
const { Category, Product } = require('../../models');
const { beforeBulkDestroy } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  try{
    const categoryData = await Category.findAll({include: [Product]});
    res.json(categoryData)
  }
  catch(error) {
    res.status(500).json(error)
  }
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try{
    const oneCategory = await Category.findByPk({include: [Product]});
    res.json(oneCategory)
  }
  catch(error) {
    res.status(500).json(error)
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((newCategory) => {
      res.json(newCategory);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const updatedCatetgory = await Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.body.id,
      },
    }
  );

  res.json(updatedCatetgory)
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const deletedCategory = await Category.destroy({
    where: {
      id: req.body.id,
    },
  });

  res.json(deletedCategory)
});

module.exports = router;
