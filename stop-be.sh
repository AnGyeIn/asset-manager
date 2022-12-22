LOG=$(lsof -i :8080 | grep 'java')
SPLIT=($(echo $LOG | tr " " "\n"))
#echo ${SPLIT[1]}
sudo kill -9 ${SPLIT[1]}
