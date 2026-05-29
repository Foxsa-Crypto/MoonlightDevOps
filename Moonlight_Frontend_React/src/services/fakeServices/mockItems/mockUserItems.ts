import type { User } from "../../../@types/User";

export const mockUserItems: User[] = [
  {
    id_user: 1,
    name: "Admin Principal",
    email: "admin@sistema.com",
    cpf: "123.456.789-00",
    password: "hashed_password_123",
    created_at: new Date("2023-01-10T10:00:00Z"),
    type: "admin"
  },
  {
    id_user: 2,
    name: "João Silva",
    email: "joao.silva@email.com",
    cpf: "234.567.890-11",
    password: "hashed_password_456",
    created_at: new Date("2023-05-15T14:30:00Z"),
    type: "customer"
  },
  {
    id_user: 3,
    name: "Maria Oliveira",
    email: "maria.o@provedor.net",
    cpf: "345.678.901-22",
    password: "hashed_password_789",
    created_at: new Date("2023-08-20T09:15:00Z"),
    type: "customer"
  },
  {
    id_user: 4,
    name: "Suporte Técnico",
    email: "suporte@empresa.com",
    cpf: "456.789.012-33",
    password: "hashed_password_000",
    created_at: new Date("2024-01-05T11:00:00Z"),
    type: "admin"
  },
  {
    id_user: 5,
    name: "Carlos Eduardo",
    email: "cadu.dev@gmail.com",
    cpf: "567.890.123-44",
    password: "argon2_hashed_secret",
    created_at: new Date("2024-02-12T16:20:00Z"),
    type: "customer"
  },
  {
    id_user: 6,
    name: "Ana Beatriz",
    email: "ana.beatriz@outlook.com",
    cpf: "678.901.234-55",
    password: "pbkdf2_hashed_pass",
    created_at: new Date("2024-03-01T08:45:00Z"),
    type: "customer"
  },
  {
    id_user: 7,
    name: "Gerente de Vendas",
    email: "vendas@lojaexemplo.com",
    cpf: "789.012.345-66",
    password: "secure_admin_pass",
    created_at: new Date("2023-11-20T13:10:00Z"),
    type: "admin"
  },
  {
    id_user: 8,
    name: "Ricardo Souza",
    email: "ricardo.souza@yahoo.com",
    cpf: "890.123.456-77",
    password: "bcrypt_hash_example",
    created_at: new Date("2024-03-15T19:00:00Z"),
    type: "customer"
  },
  {
    id_user: 9,
    name: "Luciana Costa",
    email: "lu.costa@tech.io",
    cpf: "901.234.567-88",
    password: "salt_and_pepper_hash",
    created_at: new Date("2024-03-20T10:30:00Z"),
    type: "admin"
  },
  {
    id_user: 10,
    name: "Fernando Mendes",
    email: "fernando.m@bol.com.br",
    cpf: "012.345.678-99",
    password: "another_secure_hash",
    created_at: new Date("2024-03-25T22:15:00Z"),
    type: "customer"
  }
];