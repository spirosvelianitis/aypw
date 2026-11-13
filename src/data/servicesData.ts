import heroImg from '../assets/images/hero_pressure_washing_1794537091446.jpg';
import concreteImg from '../assets/images/service_concrete_driveway_1794537091337.jpg';
import softwashImg from '../assets/images/service_softwash_siding_1794537091689.jpg';
import commercialImg from '../assets/images/service_commercial_plaza_1794537091783.jpg';

export type SeasonId = 'spring' | 'summer' | 'autumn' | 'winter';
export type PropertyType = 'residential' | 'commercial';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  method: string;
  pressureSpec: string;
  summary: string;
  surfaces: string[];
  ratePerSqFt: number;
  baseFee: number;
  image?: string;
  imageAlt?: string;
  featured?: boolean;
}

export interface SeasonPlan {
  id: SeasonId;
  label: string;
  months: string;
  headline: string;
  description: string;
  contaminants: string;
  waterSpec: string;
  recommendedServices: string[];
  turnaround: string;
}

export interface ProjectOutcome {
  id: string;
  title: string;
  location: string;
  metric: string;
  duration: string;
  challenge: string;
  outcome: string;
  clientName: string;
  clientRole: string;
  quote: string;
}

export const HERO_MEDIA = {
  src: heroImg,
  alt: 'All Year Pressure Washing technician operating a commercial rotary surface cleaner on a residential concrete driveway',
};

export const OPERATIONAL_STANDARDS = [
  {
    value: '4,000 PSI',
    label: 'Rotary Concrete Calibration',
    detail: 'Zero-etching flatwork heads',
  },
  {
    value: '190°F',
    label: 'Hot-Water Skid Units',
    detail: 'Degreasing & winter salt flush',
  },
  {
    value: '$2M',
    label: 'General Liability Coverage',
    detail: 'Residential & commercial certificates',
  },
  {
    value: '48 Hours',
    label: 'Guaranteed Dispatch Window',
    detail: 'Written quotes within 4 business hours',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'concrete',
    number: '01',
    title: 'Concrete, Driveways & Walkways',
    method: 'Rotary Surface Wash',
    pressureSpec: '3,200–4,000 PSI',
    summary:
      'Uniform stainless-steel rotary cleaning strips black algae, tire marks, and winter de-icing residue without leaving zebra stripes or etching mortar joints.',
    surfaces: ['Poured Concrete', 'Exposed Aggregate', 'Brick Pavers', 'Curb Aprons'],
    ratePerSqFt: 0.24,
    baseFee: 145,
    image: concreteImg,
    imageAlt: 'Commercial rotary surface cleaner restoring moss-stained concrete driveway to bright aggregate',
    featured: true,
  },
  {
    id: 'softwash',
    number: '02',
    title: 'House Siding & Roof Soft Wash',
    method: 'Low-Pressure Biodegradable Treatment',
    pressureSpec: '60–120 PSI',
    summary:
      'Garden-hose pressure paired with plant-safe surfactants neutralizes Gloeocapsa magma roof streaks, mildew, and oxidation on delicate vinyl, stucco, and cedar.',
    surfaces: ['Fiber Cement', 'Painted Wood', 'Asphalt Shingles', 'Stucco Facades'],
    ratePerSqFt: 0.28,
    baseFee: 185,
    image: softwashImg,
    imageAlt: 'Freshly soft-washed white two-story home siding and spotless shingle roof',
    featured: false,
  },
  {
    id: 'commercial',
    number: '03',
    title: 'Commercial Storefronts & Loading Bays',
    method: 'Hot-Water Steam Recovery',
    pressureSpec: '190°F · 8 GPM',
    summary:
      'Scheduled overnight and early-morning washdowns keep retail walkways, restaurant patios, and warehouse aprons slip-free and compliant with municipal runoff codes.',
    surfaces: ['Retail Plazas', 'Drive-Thru Lanes', 'Dumpster Pads', 'Parking Garages'],
    ratePerSqFt: 0.22,
    baseFee: 260,
    image: commercialImg,
    imageAlt: 'Spotless commercial storefront walkway and textured concrete plaza at morning light',
    featured: false,
  },
  {
    id: 'wood-sealing',
    number: '04',
    title: 'Deck, Fence & Paver Restoration',
    method: 'Calibrated Rinse & Brightener',
    pressureSpec: '600–1,200 PSI',
    summary:
      'Gentle fan-tip washing followed by pH-neutral wood brightening lifts gray UV fibers from cedar and composite decking before optional breathable penetrating sealants.',
    surfaces: ['Cedar & Redwood', 'Composite Decking', 'Pool Coping', 'Stone Retaining Walls'],
    ratePerSqFt: 0.34,
    baseFee: 165,
    featured: false,
  },
];

