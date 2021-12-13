import { mirror } from "./mirror";

window.addEventListener("DOMContentLoaded", function () {
  let socket = new WebSocket(window.MIRROR_SERVICE);

  function clearPage() {
    while (document.firstChild) {
      document.removeChild(document.firstChild);
    }
  }

  function handleMessage(msg) {
    if (msg.clear) clearPage();
    else if (msg.base) base = msg.base;
    else mirror[msg.f].apply(mirror, msg.args);
  }

  socket.onmessage = function (event) {
    var msg = JSON.parse(event.data);
    if (msg instanceof Array) {
      msg.forEach(function (subMessage) {
        handleMessage(JSON.parse(subMessage));
      });
    } else {
      handleMessage(msg);
    }
  };

  socket.onclose = function () {
    socket = new WebSocket(window.MIRROR_SERVICE);
  };
});
