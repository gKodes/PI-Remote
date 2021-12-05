import "./socket.io";
import { mirror } from "./mirror";

window.addEventListener("DOMContentLoaded", function () {
  let socket = new io(window.MIRROR_SERVICE);

  socket.onAny((name, args) => {
    const [service, action] = name.split('.')
    if (service === 'cast') {
      mirror[action].apply(mirror, args);
    }
  });
});
