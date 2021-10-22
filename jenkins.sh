#!/bin/sh
echo "\nixx.com building...\n"
 

cnpm i vue-verification-code-input -S

sleep 2

npm run build

sleep 2

eval `ssh-agent -s`
ssh-add ~/.ssh/id_rsa


rsync -e "ssh -p 10022" -rcvPz dist/* root@47.74.255.117:~/ixx

ssh -p 10022 root@47.74.255.117 "rsync -r ~/ixx/ ixx-www-1:~/ixx"
