## how to run
- in the "dist" folder, download the `index-<OS name>` file for your os (windows, mac, or linux)
- run the file in cmd/terminal with these arguments: `<input file name(must be in root)> <output file name> <minCount>, `, where "minCount" is the amount of pairs to check for (for example: `index-win.exe Artist_lists_long.txt output.txt 50`).

## how to build
- clone repository
- install [node](https://nodejs.org/en/download/)
- in project root, run `npm i` to install packages
- in project root, run `npm run build` to create binaries for windows, mac, and linux in the "dist" folder
# notes
- building only works with LTS versions of node - [related issue](https://github.com/vercel/pkg/issues/838)
