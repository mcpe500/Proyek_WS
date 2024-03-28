
export const convertRoute = (route: string): string => {
    return route.replace(/:(\w+)/g, '{$1}');
}
