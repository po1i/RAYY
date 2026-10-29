/**
 * All site copy and business facts live here so the clinic can update the
 * site without touching layout code.
 *
 * Anything marked `placeholder: true` (or listed under PLACEHOLDERS in the
 * README) was written for the redesign and must be confirmed by the clinic
 * before launch: prices, review quotes, team roles and timing promises.
 * Append `?review` to any URL to outline every placeholder on the page.
 */

export type Concern = 'lines' | 'volume' | 'texture' | 'tone' | 'energy' | 'weight';
export type Downtime = 0 | 1 | 2;
export type Group = 'Injectables' | 'Skin' | 'Wellness';

export interface Treatment {
  slug: string;
  name: string;
  group: Group;
  /** One line shown in the treatment list. */
  short: string;
  concerns: Concern[];
  downtime: Downtime;
  downtimeLabel: string;
  duration: string;
  lasts: string;
  price: string;
  pricePlaceholder: boolean;
  /** Opening paragraph on the treatment page. */
  intro: string;
  goodFor: string[];
  feel: string;
  steps: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
}

export { business } from './business';

export const concerns: { id: Concern; label: string; hint: string }[] = [
  { id: 'lines', label: 'Lines & wrinkles', hint: 'Forehead, frown lines, crow’s feet' },
  { id: 'volume', label: 'Lost volume', hint: 'Cheeks, lips, jawline, under-eyes' },
  { id: 'texture', label: 'Texture & scars', hint: 'Acne scars, pores, crepey skin' },
  { id: 'tone', label: 'Dullness & spots', hint: 'Sun damage, uneven tone, melasma' },
  { id: 'energy', label: 'Energy & recovery', hint: 'Fatigue, hydration, recovery' },
  { id: 'weight', label: 'Weight', hint: 'Medically supervised programs' },
];

export const downtimes: { id: Downtime; label: string }[] = [
  { id: 0, label: 'None' },
  { id: 1, label: 'A day or two' },
  { id: 2, label: 'Up to a week' },
];

export const groups: Group[] = ['Injectables', 'Skin', 'Wellness'];

