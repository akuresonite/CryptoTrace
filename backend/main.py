from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import uvicorn

from models import PriceDataPoint, CurrentPriceResponse, HistoricalDataResponse
from services import generate_price_data, get_current_price, calculate_percentage_change

app = FastAPI(
    title="Bitcoin Price API",
    description=
    "API for Bitcoin to INR price data with dummy data for demonstration",
    version="1.0.0")

# Add CORS middleware to allow React frontend to access the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5000", "http://127.0.0.1:5000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {
        "message": "Bitcoin Price API",
        "status": "running",
        "time": datetime.now()
    }


@app.get("/api/btc/current", response_model=CurrentPriceResponse)
async def get_current_btc_price():
    """Get current Bitcoin to INR price with percentage change."""
    try:
        # Generate dummy data for current price calculation
        dummy_data = generate_price_data("1D")
        current_price = get_current_price(dummy_data)
        percentage_change = calculate_percentage_change(dummy_data)

        return CurrentPriceResponse(price=current_price,
                                    percentage_change=percentage_change,
                                    currency="INR",
                                    last_updated=datetime.now())
    except Exception as e:
        raise HTTPException(status_code=500,
                            detail=f"Error fetching current price: {str(e)}")


@app.get("/api/btc/history/{period}", response_model=HistoricalDataResponse)
async def get_btc_history(period: str):
    """Get historical Bitcoin to INR price data for specified period."""
    valid_periods = ["1D", "1W", "1M", "6M", "1Y", "MAX"]

    if period.upper() not in valid_periods:
        raise HTTPException(
            status_code=400,
            detail=
            f"Invalid period. Valid periods are: {', '.join(valid_periods)}")

    try:
        data = generate_price_data(period.upper())
        current_price = get_current_price(data)
        percentage_change = calculate_percentage_change(data)

        return HistoricalDataResponse(data=data,
                                      period=period.upper(),
                                      current_price=current_price,
                                      percentage_change=percentage_change,
                                      data_points=len(data),
                                      last_updated=datetime.now())
    except Exception as e:
        raise HTTPException(status_code=500,
                            detail=f"Error fetching historical data: {str(e)}")


@app.get("/api/btc/periods")
async def get_available_periods():
    """Get list of available time periods."""
    return {
        "periods": [{
            "id": "1D",
            "label": "1 Day",
            "description": "Hourly data for the last 24 hours"
        }, {
            "id": "1W",
            "label": "1 Week",
            "description": "Daily data for the last 7 days"
        }, {
            "id": "1M",
            "label": "1 Month",
            "description": "Daily data for the last 30 days"
        }, {
            "id": "6M",
            "label": "6 Months",
            "description": "Weekly data for the last 6 months"
        }, {
            "id": "1Y",
            "label": "1 Year",
            "description": "Monthly data for the last 12 months"
        }, {
            "id": "MAX",
            "label": "Max",
            "description": "Yearly data for the last 5 years"
        }]
    }


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
