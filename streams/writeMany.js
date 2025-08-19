import fs from "fs/promises";

( async () => {
    console.time("writeMany");
    const fileHandle = await fs.open("test.txt", "w");
    for (let index = 0; index < 1000_000; index++) {
        await fileHandle.write(` ${index} `);
    }
    console.timeEnd("writeMany");
})();