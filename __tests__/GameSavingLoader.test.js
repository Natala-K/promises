import GameSavingLoader from '../src/GameSavingLoader';
import GameSaving from '../src/GameSaving';
import read from '../src/reader';
import json from '../src/parser';

jest.mock('../src/reader');
jest.mock('../src/parser');

test('GameSavingLoader должен корректно загружать и парсить данные сохранения игры', async () => {
  read.mockResolvedValue(new ArrayBuffer(10));
  json.mockResolvedValue('{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}');

  const saving = await GameSavingLoader.load();

  expect(saving).toBeInstanceOf(GameSaving);
  expect(saving.id).toBe(9);
  expect(saving.created).toBe(1546300800);
  expect(saving.userInfo).toEqual({
    id: 1,
    name: 'Hitman',
    level: 10,
    points: 2000,
  });
});

test('GameSavingLoader должен выбрасывать ошибку, если чтение данных не удалось', async () => {
  read.mockRejectedValue(new Error('Не удалось прочитать данные'));

  await expect(GameSavingLoader.load()).rejects.toThrow('Ошибка при загрузке данных сохранения игры');
});

test('GameSavingLoader должен выбрасывать ошибку, если парсинг JSON не удался', async () => {
  read.mockResolvedValue(new ArrayBuffer(10));
  json.mockRejectedValue(new Error('Не удалось парсить JSON'));

  await expect(GameSavingLoader.load()).rejects.toThrow('Ошибка при загрузке данных сохранения игры');
});
