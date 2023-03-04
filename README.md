## this is desktop app to generate subtitles for mp3 application

to add your api key watch the [tutorial](https://www.youtube.com/watch?v=aOId0-v8qzc)

## future work

### enhance segmentation of tracks

![tracks](./docs/تقسيم%20المقاطع%20الصوتيه.png)

### hash caching tracks

## Bugs 🐛

### ffmpeg

the code copy the ffmpeg binaries from node_modules to build
for example

- you develop the app from windows
- the ffmpeg-installer install just the windows binary for ffmpeg
- and you build the app for mac🖥🍎 in your windows machine
- the electron copy tho ffmpeg binary(windows binary in this case) from node_modules
- the app crash because there's no binary
