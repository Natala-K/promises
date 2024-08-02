import GameSavingLoader from './src/GameSavingLoader';
import GameSaving from './src/GameSaving';

jest.mock('../src/reader');
jest.mock('../src/parser');

describe('GameSavingLoader', () => {
  test('should load and return GameSaving object', async () => {
    const expectedData = {
      id: 9,
      created: 1546300800,
      userInfo: {
        id: 1,
        name: 'Hitman',
        level: 10,
        points: 2000,
      },
    };

    const buffer = new ArrayBuffer(16);
    const view = new Uint16Array(buffer);
    const jsonStr = JSON.stringify(expectedData);

    for (let i = 0; i < jsonStr.length; i++) {
      view[i] = jsonStr.charCodeAt(i);
    }

    const mockRead = require('../src/reader').default;
    const mockJson = require('../src/parser').default;

    mockRead.mockResolvedValue(buffer);
    mockJson.mockResolvedValue(jsonStr);

    const saving = await GameSavingLoader.load();
    expect(saving).toEqual(new GameSaving(9, 1546300800, expectedData.userInfo));
  });
});
