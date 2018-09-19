#!/bin/sh

npm run build

sleep 2

rsync -e "ssh -p 10022" -rcvPz dist/* root@47.88.159.32:~/web

ssh -p 10022 root@47.88.159.32 "rsync -r ~/web/ nginx-1:~/www"
ssh -p 10022 root@47.88.159.32 "rsync -r ~/web/ nginx-2:~/www"