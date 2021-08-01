export interface User {
  gender: string;
  name: { first: string; last: string };
  location: any;
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    [key: string]: string;
  };
  dob: { date: string; age: number };
  phone: string;
  cell: string;
  picture: { large: string; medium: string; thumbnail: string };
  nat: string;
}