export const SEASON_PLANS: SeasonPlan[] = [
  {
    id: 'spring',
    label: 'Spring',
    months: 'March – May',
    headline: 'Pollen Flush & Post-Winter Algae Removal',
    description:
      'Spring rain and tree pollen feed green algae across north-facing siding and shaded driveways. We pair soft-wash algaecides with full gutter face brightening to reset curb appeal.',
    contaminants: 'Tree pollen · Green algae · Winter grit',
    waterSpec: 'Warm rinse + biodegradable surfactant',
    recommendedServices: ['concrete', 'softwash'],
    turnaround: '2–3 Hours avg. residential visit',
  },
  {
    id: 'summer',
    label: 'Summer',
    months: 'June – August',
    headline: 'Patio, Pool Deck & Siding Protection',
    description:
      'High-traffic outdoor living spaces collect barbecue grease, sunscreen film, and mildew. Our calibrated surface wash prepares stone patios and cedar decks for peak entertaining.',
    contaminants: 'Mildew spores · Organic food spills · Rust rings',
    waterSpec: 'Cold-water rotary wash + wood brightener',
    recommendedServices: ['wood-sealing', 'concrete'],
    turnaround: 'Same-week morning slots',
  },
  {
    id: 'autumn',
    label: 'Autumn',
    months: 'September – November',
    headline: 'Tannin Leaf-Stain Lift & Pre-Freeze Prep',
    description:
      'Wet autumn leaves leach dark tannin stains deep into porous concrete and stone pavers. Removing organic buildup before first frost prevents freeze-thaw spalling.',
    contaminants: 'Oak leaf tannins · Black lichen · Gutter tiger-striping',
    waterSpec: 'Hot-water extraction + organic stain lift',
    recommendedServices: ['concrete', 'softwash', 'wood-sealing'],
    turnaround: 'Pre-winter maintenance priority',
  },
  {
    id: 'winter',
    label: 'Winter',
    months: 'December – February',
    headline: 'Hot-Water De-Icing Salt & Commercial Fleet Care',
    description:
      'Road brine and calcium chloride eat into concrete aprons and commercial loading bays all winter. Our 190°F trailer-mounted skids flush corrosive salt during mild weather windows.',
    contaminants: 'Magnesium chloride salt · Oil drips · Soot buildup',
    waterSpec: '190°F heated high-flow wash',
    recommendedServices: ['commercial', 'concrete'],
    turnaround: 'Overnight & above-34°F dispatch',
  },
];

export const PROJECT_OUTCOMES: ProjectOutcome[] = [
  {
    id: 'oakridge-driveway',
    title: 'Exposed Aggregate Driveway & Walkway Restoration',
    location: 'Oakridge Residential District',
    metric: '1,850 sq ft restored',
    duration: '3.5 hours on-site',
    challenge: 'Six years of oak leaf tannins and moss had turned a sloped aggregate driveway slick and dark charcoal.',
    outcome: 'Pre-treated with sodium percarbonate and cleaned at 3,400 PSI via 20-inch rotary deck, lifting 100% of slip hazards without dislodging stone.',
    clientName: 'Hannah Gallagher',
    clientRole: 'Homeowner · Oakridge',
    quote:
      'They arrived at 8 AM sharp, protected all our boxwood hedges, and left the driveway looking freshly poured in under four hours.',
  },
  {
    id: 'meridian-plaza',
    title: 'Retail Courtyard & Cafe Patio Steam Wash',
    location: 'Meridian Commons Shopping Center',
    metric: '11,400 sq ft flatwork',
    duration: 'Overnight shift · 11 PM–4 AM',
    challenge: 'Coffee spills, gum deposits, and grease around four ground-floor restaurant patios ahead of a seasonal property inspection.',
    outcome: '190°F hot-water extraction removed 85+ embedded gum spots and darkened traffic lanes with zero disruption to morning foot traffic.',
    clientName: 'David Kowalski',
    clientRole: 'Facilities Director · Meridian Property Group',
    quote:
      'Having one crew handle quarterly hot-water cleanings year-round eliminated slip complaints and kept every tenant storefront spotless.',
  },
  {
    id: 'cedar-ridge-softwash',
    title: 'Full Two-Story Fiber-Cement & Roof Soft Wash',
    location: 'Cedar Ridge Estates',
    metric: '3,600 sq ft exterior',
    duration: '4 hours · Zero ladder damage',
    challenge: 'North-facing HardiePlank siding and architectural shingles showed heavy green algae and black streaking.',
    outcome: 'Ground-applied 90 PSI soft-wash blend eradicated root spores on siding, soffits, and trim while preserving exterior acrylic paint.',
    clientName: 'Priya Nair',
    clientRole: 'HOA Board Treasurer · Cedar Ridge',
    quote:
      'Other contractors wanted to blast our painted siding with high pressure. All Year explained the soft-wash chemistry and delivered spotless results.',
  },
];
