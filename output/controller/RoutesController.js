"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.showBuiltInModules = exports.accessRoutes = exports.addRoutes = void 0;
const BuiltInUtils = __importStar(require("../utils/BuiltInUtils"));
const routers = [];
var CONTROLLER_MODE;
(function (CONTROLLER_MODE) {
    CONTROLLER_MODE["CODE"] = "CODE";
    CONTROLLER_MODE["JSON"] = "JSON";
})(CONTROLLER_MODE || (CONTROLLER_MODE = {}));
const responses = [];
const addRoutes = (req, res) => {
    const { routes } = req.params;
    const { mode, responseValue } = req.body;
    routers.push(routes);
    if (mode == CONTROLLER_MODE.CODE) {
        eval(responseValue);
    }
    else if (mode == CONTROLLER_MODE.JSON) {
    }
    responses.push(responseValue);
    console.log(routers, responses);
    res.status(200).send("Success");
};
exports.addRoutes = addRoutes;
const accessRoutes = (req, res) => {
    const routes = req.params[0];
    console.log(routes);
    for (let i = 0; i < routers.length; i++) {
        if (routers[i] == routes) {
            return res.send(responses[i]);
        }
    }
    return res.send("endpoint doesn't exists");
};
exports.accessRoutes = accessRoutes;
const showBuiltInModules = (req, res) => {
    return res.send({ modules: Object.keys(BuiltInUtils) });
};
exports.showBuiltInModules = showBuiltInModules;
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
