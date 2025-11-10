reiniciar o docker: 
docker compose restart

para agilizar: 
http://localhost:3000/testedb
http://localhost:3000/api
http://localhost:3000/users
http://localhost:3000/users/1 
http://localhost:3000/users/2


http://localhost:3000/users/login/xavier  

put: atualizar dados
http://localhost:3000/users/1

json:
{
  "nome": "Xavier",
  "senha": "xavier123"
}

get: pegar/renderizar
http://localhost:3000/users/


post: cadastro/envio
http://localhost:3000/users/

{
  "nome": "SeAcha",
  "cpf": "000.111.222-33",
  "login": "seacha",
  "senha": "admin123"
}