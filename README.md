# App

Gympass App

## RFs

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário;
- [x] Deve ser possível obter o usuário obter seu histórico de check-ins;
- [x] Deve ser possível obter o usuário buscar academias próximas;
- [x] Deve ser possível obter o usuário buscar academias pelo nome;
- [x] Deve ser possível obter o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs

- [x] O usuário não deve se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [x] O check-in só pode ser validade até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco Postgre;
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usário deve ser identificado por um JWT;