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

  if (!exist) {
    console.log({ exist });
    return "fail";
  }

  return await new Promise<Progress>(async r => {
    try {
      const lock = `${youtubeId}.dl`;
      const file = `${youtubeId}.mp4`;

      if (!fs.existsSync(lock)) {
        if (fs.existsSync(`static/${file}`)) {
          if (fs.existsSync(file)) fs.unlinkSync(file);
          r("completed");
          return;
        }

        ytdl(url)
          .on("response", () => {
            fs.rename(file, `static/${file}`, () => {
              fs.unlinkSync(lock);
              r("completed");
            });
          })
          .on("data", (data: Buffer) => {
            console.log("ondata", data.length);
            fs.writeFileSync(lock, "");
          })
          .pipe(fs.createWriteStream(file));

        setTimeout(() => {
          r("downloading");
        }, 3000);
      } else {
        r("downloading");
      }
    } catch (error) {
      console.log({ error });
      r("fail");
    }
  });
};

export const finishDownload = async (youtubeId: string) => {
  const fs = await import("fs");
  const lock = `${youtubeId}.dl`;
  const file = `${youtubeId}.mp4`;
  fs.copyFileSync(file, `static/${file}`);
  fs.unlinkSync(lock);
};

export type Progress = "downloading" | "completed" | "fail";
