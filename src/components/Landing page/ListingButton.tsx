import ListingListModal from './ListingListModal';
import FilterButton from './FilterButton';

const ListingComp = ({ listingOption, setListingOption }: any) => {
  return (
    <div className="flex items-center gap-2 lg:absolute lg:right-[0px]">
      <FilterButton />
      <ListingListModal
        listingOption={listingOption}
        setListingOption={setListingOption}
      />
    </div>
  );
};

export default ListingComp;

