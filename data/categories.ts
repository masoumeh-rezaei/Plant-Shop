export type Category = {
    label: string;
    slug: string;
};

export const categories: Category[] = [
    { label: 'All', slug: 'all' },
    { label: 'Roses', slug: 'roses' },
    { label: 'Cut Flowers', slug: 'cut-flowers' },
    { label: 'Houseplants', slug: 'houseplants' },
    { label: 'Bouquets', slug: 'bouquets' },
    { label: 'Succulents', slug: 'succulents' }
];
