import { Router } from "express";
import { readdirSync } from "fs";

const PATH_ROUTER = `${__dirname}`;
const router = Router();

/*
 * index.ts [''.'ts']
 * Dynamic router creator
 * The name of the file in ./routes is a route
 */

const cleanFileName = (filename: string) => {
  //* return just the file name without extension
  const file = filename.split(".").shift();
  return file;
};

readdirSync(PATH_ROUTER).filter((fileName) => {
  const cleanName = cleanFileName(fileName);

  if (cleanName != "index") {
    //* dynamic typescript import

    import(`./${cleanName}`).then((moduleRoute) => {
      console.log(`${cleanName} route loaded`);
      router.use(`/api/v1/${cleanName}`, moduleRoute.router);
    });
  }
});

export default router;
