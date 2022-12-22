LOG=$(lsof -i :3000 | grep 'node')
SPLIT=($(echo $LOG | tr " " "\n"))
#echo ${SPLIT[1]}
sudo kill -9 ${SPLIT[1]}
