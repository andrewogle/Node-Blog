const express = require("express");
const userDB = require("../data/helpers/userDb");
const postDB = require("../data/helpers/postDb");
const router = express.Router();
const capitalize = require("../middleware/capitalize");

router.use(capitalize);

router.get("/users", async (req, res) => {
  try {
    const user = await userDB.get();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Could not retrive post information." });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const user = await userDB.getById(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "The specified post does not exist." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "User information could not be retrieved." });
  }
});
router.post("/users", capitalize, async (req, res) => {
  try {
    const user = await userDB.insert(req.body);
    if (user) {
      res.status(201).json(user);
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
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await userDB.remove(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "The user could not be removed" });
  }
});

router.put("/users/:id", capitalize, async (req, res) => {
  try {
    const { title, contents } = req.body;
    if (title && contents) {
      const user = await userDB.update(req.params.id, req.body);
      if (post) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    } else {
      res.status(400).json({
        errorMessage: "Please provide user information."
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "The user information could not be modified." });
  }
});
module.exports = router;