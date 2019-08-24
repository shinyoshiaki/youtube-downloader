export const download = async (youtubeId: string) => {
  try {
    const ytdl = await require("ytdl-core");
    const fs = await import("fs");
    const BASE_PATH = `https://www.youtube.com/watch?v=`;

    const url = BASE_PATH + youtubeId;

    const exist = await new Promise<boolean>(r =>
      ytdl.getInfo(url, (err: any) => {
        if (!err) {
          r(true);
        } else r(false);
      })
    );

    if (!exist) return false;

    return await new Promise<boolean>(async r => {
      const lock = `${youtubeId}.dl`;
      const file = `${youtubeId}.mp4`;
      if (!fs.existsSync(lock)) {
        fs.writeFileSync(lock, "");
        ytdl(url)
          .on("response", () => {
            console.log("responce");
            fs.rename(file, `static/${file}`, () => {
              console.log("ready");
              fs.unlinkSync(lock);
              r(true);
            });
          })
          .on("data", () => {})
          .pipe(fs.createWriteStream(file));

        setTimeout(() => {
          r(false);
        }, 3000);
      } else {
        r(true);
      }
    });
  } catch (error) {
    return false;
  }
};