export const treatments: Treatment[] = [
  {
    slug: 'botox-and-dysport-injections',
    name: 'Botox & Dysport',
    group: 'Injectables',
    short: 'Softens expression lines while you still look like you.',
    concerns: ['lines'],
    downtime: 0,
    downtimeLabel: 'None',
    duration: '15–30 min',
    lasts: '3–4 months',
    price: 'from $12 / unit',
    pricePlaceholder: true,
    intro:
      'Neuromodulators relax the specific muscles that fold skin into lines: the “11s” between the brows, forehead lines and crow’s feet. Dosed conservatively, the result is a face that looks rested, not frozen.',
    goodFor: [
      'Forehead lines and frown lines',
      'Crow’s feet',
      'Lip flip and gummy smile',
      'Jaw clenching and masseter slimming',
    ],
    feel: 'A few quick pinches. Most people are back at work the same hour.',
    steps: [
      { title: 'Map', body: 'We watch you frown, raise and smile to see which muscles create each line.' },
      { title: 'Dose', body: 'Units are planned per area and written down, so next time is consistent.' },
      { title: 'Inject', body: 'Fine needles, about ten minutes. No numbing needed for most people.' },
      { title: 'Check in', body: 'Results settle in 3–14 days. A two-week check makes sure it looks right.' },
    ],
    faqs: [
      {
        q: 'What is the difference between Botox and Dysport?',
        a: 'Both relax muscles the same way. Dysport can spread slightly wider and kick in a day or two sooner, which suits broader areas like the forehead. We recommend one at your consult based on the area.',
      },
      {
        q: 'Will I look frozen?',
        a: 'Not with conservative dosing. The aim is softer lines with normal movement. It is easy to add a little at your check-in and impossible to take away, so we start light.',
      },
      {
        q: 'How many units will I need?',
        a: 'Typical ranges are 10–25 units for frown lines, 6–20 for the forehead and 8–12 per side for crow’s feet. Your exact plan is set at the consult.',
      },
    ],
  },
  {
    slug: 'filler-biostimulator',
    name: 'Fillers & Biostimulators',
    group: 'Injectables',
    short: 'Restores volume and structure that time takes away.',
    concerns: ['volume'],
    downtime: 1,
    downtimeLabel: '1–2 days',
    duration: '30–60 min',
    lasts: '9–24 months',
    price: 'from $650 / syringe',
    pricePlaceholder: true,
    intro:
      'Hyaluronic acid fillers restore volume where it has thinned: lips, cheeks, temples, jawline and chin. Biostimulators such as Radiesse go further, prompting your own collagen to rebuild firmness gradually over months.',
    goodFor: [
      'Lips: shape, hydration or volume',
      'Cheeks and temples that have hollowed',
      'Jawline and chin definition',
      'Laxity and crepey skin (biostimulators)',
    ],
    feel: 'Products contain lidocaine and we numb first. Expect pressure more than pain.',
    steps: [
      { title: 'Assess', body: 'We look at your face in three dimensions: where support has been lost, not just where lines show.' },
      { title: 'Plan', body: 'Product, amount and placement are agreed before anything starts. You see the plan in a mirror.' },
      { title: 'Treat', body: 'Numbing, then precise placement with needle or cannula to minimise bruising.' },
      { title: 'Settle', body: 'Swelling eases in 1–2 days. Final results show at two weeks; biostimulators build over 2–3 months.' },
    ],
    faqs: [
      {
        q: 'Filler or biostimulator: which do I need?',
        a: 'Filler adds volume right away and suits lips and defined contours. Biostimulators rebuild collagen for firmness and skin quality. Many plans use a little of both.',
      },
      {
        q: 'Can filler be reversed?',
        a: 'Hyaluronic acid filler can be dissolved with hyaluronidase if needed. Biostimulators cannot be dissolved, which is why we plan them carefully.',
      },
      {
        q: 'Will I bruise?',
        a: 'Some people do. Skip alcohol, fish oil and ibuprofen for 48 hours beforehand, and avoid booking right before a big event.',
      },
    ],
  },
  {
    slug: 'rf-microneedling',
    name: 'RF Microneedling',
    group: 'Skin',
    short: 'Rebuilds collagen to refine scars, pores and texture.',
    concerns: ['texture', 'tone'],
    downtime: 1,
    downtimeLabel: '2–3 days of redness',
    duration: '30–60 min',
    lasts: 'Builds over 3 sessions',
    price: 'from $600 / session',
    pricePlaceholder: true,
    intro:
      'Fine needles deliver radiofrequency energy beneath the surface, prompting your skin to produce new collagen and elastin. Over a series, acne scars soften, pores tighten and skin texture and tone even out.',
    goodFor: ['Acne scarring', 'Enlarged pores', 'Fine lines and crepey skin', 'Mild laxity along the jaw and neck'],
    feel: 'We apply numbing cream for 30 minutes first. Most people describe warmth and light pressure.',
    steps: [
      { title: 'Numb', body: 'Topical numbing for about 30 minutes while we set depth and energy for each area.' },
      { title: 'Treat', body: 'The handpiece moves in passes over the face, typically 30–60 minutes depending on area size.' },
      { title: 'Calm', body: 'A soothing serum and SPF. Redness similar to a mild sunburn for 2–3 days.' },
      { title: 'Repeat', body: 'Three sessions about four to six weeks apart, with collagen building for months after.' },
    ],
    faqs: [
      {
        q: 'How is this different from regular microneedling?',
        a: 'Adding radiofrequency heats the deeper layers, so you get stronger collagen remodelling and tightening per session than needles alone.',
      },
      {
        q: 'Is it safe for darker skin tones?',
        a: 'Yes. Because the energy is delivered below the surface, RF microneedling is considered safe across skin types when settings are adjusted correctly.',
      },
    ],
  },
  {
    slug: 'vi-peel',
    name: 'VI Peel',
    group: 'Skin',
    short: 'A medical-grade peel for spots, sun damage and breakouts.',
    concerns: ['tone', 'texture'],
    downtime: 2,
    downtimeLabel: '5–7 days of peeling',
    duration: '30 min',
    lasts: 'Series of 2–3 for best results',
    price: 'from $350',
    pricePlaceholder: true,
    intro:
      'The VI Peel is a physician-formulated chemical peel that lifts dull, damaged surface cells to reveal clearer, more even skin underneath. It is effective on sun spots, melasma, acne and early lines, and suits most skin tones.',
    goodFor: ['Sun spots and uneven tone', 'Melasma', 'Active acne and post-acne marks', 'Dull, tired-looking skin'],
    feel: 'A mild tingle for a few minutes, with no numbing needed. The peeling starts around day three.',
    steps: [
      { title: 'Prep', body: 'Skin is cleansed and we choose the peel formula for your concern and skin type.' },
      { title: 'Apply', body: 'The peel goes on in layers over about 30 minutes. You leave with it on.' },
      { title: 'Peel', body: 'Days 3–6 the skin sheds. Don’t pick. Use the post-peel kit and SPF.' },
      { title: 'Reveal', body: 'By day seven skin looks brighter and more even. Repeat in 4–6 weeks if needed.' },
    ],
    faqs: [
      {
        q: 'When should I book a peel?',
        a: 'Leave a week clear of events. Autumn and winter are ideal because sun exposure is lower while your skin is renewing.',
      },
    ],
  },
  {
    slug: 'facials',
    name: 'HydraFacial & Facials',
    group: 'Skin',
    short: 'Deep-cleans, exfoliates and hydrates. Leave glowing.',
    concerns: ['tone', 'texture'],
    downtime: 0,
    downtimeLabel: 'None',
    duration: '45–60 min',
    lasts: 'Best monthly',
    price: 'from $175',
    pricePlaceholder: true,
    intro:
      'Our facials are tailored on the day, from a HydraFacial’s cleanse, extract and hydrate to targeted treatments for congestion or sensitivity. No downtime, and you leave with skin that looks clean and bright.',
    goodFor: ['Congested pores and blackheads', 'Dehydrated or dull skin', 'Pre-event glow', 'Maintenance between advanced treatments'],
    feel: 'Relaxing. A cool suction during extraction and nothing that hurts.',
    steps: [
      { title: 'Analyse', body: 'A look at your skin under light to decide what it needs today.' },
      { title: 'Cleanse', body: 'Gentle exfoliation and a light acid to loosen buildup.' },
      { title: 'Extract', body: 'Painless vortex extraction clears pores without squeezing.' },
      { title: 'Infuse', body: 'Antioxidants and hyaluronic acid serums, finished with SPF.' },
    ],
    faqs: [
      {
        q: 'How often should I get a HydraFacial?',
        a: 'Every four weeks matches your skin’s renewal cycle. Many clients book one before an event; results show immediately.',
      },
    ],
  },
  {
    slug: 'prp-therapy',
    name: 'PRP',
    group: 'Skin',
    short: 'Your own platelets, used to renew skin and support hair growth.',
    concerns: ['texture', 'tone'],
    downtime: 1,
    downtimeLabel: '1–2 days',
    duration: '60 min',
    lasts: 'Series of 3',
    price: 'from $500',
    pricePlaceholder: true,
    intro:
      'Platelet-rich plasma is drawn from a small sample of your own blood and concentrated. Applied with microneedling or injected into the scalp, its growth factors support collagen, under-eye quality and thinning hair.',
    goodFor: ['Under-eye crepiness and dark circles', 'Overall skin quality', 'Thinning hair', 'Boosting microneedling results'],
    feel: 'A standard blood draw, then numbing before treatment.',
    steps: [
      { title: 'Draw', body: 'A small blood sample, like a routine lab test.' },
      { title: 'Spin', body: 'A centrifuge separates the platelet-rich plasma in about ten minutes.' },
      { title: 'Treat', body: 'PRP is microneedled into the skin or injected where it is needed.' },
      { title: 'Build', body: 'Improvement builds over weeks. Three sessions a month apart is typical.' },
    ],
    faqs: [
      {
        q: 'Is PRP safe?',
        a: 'Because it comes from your own blood, the risk of allergy or reaction is very low. We review your medical history first.',
      },
    ],
  },
  {
    slug: 'iv-fusion',
    name: 'IV Therapy',
    group: 'Wellness',
    short: 'Hydration, vitamins and minerals delivered directly.',
    concerns: ['energy'],
    downtime: 0,
    downtimeLabel: 'None',
    duration: '45 min',
    lasts: 'Feel it same day',
    price: 'from $175',
    pricePlaceholder: true,
    intro:
      'IV therapy delivers fluids, vitamins and electrolytes straight into the bloodstream for full absorption. Clients come in for recovery after travel, illness or training, or a reset when running on empty.',
    goodFor: ['Dehydration and recovery', 'Low energy', 'Immune support', 'Jet lag and hangovers'],
    feel: 'One small needle, then 45 minutes in a reclining chair. Bring a book or catch up on email.',
    steps: [
      { title: 'Screen', body: 'A short health check and blood pressure reading by our nurse practitioner.' },
      { title: 'Choose', body: 'We match the formula (hydration, immunity, energy) to how you feel.' },
      { title: 'Relax', body: 'The drip runs for about 45 minutes while you sit back.' },
      { title: 'Go', body: 'No downtime. Most people feel the difference the same day.' },
    ],
    faqs: [
      {
        q: 'Who places the IV?',
        a: 'Our nurse practitioner. Marlene spent years as a surgical ICU nurse, so IV access is routine for her.',
      },
    ],
  },
  {
    slug: 'nad-and-b12',
    name: 'NAD+ & B12',
    group: 'Wellness',
    short: 'Quick shots for energy, focus and cellular repair.',
    concerns: ['energy'],
    downtime: 0,
    downtimeLabel: 'None',
    duration: '5–10 min',
    lasts: 'Weekly or as advised',
    price: 'from $35',
    pricePlaceholder: true,
    intro:
      'B12 supports energy and metabolism; NAD+ is a coenzyme involved in cellular energy and repair that naturally declines with age. Both are available as quick injections, with NAD+ also offered by IV.',
    goodFor: ['Low energy and brain fog', 'Low B12 levels', 'Support during weight programs', 'Recovery'],
    feel: 'A quick shot. NAD+ can cause a brief warm flush that passes in minutes.',
    steps: [
      { title: 'Check', body: 'A quick review of medications and goals.' },
      { title: 'Inject', body: 'An intramuscular or subcutaneous shot, under five minutes.' },
      { title: 'Repeat', body: 'Most people do weekly or bi-weekly shots for steady levels.' },
      { title: 'Review', body: 'We adjust frequency based on how you feel.' },
    ],
    faqs: [
      {
        q: 'Can I walk in for a B12 shot?',
        a: 'Call ahead and we will fit you in. It takes minutes.',
      },
    ],
  },
  {
    slug: 'peptide-therapy',
    name: 'Peptide Therapy',
    group: 'Wellness',
    short: 'Targeted peptides for recovery, sleep and metabolism.',
    concerns: ['energy', 'weight'],
    downtime: 0,
    downtimeLabel: 'None',
    duration: 'Consult 30 min',
    lasts: 'Ongoing program',
    price: 'Priced at consult',
    pricePlaceholder: false,
    intro:
      'Peptides are short chains of amino acids that signal specific processes in the body. Under medical supervision, targeted protocols can support recovery, sleep quality, body composition and skin.',
    goodFor: ['Recovery from training or injury', 'Sleep quality', 'Body composition', 'Skin and hair support'],
    feel: 'Most protocols are small at-home injections we teach you to do in a minute.',
    steps: [
      { title: 'Consult', body: 'Goals, health history and any labs reviewed by our nurse practitioner.' },
      { title: 'Protocol', body: 'A specific peptide, dose and schedule, written out for you.' },
      { title: 'Teach', body: 'We show you how to self-administer. It is quick and nearly painless.' },
      { title: 'Adjust', body: 'Regular check-ins to track progress and fine-tune.' },
    ],
    faqs: [
      {
        q: 'Is peptide therapy legal and safe?',
        a: 'We only prescribe peptides that can be legally compounded, from licensed pharmacies, after a medical consult. We will tell you honestly if a peptide is not right for you.',
      },
    ],
  },
  {
    slug: 'weight-management',
    name: 'Medical Weight Loss',
    group: 'Wellness',
    short: 'GLP-1 programs with real medical oversight.',
    concerns: ['weight'],
    downtime: 0,
    downtimeLabel: 'None',
    duration: 'Consult 30 min',
    lasts: 'Monthly program',
    price: 'Priced at consult',
    pricePlaceholder: false,
    intro:
      'A medically supervised program built around GLP-1 medication such as semaglutide or tirzepatide, with dose adjustments, check-ins and nutrition guidance from a nurse practitioner who knows you.',
    goodFor: ['Steady, sustainable weight loss', 'Appetite and craving control', 'People who want oversight, not an app'],
    feel: 'A weekly at-home injection with a tiny needle. We show you how.',
    steps: [
      { title: 'Consult', body: 'Health history, goals and whether GLP-1 medication is appropriate for you.' },
      { title: 'Start', body: 'A low starting dose to keep side effects minimal.' },
      { title: 'Adjust', body: 'Monthly check-ins to adjust the dose and track progress.' },
      { title: 'Maintain', body: 'A plan for keeping results once you reach your goal.' },
    ],
    faqs: [
      {
        q: 'What about “Ozempic face”?',
        a: 'Rapid weight loss can hollow the face. Because we also do fillers and biostimulators, we can plan for that as you go.',
      },
    ],
  },
];

