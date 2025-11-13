# INICIAR
login: seacha

Para permitir instalações
```bash
sudo su
```

Para atualizar lista de pacotes:
```bash
sudo apt update && sudo apt upgrade -y
```

# POSTGRESQL
Para instalar postgre:
```bash
sudo apt install postgresql postgresql-contrib
```

Para verificar se o postgre esta rodando:
```bash
systemctl status postgresql
```

# INSTALAR GIT
```bash
sudo apt install git -y
```

# INSTALAR DOCKER

Instala dependências:
```bash
sudo apt install apt-transport-https ca-certificates curl software-properties-common -y
```

Adiciona repositório oficial do Docker:
```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] \
  https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" \
  | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

Instala Docker:
```bash
sudo apt update
```

```bash
sudo apt install docker-ce docker-ce-cli containerd.io -y
```

Habilita e inicia o serviço:
```bash
sudo systemctl enable docker
```
```bash
sudo systemctl start docker
```
Permite usar Docker sem sudo:
```bash
sudo usermod -aG docker $USER
```

Depois disso, relogue ou digite: 
```bash
newgrp docker
```

Teste:
```bash
docker run hello-world
```

# Instalar o Docker Compose
```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```
```bash
sudo chmod +x /usr/local/bin/docker-compose
```
```bash
docker-compose --version
```

# Criar um diretório do projeto
```bash
mkdir ~/staging-app
```
```bash
cd ~/staging-app
```