import Grocery from "@/models/grocey.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        const groceries = await Grocery.find({})
        return NextResponse.json(groceries, {status: 200})
    } catch (error) {
        return NextResponse.json({message: `get groceries error ${error}`}, {status: 500})
    }
}