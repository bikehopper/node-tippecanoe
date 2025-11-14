# node-tippecanoe

This repo stores pre-compiled binary for `tippecanoe`.

## How to contribute a binary

1. Run `npm run mkdir`, this will calculate your platform string and create a folder with its name
2. `cd tippecanoe`, and follow instructions in the `readme`in there to build it
3. Copy the following files over into the folder created in Step 1.
    ```
    tippecanoe
    tippecanoe-decode
    tippecanoe-enumerate
    tippecanoe-json-tool
    tippecanoe-overzoom
    ```