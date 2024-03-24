import demandPresetData from "./data.json"

export async function GET() {
    return Response.json(demandPresetData)
}