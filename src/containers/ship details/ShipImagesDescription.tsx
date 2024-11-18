import ShipImagesComp from '../../components/ship detail page/ShipImagesComp'
import ShipDetails from '../../components/ship detail page/ShipDescription'

const ShipImagesDescription = ({ship}: any) => {
  return (
    <div className='w-full md:max-w-[700px] lg:max-w-full 2xl:max-w-[1700px]'>
      <ShipImagesComp ship={ship} />
      <ShipDetails ship={ship} />
    </div>
  )
}

export default ShipImagesDescription
