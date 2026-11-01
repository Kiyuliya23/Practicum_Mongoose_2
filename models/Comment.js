
import mongoose from "mongoose";
// Импортируем библиотеку Mongoose для работы с MongoDB

// Создаём схему комментария
const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,       // Текст комментария — строка
      required: true,     // Комментарий обязателен
      trim: true,         // Удаляем пробелы в начале и конце
      minlength: 1,       // Минимум 1 символ
      maxlength: 1000     // Максимум 1000 символов
    },

    likes: {
      type: Number,       // Количество лайков — число
      default: 0,         // Изначально лайков нет
      min: 0              // Число не может быть отрицательным
    },

    isEdited: {
      type: Boolean,      // Был ли комментарий отредактирован
      default: false      // По умолчанию не редактировался
    },

    post: {
      type: mongoose.Schema.Types.ObjectId,
      // Храним уникальный идентификатор публикации

      ref: "Post",
      // Ссылка на модель Post

      required: true
      // Комментарий обязательно должен относиться к посту
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      // Храним идентификатор пользователя

      ref: "User",
      // Ссылка на модель User

      required: true
      // У комментария обязательно должен быть автор
    }
  },
  {
    timestamps: true
    // Mongoose автоматически создаёт:
    // createdAt — дата создания комментария
    // updatedAt — дата последнего изменения
  }
);

// Создаём модель Comment на основе схемы
const Comment = mongoose.model("Comment", commentSchema);

// Экспортируем модель для использования в других файлах
export default Comment;
