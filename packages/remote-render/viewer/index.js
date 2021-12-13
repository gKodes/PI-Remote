import { transport } from "./transport/socketio";
import mirror from "./mirror";
import hid from "./hid";

window.addEventListener("DOMContentLoaded", function () {
  mirror(transport);
  hid(transport);

  transport.connect();
});
