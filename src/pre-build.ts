import { readdir, writeFile } from "fs/promises";

const REGEX = /[^/]+\.[^.]+$/;

async function build() {
    console.log("pre build script");

    const ignored: string[] = [];
    try {
        const files = await readdir("./public", { recursive: true });

        for (const file of files) {
            const res = file.match(REGEX);
            if (res) {
                res.forEach((match) => ignored.push(match));
            }
        }
    } catch (e) {
        console.error(e);
    }

    await writeFile(
        "./src/ignored.ts",
        `export const ignored:string[] = [${ignored.map((i) => `'${i}'`).join(", ")}];`,
    );

    console.log("finished building ignore list");
}

build();
