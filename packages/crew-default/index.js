import { AbstractCrew } from "@rm/core";

class DefaultCrew extends AbstractCrew {
  constructor() {
    super(...arguments);
  }

  async init() {}

  // TODO: After act is completed we can close the page
  // request
}

// is-video
// await fetchPlaybackSource("https://www.ibomma.net/b/dhamaka-telugu-2021-watch-online.html")

// Default Export

export default DefaultCrew;
