export type Product = {
    id: string;
    slug: string;
    name: string;
    description: string;
    price: number;
    discountPercent: number;
    stock: number;
    category: string; // category slug
    image: string;
};

const cats = [
    { label: 'Roses', slug: 'roses' },
    { label: 'Cut Flowers', slug: 'cut-flowers' },
    { label: 'Houseplants', slug: 'houseplants' },
    { label: 'Bouquets', slug: 'bouquets' },
    { label: 'Succulents', slug: 'succulents' }
];

export const products: Product[] = Array.from({ length: 70 }, (_, idx) => {
    const i = idx + 1;
    const cat = cats[idx % cats.length];
    const name = `${cat.label} ${i}`;
    const slug = `${cat.slug}-${i}`;
    // deterministic-ish price/stock so file همیشه یکسان بماند
    const price = parseFloat((10 + ((i * 37) % 90) + (i % 3) * 0.5).toFixed(2));
    const discountPercent = [0, 5, 10, 15, 20][idx % 5];
    const stock = ((i * 3) % 20) + 1;
    // picsum.photos با seed -> تصویر ثابت برای هر ترکیب seed
    const image = `https://picsum.photos/seed/${encodeURIComponent(cat.slug + '-' + i)}/800/600`;

    return {
        id: `p${i}`,
        slug,
        name,
        description: `Beautiful ${cat.label.toLowerCase()} product number ${i}. Perfect for gifts and home decor.`,
        price,
        discountPercent,
        stock,
        category: cat.slug,
        image
    };
});