export const team = [
  {
    name: 'Marlene',
    role: 'Founder · Nurse Practitioner',
    bio: 'Marlene has spent about 20 years in medicine. She started as a surgical ICU nurse and still practises as a nurse practitioner at Boston Medical Center. That clinical background shapes how the clinic works: careful assessment, honest advice, and results that look natural.',
    placeholder: false,
  },
  {
    name: 'Rose Karamousayan',
    role: 'Aesthetics',
    bio: 'Role and bio to be confirmed by the clinic.',
    placeholder: true,
  },
  {
    name: 'Carolyn Hussey',
    role: 'Aesthetics',
    bio: 'Role and bio to be confirmed by the clinic.',
    placeholder: true,
  },
];

// Paraphrased from themes in public reviews. Replace with verbatim Google
// reviews (with the reviewer's permission) before launch.
export const reviews = [
  {
    quote: 'Marlene was kind, professional and so easy to talk to. I came in for IV hydration and left feeling like a new person.',
    who: 'IV therapy client',
    placeholder: true,
  },
  {
    quote: 'My Radiesse results are incredible. Subtle, natural, and nobody can tell what I had done. They just say I look well.',
    who: 'Biostimulator client',
    placeholder: true,
  },
  {
    quote: 'A friend recommended Marlene and I am so glad. Honest about what I needed and what I didn’t.',
    who: 'Filler client',
    placeholder: true,
  },
];

