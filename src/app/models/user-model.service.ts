export interface User {
  id?: string
  email: string
  firstName: string
  lastName: string
  password?: string // Only used during registration, not stored in state
  role: UserRole
  phoneNumber?: string
  address?: string
  city?: string
  createdAt?: Date
  lastLogin?: Date
}

export enum UserRole {
  CUSTOMER = "customer",
  ADMIN = "admin",
  MANAGER = "manager",
  MECHANIC = "mechanic",
  INVENTORY = "inventory",
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}
