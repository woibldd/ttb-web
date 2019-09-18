#!/bin/sh 
echo "\nixx.com building...\n"
 

npm run build

sleep 2

eval `ssh-agent -s`
ssh-add ~/.ssh/id_rsa


rsync -e "ssh -p 10022" -rcvPz dist/* root@47.88.159.32:~/ixx

ssh -p 10022 root@47.88.159.32 "rsync -r ~/ixx/ ixx-www-1:~/ixx"