export const visitSteps = [
  {
    title: 'Call or text',
    body: 'Tell us what is bothering you. If we are with a client, we will call you back the same day.',
    meta: '2 min',
    placeholder: true,
  },
  {
    title: 'Free consultation',
    body: 'Marlene looks at your face, hears what you want, and tells you honestly what will and won’t help, with prices up front.',
    meta: '20 min · free',
    placeholder: true,
  },
  {
    title: 'Treatment',
    body: 'Often the same visit. Every step is explained before it happens, and numbing is used wherever it helps.',
    meta: '15–60 min',
    placeholder: false,
  },
  {
    title: 'Follow-up',
    body: 'Injectable clients get a two-week check-in. If something needs a touch, we fix it.',
    meta: '2 weeks',
    placeholder: true,
  },
];

export const faqs = [
  {
    q: 'Is the consultation really free?',
    a: 'Yes. A consult is 20 minutes with our nurse practitioner, with no obligation to book a treatment.',
    placeholder: true,
  },
  {
    q: 'Who does the treatments?',
    a: 'Injectables and medical treatments are performed or supervised by Marlene, a nurse practitioner with about 20 years in medicine, including surgical ICU nursing.',
    placeholder: false,
  },
  {
    q: 'Will I look like I “had work done”?',
    a: 'Not if we do our job. We dose conservatively and build up. The goal is that people say you look rested, not that you look different.',
    placeholder: false,
  },
  {
    q: 'How do I book?',
    a: 'Call or text (617) 991-6608 during opening hours, or leave your number in the form below and we will call you back. Booking takes about two minutes.',
    placeholder: false,
  },
  {
    q: 'Do you offer financing?',
    a: 'Yes. We accept CareCredit, which lets you spread the cost of treatment over time. Gift cards are also available.',
    placeholder: false,
  },
  {
    q: 'Do you treat men?',
    a: 'Yes. Botox for forehead and frown lines, jawline filler, IV therapy and weight programs are all popular with our male clients.',
    placeholder: false,
  },
  {
    q: 'What should I do before an injectable appointment?',
    a: 'Avoid alcohol, fish oil, ibuprofen and aspirin for 48 hours to reduce bruising, and come with clean skin if you can.',
    placeholder: false,
  },
];

export const concernLabel = (id: Concern) => concerns.find((c) => c.id === id)?.label ?? id;
