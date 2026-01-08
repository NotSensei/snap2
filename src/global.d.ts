import { Connection } from "mongoose";

declare global {
    var mongoose: {
        conn: Connection | null,
        promise: Promise<Connection> | null // promise for connection after completing promise we will get connection
    }
}

export {}