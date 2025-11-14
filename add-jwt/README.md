

instalar dependecnica:
# npm install jsonwebtoken bcryptjs


# atulizar o .ENV
JWT_SECRET=seuSegredoMuitoSecretoAquiMudeIsso123!


usei no postman
# POST para cadastar com senha hash

http://localhost:3000/users/register

 {
  "nome": "SeAcha",
  "cpf": "010.111.222-33",
  "login": "admin",
  "senha": "123"  
}


Teste o login


# POST para http://localhost:3000/users/login
{
  "login": "seacha",
  "senha": "123"
}