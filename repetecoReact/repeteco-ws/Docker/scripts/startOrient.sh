echo "inicio criação da base"

sh /orientdb/bin/console.sh CREATE DATABASE PLOCAL:/orientdb/databases/repeteco -restore=/orientdb/backup/repetecobkp | echo -ne '\n'

echo "fim da criação da base"
echo "init server"
sh /orientdb/bin/server.sh

exit 1