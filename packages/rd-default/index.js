import R from "ramda";

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

const extractSource = R.pipe(
  R.andThen(frame.$("video")),
  R.ifElse(R.isNil, R.always(null), extractVideoSrc)
);

export { extractSource };

// is-video
// await fetchPlaybackSource("https://www.ibomma.net/b/dhamaka-telugu-2021-watch-online.html")
