import { Request, Response } from "express";
import * as BuiltInUtils from "../utils/BuiltInUtils";
const routers: string[] = [];

enum CONTROLLER_MODE {
    CODE = "CODE",
    JSON = "JSON"
}

const responses: any[] = [];
export const addRoutes = (req: Request, res: Response) => {
    const { routes } = req.params;
    const { mode, responseValue }: { mode: CONTROLLER_MODE, responseValue: any } = req.body;
    routers.push(routes);
    if (mode == CONTROLLER_MODE.CODE) {
        eval(responseValue);
    } else if (mode == CONTROLLER_MODE.JSON) {

    }
    responses.push(responseValue);
    console.log(routers, responses);
    res.status(200).send("Success");
};

export const accessRoutes = (req: Request, res: Response) => {
    const routes = req.params[0];
    console.log(routes);
    for (let i = 0; i < routers.length; i++) {
        if (routers[i] == routes) {
            return res.send(responses[i]);
        }
    }
    return res.send("endpoint doesn't exists");
};

export const showBuiltInModules = (req: Request, res: Response) => {
    return res.send({ modules: Object.keys(BuiltInUtils) });
};

/**
 * import { Request, Response } from "express";
import * as BuiltInUtils from "../utils/BuiltInUtils";

const routeResponses = new Map<string, any[]>();
interface Variables {
    name: string;
    type: any;
    value: string;
}

export const addRoutes = (req: Request, res: Response) => {
    const { route } = req.params;

    const { variables, logicFlow } = req.body;

    // Check if the logicFlow is a valid BuiltInUtils function
    if (logicFlow && Object.keys(BuiltInUtils).indexOf(logicFlow.method) !== -1) {
        routeResponses.set(route, logicFlow);
        console.log(`Route added: ${route}`);
        res.status(200).send("Route successfully added.");
    } else {
        res.status(400).send("Invalid response function.");
    }
};

export const accessRoutes = (req: Request, res: Response) => {
    const route = req.params[0];
    const response = routeResponses.get(route);

    if (response) {
        console.log(`Accessing route: ${route}`);
        return res.send(response);
    } else {
        console.log(`Route not found: ${route}`);
        return res.status(404).send("Endpoint doesn't exist.");
    }
};

export const showBuiltInModules = (req: Request, res: Response) => {
    console.log("Showing Built-In Modules");
    return res.send({ modules: Object.keys(BuiltInUtils) });
};

 */