var log_titles = document.getElementsByClassName('log_root')[0];

log_titles.onclick = function (event) {
    var target = event.target;

    if (target.tagName != 'DIV') {
        return;
    }

    var childrenContainer = target.parentNode.getElementsByTagName('li');

    if (!childrenContainer) return; // no children

    Array.from(childrenContainer, element => {
        element.hidden = !element.hidden;
    });
}