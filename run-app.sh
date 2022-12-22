docker restart asset_manager_db
nohup java -jar be/build/libs/assetmanager-0.0.1-SNAPSHOT.jar > log-be.out &
nohup npx serve -s fe/build > log-fe.out &
