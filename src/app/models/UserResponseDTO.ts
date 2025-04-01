export interface UserLoginDTO {
    username: string;
    email: string;
    token: string; // Assuming this DTO also includes a token for authentication
    // You can add more properties as needed, such as roles, permissions, etc.
  }