// utils/tiktokEvents.ts

import axios from 'axios';

interface Content {
  content_id: string;
  content_type: 'product' | 'product_group';
  content_name: string;
}

interface TikTokEventData {
  contents: Content[];
  value?: number;
  currency?: string;
  // Add other event-specific properties if needed
}

const tiktokPixelId = 'CSOQF13C77U9A53MR4U0'; // Replace with your actual Pixel ID

const sendTikTokEvent = async (
  eventName: string,
  eventData: TikTokEventData,
  ipAddress: string,
  userAgent: string,
) => {
  try {
    const response = await axios.post(
      `https://analytics.tiktok.com/api/v2/pixel`,
      {
        pixel_code: tiktokPixelId,
        event: eventName,
        timestamp: Math.floor(Date.now() / 1000),
        context: {
          ip: ipAddress,
          user_agent: userAgent,
        },
        properties: eventData,
      },
      { headers: { 'Content-Type': 'application/json' } },
    );

    console.log(
      `TikTok event '${eventName}' sent successfully:`,
      response.data,
    );
  } catch (error) {
    console.error(`Error sending TikTok event '${eventName}':`, error);
  }
};
const ipAddress = '127.0.0.1';
const userAgent =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3';

sendTikTokEvent(
  'Purchase',
  {
    contents: [
      {
        content_id: '12345',
        content_type: 'product',
        content_name: 'Awesome T-Shirt',
      },
    ],
    value: 25,
    currency: 'USD',
  },
  ipAddress,
  userAgent,
);
export default sendTikTokEvent;
