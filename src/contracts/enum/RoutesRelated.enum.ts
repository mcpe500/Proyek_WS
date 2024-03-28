export enum ROUTES {
    ROOT = '/',
    API_DOCS = '/api-docs',
    API_V1 = '/api/v1',
    AUTH_REGISTER = '/auth/register',
    AUTH_LOGIN = '/auth/login',
    AUTH_TOKEN = '/auth/token',
    AUTH_REFRESH_TOKEN = '/auth/refresh_token',
    USERS_ID = '/users/:id',
    DYNAMIC_ROUTES = '/dynamic/*',
    ADD_ROUTES = "/routes/:routes"
}