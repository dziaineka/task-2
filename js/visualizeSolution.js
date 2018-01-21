(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;
    const DISCOVERED_ISLAND = 2;

    function element(type, className, text, hidden = true) {
        var elem = document.createElement(type);

        if (className) {
            elem.className = className;            
        }

        if (text) {
            elem.innerText = text;
        }

        elem.hidden = hidden;

        return elem;
    }

    /**
     * Бонусное задание.
     * Необходимо взять реализацию функции solution и доработать,
     * добавив функционал, который позволит пошагово визуализировать работу данного алгоритма.
     * Сигнатуру функции можно выбрать наиболее удобную для вашей визуализации
     */

    function visualizeSolution(map) {
        var islands_amount = 0;
        var indent = 0;

        // построить скелет лога
        var stepByStep = element('ul', 'log_root', '', false);
        var explorationLog = element('ol', 'sublog', '', false);
        var returnFogLog = element('ol', 'sublog', '', false);

        var explorationTitle = element('div', 'log_title', 'Обход ячеек', false);
        var returnFogTitle = element('div', 'log_title', 'Возврат тумана войны', false);

        var explorationContainer = element('li', 'log', '', false);
        var returnFogContainer = element('li', 'log', '', false);

        explorationContainer.appendChild(explorationTitle);
        returnFogContainer.appendChild(returnFogTitle);

        explorationContainer.appendChild(explorationLog);
        returnFogContainer.appendChild(returnFogLog);

        stepByStep.appendChild(explorationContainer);
        stepByStep.appendChild(returnFogContainer);

        function getStrCoordinate(row, column) {
            return '[' + row + ', ' + column + ']';
        }

        // проверить ячейку и, если это земля, то пометить ячейку
        // и продолжить исследование острова
        function checkLand(row, column) {
            switch (map[row][column]) {
                case ISLAND: {
                    map[row][column] = DISCOVERED_ISLAND;

                    var message = 'Земля, осмотримся! ' + getStrCoordinate(row, column);

                    addToLog(explorationLog, message);
                    
                    discoverIsland(row, column);
                    return true;
                }
            
                case DISCOVERED_ISLAND: {
                    var message = 'эта земля уже исследована ' + getStrCoordinate(row, column);

                    addToLog(explorationLog, message);
                    break;
                }

                default: {
                    var message = 'вода, смотрим дальше ' + getStrCoordinate(row, column);

                    addToLog(explorationLog, message);
                    break;
                }                    
            }
        }

        // исследовать остров по кругу от уже распознанной как остров ячейки
        function discoverIsland(row, column) {
            var row_dryland = row;
            var column_dryland = column;

            // посмотреть сверху
            if (row_dryland != 0) {
                var message = 'пойдем на ячейку вверх в ' + 
                    getStrCoordinate(row_dryland - 1, column_dryland);

                addToLog(explorationLog, message);
                checkLand(row_dryland - 1, column_dryland);
            }

            // посмотреть справа
            if (column_dryland != map[0].length - 1) {
                var message = 'пойдем на ячейку направо в ' + 
                    getStrCoordinate(row_dryland, column_dryland + 1);
                    
                addToLog(explorationLog, message);
                checkLand(row_dryland, column_dryland + 1);
            }

            // посмотреть снизу
            if (row_dryland != map.length - 1) {
                var message = 'пойдем на ячейку вниз в ' + 
                    getStrCoordinate(row_dryland + 1, column_dryland);
                
                addToLog(explorationLog, message);
                checkLand(row_dryland + 1, column_dryland);
            }

            // посмотреть слева
            if (column_dryland != 0) {
                var message = 'пойдем на ячейку налево  в ' + 
                    getStrCoordinate(row_dryland, column_dryland - 1);

                addToLog(explorationLog, message);
                checkLand(row_dryland, column_dryland - 1);
            }
        }

        function addToLog(log, message) {
            var li = element('li', '', message);
            log.appendChild(li);
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

                let message = 'возвращен туман войны на ячейку ' +
                    getStrCoordinate(row, column);

                addToLog(returnFogLog, message);
            }
        }

        // оприходовать остров
        function countIfIsland(row, column) {
            if (checkLand(row, column)) {
                islands_amount++;

                let message = 'Исследован остров №' + islands_amount;
                addToLog(explorationLog, message);
            }
        }

        iterateMap(countIfIsland);
        iterateMap(returnFog);

        return stepByStep;
    }

    root.SHRI_ISLANDS.visualizeSolution = visualizeSolution;
})(this);
