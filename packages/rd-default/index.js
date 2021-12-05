import R, { map, pipe } from "ramda";

const extractVideoSrc = async (videoTag) => {
  // Get the Element into View
  //   await page.evaluate((videoTag) => {
  //     videoTag.scrollIntoView();
  //   }, videoTag);
  const frame = (await videoTag.executionContext()).frame();

  // const videoTagOffsets = await videoTag.boundingBox();
  // console.info({ videoTagOffsets });
  // frame.parentFrame() === page
  //   await page.mouse.click(center.x, center.y);
  await videoTag.click();

  // Wait for the vide to be playable
  await frame.waitForFunction(
    (videoTag) => videoTag.readyState === 4,
    {},
    videoTag
  );

  //TODO: Video tag Extract Source (if we have multiple)
  const videoSource = await videoTag.evaluate((videoTag) => {
    let { src } = videoTag;
    if (!src) {
      // TODO: Convert to Probity Order later use (isPlayableMime)
      const source = Array.prototype.find.call(
        videoTag.querySelectorAll("source"),
        ({ type }) => type === "video/mp4"
      );

      if (source) {
        source.src;
      }
    }

    return src;
  }, videoTag);

  return videoSource;
};

const promiseValue = R.prop("value");

const extractVideoTags = pipe(
  map(promiseValue),
  R.filter(R.identity),
  map(extractVideoSrc)
);

const fetchWith = async (source, { page }) => {
  // await _(url, { page });
  // TODO: Setup Hooks and hand it over
  await page.goto(source);

  const sources = (await Promise.allSettled(
    extractVideoTags(
      await Promise.allSettled(
        page.frames().map(async (frame) => await frame.$("video"))
      )
    )
  )).map(promiseValue);

  return sources;
};

export { fetchWith };

// is-video
// await fetchPlaybackSource("https://www.ibomma.net/b/dhamaka-telugu-2021-watch-online.html")
