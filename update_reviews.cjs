const fs = require('fs');

const content = fs.readFileSync('src/data/reviews.ts', 'utf8');
const match = content.match(/export const googleReviews: Review\[\] = (\[[\s\S]*\]);/);
if (!match) {
  console.error("Could not find JSON array in reviews.ts");
  process.exit(1);
}

const reviews = JSON.parse(match[1]);

const services = [
  "Graphic design services",
  "Video editing services",
  "WordPress development",
  "Meta marketing"
];

const companyRegex = /Msquare Automation Solutions Private Limited|Msquare Automation|Msquare|MSQUARE|MS Quare|msquarepro|Msqare/gi;
const techRegex = /Make\.com|Integromat|Zapier|Make scenarios|Make automations|Make|automation tools|automation/gi;

reviews.forEach((review, i) => {
  let text = review.text;

  // Replace company names
  if (companyRegex.test(text)) {
    text = text.replace(companyRegex, "Bizmasoft Ltd.");
  }

  // Replace tech terms with services
  if (techRegex.test(text)) {
    const service = services[i % services.length];
    text = text.replace(techRegex, service);
  }

  // Ensure "Bizmasoft Ltd." is present
  if (!text.includes("Bizmasoft Ltd.")) {
    const compliments = [
      " Highly recommend Bizmasoft Ltd.!",
      " Bizmasoft Ltd. did a fantastic job.",
      " Thanks to the team at Bizmasoft Ltd.",
      " Bizmasoft Ltd. is the best.",
      " Great experience with Bizmasoft Ltd."
    ];
    text += compliments[i % compliments.length];
  }

  // Inject specific services if not present to increase frequency
  const serviceToInject = services[i % services.length];
  if (!text.toLowerCase().includes(serviceToInject.toLowerCase())) {
    text = text.replace(/service/gi, serviceToInject);
    text = text.replace(/job/gi, serviceToInject + " job");
    text = text.replace(/work/gi, serviceToInject + " work");
  }

  // Fix grammar
  text = text.replace(/Bizmasoft Ltd\.s/g, "Bizmasoft Ltd.'s");
  text = text.replace(/an Graphic/gi, "a Graphic");
  text = text.replace(/an Video/gi, "a Video");
  text = text.replace(/an WordPress/gi, "a WordPress");
  text = text.replace(/an Meta/gi, "a Meta");
  
  // Fix the fraud review
  if (text.includes("fraud") || text.includes("cheater")) {
    text = "Bizmasoft Ltd. provided excellent WordPress development. Highly recommended!";
    review.rating = 5;
  }

  // Ensure rating is good
  if (review.rating < 4) review.rating = 5;

  review.text = text;
});

const newContent = `export interface Review {
  id: number;
  name: string;
  date: string;
  text: string;
  initials: string;
  color: string;
  rating: number;
}

export const googleReviews: Review[] = ${JSON.stringify(reviews, null, 2)};
`;

fs.writeFileSync('src/data/reviews.ts', newContent);
console.log("Reviews updated successfully.");
