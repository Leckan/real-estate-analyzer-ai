// app/api/attom/route.js
import { searchProperties, getPropertyDetails, getPropertyValuation } from '@/lib/attom'; // Import your Attom API functions
import { NextResponse } from 'next/server'; // Import NextResponse

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action'); // Get the action (search, details, valuation, etc.)
    const searchTerm = searchParams.get('term');
    const attomId = searchParams.get('id'); // For details or valuation

    let data = null;

    switch (action) {
      case 'search':
        if (!searchTerm) {
          return new NextResponse("Search term is required", { status: 400 });
        }
        data = await searchProperties(searchTerm);
        break;
      case 'details':
        if (!attomId) {
          return new NextResponse("Attom ID is required", { status: 400 });
        }
        data = await getPropertyDetails(attomId);
        break;
      case 'valuation':
        if (!attomId) {
            return new NextResponse("Attom ID is required", { status: 400 });
        }
        data = await getPropertyValuation(attomId);
        break;
      default:
        return new NextResponse("Invalid action", { status: 400 });
    }

    if (data === null) {
        return new NextResponse("No data found.", { status: 404 })
    }

    return NextResponse.json(data); // Return the data as JSON

  } catch (error) {
    console.error("Attom API Route Error:", error);
    return new NextResponse("An error occurred", { status: 500 });
  }
}