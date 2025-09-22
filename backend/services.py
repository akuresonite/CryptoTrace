import math
from datetime import datetime, timedelta
from typing import List
import random

from models import PriceDataPoint

def generate_price_data(period: str) -> List[PriceDataPoint]:
    """Generate realistic BTC price data with volatility for different time periods."""
    base_price = 4250000  # ₹42,50,000 base price
    now = datetime.now()
    data_points = []
    
    if period == "1D":
        # 24 hourly data points
        for i in range(24):
            date = now - timedelta(hours=23-i)
            volatility = (random.random() - 0.5) * 0.05  # ±2.5% volatility
            price = base_price * (1 + volatility + math.sin(i / 4) * 0.02)
            data_points.append(PriceDataPoint(
                timestamp=date.strftime('%H:%M'),
                price=int(round(price)),
                date=date
            ))
            
    elif period == "1W":
        # 7 daily data points
        for i in range(7):
            date = now - timedelta(days=6-i)
            volatility = (random.random() - 0.5) * 0.1  # ±5% volatility
            trend = -0.02 + i * 0.005  # slight upward trend
            price = base_price * (1 + volatility + trend)
            data_points.append(PriceDataPoint(
                timestamp=date.strftime('%a'),
                price=int(round(price)),
                date=date
            ))
            
    elif period == "1M":
        # 30 daily data points
        for i in range(30):
            date = now - timedelta(days=29-i)
            volatility = (random.random() - 0.5) * 0.15  # ±7.5% volatility
            trend = -0.05 + i * 0.002  # gradual upward trend
            price = base_price * (1 + volatility + trend)
            data_points.append(PriceDataPoint(
                timestamp=str(date.day),
                price=int(round(price)),
                date=date
            ))
            
    elif period == "6M":
        # 26 weekly data points (approximately 6 months)
        for i in range(26):
            date = now - timedelta(weeks=25-i)
            volatility = (random.random() - 0.5) * 0.2  # ±10% volatility
            trend = -0.15 + i * 0.008  # stronger upward trend
            price = base_price * (1 + volatility + trend)
            data_points.append(PriceDataPoint(
                timestamp=date.strftime('%b %d'),
                price=int(round(price)),
                date=date
            ))
            
    elif period == "1Y":
        # 12 monthly data points
        for i in range(12):
            date = datetime(now.year, now.month - 11 + i, 1) if now.month - 11 + i > 0 else datetime(now.year - 1, now.month - 11 + i + 12, 1)
            volatility = (random.random() - 0.5) * 0.3  # ±15% volatility
            trend = -0.3 + i * 0.03  # significant growth over year
            price = base_price * (1 + volatility + trend)
            data_points.append(PriceDataPoint(
                timestamp=date.strftime('%b'),
                price=int(round(price)),
                date=date
            ))
            
    elif period == "MAX":
        # 5 yearly data points
        start_year = now.year - 4
        for i in range(5):
            date = datetime(start_year + i, 1, 1)
            volatility = (random.random() - 0.5) * 0.4  # ±20% volatility
            exponential_growth = math.pow(2, i * 0.8)  # exponential growth pattern
            price = (base_price / 8) * exponential_growth * (1 + volatility)
            data_points.append(PriceDataPoint(
                timestamp=str(date.year),
                price=int(round(price)),
                date=date
            ))
    
    return data_points

def calculate_percentage_change(data: List[PriceDataPoint]) -> float:
    """Calculate percentage change from first to last data point."""
    if len(data) < 2:
        return 0.0
    first_price = data[0].price
    last_price = data[-1].price
    return ((last_price - first_price) / first_price) * 100

def get_current_price(data: List[PriceDataPoint]) -> int:
    """Get current price (last data point)."""
    return data[-1].price if data else 4250000