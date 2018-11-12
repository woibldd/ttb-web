#!/bin/sh

npm run build

sleep 2

rsync -e "ssh -p 10022" -rcvPz dist/* root@47.88.159.32:~/ixx

ssh -p 10022 root@47.88.159.32 "rsync -r ~/ixx/ staging:~/ixx"