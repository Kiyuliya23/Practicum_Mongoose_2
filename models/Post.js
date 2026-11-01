

import mongoose from "mongoose";
// Подключаем Mongoose для работы с MongoDB

// Создаём схему публикации (поста)
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,       // Заголовок публикации — строка
      required: true,     // Обязательное поле
      trim: true,         // Удаляем пробелы по краям
      minlength: 3,       // Минимум 3 символа
      maxlength: 150      // Максимум 150 символов
    },

    content: {
      type: String,       // Основной текст публикации
      required: true,     // Обязательное поле
      minlength: 10,      // Минимум 10 символов
      maxlength: 10000    // Максимум 10000 символов
    },

    tags: {
      // Массив тегов, например ["javascript", "mongodb"]
      type: [
        {
          type: String,     // Каждый тег — строка
          trim: true,       // Убираем пробелы по краям
          lowercase: true,  // Приводим к нижнему регистру
          maxlength: 30     // Каждый тег максимум 30 символов
        }
      ],

      // Собственная проверка количества тегов
      validate: {
        validator: function (value) {
          // value — массив тегов
          // Проверяем, что тегов не больше 10
          return value.length <= 10;
        },

        // Сообщение при нарушении ограничения
        message: "Количество тегов не должно превышать 10"
      }
    },

    views: {
      type: Number,       // Количество просмотров — число
      default: 0,         // Изначально 0 просмотров
      min: 0              // Отрицательные значения запрещены
    },

    isPublished: {
      type: Boolean,      // Опубликован пост или нет
      default: false      // По умолчанию пост не опубликован
    },

    publishedAt: {
      type: Date,         // Дата публикации
      default: null       // Пока дата публикации не установлена
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      // Храним ID автора публикации

      ref: "User",
      // Автор относится к модели User

      required: true
      // У публикации обязательно должен быть автор
    },

    comments: {
      // Массив идентификаторов комментариев
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          // Каждый элемент массива — ObjectId

          ref: "Comment"
          // Ссылка на модель Comment
        }
      ],

      default: []         // Изначально комментариев нет
    }
  },
  {
    timestamps: true      // Автоматически создаёт createdAt и updatedAt
  }
);

// Создаём модель Post на основе схемы
const Post = mongoose.model("Post", postSchema);

// Экспортируем модель для других файлов
export default Post;
