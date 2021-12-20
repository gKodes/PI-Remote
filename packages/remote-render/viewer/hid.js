import debounce from "debounce";
import { UAParser } from "ua-parser-js";

const DEBOUNCE_INTERVAL = 50;

const registerEvents = (target, events) => {
  Object.keys(events).forEach((eventName) => {
    target.addEventListener(eventName, events[eventName], true);
  });
};

// Use an existing lib to help with this
const getScreenDetails = () => ({
  height: window.innerHeight,
  width: window.innerWidth,
  orientation: screen?.orientation?.type || window?.orientation,
});

const identity = (value) => value;

const registerOnTransport = (transport) => {
  const hid =
    (eventName, fn = identity) =>
    (event) => {
      event.preventDefault && event.preventDefault();
      // If array destructure
      transport.emit(`hid.${eventName}`, fn(event));
    };

  let ticking = false;

  const documentEvents = {
    // mousedown: ({ button }) => hid("mousedown", { button }),
    // mouseup: ({ button }) => hid("mouseup", { button }),
    click: hid("click", ({ clientX: x, clientY: y, button }) => ({
      x,
      y,
      button,
    })),
    mousemove: debounce(
      hid(
        "move",
        ({ clientX: x, clientY: y }) => ({
          x,
          y,
        })
      ),
      DEBOUNCE_INTERVAL
    ),
    // TODO: Drag Events
    // keypress: ({ charCode }) => hid("click", { key: charCode }),
    keydown: hid("keydown", ({ code, target }) => ({
      key: code,
      text: target?.value,
    })),
    keyup: hid("keyup", ({ code, target }) => ({
      key: code,
      text: target?.value,
    })),
    scroll: hid("scrollTo", () => {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          ticking = false;
          return { x: window.scrollX, y: window.scrollY };
        });

        ticking = true;
      }
    }),
  };

  const windowEvents = {
    orientationchange: hid("screen", getScreenDetails()),
    resize: hid("screen", getScreenDetails()),
  };

  registerEvents(document, documentEvents);
  registerEvents(window, windowEvents);

  const hidInfo = hid("info");

  transport.on("connect", () => {
    const uaParser = new UAParser();
    hidInfo({
      ...uaParser.getResult(),
      screen: getScreenDetails(),
    });
  });
};

export default registerOnTransport;
