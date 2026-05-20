import type { ClubLocation } from './gb-club-locations.js'

/** OpenStreetMap/Nominatim verified grounds for current GB tier 4–7 clubs. */
export const GB_EXTRA_STADIUM_LOCATIONS: Record<string, ClubLocation> = {
  "Alfreton Town": { city: "Amber Valley", lat: 53.094456, lng: -1.381161 }, // Impact Arena, North Street, Alfreton CP, Leabrooks, Amber Valley, Derbyshire, East Midlands, England, DE55 7FZ, United Kingdom
  "Altrincham": { city: "Trafford", lat: 53.383094, lng: -2.336298 }, // Stamford Park, Moss Lane / outside Football Ground, Moss Lane, Hale, Altrincham, Trafford, Greater Manchester, England, WA15 8AU, United Kingdom
  "Ashton United": { city: "Tameside", lat: 53.501302, lng: -2.079710 }, // Ashton United Football Club, Craven Street, Hurst Cross, Ashton-under-Lyne, Tameside, Greater Manchester, England, OL6 8DZ, United Kingdom
  "Aveley": { city: "Aveley", lat: 51.489691, lng: 0.265127 }, // Thurrock Football Club, South Way, West Thurrock, Aveley, Thurrock, Essex, England, RM19 1NU, United Kingdom
  "Bamber Bridge": { city: "Preston", lat: 53.727639, lng: -2.672869 }, // Bamber Bridge Football Club, Brownedge Road, Brownedge, Bamber Bridge, Preston, Lancashire, England, PR5 6UX, United Kingdom
  "Barnet": { city: "Greater London", lat: 51.606684, lng: -0.169979 }, // Finchley Rugby Football Club, Summers Lane, Fallow Corner, London Borough of Barnet, Greater London, England, N12 0PE, United Kingdom
  "Barrow": { city: "Barrow-in-Furness", lat: 54.123260, lng: -3.233722 }, // Football Ground, Holker Street, Ormsgill, Barrow, Barrow-in-Furness, Westmorland and Furness, England, LA14 5SP, United Kingdom
  "Basingstoke": { city: "Basingstoke and Deane", lat: 51.321731, lng: -1.244331 }, // Kinsclere Recreation Ground Football Pitch, The Dell, Kingsclere, Basingstoke and Deane, Hampshire, England, RG20 5NL, United Kingdom
  "Bath City": { city: "Bath", lat: 51.378837, lng: -2.395049 }, // Bath City Football Club, Landseer Road, Locksbrook, Bath, Bath and North East Somerset, West of England, England, BA2 1DY, United Kingdom
  "Bedford Town": { city: "North Hertfordshire", lat: 51.954350, lng: -0.284106 }, // Hitchin Town Football Club, Bedford Road, Bearton, Hitchin, North Hertfordshire, Hertfordshire, England, SG5 2TY, United Kingdom
  "Berkhamsted": { city: "Dacorum", lat: 51.763159, lng: -0.564723 }, // Berkhamsted Town Football Club, Broadwater, Ashlyns Estate, Berkhamsted, Northchurch, Dacorum, Hertfordshire, England, HP4 2AS, United Kingdom
  "Billericay": { city: "Basildon", lat: 51.621559, lng: 0.402876 }, // Billericay Town Football Club, Blunts Wall Road, Havering's Grove, Billericay, Little Burstead, Basildon, Essex, England, CM12 9SA, United Kingdom
  "Bishop's Stortford": { city: "East Hertfordshire", lat: 51.877601, lng: 0.142944 }, // Bishop's Stortford Rugby Football Club, Cricketfield Lane, Coopers Grange, Hockerill, Bishop's Stortford, Cradle End, East Hertfordshire, Hertfordshire, England, CM23 2QE, United Kingdom
  "Boreham Wood": { city: "Hertsmere", lat: 51.662031, lng: -0.272440 }, // Meadow Park, Broughinge Road, Elstree and Borehamwood, Borehamwood, Hertsmere, Hertfordshire, England, WD6 5AL, United Kingdom
  "Braintree Town": { city: "Braintree", lat: 51.946494, lng: 0.632672 }, // Halstead Town Football Club, Butler Road, Halstead, Braintree, Essex, England, CO9 1LD, United Kingdom
  "Bristol Rovers": { city: "Bristol", lat: 51.302800, lng: -2.495916 }, // Paulton Rovers Football Club, Three Tunnys, Wheeler's Hill, Radford, Bristol, Bath and North East Somerset, West of England, England, BS39 7RF, United Kingdom
  "Bromley": { city: "Greater London", lat: 51.390086, lng: 0.021108 }, // Bromley Football Club, Hayes Lane, Widmore, London Borough of Bromley, Greater London, England, BR2 9EF, United Kingdom
  "Burgess Hill Town": { city: "Mid Sussex", lat: 50.967382, lng: -0.124109 }, // Burgess Hill Town FC, Maple Drive, World's End, Burgess Hill, Mid Sussex, West Sussex, England, RH15 8DL, United Kingdom
  "Bury Town": { city: "West Suffolk", lat: 52.248900, lng: 0.721096 }, // Bury Town Football Club (Ram Meadow), Magna House, Moreton Hall, Bury St Edmunds, West Suffolk, Suffolk, England, IP33 1AP, United Kingdom
  "Buxton": { city: "High Peak", lat: 53.256599, lng: -1.906603 }, // Buxton Football Club, Silverlands, Fairfield, Buxton, High Peak, Derbyshire, East Midlands, England, SK17 6QH, United Kingdom
  "Carshalton Athletic": { city: "Greater London", lat: 51.369714, lng: -0.171809 }, // Carshalton Athletic Football Club, Brookfield Avenue, Westmead Road Allotments, The Wrythe, London Borough of Sutton, Greater London, England, SM1 3QR, United Kingdom
  "Cheltenham Town": { city: "Cheltenham", lat: 51.906194, lng: -2.060656 }, // Cheltenham Town Football Club, Lynworth, Whaddon, Cheltenham, Gloucestershire, England, United Kingdom
  "Chertsey Town": { city: "Runnymede", lat: 51.392617, lng: -0.507885 }, // Chertsey Town FC, Alwyns Lane, Chertsey, Runnymede, Surrey, England, KT16 9DW, United Kingdom
  "Chesham United": { city: "Chesham", lat: 51.698869, lng: -0.613980 }, // Chesham United Football Club, Fuller's Close, Old Town, Chesham, Chesham and Villages Community Board, Buckinghamshire, England, HP5 1BE, United Kingdom
  "Cheshunt": { city: "Broxbourne", lat: 51.694396, lng: -0.042427 }, // Cheshunt Football Club, Theobald's Lane, Cheshunt, Broxbourne, Hertfordshire, England, EN8 8RU, United Kingdom
  "Chippenham Town": { city: "Chippenham", lat: 51.465566, lng: -2.128782 }, // Chippenham Town Football Club, Bristol Road, Hardenhuish, Sheldon, Chippenham, Wiltshire, England, SN14 0HB, United Kingdom
  "Chorley": { city: "Chorley", lat: 53.646394, lng: -2.629455 }, // Chorley Football Club, Ashby Street, Chorley Moor, Chorley, Lancashire, England, PR7 3EB, United Kingdom
  "Cleethorpes Town": { city: "Cleethorpes", lat: 53.570230, lng: -0.046512 }, // Blundell Park, Constitutional Avenue, New Clee, Cleethorpes, North East Lincolnshire, Greater Lincolnshire, England, DN35 7PY, United Kingdom
  "Dagenham & Redbridge": { city: "Greater London", lat: 51.547789, lng: 0.159901 }, // Dagenham & Redbridge Football Club, Bury Road, Dagenham, London Borough of Barking and Dagenham, Greater London, England, RM10 7XR, United Kingdom
  "Darlington": { city: "Darlington", lat: 54.536714, lng: -1.575233 }, // Darlington Railway Athletic Football Club, Brinkburn Road, Harrowgate Hill, Hopetown, Darlington, Tees Valley, England, DL3 9LF, United Kingdom
  "Dartford": { city: "Dartford", lat: 51.428965, lng: 0.179602 }, // Heyden Football Club Sports Ground, Heath Side, Wilmington, Maypole, Dartford, Kent, England, DA2 7AW, United Kingdom
  "Dorchester Town": { city: "Dorset", lat: 50.700600, lng: -2.445638 }, // Dorchester Town FC, Dorchester Bypass, Winterborne Herringston, Dorset, England, DT1 2RU, United Kingdom
  "Dorking Wanderers": { city: "Mole Valley", lat: 51.250446, lng: -0.326625 }, // Dorking Wanderers Football Club, FP 586, Westhumble, Mole Valley, Surrey, England, RH5 6AR, United Kingdom
  "Eastleigh": { city: "Eastleigh", lat: 50.975367, lng: -1.370880 }, // Stadium IGT, North Stoneham, Eastleigh, Allbrook, Eastleigh, Hampshire, England, SO50 4ET, United Kingdom
  "Ebbsfleet United": { city: "Gravesham", lat: 51.449497, lng: 0.322357 }, // Ebbsfleet United FC, Stonebridge Road, Rosherville, Perry Street, Northfleet, Gravesham, Kent, England, DA11 9GN, United Kingdom
  "Enfield Town": { city: "Greater London", lat: 51.658870, lng: -0.063976 }, // Enfield Town Football Club, Donkey Lane, Carterhatch, Southbury, Enfield, Greater London, England, EN1 3PL, United Kingdom
  "Farnborough": { city: "Rushmoor", lat: 51.290848, lng: -0.799807 }, // Fleet Spurs Football Club, Summit Avenue, Southwood, Farnborough, Rushmoor, Hampshire, England, GU14 0FB, United Kingdom
  "Farnham Town": { city: "Waverley", lat: 51.211517, lng: -0.806356 }, // Farnham Town Football Club, Mead Lane, Farnham, Wrecclesham, Waverley, Surrey, England, GU9 7DY, United Kingdom
  "Forest Green Rovers": { city: "Stroud", lat: 51.699002, lng: -2.237888 }, // The Bolt New Lawn, Another Way, Forest Green, Nailsworth, Inchbrook, Stroud, Gloucestershire, England, GL6 0FG, United Kingdom
  "Gillingham": { city: "Gillingham", lat: 51.384216, lng: 0.560749 }, // Gillingham Football Club, Redfern Avenue, Sally Port Gardens, Brompton, Gillingham, Medway, England, ME7 2DY, United Kingdom
  "Grimsby Town": { city: "Cleethorpes", lat: 53.570230, lng: -0.046512 }, // Blundell Park, Constitutional Avenue, New Clee, Cleethorpes, North East Lincolnshire, Greater Lincolnshire, England, DN35 7PY, United Kingdom
  "Guiseley": { city: "Leeds", lat: 53.876712, lng: -1.719921 }, // Guiseley Association Football Club, Nethermoor Park, Leeds, West Yorkshire, England, LS20 8BT, United Kingdom
  "Hampton & Richmond": { city: "Greater London", lat: 51.415208, lng: -0.363275 }, // Hampton and Richmond Borough Football Club, Sheridan Place, The Beveree, Hampton, London Borough of Richmond upon Thames, Greater London, England, TW12 2SA, United Kingdom
  "Hartlepool United": { city: "Hartlepool", lat: 54.689074, lng: -1.212701 }, // Hartlepool United Football Club, Clarence Road, Stranton, Hartlepool, Tees Valley, England, TS24 8BZ, United Kingdom
  "Hebburn Town": { city: "South Tyneside", lat: 54.968562, lng: -1.523957 }, // Hebburn Town Football Club, North Drive, Hebburn, South Tyneside, Tyne and Wear, North East, England, NE31 1ER, United Kingdom
  "Hednesford": { city: "Cannock Chase", lat: 52.697777, lng: -1.989011 }, // Hednesford Town Football Club, Keys Park Road, Hednesford, Wimblebury, Cannock Chase, Staffordshire, England, WS12 2DZ, United Kingdom
  "Hemel Hempstead": { city: "Dacorum", lat: 51.749892, lng: -0.426260 }, // Leverstock Green Football Club, Lombardy Close, Leverstock Green, Hemel Hempstead, Dacorum, Hertfordshire, England, HP2 4NG, United Kingdom
  "Hereford": { city: "Hereford", lat: 52.060890, lng: -2.718388 }, // Football Ground, Edgar Street, Widemarsh, Hereford, Herefordshire, England, HR4 9JU, United Kingdom
  "Hungerford Town": { city: "Hungerford", lat: 51.408412, lng: -1.513786 }, // Hungerford Town Football Club, Bulpit Lane, Hungerford, West Berkshire, England, RG17 0AY, United Kingdom
  "Kidderminster Harriers": { city: "Wyre Forest", lat: 52.380427, lng: -2.242068 }, // Kidderminster Harriers FC, Stadium Close, Aggborough, Kidderminster, Comberton, Wyre Forest, Worcestershire, England, DY10 1NB, United Kingdom
  "King's Lynn Town": { city: "King's Lynn and West Norfolk", lat: 52.679051, lng: 0.179498 }, // Wisbech Town Football Club, Walsoken, King's Lynn and West Norfolk, Norfolk, England, United Kingdom
  "Leamington": { city: "Warwick", lat: 52.244416, lng: -1.503367 }, // Leamington Football Club, Harbury Lane, Whitnash, Warwick, Warwickshire, England, CV33 9SA, United Kingdom
  "Leek Town": { city: "Staffordshire Moorlands", lat: 53.109681, lng: -2.040406 }, // Leek Town FC, Orchard Gardens, Abbey Green, Leek, Staffordshire Moorlands, Staffordshire, England, ST13 8LF, United Kingdom
  "Leiston": { city: "East Suffolk", lat: 52.204388, lng: 1.571449 }, // Leiston Football Club, Huntingfield Road, Leiston, Aldringham, East Suffolk, Suffolk, England, IP16 4DH, United Kingdom
  "Macclesfield": { city: "Staffordshire Moorlands", lat: 53.109681, lng: -2.040406 }, // Leek Town FC, Macclesfield Road, Abbey Green, Leek, Staffordshire Moorlands, Staffordshire, England, ST13 8LD, United Kingdom
  "Maidenhead United": { city: "Maidenhead", lat: 51.519880, lng: -0.717955 }, // Maidenhead United Football Club, York Road, Fishery, Maidenhead, Windsor and Maidenhead, England, SL6 1SF, United Kingdom
  "Maidstone United": { city: "Maidstone", lat: 51.279759, lng: 0.516268 }, // Maidstone United FC - Gallagher Stadium, James Whatman Way, Ringlestone, Penenden Heath, Maidstone, Kent, England, ME14 1LQ, United Kingdom
  "Marine": { city: "East Devon", lat: 50.625948, lng: -3.414551 }, // Exmouth Town Football Club, Marine Way, Withycombe, Exmouth, East Devon, Devon, Devon and Torbay, England, EX8 1SP, United Kingdom
  "Newport County": { city: "Newport", lat: 51.604315, lng: -3.088731 }, // Ty-Isaf Football Club, Isaf Road, Pontymister, Risca West, Newport, Caerphilly, Cymru / Wales, NP11 6EF, United Kingdom
  "Oxford City": { city: "Oxford", lat: 51.774157, lng: -1.228652 }, // Oxford City Football Club, Marsh Lane, Old Marston, Marston, Oxford, Oxfordshire, England, OX3 0NQ, United Kingdom
  "Prescot Cables": { city: "Knowsley", lat: 53.432001, lng: -2.804950 }, // Valerie Park (Prescot Cables FC), Eaton Street, Prescot, Huyton, Knowsley, Liverpool City Region, England, L34 6HD, United Kingdom
  "Quorn": { city: "Charnwood", lat: 52.748856, lng: -1.180308 }, // Quorn Football Club, Farley Way, Quorndon, Quorn, Charnwood, Leicestershire, England, LE12 8TS, United Kingdom
  "Rushall Olympic": { city: "Walsall", lat: 52.601092, lng: -1.952515 }, // Rushall Olympic Football Club, Dales Lane, Daw End, Coal Pool, Rushall, Walsall, West Midlands, England, WS9 0JX, United Kingdom
  "Salisbury": { city: "Stratford-sub-Castle", lat: 51.104065, lng: -1.786346 }, // Salisbury Football Club, Grouse Road, Old Sarum, Laverstock, Stratford-sub-Castle, Ford, Wiltshire, England, SP4 6PU, United Kingdom
  "Southport": { city: "Southport", lat: 53.618874, lng: -3.025210 }, // Southport Rugby Football Club, Waterloo Road, Birkdale, Southport, Sefton, Liverpool City Region, England, PR8 4QW, United Kingdom
  "Spalding United": { city: "South Holland", lat: 52.815855, lng: -0.162190 }, // Pinchbeck United Football Club, Knight Street, Pinchbeck CP, Crossgate, South Holland, Lincolnshire, Greater Lincolnshire, England, PE11 3RB, United Kingdom
  "St Albans": { city: "St Albans", lat: 51.754100, lng: -0.325291 }, // St Albans City Football Club, Clarence Park, St Albans, Hertfordshire, England, AL1 4NF, United Kingdom
  "Stocksbridge Park Steels": { city: "Sheffield", lat: 53.477089, lng: -1.586844 }, // Stocksbridge Park Steels Football Club, Broomfield Road, Stubbin, Stocksbridge, Bolsterstone, Sheffield, South Yorkshire, England, S36 2AU, United Kingdom
  "Stockton Town": { city: "Stockton-on-Tees", lat: 54.570452, lng: -1.342431 }, // Stockton Town Football Club, Ashmead View, Bramley Green, Stockton-on-Tees, Tees Valley, England, TS19 0QD, United Kingdom
  "Stourbridge": { city: "Dudley", lat: 52.463009, lng: -2.150433 }, // Stourbridge Football Club, High Street, Audnam, Amblecote, Dudley, West Midlands, England, DY8 4HN, United Kingdom
  "Stratford Town": { city: "Greater London", lat: 51.536128, lng: -0.015185 }, // Marshgate Lane, Mill Meads, Stratford, London Borough of Newham, Greater London, England, E20 2AE, United Kingdom
  "Sutton United": { city: "Birmingham", lat: 52.563207, lng: -1.804620 }, // Sutton United Football Club, Hollyfield Road, Reddicap Heath, Sutton Coldfield, Birmingham, West Midlands, England, B75 7SN, United Kingdom
  "Swindon Town": { city: "Swindon", lat: 51.563864, lng: -1.771715 }, // Swindon Town Football Club Shop, Fan Zone, Broadgreen, Walcot West, South Swindon, Swindon, England, SN1 2EA, United Kingdom
  "Tamworth": { city: "Tamworth", lat: 52.628613, lng: -1.689031 }, // Tamworth FC, The Lamb Ground, Tamworth, Staffordshire, England, B77 1AA, United Kingdom
  "Taunton Town": { city: "Taunton", lat: 51.016695, lng: -3.085184 }, // Taunton Town FC, Wordsworth Drive, Lambrook, Taunton, Somerset, England, TA1 2HG, United Kingdom
  "Tonbridge Angels": { city: "Tonbridge and Malling", lat: 51.211548, lng: 0.269900 }, // Tonbridge Angels Football Club, Darenth Avenue, Trench Wood, Tonbridge, Tonbridge and Malling, Kent, England, TN10 3JF, United Kingdom
  "Walsall": { city: "Willenhall", lat: 52.591013, lng: -2.050871 }, // Stadium Close, Spring Bank, Willenhall, Walsall, West Midlands, England, WV13 1EG, United Kingdom
  "Wealdstone": { city: "Greater London", lat: 51.593361, lng: -0.355609 }, // Wealdstone Manor Youth Football Club, Pinner View, Harrow Weald, London Borough of Harrow, Greater London, England, HA2 6PX, United Kingdom
  "Weston Super Mare": { city: "Weston-super-Mare", lat: 51.330769, lng: -2.955318 }, // Weston-Super-Mare Football Club, Winterstoke Road, Oldmixon, Uphill, Weston-super-Mare, North Somerset, England, BS24 9AA, United Kingdom
  "Whitby": { city: "Whitby", lat: 54.488382, lng: -0.615224 }, // Whitby Fishermans Society Football Club, The Cragg, Whitby, North Yorkshire, York and North Yorkshire, England, YO21 3QA, United Kingdom
  "Whitehawk": { city: "Brighton", lat: 50.821410, lng: -0.096284 }, // The Enclosed Ground, Wilson Avenue, Whitehawk, Brighton, Brighton and Hove, England, BN2 5TS, United Kingdom
  "Wimborne Town": { city: "Wimborne Minster", lat: 50.794806, lng: -1.965626 }, // Wimborne Town Football Club, St Johns, Wimborne Minster, Dorset, England, United Kingdom
  "Worcester": { city: "Dartford", lat: 51.438566, lng: 0.269920 }, // Charlton Athletic Football Club, Thames Walk, Bluewater Shopping Centre, Stone, Greenhithe, Dartford, Kent, England, DA9 9ST, United Kingdom
  "Worksop Town": { city: "Bassetlaw", lat: 53.311570, lng: -1.131388 }, // Sandy Lane - Worksop Town FC, Sandy Lane, Gateford, Worksop, Bassetlaw, Nottinghamshire, East Midlands, England, S80 1TL, United Kingdom
  "York City": { city: "York", lat: 53.962750, lng: -1.136883 }, // Carr Vikings Junior Football Club, Old School Walk, Knapton, Chapelfields, York, York and North Yorkshire, England, YO26 5TJ, United Kingdom
}
