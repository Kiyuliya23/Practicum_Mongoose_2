
import mongoose from "mongoose";
// Подключаем библиотеку Mongoose для работы с MongoDB

const profileSchema = new mongoose.Schema(
  // Создаём схему профиля пользователя
  {
    avatarUrl: {
      type: String,     // Ссылка на фотографию профиля
      trim: true        // Удаляет пробелы по краям строки
    },

    bio: {
      type: String,     // Описание пользователя
      trim: true,       // Убирает пробелы по краям
      maxlength: 500    // Максимум 500 символов
    },

    city: {
      type: String,     // Город проживания
      trim: true,       // Удаляет пробелы по краям
      maxlength: 100    // Максимум 100 символов
    },

    country: {
      type: String,     // Страна проживания
      trim: true,       // Удаляет пробелы по краям
      maxlength: 100    // Максимум 100 символов
    },

    birthdate: {
      type: Date,       // Дата рождения

      validate: {
        // Создаём собственную функцию проверки даты
        validator: function (value) {
          // Проверяем, что дата рождения не позже текущей
          return value <= new Date();
        },

        // Сообщение при неправильной дате
        message: "Дата рождения не может быть в будущем"
      }
    },

    website: {
      type: String,     // Ссылка на личный сайт
      trim: true        // Убирает пробелы по краям
    },

    // Вложенный объект с социальными сетями
    socials: {
      telegram: {
        type: String,   // Ссылка или имя в Telegram
        trim: true
      },

      github: {
        type: String,   // Ссылка на GitHub
        trim: true
      },

      linkedin: {
        type: String,   // Ссылка на LinkedIn
        trim: true
      }
    },

    // СВЯЗЬ ОДИН К ОДНОМУ: PROFILE → USER
    user: {
      type: mongoose.Schema.Types.ObjectId,
      // Храним идентификатор документа MongoDB

      ref: "User",
      // Указываем, что ID относится к модели User

      required: true,
      // Профиль обязательно должен принадлежать пользователю

      unique: true
      // Создаём уникальный индекс:
      // один пользователь не может иметь два профиля
    }
  },
  {
    timestamps: true
    // Mongoose автоматически добавляет:
    // createdAt — когда профиль создан
    // updatedAt — когда профиль изменён
  }
);

// Создаём модель Profile на основе схемы
const Profile = mongoose.model("Profile", profileSchema);

// Экспортируем модель для использования в других файлах
export default Profile;
