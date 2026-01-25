// Static data for warehouse marketplace

export const categories = [
  'General Storage',
  'Cold Storage',
  'Hazmat Storage',
  'Pharmaceutical',
  'Electronics',
  'Food & Beverage',
  'Textile & Garments',
  'Automotive Parts'
]

export const facilities = [
  '24/7 Security',
  'CCTV Surveillance',
  'Fire Safety',
  'Climate Control',
  'Loading Dock',
  'Forklift Available',
  'Parking Space',
  'Office Space',
  'WiFi',
  'Power Backup',
  'Pest Control',
  'Material Handling Equipment'
]

export const warehouses = [
  {
    id: 'WH001',
    name: 'Prime Storage Delhi',
    ownerId: 'OWN001',
    ownerName: 'Rajesh Kumar',
    ownerPhone: '+91 98765 43210',
    ownerEmail: 'rajesh@warehousehub.com',
    category: 'General Storage',
    location: {
      city: 'Delhi',
      area: 'Mundka Industrial Area',
      address: 'Plot No. 45, Sector 12, Mundka',
      pincode: '110041'
    },
    size: {
      area: 15000,
      unit: 'sq ft'
    },
    pricing: {
      amount: 45000,
      period: 'month',
      currency: 'INR'
    },
    facilities: [
      '24/7 Security',
      'CCTV Surveillance',
      'Fire Safety',
      'Loading Dock',
      'Forklift Available',
      'Power Backup'
    ],
    images: [
      'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800'
    ],
    availability: 'Available',
    description: 'Spacious warehouse in prime industrial area with excellent connectivity to NH-48. Suitable for general storage with modern facilities.',
    verified: true,
    rating: 4.5,
    reviews: 12
  },
  {
    id: 'WH002',
    name: 'Cool Store Mumbai',
    ownerId: 'OWN002',
    ownerName: 'Priya Sharma',
    ownerPhone: '+91 98765 43211',
    ownerEmail: 'priya@warehousehub.com',
    category: 'Cold Storage',
    location: {
      city: 'Mumbai',
      area: 'Bhiwandi',
      address: 'Gala No. 12, MIDC Industrial Area',
      pincode: '421302'
    },
    size: {
      area: 8000,
      unit: 'sq ft'
    },
    pricing: {
      amount: 80000,
      period: 'month',
      currency: 'INR'
    },
    facilities: [
      'Climate Control',
      '24/7 Security',
      'CCTV Surveillance',
      'Fire Safety',
      'Power Backup',
      'Loading Dock'
    ],
    images: [
      'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=800',
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800'
    ],
    availability: 'Available',
    description: 'Temperature-controlled cold storage facility perfect for perishable goods. Maintained at -5°C to 5°C range.',
    verified: true,
    rating: 4.8,
    reviews: 18
  },
  {
    id: 'WH003',
    name: 'Tech Storage Bangalore',
    ownerId: 'OWN003',
    ownerName: 'Amit Patel',
    ownerPhone: '+91 98765 43212',
    ownerEmail: 'amit@warehousehub.com',
    category: 'Electronics',
    location: {
      city: 'Bangalore',
      area: 'Whitefield',
      address: 'Survey No. 78, Whitefield Main Road',
      pincode: '560066'
    },
    size: {
      area: 12000,
      unit: 'sq ft'
    },
    pricing: {
      amount: 60000,
      period: 'month',
      currency: 'INR'
    },
    facilities: [
      'Climate Control',
      '24/7 Security',
      'CCTV Surveillance',
      'Fire Safety',
      'WiFi',
      'Office Space',
      'Power Backup',
      'Pest Control'
    ],
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
      'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800'
    ],
    availability: 'Available',
    description: 'Modern warehouse with climate control for electronics storage. ESD safe environment with humidity control.',
    verified: true,
    rating: 4.6,
    reviews: 15
  },
  {
    id: 'WH004',
    name: 'Pharma Safe Hyderabad',
    ownerId: 'OWN004',
    ownerName: 'Sunita Reddy',
    ownerPhone: '+91 98765 43213',
    ownerEmail: 'sunita@warehousehub.com',
    category: 'Pharmaceutical',
    location: {
      city: 'Hyderabad',
      area: 'Jeedimetla',
      address: 'Plot 234, IDA Jeedimetla',
      pincode: '500055'
    },
    size: {
      area: 10000,
      unit: 'sq ft'
    },
    pricing: {
      amount: 75000,
      period: 'month',
      currency: 'INR'
    },
    facilities: [
      'Climate Control',
      '24/7 Security',
      'CCTV Surveillance',
      'Fire Safety',
      'Power Backup',
      'Pest Control',
      'Loading Dock'
    ],
    images: [
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800',
      'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=800'
    ],
    availability: 'Available',
    description: 'WHO-GMP compliant pharmaceutical storage facility with temperature and humidity monitoring.',
    verified: true,
    rating: 4.9,
    reviews: 22
  },
  {
    id: 'WH005',
    name: 'Auto Parts Hub Pune',
    ownerId: 'OWN005',
    ownerName: 'Vikram Singh',
    ownerPhone: '+91 98765 43214',
    ownerEmail: 'vikram@warehousehub.com',
    category: 'Automotive Parts',
    location: {
      city: 'Pune',
      area: 'Chakan',
      address: 'Gat No. 567, Chakan Industrial Area',
      pincode: '410501'
    },
    size: {
      area: 20000,
      unit: 'sq ft'
    },
    pricing: {
      amount: 55000,
      period: 'month',
      currency: 'INR'
    },
    facilities: [
      '24/7 Security',
      'CCTV Surveillance',
      'Loading Dock',
      'Forklift Available',
      'Material Handling Equipment',
      'Parking Space',
      'Power Backup'
    ],
    images: [
      'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800',
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800'
    ],
    availability: 'Available',
    description: 'Large warehouse ideal for automotive parts storage near major manufacturing hub. Heavy load capacity.',
    verified: true,
    rating: 4.4,
    reviews: 10
  },
  {
    id: 'WH006',
    name: 'Textile Storage Surat',
    ownerId: 'OWN006',
    ownerName: 'Ramesh Shah',
    ownerPhone: '+91 98765 43215',
    ownerEmail: 'ramesh@warehousehub.com',
    category: 'Textile & Garments',
    location: {
      city: 'Surat',
      area: 'Sachin',
      address: 'Plot 89, GIDC Sachin',
      pincode: '394230'
    },
    size: {
      area: 18000,
      unit: 'sq ft'
    },
    pricing: {
      amount: 40000,
      period: 'month',
      currency: 'INR'
    },
    facilities: [
      '24/7 Security',
      'CCTV Surveillance',
      'Fire Safety',
      'Climate Control',
      'Pest Control',
      'Loading Dock',
      'Power Backup'
    ],
    images: [
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800',
      'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800'
    ],
    availability: 'Available',
    description: 'Dry and climate-controlled storage perfect for textile and garments. Pest control maintained regularly.',
    verified: true,
    rating: 4.3,
    reviews: 8
  }
]

