
import mongoose from "mongoose"; // Импортируем Mongoose для работы с MongoDB

// Создаём схему пользователя — описываем поля и правила проверки данных
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,       // Имя должно быть строкой
      required: true,     // Обязательное поле
      minlength: 2,       // Минимум 2 символа
      maxlength: 50,      // Максимум 50 символов
      trim: true          // Убирает пробелы в начале и конце
    },

    email: {
      type: String,       // Email хранится как строка
      required: true,     // Обязательное поле
      unique: true,       // Создаёт уникальный индекс для email
      lowercase: true,    // Переводит буквы в нижний регистр
      trim: true,         // Убирает пробелы по краям
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Проверяет формат email
    },

    password: {
      type: String,       // Пароль хранится как строка
      required: true,     // Обязательное поле
      minlength: 6        // Минимум 6 символов
    },

    age: {
      type: Number,       // Возраст — число
      min: 0,             // Минимальное значение — 0
      max: 120            // Максимальное значение — 120
    },

    role: {
      type: String,       // Роль пользователя — строка
      default: "user",    // По умолчанию обычный пользователь
      enum: [             // Разрешены только эти три значения
        "user",
        "admin",
        "moderator"
      ]
    },

    isActive: {
      type: Boolean,      // true или false
      default: true       // По умолчанию пользователь активен
    },

    // СВЯЗЬ ОДИН К ОДНОМУ: USER → PROFILE
    profile: {
      type: mongoose.Schema.Types.ObjectId, // ID документа MongoDB
      ref: "Profile"     // Ссылка на модель Profile
    },

    // Подписчики: кто подписан на этого пользователя
    followers: {
      type: [{
        type: mongoose.Schema.Types.ObjectId, // ID подписчика
        ref: "User"       // Ссылка на эту же модель User
      }],
      default: []         // По умолчанию список пуст
    },

    // Подписки: на кого подписан этот пользователь
    following: {
      type: [{
        type: mongoose.Schema.Types.ObjectId, // ID пользователя
        ref: "User"       // Ссылка на модель User
      }],
      default: []         // По умолчанию список пуст
    },

    bio: {
      type: String,       // Текст описания профиля
      trim: true,         // Убирает пробелы по краям
      maxlength: 300      // Максимум 300 символов
    },

    avatarUrl: {
      type: String,       // Адрес изображения аватара
      trim: true          // Убирает пробелы по краям
    },

    lastLoginAt: {
      type: Date,         // Дата последнего входа
      default: null       // Пока вход не зафиксирован — null
    }
  },
  {
    timestamps: true      // Автоматически добавляет createdAt и updatedAt
  }
);

// Создаём модель User на основе схемы
const User = mongoose.model("User", userSchema);

// Экспортируем модель для использования в других файлах
export default User;
