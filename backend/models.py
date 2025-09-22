from pydantic import BaseModel
from datetime import datetime
from typing import List

class PriceDataPoint(BaseModel):
    timestamp: str
    price: int
    date: datetime

class CurrentPriceResponse(BaseModel):
    price: int
    percentage_change: float
    currency: str
    last_updated: datetime

class HistoricalDataResponse(BaseModel):
    data: List[PriceDataPoint]
    period: str
    current_price: int
    percentage_change: float
    data_points: int
    last_updated: datetime