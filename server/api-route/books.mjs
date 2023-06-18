import express from "express";
import Book from "../models/books.mjs"
import { validationResult, body } from "express-validator";

const router = express.Router();

function requestErrorHandler(controller) {
  return async  function (req, res, next) {
    try {
      return await controller(req, res);
    } catch (error) {

    }
  }
}

// /api/books
router.get("/", async function (req, res) {
  try {
      const book = await Book.find().sort({
        updatedAt: -1
      });
      res.json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({msg: "不正なエラーが発生いました"})
  }
});
router.get("/:id", async function (req, res) {
try {
    const id = req.params.id;
    const book = await Book.findOne({ _id: id });

    if (book === null) return res.status(404).json({ msg: "404" });
    res.json(book);
} catch (error) {
  console.log(error);
  res.status(500).json({ msg: "不正なエラーが発生しました" });
}
});

router.post("/",
  body("title").notEmpty().withMessage('エラーメッセージ'),
  body("description").notEmpty().withMessage('エラーメッセージ'),
  body("comment").notEmpty().withMessage('エラーメッセージ'),
  body("rating").notEmpty().isInt({min: 1, max:5 }).withMessage('エラーメッセージ'),
  async function (req, res) {
  try {
      const error = validationResult(req);

      if (!error.isEmpty()) {
        const errors = error.array();
        return res.status(400).json(errors);
      }
      const body = req.body;
      const book = await Book.create(body);
      res.status(201).json(book);
  } catch (error) {
      console.log(error);
    res.status(500).json({msg: "不正なエラーが発生いました"})
  }
});
router.patch("/:id",
  body("title").optional().notEmpty().withMessage('エラーメッセージ'),
  body("description").optional().notEmpty().withMessage('エラーメッセージ'),
  body("comment").optional().notEmpty().withMessage('エラーメッセージ'),
  body("rating").optional().notEmpty().isInt({ min: 1, max: 5 }).withMessage('エラーメッセージ'),

  async function (req, res) {
  try {
        const id = req.params.id;
        const body = req.body;
        const book = await Book.findOneAndUpdate({ _id: id }, body, { new: true });

        if (book === null) return res.status(404).json({ msg: "404" });
      res.json(book);
  } catch (error) {
      console.log(error);
    res.status(500).json({msg: "不正なエラーが発生いました"})
  }
});
router.delete("/:id", async function (req, res) {
  try {
      const id = req.params.id;
      const book = await Book.deleteOne({_id: id});
      if (book.deletedCount === 0) return res.status(404).json({ msg: "target Book Not Found" });
      res.json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({msg: "不正なエラーが発生いました"})
  }
});

export default router;
