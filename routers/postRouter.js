const express = require("express");
const postDB = require("../data/helpers/postDb");
const router = express.Router();

router.get("/posts", async (req, res) => {
  try {
    const posts = await postDB.get();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Could not retrive post information." });
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const post = await postDB.getById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "The specified post does not exist." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "The post information could not be retrieved." });
  }
});
router.post("/posts", async (req, res) => {
  try {
    const post = await postDB.insert(req.body);
    if (post) {
      res.status(201).json(post);
    } else {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "There was an error while saving the post to the database"
    });
  }
});
router.delete("/posts/:id", async (req, res) => {
  try {
    const post = await postDB.remove(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "The post could not be removed" });
  }
});

router.put("/posts/:id", async (req, res) => {
  try {
    const { title, contents } = req.body;
    if (title && contents) {
      const post = await postDB.update(req.params.id, req.body);
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    } else {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "The post information could not be modified." });
  }
});
module.exports = router;
