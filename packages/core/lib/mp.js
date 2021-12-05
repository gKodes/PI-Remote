// Media Player
import mpv from "mpv";

const getInstance = async () => {
  const { _cache: cache } = getInstance;
  if (!(cache || cache.isConnected())) {
    getInstance._cache = mpv({
      args: [], // Arguments to child_process.spawn,
      options: {}, // Options to child_process.spawn,
    });

    await mpv.set("volume", 1);
  }

  return getInstance._cache;
};

// mpv.command(
//   "loadfile",
//   "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
// );

const playNow = (source) => {
  const instance = getInstance();
  // instance.command('loadfile', source)
};

const addForLater = () => {};

export { playNow, addForLater };
