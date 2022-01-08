import { AbstractActor } from "@rm/core";

class DefaultActor extends AbstractActor {
  constructor() {
    super(...arguments);
  }

  async init() {}

  // TODO: After act is completed we can close the page
  async act({ frame }) {
    const videoTags = await frame.$$("video");

    if (Array.isArray(videoTags) && videoTags.length) {
      await Promise.allSettled(
        videoTags.map(async (videoTag) => {
          // TODO: Process each tag, if tag has attributes extract and fire event
          // if not attributes are found click on the tag to start the video and let cast handle it.
          await videoTag.click();

          // Wait for the vide to be playable
          await frame.waitForFunction(
            (videoTag) => videoTag.readyState === 4,
            {},
            videoTag
          );
        })
      );
    }
  }
}

// is-video
// await fetchPlaybackSource("https://www.ibomma.net/b/dhamaka-telugu-2021-watch-online.html")

// Default Export

export default DefaultActor;
