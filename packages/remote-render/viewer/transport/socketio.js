import { io } from "socket.io-client";

export const transport = new io(window.MIRROR_SERVICE, {
  autoConnect: false
});
