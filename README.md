## this is desktop app to generate subtitles for mp3 application

to add your api key watch the [tutorial](https://www.youtube.com/watch?v=aOId0-v8qzc)

## contribution

### getting started

```sh
npm install --save # better to user npm with this project

npm run dev

# or you can also use
npm run start
npm run electron
```

- add your api key 👉[tutorial](https://www.youtube.com/watch?v=aOId0-v8qzc)
- try the app
- debug
- update
- make a pull request

to build for all platforms

```sh
npm run electron:build
```

to build for only win32

```sh
npm run build electron:build:win32
```

## future work

- [ ] create test for the application
- [ ] enhance segmentation of tracks

![tracks](./docs/تقسيم%20المقاطع%20الصوتيه.png)

- [ ] hash caching tracks

## Bugs 🐛

### ffmpeg

the code copy the ffmpeg binaries from node_modules to build
for example

- you develop the app from windows
- the ffmpeg-installer install just the windows binary for ffmpeg
- and you build the app for mac🖥🍎 in your windows machine
- the electron copy tho ffmpeg binary(windows binary in this case) from node_modules
- the app crash because there's no binary
