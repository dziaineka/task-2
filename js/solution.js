(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;
    const DISCOVERED_ISLAND = 2;
    var islands_amount = 0;

    /**
     * Функция находит кол-во островов на карте
     * ВАЖНО! Сигнатуру функции изменять нельзя!
     *
     * @param {number[][]} map карта островов представленная двумерной матрицей чисел
     * @returns {number} кол-во островов
     */
    function solution(map) {
        // проверить ячейку и, если это земля, то пометить ячейку
        // и продолжить исследование острова
        function checkLand(row, column) {
            if (map[row][column] == ISLAND) {
                map[row][column] = DISCOVERED_ISLAND;
                discoverIsland(row, column);
                return true;
            }
        }

        // исследовать остров по кругу от уже распознанной как остров ячейки
        function discoverIsland(row, column) {
            var row_dryland = row;
            var column_dryland = column;

            // посмотреть сверху
            if (row_dryland != 0) {
                checkLand(row_dryland - 1, column_dryland);
            }

            // посмотреть справа
            if (column_dryland != map[0].length - 1) {
                checkLand(row_dryland, column_dryland + 1);
            }

            // посмотреть снизу
            if (row_dryland != map.length - 1) {
                checkLand(row_dryland + 1, column_dryland);
            }

            // посмотреть слева
            if (column_dryland != 0) {
                checkLand(row_dryland, column_dryland - 1);
            }
        }

        // обойти каждую ячейку и применить к ней функцию
        function iterateMap(func) {
            for (var row = 0; row < map.length; row++) {
                for (var column = 0; column < map[row].length; column++) {
                    func(row, column);
                }
            }
        }

        // возвратить туман войны на разведанную землю
        function returnFog(row, column) {
            if (map[row][column] == DISCOVERED_ISLAND) {
                map[row][column] = ISLAND;
            }
        }

        // оприходовать остров
        function countIfIsland(row, column) {
            if (checkLand(row, column)) {
                islands_amount++;
            }
        }

        iterateMap(countIfIsland);
        iterateMap(returnFog);

        return islands_amount;
    }

    root.SHRI_ISLANDS.solution = solution;
})(this);
