import { NextFunction, Request, Response } from "express";

const requestStore = new Map<string, number[]>()

export async function rateLimiterMiddleware(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip
    const now = Date.now()

    let requests = requestStore.get(ip)
    if (!requests) {
        requests = []
        requestStore.set(ip, requests)
    }

    requests.push(now)

    const timeWindow = 1000
    const maxRequestsPerWindow = 5

    requests = requests.filter(requestTime => now - requestTime < timeWindow)

    requestStore.set(ip, requests)
    if (requests.length > maxRequestsPerWindow) {
        return res.status(429).send('Too many requests');
    }
    
    next();
}