// Подключаем express
const express = require('express');
const fs = require('fs');
const path = require('path');

// Создаём приложение
const app = express();
const PORT = 3000;

// Маршрут, который отдает содержимое JSON-файла
app.get('/data', (req, res) => {
  const filePath = path.join(__dirname, 'data.json');

  fs.readFile(filePath, 'utf8', (err, fileData) => {
    if (err) {
      console.error('Ошибка чтения файла:', err);
      return res.status(500).json({ error: 'Не удалось прочитать файл' });
    }

    try {
      // Парсим текст в объект
      const jsonData = JSON.parse(fileData);
      // Отправляем JSON на клиент
      res.json(jsonData);
    } catch (parseErr) {
      console.error('Ошибка парсинга JSON:', parseErr);
      res.status(500).json({ error: 'Некорректный JSON в файле' });
    }
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});
