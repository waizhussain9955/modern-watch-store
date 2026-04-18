import CategoryPage from '../components/CategoryPage';
import { WATCH_COLLECTION } from '../types';

const Offers = () => {
  const saleWatches = WATCH_COLLECTION.filter(w => w.onSale || w.price < 15000);

  return (
    <CategoryPage
      title="Exclusive Offers"
      categoryBanner="/images/generated/offers_hero_banner_1771144602125.png"
      watches={saleWatches}
    />
  );
};

export default Offers;