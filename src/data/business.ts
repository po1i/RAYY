/** Business facts needed on the client. Kept separate so scripts don't bundle all site copy. */
export const business = {
  name: 'Reveal A Youthful You',
  phone: '(617) 991-6608',
  tel: '+16179916608',
  // Confirm the clinic line accepts texts; set to false to hide every "Text" button.
  smsEnabled: true,
  email: 'info@revealayouthfulyou.com',
  street: '156 Belgrade Ave',
  neighborhood: 'Roslindale',
  city: 'Boston',
  region: 'MA',
  zip: '02131',
  mapsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Reveal+A+Youthful+You,+156+Belgrade+Ave,+Roslindale,+MA+02131',
  timeZone: 'America/New_York',
  // Index 0 = Sunday. Times are 24h "HH:MM" in the clinic's time zone.
  hours: [
    null,
    { open: '09:30', close: '18:00' },
    { open: '09:30', close: '18:00' },
    { open: '09:30', close: '18:00' },
    { open: '09:30', close: '18:00' },
    { open: '09:30', close: '18:00' },
    { open: '09:30', close: '18:00' },
  ] as ({ open: string; close: string } | null)[],
  rating: '5.0',
  reviewCount: '50+',
  reviewsUrl: 'https://www.google.com/search?q=Reveal+A+Youthful+You+Roslindale+reviews',
  instagram: 'https://www.instagram.com/revealayouthfulyou/',
  giftCardsUrl: 'https://www.giftly.com/gift-card/reveal-a-youthful-you-boston',
  careCreditUrl: 'https://www.carecredit.com/doctor-locator/roslindale-ma/reveal-a-youthful-you-684mxx/',
  /**
   * Call-back requests POST here as form data (Formspree, Basin, Web3Forms…).
   * Left empty, the form opens a pre-written email to `email` instead, so it
   * works on day one with no third-party account.
   */
  formEndpoint: '',
} as const;
