import debounce from "debounce";

const DEBOUNCE_INTERVAL = 50;

const registerOnTransport = (transport) => {
  const hid = (eventName, ...args) => {
    transport.emit(`hid.${eventName}`, ...args);
  };

  const events = {
    // mousedown: ({ button }) => hid("mousedown", { button }),
    // mouseup: ({ button }) => hid("mouseup", { button }),
    click: ({ clientX: x, clientY: y, button }) =>
      hid("click", { x, y, button }),
    mousemove: debounce(({ clientX: x, clientY: y }) => {
      hid("move", { x, y });
    }, DEBOUNCE_INTERVAL),
    // TODO: Drag Events
    // keypress: ({ charCode }) => hid("click", { key: charCode }),
    keydown: ({ code, target }) => hid("keydown", { key: code, text: target?.value }),
    keyup: ({ code, target }) => hid("keyup", { key: code, text: target?.value  }),
  };

  Object.keys(events).forEach((eventName) => {
    document.addEventListener(eventName, events[eventName], true);
  });
};

export default registerOnTransport;
