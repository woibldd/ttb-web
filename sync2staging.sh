#!/bin/sh


rsync -e "ssh -p 10022" -rcvPz dist/* root@47.88.159.32:~/web


ssh -p 10022 root@47.88.159.32 "rsync -r ~/web/ staging:~/www"