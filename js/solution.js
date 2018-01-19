(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;

    /**
     * Функция находит кол-во островов на карте
     * ВАЖНО! Сигнатуру функции изменять нельзя!
     *
     * @param {number[][]} map карта островов представленная двумерной матрицей чисел
     * @returns {number} кол-во островов
     */
    function solution(map) {
        // todo: подсчитать кол-во островов на карте        
        function checkLand(row, column) {
            if (map[row][column] == 1) {
                map[row][column] = 2;
                discoverIsland(row, column);
                return true;
            }
        }

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

        function returnOne() {
            for (var row = 0; row < map.length; row++) {
                for (var column = 0; column < map[row].length; column++) {
                    if (map[row][column] == 2) {
                        map[row][column] = 1;
                    }
                }
            }
        }
        
        var islands_amount = 0;

        for (var row = 0; row < map.length; row++) {
            for (var column = 0; column < map[row].length; column++) {
                if (checkLand(row, column)) {
                    islands_amount++;        
                }
            }
        }

        returnOne();

        return islands_amount;
    }

    root.SHRI_ISLANDS.solution = solution;
})(this);
