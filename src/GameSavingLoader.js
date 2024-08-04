import read from './reader';
import json from './parser';
import GameSaving from './GameSaving';

export default class GameSavingLoader {
  static async load() {
    try {
      const data = await read();
      const jsonData = await json(data);
      const parsedData = JSON.parse(jsonData);

      return new GameSaving(
        parsedData.id,
        parsedData.created,
        parsedData.userInfo,
      );
    } catch (error) {
      throw new Error('Ошибка при загрузке данных сохранения игры');
    }
  }
}
