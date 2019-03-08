const express = require("express");
const postDB = require("./helpers/postDb");
const router = express.Router();

router.use(express.json())

router.get("/posts", async (req, res) => {
  try {
    const posts = await postDB.get(req.query);
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
