// utils/facebookEvents.ts

import axios from 'axios';

interface UserDataType {
  em?: string[];
  ph?: string[];
  // Add other user data fields as needed
}

interface CustomDataType {
  currency?: string;
  value?: string;
  // Add other custom data fields as needed
}

interface EventData {
  event_name: string;
  event_time: number;
  action_source: string;
  user_data: UserDataType;
  custom_data: CustomDataType;
}

const accessToken =
  'EAAatX1q6JcsBOxqFeRprHLh8vGZAkxYAAD2uZBaANt8DA6EuwpSFR3ISWtap28aMVDAw6cKd29z27FlRPdoKJ0FCm8x1nvHw1tRxKFHmzkc9i7jvtJRYgTVqepxw2a1H1WpUwf8ZBQKqIylTaJSbZBhkcz0brul3jWFCLjZAI72JGsa7HT8ogZBDCJMfNmMnve7QZDZD';
const pixelId = '513490967820135'; // Replace with your actual Pixel ID

const sendFacebookEvent = async (eventData: EventData) => {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v17.0/${pixelId}/events?access_token=${accessToken}`,
      { data: [eventData] },
      { headers: { 'Content-Type': 'application/json' } },
    );
    console.log('Facebook event sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending Facebook event:', error);
  }
};
const purchaseEvent: EventData = {
  event_name: 'Purchase',
  event_time: Math.floor(Date.now() / 1000), // Current timestamp
  action_source: 'website',
  user_data: {
    em: ['hashed_email@example.com'],
  },
  custom_data: {
    currency: 'USD',
    value: '142.52',
  },
};
sendFacebookEvent(purchaseEvent);
export default sendFacebookEvent;
