echo "\nttb.plus building...\n"  
npm run build
sleep 2
eval `ssh-agent -s`
ssh-add ~/.ssh/id_rsa 
rsync -e "ssh -p 10022" -rcvPz dist/* root@47.74.255.117:~/site_11
ssh -p 10022 root@47.74.255.117 'rsync -e "ssh -p 22" -rcvPz ~/site_11/ 10.12.54.154:~/site_11/' 