#!/bin/sh 
 
npm run build

sleep 2

eval `ssh-agent -s`
ssh-add ~/.ssh/id_rsa

rsync -e "ssh -p 10022" -rcvPz dist/* root@47.74.255.117:~/web_staging_ixx

ssh -p 10022 root@47.74.255.117 'rsync -e "ssh -p 10022" -rcvPz ~/web_staging_ixx/ test:/var/www/ixx'
 
 
   