export const merchantRequirements = [
  {
    id: 'REQ001',
    merchantId: 'MER001',
    merchantName: 'ABC Electronics Pvt Ltd',
    category: 'Electronics',
    location: {
      city: 'Bangalore',
      preferredAreas: ['Whitefield', 'Electronic City', 'Bommanahalli']
    },
    requirements: {
      minArea: 10000,
      maxArea: 15000,
      unit: 'sq ft',
      budget: {
        min: 50000,
        max: 70000,
        currency: 'INR',
        period: 'month'
      },
      duration: '12 months',
      requiredFacilities: [
        'Climate Control',
        '24/7 Security',
        'CCTV Surveillance',
        'Power Backup'
      ]
    },
    status: 'Open',
    postedDate: '2026-01-20',
    interestedOwners: ['OWN003', 'OWN001']
  },
  {
    id: 'REQ002',
    merchantId: 'MER002',
    merchantName: 'Fresh Foods Distribution',
    category: 'Food & Beverage',
    location: {
      city: 'Mumbai',
      preferredAreas: ['Bhiwandi', 'Turbhe', 'Kalwa']
    },
    requirements: {
      minArea: 5000,
      maxArea: 8000,
      unit: 'sq ft',
      budget: {
        min: 70000,
        max: 90000,
        currency: 'INR',
        period: 'month'
      },
      duration: '24 months',
      requiredFacilities: [
        'Climate Control',
        'Cold Storage',
        '24/7 Security',
        'Loading Dock'
      ]
    },
    status: 'Open',
    postedDate: '2026-01-22',
    interestedOwners: ['OWN002']
  }
]

