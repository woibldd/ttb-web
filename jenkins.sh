# #!/bin/sh
# echo "\nttb.plus building...\n"
 

# cnpm i vue-verification-code-input -S

# sleep 2

# npm run build

# sleep 2

# eval `ssh-agent -s`
# ssh-add ~/.ssh/id_rsa


# rsync -e "ssh -p 10022" -rcvPz dist/* root@47.74.255.117:~/ttb

# ssh -p 10022 root@47.74.255.117 "rsync -r ~/ttb/ ixx-www-1:~/ttb"

#!/bin/sh
npm install chalk   
sleep 2
 
echo "\nttb.plus building...\n"  
npm run build
sleep 2
eval `ssh-agent -s`
ssh-add ~/.ssh/id_rsa 
rsync -e "ssh -p 10022" -rcvPz dist/* root@47.74.255.117:~/site_11
ssh -p 10022 root@47.74.255.117 'rsync -e "ssh -p 10022" -rcvPz ~/site_11/ 47.244.141.131:~/site_11/'
