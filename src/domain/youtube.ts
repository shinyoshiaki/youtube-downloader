export const download = async (youtubeId: string): Promise<Progress> => {
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

  if (!exist) return "fail";

  return await new Promise<Progress>(async r => {
    try {
      const lock = `${youtubeId}.dl`;
      const file = `${youtubeId}.mp4`;

      if (fs.existsSync(`static/${file}`)) {
        r("completed");
        return;
      }

      if (!fs.existsSync(lock)) {
        fs.writeFileSync(lock, "");
        ytdl(url)
          .on("response", () => {
            fs.rename(file, `static/${file}`, () => {
              fs.unlinkSync(lock);
              r("completed");
            });
          })
          .on("data", () => {})
          .pipe(fs.createWriteStream(file));

        setTimeout(() => {
          r("downloading");
        }, 3000);
      } else {
        r("downloading");
      }
    } catch (error) {
      r("fail");
    }
  });
};

export type Progress = "downloading" | "completed" | "fail";
