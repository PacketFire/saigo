FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:18-bullseye

RUN apt update && \
    curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl && \
    chmod a+rx /usr/local/bin/youtube-dl && \
    ln -s /usr/bin/python3 /usr/local/bin/python && \
    apt install -y ffmpeg

RUN mkdir -p /data/music

ENV FFMPEG_PATH /usr/bin/ffmpeg
ENV YOUTUBE_DL_PATH /usr/local/bin/youtube-dl
ENV MUSIC_PATH /data/music
