const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const tagData = await Tag.findAll({include: [Product]});
    res.json(tagData)
  }
  catch(error) {
    res.status(500).json(error)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try{
    const oneTag = await Tag.findByPk(req.params.id, {include: [Product]});
    res.json(oneTag)
  }
  catch(error) {
    res.status(500).json(error)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((newTag) => {
      res.json(newTag);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const updatedTag = await Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );

  res.json(updatedTag)
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const deletedTag = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.json(deletedTag)
});

module.exports = router;
