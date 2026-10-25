const fs = require('fs');
const path = require('path');

// Read seedData.ts as text and parse or require via ts-node, or simpler: since we have initialDatabase structure, let's write an updater for categories and posts in db.json
const dbPath = path.join(__dirname, '..', 'data', 'db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Update categories images
const catImages = {
  'cat-1': '/images/card-1-diya.jpg',
  'cat-2': '/images/card-2-lotus.jpg',
  'cat-3': '/images/card-3-sunset-person.jpg',
  'cat-4': '/images/card-4-hands-flowers.jpg',
  'cat-5': '/images/card-12-scriptures.jpg',
  'cat-6': '/images/card-10-temple-dusk.jpg',
};

db.categories.forEach(cat => {
  if (catImages[cat.id]) {
    cat.image = catImages[cat.id];
  }
});

// Update posts images and metadata to match reference image
const postUpdates = {
  'post-1': {
    title: 'પિતાશ્રીની પુણ્યતિથિ પર શ્રદ્ધાંજલિ સંદેશ',
    slug: 'pitashrini-punyatithi-par-shradhanjali-sandesh',
    excerpt: 'પિતાશ્રી યાદ હંમેશા આપણા હૃદયમાં જીવંત રહેલે... તેમની પ્રેરણા અને મૂલ્યોને યાદ કરતા શ્રેષ્ઠ સંદેશાઓ.',
    featuredImage: '/images/card-1-diya.jpg',
    categoryId: 'cat-1',
    categoryName: 'શ્રદ્ધાંજલિ સંદેશ',
    categorySlug: 'shradhanjali',
    publishedAt: '2025-04-12T10:00:00.000Z',
    readingTime: '5 મિનિટ વાંચો',
  },
  'post-2': {
    title: 'માતાની પુણ્યતિથિ પર શ્રદ્ધાંજલિ સંદેશ',
    slug: 'matani-punyatithi-par-shradhanjali-sandesh',
    excerpt: 'માતાની મમતા અને આશીર્વાદ જીવનભર સાથે છે... તેમની યાદમાં લખેલા ભાવપૂર્ણ શ્રદ્ધાંજલિ સંદેશો.',
    featuredImage: '/images/card-2-lotus.jpg',
    categoryId: 'cat-2',
    categoryName: 'પુણ્યતિથિ',
    categorySlug: 'punyatithi',
    publishedAt: '2025-04-10T09:00:00.000Z',
    readingTime: '6 મિનિટ વાંચો',
  },
  'post-3': {
    title: 'શ્રદ્ધાંજલિ શાયરી – હૃદયસ્પર્શી પંક્તિઓ',
    featuredImage: '/images/card-3-sunset-person.jpg',
    readingTime: '6 મિનિટ વાંચો',
    publishedAt: '2025-04-08T11:30:00.000Z',
  },
  'post-4': {
    title: 'અંતિમ સંસ્કારની વિધિ અને મહત્વ',
    featuredImage: '/images/card-4-hands-flowers.jpg',
    readingTime: '7 મિનિટ વાંચો',
    publishedAt: '2025-04-05T08:00:00.000Z',
  },
  'post-5': {
    title: 'જીવનમાં સંસ્કારનું મહત્વ',
    featuredImage: '/images/card-5-mountain.jpg',
    readingTime: '6 મિનિટ વાંચો',
    publishedAt: '2025-04-03T14:00:00.000Z',
  },
  'post-6': {
    title: 'દાદા-દાદીની પુણ્યતિથિ પર સંદેશ',
    featuredImage: '/images/card-6-diya-flowers.jpg',
    readingTime: '6 મિનિટ વાંચો',
    publishedAt: '2025-03-31T09:00:00.000Z',
  },
  'post-7': {
    title: 'ગુરુજીની પુણ્યતિથિ પર શ્રદ્ધાંજલિ',
    featuredImage: '/images/card-7-water-lotus.jpg',
    readingTime: '6 મિનિટ વાંચો',
    publishedAt: '2025-03-28T12:00:00.000Z',
  },
  'post-8': {
    title: 'વિદાય શાયરી – હૃદયને સ્પર્શતી પંક્તિઓ',
    featuredImage: '/images/card-8-sunset-birds.jpg',
    readingTime: '4 મિનિટ વાંચો',
    publishedAt: '2025-03-25T16:00:00.000Z',
  },
  'post-9': {
    title: 'શોક સંદેશ કેવી રીતે લખવો?',
    featuredImage: '/images/card-9-white-lotus.jpg',
    readingTime: '5 મિનિટ વાંચો',
    publishedAt: '2025-03-22T10:00:00.000Z',
  },
  'post-10': {
    title: 'પુણ્યતિથિનો મહિમા અને પરંપરા',
    featuredImage: '/images/card-10-temple-dusk.jpg',
    readingTime: '7 મિનિટ વાંચો',
    publishedAt: '2025-03-18T11:00:00.000Z',
  },
  'post-11': {
    title: 'મિત્રના નિધન પર શ્રદ્ધાંજલિ સંદેશ',
    featuredImage: '/images/card-11-brass-diya.jpg',
    readingTime: '4 મિનિટ વાંચો',
    publishedAt: '2025-03-14T09:30:00.000Z',
  },
  'post-12': {
    title: 'શોક અને જીવનનો સત્ય',
    featuredImage: '/images/card-12-scriptures.jpg',
    readingTime: '6 મિનિટ વાંચો',
    publishedAt: '2025-03-10T15:00:00.000Z',
  },
};

db.posts.forEach(post => {
  if (postUpdates[post.id]) {
    Object.assign(post, postUpdates[post.id]);
  }
});

// Update author avatars
db.authors.forEach(author => {
  if (author.id === 'author-1') author.avatar = '/images/author-hina.jpg';
  if (author.id === 'author-2') author.avatar = '/images/author-team.jpg';
});
db.users.forEach(user => {
  user.avatar = '/images/author-team.jpg';
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Successfully updated data/db.json with matching images and metadata!');
