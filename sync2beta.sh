#!/bin/sh

npm run build:beta

sleep 2

rsync -e "ssh" -rcvPz dist/* root@ix-test.com:~/www