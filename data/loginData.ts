type LoginData = {
    name: string;
    username: string;
    password: string;
    shouldLogin: boolean;
};

export const loginData : LoginData[] = [
    {
        name: 'valid credentials',
        username: 'standard_user',
        password: 'secret_sauce',
        shouldLogin: true,
    },
    {
        name: 'invalid username',
        username: 'invalid_user',
        password: 'secret_sauce',
        shouldLogin: false,
    },
    {
        name: 'invalid password',
        username: 'standard_user',
        password: 'wrong_password',
        shouldLogin: false,
    },
    {
        name: 'invalid username and password',
        username: 'invalid_user',
        password: 'wrong_password',
        shouldLogin: false,
    },
];