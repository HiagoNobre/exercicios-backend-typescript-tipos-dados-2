import { Address } from "./Address";

export type User = {
  name: string,
  email: string,
  cpf: number,
  profession?: string,
  address: Address | null
}