// Sample users
export const users = {
  merchants: [
    {
      id: 'MER001',
      name: 'ABC Electronics Pvt Ltd',
      email: 'merchant@abc.com',
      password: 'merchant123',
      phone: '+91 98765 00001',
      company: 'ABC Electronics',
      businessType: 'Electronics Trading',
      gst: '29ABCDE1234F1Z5'
    },
    {
      id: 'MER002',
      name: 'Fresh Foods Distribution',
      email: 'merchant@freshfoods.com',
      password: 'merchant123',
      phone: '+91 98765 00002',
      company: 'Fresh Foods',
      businessType: 'Food Distribution',
      gst: '27XYZAB5678G2H6'
    }
  ],
  owners: [
    {
      id: 'OWN001',
      name: 'Rajesh Kumar',
      email: 'owner@rajesh.com',
      password: 'owner123',
      phone: '+91 98765 43210',
      warehouseIds: ['WH001'],
      verified: true
    },
    {
      id: 'OWN002',
      name: 'Priya Sharma',
      email: 'owner@priya.com',
      password: 'owner123',
      phone: '+91 98765 43211',
      warehouseIds: ['WH002'],
      verified: true
    },
    {
      id: 'OWN003',
      name: 'Amit Patel',
      email: 'owner@amit.com',
      password: 'owner123',
      phone: '+91 98765 43212',
      warehouseIds: ['WH003'],
      verified: true
    }
  ]
}

// Sample chat conversations
export const conversations = [
  {
    id: 'CHAT001',
    warehouseId: 'WH001',
    merchantId: 'MER001',
    ownerId: 'OWN001',
    status: 'active',
    messages: [
      {
        id: 'MSG001',
        senderId: 'MER001',
        senderType: 'merchant',
        message: 'Hi, I am interested in your warehouse. Can we discuss the pricing?',
        timestamp: '2026-01-25T10:30:00Z',
        read: true
      },
      {
        id: 'MSG002',
        senderId: 'OWN001',
        senderType: 'owner',
        message: 'Hello! Sure, the listed price is ₹45,000/month. What duration are you looking for?',
        timestamp: '2026-01-25T10:45:00Z',
        read: true
      },
      {
        id: 'MSG003',
        senderId: 'MER001',
        senderType: 'merchant',
        message: 'We need it for 12 months. Can you offer any discount for long-term?',
        timestamp: '2026-01-25T11:00:00Z',
        read: true
      },
      {
        id: 'MSG004',
        senderId: 'OWN001',
        senderType: 'owner',
        message: 'For 12 months, I can offer ₹42,000/month. Would that work?',
        timestamp: '2026-01-25T11:15:00Z',
        read: false
      }
    ],
    lastMessage: '2026-01-25T11:15:00Z'
  },
  {
    id: 'CHAT002',
    warehouseId: 'WH002',
    merchantId: 'MER002',
    ownerId: 'OWN002',
    status: 'active',
    messages: [
      {
        id: 'MSG005',
        senderId: 'MER002',
        senderType: 'merchant',
        message: 'Hi, what temperature range can you maintain in the cold storage?',
        timestamp: '2026-01-24T14:20:00Z',
        read: true
      },
      {
        id: 'MSG006',
        senderId: 'OWN002',
        senderType: 'owner',
        message: 'We maintain -5°C to 5°C range. What products do you need to store?',
        timestamp: '2026-01-24T14:35:00Z',
        read: true
      },
      {
        id: 'MSG007',
        senderId: 'MER002',
        senderType: 'merchant',
        message: 'Frozen food items. Can you show me the facility?',
        timestamp: '2026-01-24T15:00:00Z',
        read: true
      },
      {
        id: 'MSG008',
        senderId: 'OWN002',
        senderType: 'owner',
        message: 'Perfect! Yes, we can arrange a site visit. When would be convenient for you?',
        timestamp: '2026-01-24T15:20:00Z',
        read: false
      }
    ],
    lastMessage: '2026-01-24T15:20:00Z'
  }
]
