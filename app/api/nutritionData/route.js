import nutritionData from "./data.json"

export function GET(){
    return Response.json(nutritionData)
}