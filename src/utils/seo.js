const seoConfig = {
  home: {
    title: "Finike Lithium | Leading Lithium Battery Manufacturer in Chandigarh",
    description: "Top manufacturer of lithium-ion batteries for EVs, solar & energy storage. Located in Chandigarh with factory in Punjab. Best quality lithium batteries in India.",
    keywords: "lithium battery manufacturer chandigarh, lithium battery company punjab, ev battery manufacturer india",
    canonical: "https://finikelithium.com"
  },
  about: {
    title: "About Finike Lithium | Leading Battery Manufacturer in Punjab",
    description: "Learn about Finike Lithium - Punjab's premier lithium battery manufacturer. State-of-the-art facility in Chandigarh, serving India with top-quality energy solutions.",
    keywords: "lithium battery company punjab, battery manufacturer chandigarh, about finike lithium",
    canonical: "https://finikelithium.com/about"
  },
  lithiumBatteries: {
    title: "EV Lithium Batteries | Two Wheeler & Three Wheeler Batteries | Finike Lithium",
    description: "High-performance lithium batteries for electric vehicles. Specialized in two-wheeler, three-wheeler & e-rickshaw batteries. Best EV battery manufacturer in Chandigarh.",
    keywords: "ev battery manufacturer, lithium battery for ev, electric vehicle battery india",
    canonical: "https://finikelithium.com/lithium-ion-batteries"
  },
  solarBatteries: {
    title: "Solar Lithium Batteries | Energy Storage Solutions | Finike Lithium",
    description: "Advanced lithium batteries for solar energy storage. High-efficiency, long-lasting solar batteries manufactured in Chandigarh. Best solar battery solutions in India.",
    keywords: "solar battery manufacturer, lithium battery for solar, solar energy storage india",
    canonical: "https://finikelithium.com/solar-battery"
  },
  inverterBatteries: {
    title: "Lithium Ion Inverter Batteries | UPS Solutions | Finike Lithium",
    description: "Premium lithium-ion inverter batteries for homes & businesses. Long-lasting, efficient UPS solutions. Leading inverter battery manufacturer in Chandigarh.",
    keywords: "lithium inverter battery, ups battery manufacturer, inverter battery chandigarh",
    canonical: "https://finikelithium.com/lithium-ion-inverter"
  }
};

export const getMetaTags = (page) => {
  const config = seoConfig[page] || seoConfig.home;
  return {
    title: config.title,
    meta: [
      {
        name: 'description',
        content: config.description
      },
      {
        name: 'keywords',
        content: config.keywords
      },
      {
        property: 'og:title',
        content: config.title
      },
      {
        property: 'og:description',
        content: config.description
      },
      {
        property: 'og:url',
        content: config.canonical
      },
      {
        name: 'twitter:title',
        content: config.title
      },
      {
        name: 'twitter:description',
        content: config.description
      }
    ],
    link: [
      {
        rel: 'canonical',
        href: config.canonical
      }
    ]
  };
};

export const generateProductSchema = (product) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'Finike Lithium'
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Finike Lithium',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Chandigarh',
        addressRegion: 'Punjab',
        addressCountry: 'IN'
      }
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: product.price,
      priceCurrency: 'INR'
    }
  };
};

export const generateLocalBusinessSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Finike Lithium',
    image: 'https://finikelithium.com/logo512.png',
    '@id': 'https://finikelithium.com',
    url: 'https://finikelithium.com',
    telephone: '+91-XXX-XXXXXXX',
    priceRange: '₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Industrial Area',
      addressLocality: 'Chandigarh',
      addressRegion: 'Punjab',
      postalCode: '160101',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.7333,
      longitude: 76.7794
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      opens: '09:00',
      closes: '18:00'
    },
    sameAs: [
      'https://www.facebook.com/finikelithium',
      'https://www.linkedin.com/company/finike-lithium',
      'https://twitter.com/finikelithium'
    ]
  };
}; 