import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "必須項目です"],
    trim: true, //空白削除
    maxlength: [20, "タスク名は20文字以内に設定して下さい"],
    minlength: [1, "１文字以上入力をしてください"]
  },
  rating: {
    type: Number,
    enum: [1, 2, 3, 4, 5], //この数値のみに限定できる
    required: true,
    default: 3
  },
  description: {
    type: String,
    required: [true, "必須項目です"],
    maxlength: [60, "説明は60文字以内に設定して下さい"],
    minlength: [1, "１文字以上入力をしてください"]
  },
  comment: {
    type: String,
    required: [true, "必須項目です"],
    maxlength: [60, "説明は60文字以内に設定して下さい"],
    minlength: [1, "１文字以上入力をしてください"]
  }
}, {
  timestamps: true
});

const Book = mongoose.model("book", bookSchema);
export default Book;
